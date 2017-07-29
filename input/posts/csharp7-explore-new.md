Title: C# 7 Says Hello World!
Lead: My favourite features from the newly minted 7th edition of my favourite programming language C#! 
Published: 2016-10-10
Tags:
  - .NET 
  - C# 7
---

---

C# 7 is (nearly) here and there are a lot of features to rave about. Now, as with anything that's popular, there will be harpers crying hoarse about what they did not get, there's more to love than hate about C# 7.

For a comprehensive list of features and introduction on what they mean, as well as good use-cases for using them in your codebase, I highly recommend this post by [Mads Torgersen](https://twitter.com/MadsTorgersen): [What's new in C# 7](https://blogs.msdn.microsoft.com/dotnet/2016/08/24/whats-new-in-csharp-7-0/). (for those who don't know who he is, Mads is the Program Manager on the C# language team)

Mads also presented at the Copenhagen .NET user group last week and you can watch his presentation on MSDN Channel 9 here: [C# 7 and Beyond](https://channel9.msdn.com/Shows/Dev-Channel/Csharp70-and-beyond)

Some interesting mentions from the channel 9 video were:
- Xamarin Test cloud [here](https://www.xamarin.com/test-cloud) - test Xamarin apps on actual physical devices as part of CI/CD
- Unity (cross platform gaming platform) Based on Mono
- .NET Core (Cross platform runtime) and .NET Standard (Cross platform .NET API)
- [OmniSharp](http://www.omnisharp.net/) Expose intellisense and C# language features as a service so that any Code Editor can
augment itself with C# aware code-editing
- Mono will continue to live, .NET core provides an alternative, optimised runtime for
the server side. Mono still provides the runtime and compiler for platforms where .NET core isn't yet available. (Mono is under .NET Foundation: https://github.com/mono/mono)
- Xamarin is moving towards Roslyn as their compiler platform

Of the new features, my favourite one's (in no particular order) are as follows:

## Out variables

If you were not amused by the lack of fluidity in the following (current) syntax of having to declare a variable prior to using it in a TryParse statement, well you would be able to leverage the new syntax to have the compiler infer the type and declare the out variable inline:

```
// UPTO C# 6
int i;
if (int.TryParse("someStringThatmayBeInt", out i))
{
// Do something interesting
}

// Starting C# 7
if (int.TryParse("someStringThatmayBeInt", out int i))
{
// Do something interesting
}

```

## Pattern Matching

This is probably one of the nicest additions. Pattern matching augments the functional capabilities of C# in that it provides a more concise, declarative syntax to express the intent of the code. Sample this:

```
public void SomeMethod(SomeClass someClass)
{
     if (someClass is null) { // throw exception or do what you will!}
}

// The following is from Mad's blog
// Switch now switches on anything that is known to the compiler at that point
// And works with type patterns
switch(shape)
{
    case Circle c:
        WriteLine($"circle with radius {c.Radius}"); // using static System.Console
        break;
    case Rectangle s when (s.Length == s.Height):
        WriteLine($"{s.Length} x {s.Height} square");
        break;
    case Rectangle r:
        WriteLine($"{r.Length} x {r.Height} rectangle");
        break;
    default:
        WriteLine("<unknown shape>");
        break;
    case null:
        throw new ArgumentNullException(nameof(shape));
}
```

Happy Coding!