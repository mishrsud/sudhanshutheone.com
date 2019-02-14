---
Title: Making sense of ASP.NET Core Metapackage Versioning
Lead: Understaning how TFM (Target Framework Moniker) and the Microsoft.AspNetCore.App metapackage versioning work together
Published: 2019-02-12
Tags: 
- .NET Core
- ASP.NET
- C#
- HTTP
---

### What's this?
Whilst working on an ASP.NET core project, I needed to reference another package. This nuget install failed with an error similar to this:

```bash
Detected package downgrade: Microsoft.AspNetCore.App from 2.1.4 to 2.1.0. Reference the package directly from the project to select a different version.
```
At this time, my project file (csproj) looked like this:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.1</TargetFramework>    
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.App" />
    
  </ItemGroup>
</Project>
```

Things to note:
1. I'm using this SDK: Microsoft.NET.Sdk.Web
2. My app targets .NET Core 2.1 - this is indicated by the Target Framework Moniker (TFM) in the TargetFramework tag of the csproj file 

Now, I do not specify any version on the package "Microsoft.AspNetCore.App", so why was nuget complaining of a downgrade? What's going on here?

### More detail on the issue, please?
As mentioned previously, I was using the default template for my csproj created when I created the project. At the time, the following runtimes were installed for AspNetCore: (you can check this by running ```dotnet --info``` in a command shell. Look for ".NET Core runtimes installed") 
```
Microsoft.AspNetCore.All 2.1.4 
Microsoft.AspNetCore.All 2.1.5
``` 

Now the package I was trying to install had a dependency on Microsoft.AspNetCore.App 2.1.4. There are several ways to find out the dependencies of a nuget package without installing it. Depending on where the package is coming from (which feed), you may be able to look at the dependencies directly on the feed. For example, nuget.org shows dependencies. Other ways include:
1. Browsing the package feed using the excellent LinqPad tool
2. downloading the package and looking at the package using NugetPackageExplorer


### How Metapackage Versioning plays with the rest of the ecosystem
As explained in [MS Docs](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/metapackage-app?view=aspnetcore-2.2):

> Using the Microsoft.AspNetCore.App metapackage provides version restrictions that protect your app:

    If a package is included that has a transitive (not direct) dependency on a package in Microsoft.AspNetCore.App, and those version numbers differ, NuGet will generate an error.
    Other packages added to your app cannot change the version of packages included in Microsoft.AspNetCore.App.
    Version consistency ensures a reliable experience. Microsoft.AspNetCore.App was designed to prevent untested version combinations of related bits being used together in the same app.

So, this was the source of the error. A follow up question would be: What is the version of packages brought in by Microsoft.AspNetCore.App when no version is specified?
Quoting form MS DOCS:


### What should I do if a package I reference needs a higher version of runtime?

You would change your project file to:
1. Remove the reference to "Microsoft.AspNetCore.App"
2. Add the tag ```<RuntimeFrameworkVersion>```

In my case, the resultant csproj would look like this:
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp2.1</TargetFramework>   
    <RuntimeFrameworkVersion>2.1.4</RuntimeFrameworkVersion> 
  </PropertyGroup>

  <ItemGroup>
  <!-- NOTE removed Microsoft.AspNetCore.App reference as this will be injected for us through runtimeconfig.json-->
        
  </ItemGroup>
</Project>
```

[This Stackoverflow answer](https://stackoverflow.com/a/46778275/190476) elaborates on the difference between TargetFramework and RuntimeFrameworkVersion:
> The RuntimeFrameworkVersion is specific to .NET Core / netcoreapp. The SDK will inject a dependency on Microsoft.NETCore.App for the version that RuntimeFrameworkVersion is set to or use the latest version it knows about for .NET Core < 2.0. The resolved version is then written to the runtimeconfig.json file for the .NET Core host framework resolver to resolve the version of the shared framework to load (=> .NET Core 1.1.4 runtime for example).

### References
- [DOCS: Implicit Package references](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj)
   - Github [issue](https://github.com/dotnet/core/blob/master/release-notes/1.0/sdk/1.0-rc3-implicit-package-refs.md)
- [Preview the result of MSBuild running through your project file](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj#how-to-see-the-whole-project-as-msbuild-sees-it)
```
dotnet msbuild -p:TargetFramework=netcoreapp2.1 -pp:fullproject.xml
```
- [Microsoft.AspNetCore.App Metapackage](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/metapackage-app?view=aspnetcore-2.2)
- [Upgrading aspnet core from 2.1 to 2.2](https://docs.microsoft.com/en-us/aspnet/core/migration/21-to-22?view=aspnetcore-2.2&tabs=visual-studio)
- [Runtime patch selection](https://docs.microsoft.com/en-us/dotnet/core/deploying/runtime-patch-selection)

HTH

/ Sudhanshu