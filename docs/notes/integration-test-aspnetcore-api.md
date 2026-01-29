---
title: How to write functional tests for ASP.NET Core API
tags: 
- ASP.NET
- .NET Core
- ASP.NET Core 
- Testing
---

# Scenario
We have an ASP.NET core API and want to write tests covering the API functionality:
- Test responses from endpoints when things work as expected
- Test cases when things go wrong and 

### When an API uses environment variables for configuration
- My answer on [Stackoverflow](https://stackoverflow.com/a/54878482/190476)

```csharp
// Create environment variables for the test process
// Depending on the test framework used, this is done when the test starts. e.g. a constructor in xUnit or a method annottated with [Setup] in NUnit
var inMemoryEnvironmentVariables = new Dictionary<string, string>
{
    { "baseUrl", "https://example.com" },
    { "someOtherConfig", "value" }
};

foreach (var variable in inMemoryEnvironmentVariables) 
{
    Environment.SetEnvironmentVariable(variable.Key, variable.Value);
}
```

### Create a WebHostBuilder and a TestServer to host the API in-memory

```csharp
// using Microsoft.AspNetCore.Hosting
var builder = new WebHostBuilder()
                .UseEnvironment("Development")
                .ConfigureAppConfiguration(
                    configurationBuilder =>             configurationBuilder.AddEnvironmentVariables(prefix: "WHATEVER_"))
                .UseStartup<Startup>();

// using Microsoft.AspNetCore.TestHost;
var testServer = new TestServer(builder);
var httpClient = testServer.CreateClient();

// use httpClient to call the API hosted in memory
```

### How To inject mocked external services 

```csharp
// Use NSubstitute to create a mock
_mockService = Substitute.For<ISomeService>();
_mockService.GetData(
                    Arg.Any<int>(),
                    Arg.Any<string>(),
                    Arg.Any<string>())
                .Returns(mockResponse);

var builder = new WebHostBuilder()
                .ConfigureTestServices(
                    serviceCollection => serviceCollection.AddScoped<ISomeService>(
                        provider => _mockService))
                .UseEnvironment("Development")
                .ConfigureAppConfiguration(configurationBuilder => configurationBuilder.AddEnvironmentVariables(prefix: "SOMETHING_"))
                .UseStartup<Startup>();
```

### Making EF Core based DbContext testable

- Use a class that looks like the following to model your DbContext
```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<SomeModel> SomeModels { get; set; }

    public ApplicationDbContext() { }

    // This constructor facilitates testability 
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<SomeModel>();
    }

    public override int SaveChanges()
    {
        int result = base.SaveChanges();

        return result;
    }
}
```

- In the test fixture, use the strategy outlined in [MS Docs](https://docs.microsoft.com/en-us/ef/core/miscellaneous/testing/in-memory)
  - Add the nuget package **Microsoft.EntityFrameworkCore.InMemory**

```csharp
public class MyRepositoryShould
{
    [Fact]
    public void BehaveAsXXX_WhenGivenYYYY()
    {
        // create DbContextOptions
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "Scenario")
                .Options;
        
        // Add some data
        using (var context =  new ApplicationDbContext(options))
        {
            context.SomeModels.Add(new SomeModel {//properties});
            context.SaveChanges();
        }
        
        // now inject a new instance of context in your repository
    }
}
```
