Title: First Chance exceptions - What are the chances?
Lead: Ever noticed your Visual Studio output windows show pesky First Chance exception messages? Read on to find out what they are.
Published: 2015-02-03
Tags:

- .NET
- CSharp
- Exception-Handling

---

---

### You're here, by chance!

I'm sure every developer who's building commercial apps cares to look in the output window when debugging projects. It is hard to miss a lot of these messages that show up from time to time:

`A first chance exception of type 'System.ApplicationException' occurred in myapp.exe`

What then are these "First Chance" exceptions and should we care? Let's look in a bit more detail and make an informed decision.

### What is a "First Chance Exception"

When code is running under a debugger, for instance, the visual studio debugger, there is a mechanism in place when exceptions are encountered:

1.  The debugger is notified that an exception occurred
2.  The application execution is suspended and the debugger decides what to do about this situation
    The first iteration through this mechanism is what is termed as a "First Chance" exception. Now depending on the configuration, the debugger will either resume the application or (e.g. break on all exceptions) enter debug mode. If the exception is unhandled, the debugger is re-notified - resulting in a second chance exception. This would result in the debugger suspending the execution and deciding what to do. The most common action by the debugger is typically enter debug mode on a second chance exception.

### The variances in behavior

1.  If the setting "Enable Just my Code" under Tools -> Options -> Debugging is checked, the debugger ignores first-chance CLR exceptions thrown out of user code if they **do not** pass through user code. However, if an exception is completely unhandled, it will result in a break in execution
2.  If the "Enable Just my Code" is cleared (unchecked), the debugger would break even on CLR exceptions but the highlighted line may not always be where the exception occurred as mentioned on [MSDN](https://msdn.microsoft.com/en-us/library/d14azbfh.aspx)

### Summary

Generally, there's nothing to worry if you see the message at the start of this post. If your code handles the expected exceptions, the appropriate catch block would execute and the application execution would continue.

### PostScript:

If you see messages about first chance exception in your immediate window, look for the setting "Redirect all Output Window text to the Immediate Window" under Tools -> Options -> Debugging and clear the checkbox!

Happy Coding!
