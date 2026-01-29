---
title: Avoiding an Identity Crisis (in your apps)
description: In your code, an entity requires a unique ID - A Customer ID, Order ID, Message ID. SQL Identity columns do not cut it for you and the default GUID class isn't suitable either. There's hope though!
date: 2016-04-21
tags:

- CSharp
- .NET
- Messaging
- MassTransit
- Open Source
---

### Summary

This post introduces the [NewId ](https://github.com/phatboyg/NewId)library created by the awesome guys behind [MassTransit ](https://github.com/phatboyg/MassTransit)service bus. The content may look similar to the readme of the NewId lib - because that was contributed by yours truly :-)

### What is this about?

Right, so why are we here again? Good question! Here's why: say in your code, an entity requires a unique ID - A Customer ID, Order ID, Message ID ... you get the point, I believe. A number of applications use unique identifiers to identify a data record. A common way for apps that use a relational database (RDBMS) is to delegate the generation of these IDs to the database - by means of a Identity column (MS-SQL) or similar. This approach is fine for a small app, but quickly becomes a bottleneck at web-scale. See this post from the blokes at twitter: [https://blog.twitter.com/2010/announcing-snowflake](https://blog.twitter.com/2010/announcing-snowflake). An apps based on microservices architecture may require sequential unique IDs for messages.

### The Options (trivial ones)

A trivial approach is to use GUIDs/UUIDs generated in applications. While that works, in most frameworks GUIDs are not sequential. This takes away the ability to sort records based on their unique ids.

### The Solution

The Erlang library flake ([https://github.com/boundary/flake](https://github.com/boundary/flake)) adopted an approach of generating 128-bit, k-ordered ids (read time-ordered lexically) using the machines MAC, timestamp and a per thread sequence number. These IDs are sequential and wouldn't collide in a cluster of nodes running applicaitons that use these as UUIDs.

The NewId library can be used as an embedded unique ID generator that produces 128 bit (16 bytes) sequential IDs. It is inspired from snowflake and flake. Read on to learn more.

### Getting the Library

The easiest (and recommended) way to get it is NuGet:

```
Install-Package NewId
```

### Sample Code

```csharp
NewId id = NewId.Next(); //produces an id like {11790000-cf25-b808-dc58-08d367322210}

// Supports operations similar to GUID
NewId id = NewId.Next().ToString("D").ToUpperInvariant(); // Produces 11790000-CF25-B808-2365-08D36732603A

// Start from an id
NewId id = new NewId("11790000-cf25-b808-dc58-08d367322210");

// Start with a byte-array
var bytes = new byte[] { 16, 23, 54, 74, 21, 14, 75, 32, 44, 41, 31, 10, 11, 12, 86, 42 };
NewId theId = new NewId(bytes);
```

### Caveat Emptor aka Do not use if

(Adapted from the flake readme) The generated ids are predictable by design. They should not be used in scenarios where unpredictability is a desired feature. These IDs should **NOT** be used for:

- Generating passwords
- Security tokens
- Anything else you wouldn't want someone to be able to guess.
  NewId generated ids expose the identity of the machine which generated the id (by way of its MAC address) and the time at which it did so. This could be a problem for security-sensitive applications.

**Don't** do modulo 2 arithmetic on flake ids with the expectation of random distribution.

Happy Coding!

SM
