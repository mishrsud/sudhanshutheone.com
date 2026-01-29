---
title: Cake Build for .NET Core
description: Using the awesome Cake build scripting system for .NET Core projects.
date: 2019-04-28
tags:
  - CSharp
  - dotnet core
  - Cake
---

## Cake

[Cake](https://cakebuild.net) is a build scripting system using a C# DSL

### Taming the power of Cake

[Gabriel Weyer's blog](https://gabrielweyer.net/2018/04/22/cake-build/)
[Source on Github](https://github.com/gabrielweyer/cake-build)
[My Fork](https://github.com/mishrsud/cake-build)

### Gotchas

- When provisioning Nuget key, use glob pattern \*
- Other techniques to version nuget: [NerdBank GitVersion](https://github.com/AArnott/Nerdbank.GitVersioning/blob/master/doc/nbgv-cli.md) - was hard to get working on CI
- As mentioned in this [Github Thread](https://github.com/dotnet/cli/issues/2170) the way to provide package information is to use the csproj file, don't bother creating a nuspec.
