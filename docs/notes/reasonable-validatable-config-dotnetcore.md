---
title: Ensuring your configuration is strongly typed and can be validated at application start
description: .NET Core comes with IConfiguration, `IOptions<T>` and `IOptionsMonitor<T>`. Combining these, one can create strongly typed configuration for every class/service whilst ensuring that valid config is provided at app start.
date: 2019-03-08
tags: 
- Patterns
- Design patterns
- Enterprise patterns
- .NET Core
- Configuration
---

## The Problem
.NET Core has the IConfiguration abstraction out of the box. It also has the ability to read configuration from multiple sources such as JSON files, Environment Variables etc and one can easily write a custom configuration provider for getting configuration from another source (such as an HTTP endpoint). However, passing IConfiguration around your code base as a dependency (injected via constructor) has the downside of violating principle of interface segregation and least surprise. 

This is because a reader of the code that accepts IConfiguration via constructor cannot quite tell which keys the code really requires. They would need to look for all calls to IConfiguration.GetValue (or similar) to understand what configuration is required for the class.


Andrew Lock: 
- [Adding Validation to strongly typed .NET config](https://andrewlock.net/adding-validation-to-strongly-typed-configuration-objects-in-asp-net-core/)
- A [startup filter](https://andrewlock.net/exploring-istartupfilter-in-asp-net-core/) for ASP.NET
- Andrew's Netescapades repo on [github](https://github.com/andrewlock/NetEscapades.Configuration)
