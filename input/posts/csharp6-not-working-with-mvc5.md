Title: C# 6.0 Features Not Working with MVC 5 / Visual Studio 2015 / Razor
Lead: How I got out of the dreaded yellow screen of death in an MVC5 project
Published: 2016-08-23
Tags:

- .NET
- ASP.NET
- CSharp
- MVC5
- Web-Development

---

---

## Who moved my cheese?

I ran into this problem today while mucking around with the installed Nuget packages and web.config of an MVC 5 project where the Razor views started showing up an error while using the C# 6 String interpolation feature. There was a squiggly line under all string interpolation expressions and when I pointed to it, the error said "Cannot use C# 6 feature with C# 5". When run, there was the dreaded YSOD (Yellow Screen Of Death for the uninitiated) that said:

> CS1525: Invalid expression term '$'
> Here's a [discussion on Stackoverflow](http://stackoverflow.com/a/31548221/190476) on this topic that helped.

### The Issue

I had accidently uninstalled the _**Microsoft.CodeDom.Providers.DotNetCompilerPlatform**_ Nuget package, so Razor didn't recognize that C# 6 should be used. The mentioned [Nuget package](https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform/) uses Roslyn as the compiler platform.

### The Solution

1.  Install the \_**Microsoft.CodeDom.Providers.DotNetCompilerPlatform **\_Nuget package.
2.  (This is required only if you don't already have the mentioned section in Web.config) Add the following XML fragment in your root web.config

```
<configuration>
  <system.codedom>
    <compilers>
      <compiler language="c#;cs;csharp" extension=".cs" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.CSharpCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:6 /nowarn:1659;1699;1701" />
      <compiler language="vb;vbs;visualbasic;vbscript" extension=".vb" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.VBCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:14 /nowarn:41008 /define:_MYTYPE=\&quot;Web\&quot; /optionInfer+" />
    </compilers>
  </system.codedom>
</configuration>

```

After adding the DotNetCompilerPlatform package and the system.codedom section, Razor was happy with all C# 6 features being used in the views :-)

### Further reading:

- Rationale behind Roslyn in ASP.NET applications: [Blog post by Damian Edwards](https://blogs.msdn.microsoft.com/webdev/2014/05/12/enabling-the-net-compiler-platform-roslyn-in-asp-net-applications/)
- An (official) [overview of Roslyn](https://github.com/dotnet/roslyn/wiki/Roslyn%20Overview)
  Happy Coding!

SM
