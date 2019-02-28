---
title: Testing a processing pipeline built using MediatR
Tags: 
- MediatR
- Patterns
- .NET Core 
- Testing
---

## What are we doing?
- we have a processing pipeline built using MediatR IPipelineBehaviour<TRequest, TRespons>
- The typical pattern:
  - Command/Query
  - dispatch using IMediator.Send(thing)
  - PiplineBehaviour 1 to n (can forward to next behaviour or short circuit and send a response)
  - Handler - generates a response

## Why MediatR?
- composability 
- avoid rebuilding the same logic for an API vs a daemon. As we do not tie ourselves to a hosting platform (e.g. if we were using ASP.NET filters, we cannot use them on a daemon )

## The testing issue
the signature of a PipelineBehaviour Handle is so:
```csharp
public async Task<TResponse> Handle(SomeContext context, CancellationToken cancellationToken, RequestHandlerDelegate<TRequest> next)
```

### Scenario
- We want to test that given some workflow, if the behaviour executes successfully, we should call the next delegate
- We mock the delegate using NSubstitute

```csharp
var stubNext = Substitute.For<RequestHandlerDelegate<TRequest>>();

// test - Arrange, Act 

// Assert next was called. We're using Shouldly as our assertion library

stubNext.Received(1).Invoke();
```