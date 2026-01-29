---
title: Concepts in .NET Core
description: Some key concepts in .NET Core, gotchas and changes from .NET Classic
date: 2017-04-28
tags:
  - CSharp
  - dotnet core
  - gotchas
---

## AppDomain in .NET Core

The concept of an AppDomain is quite different in .NET core. For example, creating a custom AppDomain is not supported.
Prior to .NET Standard 2.0, AppDomain type wasn't available when targeting .NET Standard.

[This answer on Stackoverflow](https://stackoverflow.com/q/27266907/190476) goes into details of the reasons .NET Core left out key features of AppDomains

.NET Standard [FAQs on Github](https://github.com/dotnet/standard/blob/master/docs/faq.md#is-appdomain-part-of-net-standard) mentions this:

> The primary reason we expose this type in .NET Standard is because the usage is fairly high and typically not associated with creating new app domains but for interacting with the current app domain, such as registering an unhandled exception handler or asking for the application's base directory.

So, these two use cases are supported on all platforms:

### Register an unhandled exception handler

```csharp
// This line would be at the application Entry point. E.g in a Static constructor for Program.cs
AppDomain.CurrentDomain.UnhandledException += OnUnhandledException;


private static void OnUnhandledException(object sender, UnhandledExceptionEventArgs e)
{
    var exception = e.ExceptionObject as Exception;
    var appDomain = sender as AppDomain;

    // Log the exception
    Console.Out.WriteLine($"Exception {exception?.Message}, details: {exception?.StackTrace} ");
}
```

### Register the unload event

```csharp
AppDomain.CurrentDomain.DomainUnload += HandleDomainUnloading;

private static void HandleDomainUnloading(object sender, EventArgs args)
{
    Console.Out.WriteLine("AppDomain Unloading");
}
```

## Replacing some common use cases for AppDomain

Michael Whelan has documented this in his blog: http://www.michael-whelan.net/replacing-appdomain-in-dotnet-core/

The most common use case I found is to run some code just before the application shuts down gracefully. E.g. clear a Serilog log pipeline.

```csharp
// using System.Runtime.Loader;
AssemblyLoadContext.Default.Unloading += context => HandleUnloading();

private static void HandleUnloading()
{
    Console.Out.WriteLine($"Running {nameof(HandleUnloading)}");
}
```

**Observations:**

- In a standalone console application, Killing the process from Task Manager triggered this event but CTRL+C did not
- When using Microsoft.Extensions.Hosting provided generic host, CTRL+C _did trigger_ the Unloading event

## .NET Standard

.NET Standard is a spec. The API set of a .NET Standard version is fixed i.e. version 2.0 of .NET Standard would never be retrofit with more APIs.
See [FAQs](https://github.com/dotnet/standard/blob/master/docs/faq.md)
