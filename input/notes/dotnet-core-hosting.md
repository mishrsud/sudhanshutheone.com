---
Title: Understanding Hosting in .NET Core
Lead: Understand what Hosting is, why should one use hosting and what problems it solves
Published: 2017-04-28
Tags: 
- C#
- dotnet core
- Process model
---

## Hosting
Starting .NET Core, ASP.NET Core apps typically have a Program class with a Main method as the entry point just like console apps of the past. The Main method constructs a WebHost using the builder pattern and the calls the Run method on the constructed WebHost.
Why did MS choose to go with this pattern?

## Cross cutting concerns
Most applications have the following cross-cutting concerns:
1. Start and Stop the application gracefully
2. Wire up Dependencies and manage the lifetime of these dependencies
3. Configure aspects such as logging and instrumentation

A Host is an abstraction that enables handling the above (and some more) cross cutting concerns in a manner that is agnostic to the underlying stack / use case. That is, an app that runs as a daemon would be configured about the same way as an app that hosts an HTTP listener (e.g. MVC or MVC with Web API).

[MS Docs on ASP.NET hosting](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/index?view=aspnetcore-2.2&tabs=windows#host)

TODO:
- Cover the Smi.NetCore.Extensions.Hosting package: Done in README on github

## Structured Logging 

Wiring up Serilog to be the implementation of the ILoggerFactory
- Sample in progress
- nuget: 
```
<PackageReference Include="Serilog.Extensions.Hosting" Version="2.0.0" />
<PackageReference Include="Serilog.Formatting.Compact" Version="1.0.0" />
<PackageReference Include="Serilog.Settings.Configuration" Version="3.0.1" />
<PackageReference Include="Serilog.Sinks.Console" Version="3.1.1" /> 
```
Serilog ElasticSearch Sink: https://github.com/serilog/serilog-sinks-elasticsearch

### Control logging level through environment variables

#### Reading configuration from a .NET Core configuration provider
Add the following package: [Serilog.Settings.Configuration](https://www.nuget.org/packages/Serilog.Settings.Configuration/)

Source [on Github](https://github.com/serilog/serilog-settings-configuration)

#### Custom log level for each source context
(A Source context is the fully qualified class name if a logger was injected through constructor injection of ILogger<T> (this type is in Microsoft.Extensions.Logging))
1. Ensure Environment variables are added to the IConfigurationBuilder
```csharp
// Add Package: 
configurationBuilder.AddEnvironmentVariables();
```

2. When Setting up Serilog, create LoggerConfiguration using IConfiguration that has been built by reading various configuration sources:
```csharp

// Add Package Serilog.Extensions.Hosting
// to get UseSerilog extension method
// This uses my Smi.NetCore.Extensions.Hosting pcakage
public static async Task Main(string[] args)
{
    await DefaultConsoleHost
        .CreateBuilder<TransactionIngestionWorker>(args, EnvironmentVariablePrefix, ApplicationName)
        .UseStartup<Startup>(args)
        .UseSerilog(CreateLoggerConfiguration)
        .RunConsoleAsync();
}

private static void CreateLoggerConfiguration(
            HostBuilderContext hostBuilderContext, 
            LoggerConfiguration serilogConfiguration)
{
    serilogConfiguration
        .Enrich.FromLogContext()
        .Enrich.WithMachineName()
        .Enrich.WithProcessId()
        .Enrich.WithExceptionDetails()
        .Enrich.WithProperty("OSDescription", RuntimeInformation.OSDescription)
        .Enrich.WithProperty("FrameworkDescription", GetNetCoreVersion())
        .Enrich.WithProperty("Application", ApplicationName)
        .ReadFrom.Configuration(hostBuilderContext.Configuration);

    if (hostBuilderContext.HostingEnvironment.IsDevelopment())
    {
        serilogConfiguration.WriteTo.Console();
    }
    else
    {
        serilogConfiguration.WriteTo.Console(new CompactJsonFormatter());
    }
}
```

3. Set the following environment variables
```bash
# Set default to Information
Serilog__MinimumLevel__Default=Information
# Override for a context - NOTICE THE FULLY QUALIFIED CLASS NAME
Serilog__MinimumLevel__Override__SelfTerminatingHost.SomeWorker=Warning
```
#### Control logging output using filters and 

#### CorrelationId for a distributed system
#### 1. Scenario: A background task/worker/daemon that processes messages from a message queue
If the received message has a Correlation ID property, the simplest way to correlate all logs by the CorrelationId is to add the following statement at the place in code where the message is received:

```csharp
public async Task ProcessMessage(MyMessage message)
{
    LogContext.PushProperty("CorrelationId", message.CorrelationId);

    // other logic
    LogContext.Reset(); // remove all enrichers
}
```

The downside is that the code will require a reference to Serliog package. If you want to have the minimum dependencies, then use the following technique instead:

```csharp
private readonly ILogger<MessageProcessor> _logger;

// ILogger<T> is wired up by DI
public MessageProcessor(ILogger<MessageProcessor> logger)
{
    _logger = logger;
}

public async Task ProcessMessage(MyMessage message)
{
    using(_logger.BeginScope("{CorrelationId}, message.CorrelationId"))
    {
        // other logic
    }   
}
```

#### 2. Scenario: an ASP.NET Core application
The correlation ID would most likely be passed to the application via a custom HTTP Header - such as Request-Id or X-CorrelationId.
If so, then create a [custom enricher](https://github.com/ekmsystems/serilog-enrichers-correlation-id/blob/master/src/Serilog.Enrichers.CorrelationId.Standard/Enrichers/CorrelationIdEnricher.cs) that reads the header using the **IHttpContextAccessor** and wire up the enricher when creating the **LoggerConfiguration**
E.g. CorrelationId [Nuget package](https://www.nuget.org/packages/CorrelationId)

[This Resource](https://dotnet-cookbook.cfapps.io/core/scoped-logging-with-serilog/) talks about creating a middleware to add Correlation ID and other contextual properties

#### 3. Adding contextual information to logs

Enrichers:
- Serilog.Enrichers.Environment: Gets MachineName, UserName etc
- Serilog.Enrichers.Process: Gets ProceessId and ThreadId
- [Serilog.Exceptions](https://github.com/RehanSaeed/Serilog.Exceptions) - convert exception stacktrace to structured log.


```csharp
// Get .NET Core Version
public static string GetNetCoreVersion() {
    var assembly = typeof(System.Runtime.GCSettings).GetTypeInfo().Assembly;
    var assemblyPath = assembly.CodeBase.Split(new[] { '/', '\\' }, StringSplitOptions.RemoveEmptyEntries);
    int netCoreAppIndex = Array.IndexOf(assemblyPath, "Microsoft.NETCore.App");
    if (netCoreAppIndex > 0 && netCoreAppIndex < assemblyPath.Length - 2)
    {
        return assemblyPath[netCoreAppIndex + 1];
    }
    return null;
}
```