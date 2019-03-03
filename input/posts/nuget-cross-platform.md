---
Title: Nuget CLI (Command Line Interface) - tips, tricks and gotchas (Mac and Windows)
Lead: Nuget CLI can be a powerful ally - once you get past little gotchas. This post documents my adventures and learnings whilst trying to leverage the CLI across Mac and Windows
Published: 2018-12-02
Tags: 
- .NET Core
- nuget
- nuget cross platform
- dotnet xplat
---

## Getting Nuget CLI

1. Windows
This is quite simple. [**MS DOCS**](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools) explain the steps quite well:
   
   1.1 Visit [Nuget.org](https://nuget.org/downloads) and get the latest release (or nightly if you are the adventurous kind)
   
   1.2 You would place the downloaded **nuget.exe** in a desired place (e.g. C:\Nuget\Nuget.exe). 

   1.3 Add this to you PATH environment variable to make it available from command line

2. Mac OsX or Linux
These platforms require Mono to run Nuget as you essentially use the same Nuget.exe as Windows and hence the Mono runtime is your friend.
   
   2.1. If you use Homebrew, the simplest way (and most maintainable) is to use:
   ```bash
   # https://brewformulas.org/Mono
   brew install mono
   ```
   Alternatively, you can download [**Mono for Mac**](https://www.mono-project.com/docs/getting-started/install/mac/). This is an installer if that makes you happy.
   As of this writing, using homebrew would install Mono here:
   ```bash
   # The latest release is 5.14.0 at this time
   /Library/Frameworks/Mono.framework/Versions/5.14.0
   ```
   If this is the first time you installed mono, you should also see a symbolic link called Current that points to the latest version of mono:
   ```bash
   lrwxr-xr-x   1 root  admin   50  3 Mar 18:03 Current -> /Library/Frameworks/Mono.framework/Versions/5.14.0
   ```

   2.2. You'll get a bash script at **/Library/Frameworks/Mono.framework/Commands/nuget** that may resemble this:
   ```bash
   #!/bin/sh
   exec /Library/Frameworks/Mono.framework/Versions/5.14.0/bin/mono $MONO_OPTIONS /Library/Frameworks/Mono.framework/Versions/5.14.0/lib/mono/nuget/nuget.exe "$@"
   ```
   This script is in your $Path (thanks to brew) and you should be able to open a terminal at this point and type 
   ```bash 
   # expect to see nuget help printed
   nuget 
   ```

## Updating Nuget CLI
1. Windows: Open a command prompt and enter this command (assuming the path to nuget.exe is in your PATH):
```bash
nuget update -self
```
2. Mac OsX
Assuming you used homebrew to install mono, you should be able to run the same update command as Windows (as it is the same Nuget.exe). However, I found the install location for my nuget shell script (see point 2.2. in the Getting Nuget CLI section above) was only editable by root. Hence, I had to do this:
```bash
sudo nuget update -self
```

**Side Note**: For a reason I can't yet figure out, when I updated mono using brew (brew update && brew upgrade mono), the Current symbolic link did not get updated. I had to do this manually:
```bash
sudo ln -sfn /Library/Frameworks/Mono.framework/Versions/5.14.0 Current
```

## Gotchas, tips and tricks

### Default Package Cache - this is where packages get downloaded
[Reference](https://lastexitcode.com/projects/NuGet/FileLocations/)

1. Mac: 
```
~/.local/share/NuGet/Cache
~/.nuget/packages
```
2. Windows:
```
%LocalAppData%\NuGet\Cache
%UserProfile%\.nuget\packages
```
3. Linux
Same as Mac

### Nuget.config location
1. Mac
Nuget uses this config:
```
~/.config/NuGet/NuGet.Config
```
```dotnet add <Project> package ```
uses config from here: (see [github](https://github.com/NuGet/Home/issues/4413))
```
~/.nuget/NuGet/NuGet.Config
```

2. Windows
```
%AppData%\NuGet\NuGet.config
```
3. Linux
Same as mac

### Adding package feeds
1. Using nuget command line
```
nuget sources Add -Name "Feed Name" -Source "https://feed-url/nuget/v3/index.json" -Username "Username" -Password "password-or-personal-access-token"
```

2. Using IDE
- Rider: can add both authenticated as well as public feeds
- Visual Studio: can add only public feeds through UI. use command line to add authenticated feeds.
- VS Code: Add feeds through command line. Then tasks can be used to run restore.

### Restoring packages
1. .NET Core
```bash
# YOU ARE IN A DIRECTORY WITH A .sln or .csproj FILE
$ dotnet restore

# FROM ANYWHERE
$ dotnet restore path/MyProject.csproj

# OR
$ dotnet restore MySolution.sln
```
- using settings from a custom Nuget.config
```bash
$ dotnet restore --configfile NuGet.config 
```

2. Using Nuget command line
```bash
$ nuget restore
``` 

3. Adding an authenticated feed using NuGet.config file
https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesourcecredentials

Add a section like so:
```xml
<configuration>
    <packageSources>
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
        <add key="Contoso" value="https://contoso.com/packages/" />
        <add key="Test Source" value="c:\packages" />
    </packageSources>
    <packageSourceCredentials>
        <Contoso>
            <add key="Username" value="user@contoso.com" />
            <add key="Password" value="..." />
        </Contoso>
        <Test_x0020_Source>
            <add key="Username" value="user" />
            <add key="Password" value="..." />
        </Test_x0020_Source>
    </packageSourceCredentials>
</configuration>
```

### Other common operations using command line

1. List added sources
```bash
nuget sources list
```

2. List packages from a named source
```bash
# NOTE: for nuget > v 4 SourceName can be the URL or the name of the source
nuget list -source SourceName
```

3. Remove a package source
```bash
nuget sources remove -name <name-here>
```

### The mysterious case of authenticated feeds
When working with an a package feed that requires credentials (userid/password or a personal access token), beware of these gotchas!

1. As of 14-02-2019, dotnet add command [cannot read encrypted credentials](https://github.com/NuGet/Home/issues/5163#issuecomment-299538962) from Nuget.config. That leaves us with the following options:

1.1. Use Nuget to add package from command line:
```bash
nuget install <package>
```
This will read sources from the config file for the platform in question (Mac/Linux/Windows) explained at the top of this note (see Nuget config location)

1.2. If you want to use dotnet CLI, Create a Nuget.config file that stores password in clear text. See above for the structure of the file. This file may be stored in the solution directory and it would be auto-detected by dotnet. [see here](https://github.com/NuGet/Home/issues/5163#issuecomment-300257563). Then add package:
```bash
dotnet add <project> package --source <source-url> package-name
```

NOTE: If the local package cache is populated, subsequent dotnet restore would not break on an authenticated feed.

2. When using an artefact feed from Azure DevOps, the restore task is able to use authenticated feeds by using service principal based authentication. see [docs here](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure?view=azure-devops)