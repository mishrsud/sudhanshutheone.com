Title: NUnit Assertions - IsAssignableFrom and IsInstanceOf
Lead: Tiny goodies from my experiences with NUnit
Published: 2015-02-12
Tags:

- .NET
- Unit-Testing
- TDD
- CSharp

---

---

### Introduction

A good test coverage and a great unit test framework are like a good insurance cover - they give you the peace of mind and assurance that your codebase is in good shape and guard against inadvertent regressions from seemingly innocent "one line" changes. NUnit is one of the best frameworks for the .NET world and its vast and fluent API lets you get upto speed in no time. Like most well know unit testing frameworks, the heart of an NUnit test is the Assert class. Typically you write your tests like so:

1.  **Arrange**: Prepare the SUT or System Under Test (instantiate and initialize the code to be tested)
2.  **Act**: Exercise the code - make a method call, mutate the state etc.
3.  **Assert**: Check if the resultant state is what the specification expects it to be
    This post is regarding two seemingly confusing methods available on the NUnit Assert class: IsAssignableFrom and IsInstanceOf.

Note that this post is using NUnit via the NuGet package and is based on version 2.6.4. You can get it by typing the following command;

```
Install-Package NUnit -Version "2.6.4"
```

### The Scenario

Let's consider the following code:

```
/// An Employee Class
public class Employee
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfJoining { get; set; }
}

/// Manager that derives from Employee
public class Manager : Employee
{
    public IList<Employee> EmployeesReporting { get; set; }
}
```

Now lets consider a scenario where I want to excercise a piece of code that is expected to return an object of type employee which of the two do I use: IsAssignableFrom or IsInstanceOf? Let's examine

### The Tests

So here's a test method (I'm using both MSTest and NUnit in conjunction here)

```
[TestClass]
public class EmployeeTests
{
   [TestMethod]
   public void Test_IsAssignableFrom()
   {
        /// Arrange - creating and initializing the repository omitted for brevity

        /// Act - Call a method on the repository
	var employee = _sqlRepository.GetEmployeeById(2341);

        /// Assert - Check if the object received is a type that can be assigned to a Manager
	Assert.IsAssignableFrom<Manager>(employee); // Passes because Manager is derived from Employee
   }
}
```

In essence, the Assert.IsAssignableFrom is working exactly like System.Type.IsAssignableFrom (see [MSDN](<https://msdn.microsoft.com/en-us/library/system.type.isassignablefrom(v=vs.110).aspx> "MSDN")) where it is clearly stated that the following is the criteria for "truthfulness" of the method call IsAssignableFrom(type c):

- c and the current instance represent the same type.
- c is derived either directly or indirectly from the current instance.
- The current instance is an interface that c implements.
- c is a generic type parameter, and the current instance represents one of the constraints of c.
  Now where do we use IsInstanceOf then? As the name suggests, when checking if the received object is an instance of the type passed in the generic parameter. Consider this test:

```
[TestClass]
public class EmployeeTests
{
   [TestMethod]
   public void Test_IsInstanceOf()
   {
        /// Arrange - creating and initializing the repository omitted for brevity

        /// Act - Call a method on the repository
	var manager = _sqlRepository.GetEmployeeById(2341);

        /// Assert - Check if the object received is an instance of type Employee
	Assert.IsInstanceOf<Employee>(manager); // Passes
   }
}
```

Again, this works similar to the [Type.IsInstanceOf ](<https://msdn.microsoft.com/en-us/library/system.type.isinstanceoftype(v=vs.110).aspx> "MSDN")method.

### Summary

- Use IsAssignableFrom<T> when checking whether the actual result is the base-type of T
- Use IsInstanceOf<T> when checking if the result is derived from T (directly or through an inheritance hierarchy)

Happy Coding!
