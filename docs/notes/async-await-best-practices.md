---
title: async await best practices
description: Understand how to use async and await for efficient code and avoid surprises.
date: 2017-04-20
tags:
  - CSharp
  - Asynchronous programming
  - Best Practices
---

### Task

An abstraction over the state and outcome of an async operation. This operation may be executed now, later or never (cancelled before it starts).
State:

- not started
- running
- completed

Outcome:

- faulted
- successful - potentially return a result (`Task<TResult>`)

### async

IO Bound: an IO operation utilising the IO Completion ports
CPU bound: an operation that requires an active thread.

### Concurrent vs Parallel

Concurrent: A scheduler switching between operations
Parallel: To operations in progress at the same time. Usually the outcome is to do work faster.

### Continuation

A function that is executed after the previous async operation has completed

## Starting Task(s)

For CPU bound work

```csharp
Task.Run(() => CpuBoundWork);
```

For I/O bound work

```csharp
Task.Factory.StartNew
```

## Awaiting Task(s)

- This is sequential:

```csharp
async Task SomeMethod()
{
    await Operation();
    DoSomethingElse(); // a continuation that executes after Operation
}
```

- To wait for multiple Tasks in progress:

```csharp
// This would take as long as the longest task
await Task.WhenAll(task1, task2, task3);

// This would take as long as the quickest task
await Task.WhenAny(task1, task2, task3);

```

## Marking a method async vs returning a Task

- If there is only one async operation, favour returning a Task to avoid generating an unnecessary state machine
- When there are multiple async operations, it is usually preferable to mark the method as async.

## References

- Danial Marbach's [Webinar](https://particular.net/webinars/async-await-best-practices#asynchronous-programming-definition)
