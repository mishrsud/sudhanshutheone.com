Title: Double Check Locking in C# - End of life?
Lead: After having a discussion with a colleague, I was researching for the correct way to implement double-check locking in C# and .NET 4.5. Turns out a lot of water has flown under the bridge and things have changed quite a bit. I'll try to document my findings here.
Published: 2015-02-13
Tags:

- .NET
- CSharp
- Multi-Threading

---

### The Scenario

In my codebase, I have a [critical section](http://en.wikipedia.org/wiki/Critical_section "Wikepedia: Critical Section defined") that needs to thread synchronization and I want to avoid unnecessary locking. One of the most common examples that come to mind is that of a Singleton - a class that would have only one instance in the app domain at any time. While creating the singleton instance, one needs synchronization so that one and only one instance is created. Codebases I worked with commonly used [double-check locking pattern](https://www.google.co.in/search?q=double-check+locking+pattern&oq=double-check+locking+pattern&aqs=chrome..69i57&sourceid=chrome&es_sm=122&ie=UTF-8&safe=active&ssui=on "Google: Double-check locking") for the code that created the instance. Consider the following sample:

```
// <strong>NOTE: THIS SAMPLE MUST NOT BE USED, SEE THE DISCUSSION THAT FOLLOWS</strong>
public sealed class Singleton
{
    private static Singleton instance = null;
    private static readonly object padlock = new object();

    Singleton()
    {
    }

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new Singleton();
                    }
                }
            }
            return instance;
        }
    }
}
```

There's an excellent and authoritative explanation by Jon Skeet **[HERE](http://csharpindepth.com/articles/general/singleton.aspx)**, I wouldn't repeat all of it, but I would try and add my 2 cents here.

### Why Not Use Double-Check Locking?

First: The primary motivation for using double check lock used to be to ensure that we lock only if the instance hadn't already been created. This depends on the read operation i.e. the if statement that reads the "instance" and compares it to null and the write operation to be exactly in the same order.

Now, on to Why this is unreliable and easy to get wrong:

1.  It is eventually the compiler memory model that's responsible for honoring the intent of the code above and not every .NET compiler and runtime may work in the same way. E.g. The ECMA CLI specification does not guarantee this
2.  For better safety, the **instance **variable must be made **[volatile](https://msdn.microsoft.com/en-us/library/x13ttww7.aspx)**
3.  The trade-off between thread safety and performance isn't great here even with a correct implementation using volatile and there are better ways to do this in C# today.

### Should I use this pattern or not?

Quick answer: It's not worth the effort. As Jon Skeet comments [here](http://stackoverflow.com/a/394932/190476), it is better to use a lock always unless one is absolutely sure that there is a performance bottleneck due to locking. As he says,

> "When it comes to threading, a simple and obviously correct pattern is worth a lot"
> In a nutshell, if the requirement of double-check locking arises in case of implementing a Singleton, the best way is to use the [System.Lazy<T>](https://msdn.microsoft.com/en-us/library/dd642331%28v=vs.110%29.aspx) like so:

```
public sealed class Singleton
{
    /// Use a lambda that would be evaluated on the first call to the Instance getter
    private static readonly Lazy<Singleton> lazy = new Lazy<Singleton>(() => new Singleton());
    /// The lazily-loaded instance
    public static Singleton Instance { get { return lazy.Value; } }

    /// Prevent instance creation outside of the class
    private Singleton()
    {
    }
}
```

So, until next time,

Happy Coding!
