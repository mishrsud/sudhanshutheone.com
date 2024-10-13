---
title: Collection Types in C#, when to use what
---

### Collect Cool Stuff
ICollection
IList
IEnumerable
ISet

Concrete Types:
Collection
List
HashSet
SortedSet

SO: Why HashSet over a List https://stackoverflow.com/a/10735440/190476

NOTE: C# HashSet mathematical equality needs to be checked using SetEquals

SO: Mathematical quality by default
```
public sealed class MathSet<T> : HashSet<T>, IEquatable<MathSet<T>>
{
    public override int GetHashCode() => this.Select(elt => elt.GetHashCode()).Sum().GetHashCode();

    public bool Equals(MathSet<T> obj) => SetEquals(obj);

    public override bool Equals(object obj) => Equals(obj as MathSet<T>);

    public static bool operator ==(MathSet<T> a, MathSet<T> b) =>
        ReferenceEquals(a, null) ? ReferenceEquals(b, null) : a.Equals(b);

    public static bool operator !=(MathSet<T> a, MathSet<T> b) => !(a == b);
}
```
