---
Title: Health checks in ASP.NET core
Lead: Notes and thoughts on the out-of-the box Health check feature.
Published: 2019-08-09
Tags: 
- aspnet core
- health check
- microservices
---


Things to think about:
- Impact of health check on the service load
- liveness vs readiness - in what scenarios does it make sense to have them separate vs having just one health endpoint
- should we expose health check over http? why or why not?
- 

## References

- [Health Check on MS Docs](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-2.2)
- [Scott Hanselmans blog](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks?WT.mc_id=-blog-scottha) 
    - describes the [Xabaril](https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks?WT.mc_id=-blog-scottha) library that provides a UI on top