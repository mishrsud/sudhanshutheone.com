---
title: A set of coding and code review guidelines inspired by "The Zen of Python"
description: I recently started learning Python, and came across what the Python community calls "The Zen of Python". Somehow, I felt that it can form the basis of what could be simple to follow coding and code review guidelines. This post is my attempt to extract a set of guidelines out of "The Zen"
date: 2018-01-06
tags: 
- Coding-guidelines
- code-review
- python
---

## Prologue
Just out of curiosity, and an urge to learn another general-purpose programming language, I started learning Python recently. I started looking for tutorials on Pluralsight and came across this [wonderful course](https://app.pluralsight.com/library/courses/python-fundamentals/table-of-contents) on the fundamentals of Python. One of the many awesome thoughts the authors share is what the Python community knows as [The Zen of Python](http://www.thezenofpython.com/) by Tim Peters. Some time back, at work, we were having a discussion around code review guidelines and somehow, I correlated that discussion with the Zen of Python. What follows in this post is my attempt to interpret the aphorisms in the text of the Zen as guidelines to follow when coding or when reviewing code.

**Note:** There are 19 written aphorisms in the text of "The Zen of Python", I've taken the liberty to combine, pick and choose the ones that appealed the most to me. They don't appear in this post in the same order as the original text either.

## The Guidelines: Inspired by "The Zen"

### 1. Explicit is better than implicit + Readability Counts
A lot of times, one comes across code that is doing something not so obvious, at least not until one spends some time with the code running in a production or production like environment. Let me quote [Martin Fowler](https://en.wikiquote.org/wiki/Martin_Fowler) here to make my point:
> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

If you've spent enough time in the profession, you'd agree that as a programmer, you spend more time reading other people's code than writing your own. This fact together with the intent of the quote from Martin Fowler brings me to the first guideline:

> The intent of the code should be as explicit as possible. If the reader has to guess what the code does, or there is an implicit side-effect, it is generally a bad thing 

As a good citizen of the digital world, it is paramount to keep these principles in mind whether writing code or reviewing code.

### 2. Flat is better than nested
Remember looking at code that has a bunch of nested loops? How about nested loops mutating some shared state as well? How much fun is it to read through such code, especially under the time pressure of a critical production bug? I believe I can safely assume that the answer to those questions would be an emphatic "It Sucks!".  
My primary programming language is C# followed by JavaScript/ECMAScript but I've seen a fair bit code written in other programming languages such as C++, VB, Ruby etc. I believe I can safely say that all modern programming languages offer coding patterns to avoid deeply nested code. In C# land, a combination of LINQ, Lambdas and well-named methods can help structure code orders of magnitude better than any nested code block.
Most modern IDEs and coding platforms have static code analysis to spot common code issues such as deep nesting and the consequent high cyclomatic complexity. Tools such as [Sonarqube](https://www.sonarqube.org) can be integrated into a continuous integration pipeline to ensure code does not suffer from such issues.
> Be aware of the cyclomatic complexity of your code. As a rule of thumb, anything over 15 is a sign that now is the time to refactor.

### 3. Errors should never pass silently - Unless explicitly silenced
Imagine being on call during a production incident when you are frantically searching logs for a clue that would help make sense of why all hell has broken loose. Maybe empathise with the ops person who has to monitor and understand an error message in the middle of the night. Neither of the personas would be very glad to know a "smart" developer decided to "swallow" an exception. Software systems should aim to be "observable" i.e. expose probes and be instrumented to allow a maintainer to know the state and health of the system. 
Cindy Sridharan articulates this much better than I can at the moment, so here's a quote from [her post](https://medium.com/@copyconstruct/monitoring-and-observability-8417d1952e1c)

>“Observability” aims to provide highly granular insights into the behavior of systems along with rich context, perfect for debugging purposes. Since it’s still not possible to predict every single failure mode a system could potentially run into or predict every possible way in which a system could misbehave, it becomes important that we build systems that can be debugged armed with evidence and not conjecture.

### 4. In the face of ambiguity, refuse the temptation to guess
To me, this guideline talks about the distance between business requirements and the eventual implementation in software. As Alberto Brandolini (the inventor of Event Storming) says: 
> It's not your business knowledge that gets turned into software, it's the developer's ignorance.
One of the ways to address this is to follow what is commonly referred to as "Behaviour Driven Development" aka BDD. 

My fellow Readifarian Mehdi Khalili has a great framework [BDDify](http://bddfy.teststack.net) to assist with writing tests that produce reports that can be verified to ensure that the implementation meets the requirements.

### 5. Now is better than never. Although never is often better than *right* now.
You may have heard of the "Boy Scout rule". In the context of programming, it may be interpreted as "leave the codebase in a better shape than how it was". It is generally better to refactor towards more maintainable and readable code while one has the context, rather than negotiating with stakeholders for a "Tech Debt Sprint". One has to be wary of an urge to refactor the world though. In the spirit of agile, we ought to prefer incremental refactoring over big bang refactors. I understand your good intentions, but then, the road to hell is paved with... good intentions!
> Follow the boy scout rule - generally, but think like a wise man to reign in the boy.

### 6. If the implementation is hard to explain, it's a bad idea.If the implementation is easy to explain, it may be a good idea.
Ever looked at a code base and gone - what in the name of Charles Babbage is going on here!!? We've all been there, haven't we?
Sometimes, we have an urge to start using patterns too early - ironically an anti-pattern itself. Steve Smith has a [great metaphor](http://www.weeklydevtips.com/028) he calls "Pain Driven Development" to guard against accidental and unnecessary complexity. I highly recommend listening to this podcast where Steve proposes a way to identify when a pattern must be introduced by being aware of the pain being caused and then refactoring to alleviate that pain.
> Patterns exist to solve common, recurring problems. You must identify and ensure that you have a problem to be solved before introducing the pattern.

## Conclusion
That's my attempt at articulating guidelines when coding and when reviewing code. Hope that helps.

Happy Engineering!
