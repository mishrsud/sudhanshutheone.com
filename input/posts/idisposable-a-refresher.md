
Title: IDisposable Pattern - A refresher on the need and correct implementation
Lead: One may wonder why another post on IDisposable? After all, how difficult could an implementation of an interface that has only one void parameter-less method be? Well, read on to find out. 
Published: 2015-03-05
Tags: 
- .NET
- Best-Practices
- C#
- BCL
- CLR
---

---
### So, why are we talking about this again?

This post is a result of my interactions with developers during interviews and surprisingly, there seems to be considerable confusion with regards to garbage collection and IDisposable's purpose of existence. I would try to cite some authoritative resources and attempt to clear the matter in a comprehensible manner.

### Garbage Collection and Managed Memory (Crash Course!)

The topic of Garbage Collection and managed memory is intensive and I would not try to repeat what is already well covered in depth on MSDN and in reference books such as Jeffery Richter's [CLR Via C#](http://www.amazon.in/CLR-via-Microsoft-Developer-Reference/dp/0735667454 "Amazon"), but for the sake of completeness, let me highlight the important facts about GC in .NET

-  Garbage Collector (hereafter referred to as GC) in the CLR is designed to free the programmer from the concerns of allocation and de-allocation of memory and as such unless you declare unsafe blocks in your code, it is impossible to cause a memory corruption in the .NET world (i.e. use a reference to a memory block that has been freed)
-  The CLR's **GC works in phases**:

    -  Executing Threads are paused
    -  GC starts with a "**Mark**" phase wherein it walks the thread stack and marks all objects that are referred (remember that in a collection type containing reference type elements, the elements that are referred to will be marked)
    -  This is followed by a "**Sweep**" or compacting phase wherein the marked objects are compacted on top of unmarked objects in the heap to have contiguous allocation - thus avoiding fragmentation in the heap.
    -  Next, the allocation pointer is updated to point to the next available memory address where new objects may be allocated. The references to the objects that were moved due to compaction are updated to their new location in the heap.
    -  Paused Threads are resumed

-  The **GC is generational** - it keeps objects in generations based on their age to optimize collection

    -  GEN 0: is where newly created objects are allocated (unless they are large enough to be allocated on the LOH or large object heap). This is also the generation that is collected most often as the GC assumes that the newer an object, the shorter its lifetime
    -  GEN 1: is sort of a staging area for objects that were referred (marked) during the collection of GEN 0. These objects have effectively survived one collection and would be looked at again if collection of GEN 0 does not free up enough memory for the next allocation
    -  GEN 2: consists of objects that have survived 2 collection cycles (or not looked at yet due to their large size and hence allocation on the LOH) and would only be looked at during a full collection - when all generations are checked and collected

-  The occurrence of a garbage collection is **not deterministic** - it happens when there is memory pressure - i.e. when a new object needs to be allocated and there isn't enough contiguous memory block to allocate it.

### Enter IDisposable

That the entire world is not managed would be an understatement! There will be situations when managed code needs to interact with the unmanaged world - database connections, COM objects, sockets, OS native Handles - file handles, wait handles and the like. In such scenarios, it makes a lot of sense to have a deterministic way of cleaning up the unmanaged resources - this is where IDisposable steps in. In a nutshell then:

1.  A type must implement IDisposable whenever it wraps unmanaged resources. Common scenarios are database connections, Wait handles, Mutexes, semaphores etc.
2.  IDisposable should also be implemented if your type is interacting with other IDisposable types in the code unless your class manages the lifetime of the IDisposable resource completely in itself. E.g. if your class creates a file handle via the FileStream class and returns the reference from a public method, then your class should also implement IDisposable and call the FileStream's Dispose method from your Dispose method.
Unless your class falls in one of the two categories above DO NOT IMPLEMENT IDisposable. The GC is smart enough to do the best thing required for your program!

### Basic Implementation of IDisposable

Let's say we have a class that wraps a native resource that must be cleaned up, then the following is how a typical implementation would look like:

```
/// <summary>
/// Typical implementation of IDisposable
/// </summary>
public class DisposableType : IDisposable
{
        /// track the disposed state to avoid unnecessary work
        private bool _disposed;

	/// <summary>
	/// A protected method to allow derived types to override and allow customization
        /// can be made private in addition to marking the class sealed
	/// </summary>
	protected virtual void Dispose(bool disposing)
	{
             // if already disposed, we're done here
             if (_disposed) return;

    	     if (disposing)
	     {
		// Release managed resources as well
	     }

	     // Release unmanaged resources always

             // Mark that we are disposed now
             _disposed = true;
	}

	/// <summary>
	/// IDisposable.Dispose method
	/// </summary>
	public void Dispose()
	{
	     Dispose(true);
	     // Suppress the Finalization on this object
	     GC.SuppressFinalize(this);
	}
}
```

Let's touch upon the intent of the code snippet above:

-  The IDisposable.Dispose() method has just two lines and this is almost always how the code inside Dispose should be

    -  The Dispose(true) call calls the protected method and indicates that both managed and unmanaged resources must be cleaned up
    -  GC.SuppressFinalize call tells the Finalizer that we are taking care of the cleanup and it should not bother running on our object

### Variation: A class derived from an IDisposable class

There are situations when you have a derived class that inherits from another IDisposable type and also has cleanup of its own to do. This is how the code would like then:

```
public class Derived : DisposableType, IDisposable
{
 	private bool _disposed;

	///
	/// Cleanup resources held by Derived as well as call base class' dispose
	///
	protected override void Dispose(bool disposing)
	{
		if (_disposed) return;

		if (disposing)
		{
			// Release managed resources as well
		}

		// Release unmanaged resources always

		_disposed = true;
		// Call base
		base.Dispose(true);
	}

	/// <summary>
	/// IDisposable.Dispose method
	/// </summary>
	public void Dispose()
	{
		Dispose(true);
		GC.SuppressFinalize(this);
	}
}
```

###  Variation: A class that has a Finalizer

.NET has the concept of object finalization to allow scope for the object to do some specific cleanup just before it's memory is reclaimed. It may sound benevolent on part of the designers of the .NET system, but Finalization is complex and should be avoided unless absolutely critical. The [System.Object ](https://msdn.microsoft.com/en-us/library/system.object(v=vs.110).aspx "MSDN")class has a protected Finalize method that is available to all .NET types as all of them inherit from object. If a type requires Finalization, it should create a Destructor - declared by using a construct that looks like a parameterless constructor without any access modifiers and with a tilde in front. So if I have a class called Finalizable, its Finalizer would look like so:

```
public class Finalizable
{
   // only relevant code shown

   ///
   /// Finalizer
   ///
   ~Finalizable()
   {

   }
}
```

Some quick observations on Finalization:

-  As is obvious from the snippet above, in C#, the **finalizer** of a class **cannot be called from outside** it
-  When the GC looks at an object with a Finalizer, it places the object on a separate queue that is processed by a separate Finalizer thread. Only when the Finalizer thread has had a chance to look at the object in this queue and it remains unmarked (i.e. there are no references to this object) can the GC reclaim its memory.
-  The above fact means that objects with Finalizers would survive longer and thus may hold on to memory longer than they intend to! For details regarding all the costs involved in Finalization, see reference number 3. in references at the end of this post
To quote from [Stephen Cleary ](http://blog.stephencleary.com/2009/08/third-rule-of-implementing-idisposable.html "Stephen")on when a class should implement a Finalizer:
> For a class owning a single unmanaged resource, implement IDisposable and a finalizer
This is how the type with a Finalizer should implement IDisposable:

```
public sealed class NativeResourceWrapper : IDisposable
{
    private bool _disposed;

    public IntPtr Handle { get; set; }
    public bool IsInvalid
    {
        get { return (this.Handle == IntPtr.Zero); }
    }

    private void CloseHandle()
    {
        if (this.IsInvalid) return;
        // Close handles, perform cleanup here

        this.Handle = IntPtr.Zero;
        _disposed = true;
    }

    public void Dispose()
    {
        this.CloseHandle();
        GC.SuppressFinalize(this);
    }

    ~NativeResourceWrapper()
    {
        this.CloseHandle();
    }
}
```

NOTE 1: The correct way to wrap a native resource is to derive your type from the abstract [**SafeHandle**](https://msdn.microsoft.com/en-us/library/system.runtime.interopservices.safehandle%28v=vs.100%29.aspx) class.

### Summary

When designing types, pay careful attention to when you really need to implement IDisposable. When you do, adhere to the recommendations presented and you'll be fine :-)

### References

1.  **Stephen Cleary** on [IDisposable and Finalizers](http://blog.stephencleary.com/2009/08/first-rule-of-implementing-idisposable.html "Stephen") [Recommended: Read all related posts!]
2.  **Scott Dorman** on [CodeProject](http://www.codeproject.com/Articles/15360/Implementing-IDisposable-and-the-Dispose-Pattern-P "Code Project")
3.  **Must Read**: Thorough coverage on [Finalization and its costs](http://blogs.msdn.com/b/cbrumme/archive/2004/02/20/77460.aspx "Cbrumme") [Note:this is dated, but even then, gives great insight]
4.  **Stephen Cleary** on "[Should I set variables to null to assist GC](http://blog.stephencleary.com/2010/02/q-should-i-set-variables-to-null-to.html "Stephen")"
Until next time,

Happy Coding!