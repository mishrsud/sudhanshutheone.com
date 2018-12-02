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
```
~/.config/NuGet/NuGet.Config
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
nuget list -source SourceName
```