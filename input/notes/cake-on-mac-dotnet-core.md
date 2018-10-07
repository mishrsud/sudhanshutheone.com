---
title: Making [Cake](https://cakebuild.net) run on Mac using dotnet core
---


## Summary: Making cake run on Mac using dotnet core

-----
With Cake 0.24 (Full framework):

```
(2459,27): error CS0012: The type 'Object' is defined in an assembly that is not referenced. You must add a reference to assembly 'netstandard, Version=2.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'.
(2465,27): error CS0012: The type 'Object' is defined in an assembly that is not referenced. You must add a reference to assembly 'netstandard, Version=2.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'.
Error: Error(s) occurred when compiling build script:
(2459,27): error CS0012: The type 'Object' is defined in an assembly that is not referenced. You must add a reference to assembly 'netstandard, Version=2.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'.
(2465,27): error CS0012: The type 'Object' is defined in an assembly that is not referenced. You must add a reference to assembly 'netstandard, Version=2.0.0.0, Culture=neutral, PublicKeyToken=cc7b13ffcd2ddd51'.
```

Updated cake to v0.30:
- in the tools/packages.config, updated to 0.30
- No longer complaints for netstandard, but now complains that mono is no longer supported

```
The Mono runtime is not supported. Please check the GitHub repository and issue tracker for information on .NET Core support for cross platform execution.
An error occurred when executing task 'Preview'.
Error: One or more errors occurred.
	Wyam: Process returned an error (exit code 5).
```

## Objective
- I originally wanted to be able to build and preview my blog based on Wyam on mac
- **Wyam does not yet support dotnet core**: https://github.com/Wyamio/Wyam/issues/300

## Lessons learnt:
When checking for cross platform when several tools are involved, check if each of them is supported on the new platform

Cake for .NET Core:
---
- Install dotnet using shell script as described here: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script
```bash
./dotnet-install.sh --channel LTS
```
- Use Cake bootstrapper to setup cake:
```bash
#!/usr/bin/env bash
##########################################################################
# This is the Cake bootstrapper script for Linux and OS X.
# This file was downloaded from https://github.com/cake-build/resources
# Feel free to change this file to fit your needs.
##########################################################################

# Define directories.
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
TOOLS_DIR=$SCRIPT_DIR/tools
CAKE_VERSION=0.30
CAKE_DLL=$TOOLS_DIR/Cake.CoreCLR.$CAKE_VERSION/Cake.dll

# Make sure the tools folder exist.
if [ ! -d "$TOOLS_DIR" ]; then
  mkdir "$TOOLS_DIR"
fi

###########################################################################
# INSTALL .NET CORE CLI
###########################################################################

## REVIEW THIS AS THIS IS INSTALLING AND OLDER VERSION
## https://dot.net/v1/dotnet-install.sh
echo "Installing .NET CLI..."
if [ ! -d "$SCRIPT_DIR/.dotnet" ]; then
  mkdir "$SCRIPT_DIR/.dotnet"
fi
curl -Lsfo "$SCRIPT_DIR/.dotnet/dotnet-install.sh" https://dot.net/v1/dotnet-install.sh
sudo bash "$SCRIPT_DIR/.dotnet/dotnet-install.sh" --channel LTS
export PATH="$SCRIPT_DIR/.dotnet":$PATH
export DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1
export DOTNET_CLI_TELEMETRY_OPTOUT=1
"$SCRIPT_DIR/.dotnet/dotnet" --info


###########################################################################
# INSTALL CAKE
###########################################################################

if [ ! -f "$CAKE_DLL" ]; then
    curl -Lsfo Cake.CoreCLR.zip "https://www.nuget.org/api/v2/package/Cake.CoreCLR/$CAKE_VERSION" && unzip -q Cake.CoreCLR.zip -d "$TOOLS_DIR/Cake.CoreCLR.$CAKE_VERSION" && rm -f Cake.CoreCLR.zip
    if [ $? -ne 0 ]; then
        echo "An error occured while installing Cake."
        exit 1
    fi
fi

# Make sure that Cake has been installed.
if [ ! -f "$CAKE_DLL" ]; then
    echo "Could not find Cake.exe at '$CAKE_DLL'."
    exit 1
fi

###########################################################################
# RUN BUILD SCRIPT
###########################################################################

# Start Cake
exec dotnet "$CAKE_DLL" "$@"

```

## Build script for dotnet core
- Create build.cake
```bash
var target = Argument("target", "Default");

Task("Default")
  .Does(() =>
{
  DotNetCoreBuild("./EntryPoint/EntryPoint.csproj");
});

RunTarget(target);
```
- Invoke build script
```bash
dotnet tools/Cake.CoreCLR.0.30/Cake.dll build.cake
```

## References
- Cake on .NET Core: https://github.com/cake-build/cake/issues/1751
- Andrew Lock: ASP.NET Core build using cake in docker https://andrewlock.net/building-asp-net-core-apps-using-cake-in-docker/
- Cake build for dotnet core: https://cakebuild.net/api/Cake.Common.Tools.DotNetCore/DotNetCoreAliases/0D79A1B5
- Understanding netstandard meta package https://andrewlock.net/what-is-the-netstandard-library-metapackage/