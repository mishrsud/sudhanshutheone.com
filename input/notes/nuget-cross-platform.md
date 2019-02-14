---
title: Nuget restore, package sources, authenticated feeds et al
---

# Nuget (dotnet package manager) gotchas, tips and tricks

### Default Package Cache
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

2. Using Nuget commandline
```bash
$ nuget restore
``` 

3. Adding an autheticated feed using NuGet.config file
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
# NOTE: SourceName is the URL!!!
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

2. When using an artefact feed from Azure DevOps, the restore task is able to use authenticted feeds by using service principal based authenitication. see [docs here](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/connect-to-azure?view=azure-devops)