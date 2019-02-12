---
Title: Using the Specification pattern to compose readable, extensible, maintainable and testable queries
Lead: Scenario - you are working on a module that requires complex queries on data and you want the queries to be flexible enough for future changes and at the same time properly encapsulate query logic. Specification pattern is the example
Published: 2019-02-12
Tags: 
- Patterns
- Design patterns
- Enterprise patterns
- Algorithm
---

## Example scenario
I have data coming from a data source, e.g. a database or as the response from a third party HTTP API. I need to filter the data and pick parts that I'm after.

### The naive way
Hard code the queries alongside logic that operates on the data. 

Cons:
- brittle queries. Every change has a likelihood of being hard to do and test 

### The specification pattern to the rescue

1. The ISpecification interface

```csharp
public interface ISpecification<T>
{
    bool IsSatisfied(T instanceOfT);
}
```

2. The IFilter interface

```csharp
public interface IFilter<T>
{
    IEnumerable<T> Filter(IEnumerable<T> sourceData, ISpecification<T> condition);
}
```

3. Example:
```csharp

public class ActivityTypeSpecification : ISpecification<Activity>
{
    public bool IsSatisfied(Activity activity)
    {
        if (activity.Type == "SERVICE")
        {
            return true;
        }

        return false;
    }
}

public class ActivityTypeFilter : IFilter<Activity>
{
    public IEnumerable<Activity> Filter(
        IEnumerable<Activity> activities, 
        ISpecification<Activity> activityTypeSpecification)
    {
        return activities.Where(act => activityTypeSpecification.IsSatisfied(act));
    }
}
```

4. Combining Specifications
```csharp
public interface AndSpecification<T> : ISpecification<T>
{
    private ISpecification<T> _first;
    private ISpecification<T> _second;

    public AndSpecification(
        ISpecification<T> first,
        ISpecification<T> second)
    {
        _first = first;
        _second = second;
    }

    public bool IsSatisfied(T instance)
    {
        return _first.IsSatisified(instance) && _second.IsSatisfied(instance);
    }
}
```