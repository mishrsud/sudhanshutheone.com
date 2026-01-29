---
title: Creating a custom project template for use with dotnet CLI 
tags: 
- .NET Core 
- dotnet cli
- Automation
---

## Fundamentals
Docs: [**HERE**](https://docs.microsoft.com/en-us/dotnet/core/tools/custom-templates)
- Create a directory **.template.config** in the same directory as the .csproj file. 
- Create a **template.json**  file inside the above directory
- To install this as a template:

```bash
# The directory structure inside folder-containing-csproj:
# project.csproj
# .template.config/template.json
dotnet new -i /path/to/folder-containing-csproj
```
**NOTE** successful install just echoes back dotnet new help text: 
- Issue raised: https://github.com/dotnet/docs/issues/10960

You can pack the template for distro:
- in the directory containing .csproj, create a nuspec file (nuget spec)
- make sure the file has this section:
```xml
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2012/06/nuspec.xsd">
  <metadata>
    <!--other tags omitted for brevity-->
    <packageTypes>
      <packageType name="Template" />
    </packageTypes>
  </metadata>
</package>
```
- now run nuget pack
- install this as a template by running dotnet new -i /path/to/nupkg-file

## List of available templates
- Found [**here**](https://github.com/dotnet/templating/wiki/Available-templates-for-dotnet-new)
- Interesting ones:
  - [**dotnet new caju**](https://github.com/ivanpaulovich/dotnet-new-caju) - clean architecture with event sourcing / hexagonal architecture

## Uninstall package
- get the name right by running dotnet new -u: this will list installed
- run dotnet new -u name
