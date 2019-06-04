---
Title: Leveraging built-in Dependency injection in .NET Core
Lead: The built-in DI in .NET core is good enough for most application. This post covers common scenarios that an application requires and how to accomplish them using the default DI framework.
Published: 2018-09-14
Tags: 
- .NET Core
- ASP.NET
- C#
- dependency-injection
- patterns
- practices
---

## Summary
.NET Core comes with a built-in dependency injection in the form of IServiceCollection which serves as the registry and IServiceProvider which serves as the service locator. You typically register a service by adding it to the IServiceCollection. A very minimal example could look like this:

NOTE: Using the Nuget package Microsoft.Extensions.DependencyInjection

```csharp
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public static IServiceProvider Initialise()
    {
        var serviceCollection = new ServiceCollection();
        ConfigureServices(serviceCollection);
        return serviceCollection.BuildServiceProvider();
    }

    private static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IService, ServiceImplementation>();
    }
}
```

## 1. Scenario: Register a service with constructor parameters known at the time of registration

```csharp
services.AddTransient<IMyService>(s => new MyService("MyConnectionString"));
```

## 2. Scenario: Register an open generic
```csharp
services.AddScoped(
            typeof(IGenericRepository<>), 
            typeof(EFGenericRepository<>));

// Alternative Approach
services.Add(
            new ServiceDescriptor(
                typeof(IPipelineBehavior<,>),
                typeof(LoggingBehavior<,>), ServiceLifetime.Scoped));
```

## 3. Scenario: ValidateScopes as a parameter when building ServiceProvider
Detailed explanation on [Stackoverflow](https://stackoverflow.com/a/50198738/190476).
> This option will prevent resolving of scoped services from the singleton container, that is if you accidentally try to resolve a scoped service within Configure method, you will get an exception. Whereas if you disable it you shouldn't.

## 4. Scenario: Use decorator pattern with Scrutor library
[Scrutor](https://github.com/khellang/Scrutor) follows a convention based approach to wire up an interface to implementation.
[Andrew Lock's Blog](https://andrewlock.net/adding-decorated-classes-to-the-asp.net-core-di-container-using-scrutor/)

## 5. Scenario: Multiple implementations of an interface, Use named resolution
[Stackoverflow](https://stackoverflow.com/a/44177920/190476)

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<Consumer>();

        services.AddTransient<ServiceA>();
        services.AddTransient<ServiceB>();
        services.AddTransient<ServiceC>();

        services.AddTransient<Func<string, IService>>(serviceProvider => key =>
        {
            switch(key)
            {
                case "A":
                    return serviceProvider.GetService<ServiceA>();
                case "B":
                    return serviceProvider.GetService<ServiceB>();
                case "C":
                    return serviceProvider.GetService<ServiceC>();
                default:
                    throw new KeyNotFoundException(); // or maybe return null, up to you
            }
        });
    }
}

public class Consumer
{
    private readonly Func<string, IService> serviceAccessor;

    public Consumer(Func<string, IService> serviceAccessor)
    {
        this.serviceAccessor = serviceAccesor;
    }

    public void UseServiceA()
    {
        //use serviceAccessor field to resolve desired type
        serviceAccessor("A").DoIServiceOperation();
    }
}
```