---
Title: Using docker as a self contained and portable development environment
Lead: Use docker to build and debug ASP.NET Core apps
Published: 2019-02-12
Tags:
  - .NET Core
  - ASP.NET
  - CSharp
  - HTTP
  - docker
  - microservices
---

### Why would I want to do this?

As a developer, when I want to try a new tech stack, the first thing to do is to setup a development environment including (but not limited to):

- Install the SDK and runtime
- An editor to write code
- setup code, compile, debug cycle

I would also want to set this up as quickly as possible without breaking anything already on my computer. This is where a containerised development environment trumps other options: all you need to do is to get the docker image and off you go!

### Instructions

- On github: https://github.com/dotnet/dotnet-docker/blob/master/samples/aspnetapp/aspnet-docker-dev-in-container.md
- [Stackoverflow answer](https://stackoverflow.com/a/54638389/190476) Setting up ports and other settings

### References

- [Microservices with .NET core](https://dotnet.microsoft.com/learn/web/microservices-architecture)
