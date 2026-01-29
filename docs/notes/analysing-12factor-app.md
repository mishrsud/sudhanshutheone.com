---
title: An analysis of Twelve-Factor app methodology for developing software as a service
description: Understand how to use async and await for efficient code and avoid surprises.
date: 2017-04-20
tags: 
- Design
- Architecture
- Best Practices
- 12Factor
- Twelve-Factor
---

## Summary
The [12 Factor](https://12factor.net) methodology articulates key design principles for creating robust and maintainable applications. This post summarises the key ideas and adds some insights from my experiences.

As the 12 Factor homepage says about who should care?:
> Any developer building applications which run as a service. Ops engineers who deploy or manage such applications.

In this day and age of Cloud and containers, that is practically every developer!

## TL;DR; and Overview
1. Codebase
    - One codebase tracked in revision control, many deploys
2. Dependencies
    - Explicitly declare and isolate dependencies
3. Config
Store config in the environment
4. Backing services
Treat backing services as attached resources
5. Build, release, run
Strictly separate build and run stages
6. Processes
Execute the app as one or more stateless processes
7. Port binding
Export services via port binding
8. Concurrency
Scale out via the process model
9. Disposability
Maximize robustness with fast startup and graceful shutdown
10. Dev/prod parity
Keep development, staging, and production as similar as possible
11. Logs
Treat logs as event streams
12. Admin processes
Run admin/management tasks as one-off processes
