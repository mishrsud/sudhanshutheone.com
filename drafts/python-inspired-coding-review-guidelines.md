---
Title: A set of coding and code review guidelines inspired by "The Zen of Python"
Lead: I recently started learning Python, and came across what the Python community calls "The Zen of Python". Somehow, I felt that it can form the basis of what could be simple to follow coding and code review guidelines. This post is my attempt to extract a set of guidelines out of "The Zen"
Published: 2018-01-06
Tags: 
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

| The intent of the code should be as explicit as possible. If the reader has to guess what the code does, or there is an implicit side-effect, it is generally a bad thing |
| --------------------------------------------------------- |
|                                                       |

As a good citizen of the digital world, it is paramount to keep these principles in mind whether writing code or reviewing code.

### 2. Flat is better than nested
Remember looking at code that has a bunch of nested loops? How about nested loops mutating some shared state as well? How much fun is it to read through such code, especially under the time pressure of a critical production bug? I believe I can safely assume that the answer to those questions would be an emphatic "It Sucks!".  
My primary programming language is C# followed by JavaScript/ECMAScript but I've seen a fair bit code written in other programming languages such as C++, VB, Ruby etc. I believe I can safely say that all modern programming languages offer coding patterns to avoid deeply nested code. In C# land, a combination of LINQ, Lambdas and well-named methods can help structure code orders of magnitude better than any nested code block.

### Errors should never pass silently - Unless explicitly silenced
the ops person who has to monitor and understand an error message in the middle of the night

### In the face of ambiguity, refuse the temptation to guess


### Now is better than never. Although never is often better than *right* now.
Pragmatism, refactoring: when to refactor and how  much to refactor - refactor the world vs. just enough cleanup.

### If the implementation is hard to explain, it's a bad idea.If the implementation is easy to explain, it may be a good idea.
Guard against accidental complexity - just because you have an urge to use a pattern, or tool, use it at the first opportunity - whether the situation is suitable or not
