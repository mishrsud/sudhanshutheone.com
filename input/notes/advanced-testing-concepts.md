---
title: Thoughts and opinions about unit tests 
lead: I've gathered my thoughts, experiences and opinions about unit testing in this blog.
Tags: 
- .NET 
- Testing
- TDD
- patterns
- concepts
---

## What constitutes a good unit test?
The attributes of a good unit test are generally described as:
1. Isolated: A test must be completely isolated in terms of setup, execution and outcome (the arrange, act and assert steps). In other words, running a test individually or as part of a suite should not change the outcome
2. Repeatable: One should be able to run a unit test as many times as necessary with consistent results that do not change with unrelated reasons.
3. Quick: Unit tests ought to provide quick feedback. Hence, they must be fast to run.


## How many "Assert" statements are allowed in a unit test?
1. Test one logical concept per test. If you need to test multiple aspects of the concept, that is perfectly fine.
2. Think about readability of the test code as well as readability of test output 
- [**HERE**](https://softwareengineering.stackexchange.com/questions/7823/is-it-ok-to-have-multiple-asserts-in-a-single-unit-test) is a great discussion on the number of asserts per unit test

## Test Smells 
- Talks about test smells and key indicators of a poorly structured test
https://www.industriallogic.com/blog/multiple-asserts-are-ok/
- Part of TDD is "listening to the code": paying attention when things are difficult, whether it's the tests or the code being developed.

## The Test pyramid
[Martin Fowler](https://martinfowler.com/bliki/TestPyramid.html) describes the test pyramid

## My favourite test frameworks and tools on the .NET Stack
[As of March 2019]
- Test framework: **[xUnit](https://xunit.github.io/)**
- Assertion framework: **[Shouldly](https://github.com/shouldly/shouldly)**
- Mocking: **[NSubstitute](https://nsubstitute.github.io/)** 

## Alternate Test Frameworks

- [**Machine/Machine specifications**](https://github.com/machine/machine.specifications) - convention based, RSpec / mocha like test framework for .NET

- Test with external HTTP services mocked: [**MockHttp**](https://github.com/richardszalay/mockhttp)