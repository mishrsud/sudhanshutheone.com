---
Title: Entity Framework Core Lessons
Lead: Lessons learned whilst using (and misusing) Entity Framework Core.
Published: 2019-02-17
Tags:
  - CSharp
  - EntityFramework
  - dotnet core
  - ef core
  - Best Practices
---

### Getting Id of last inserted Entity

If the entity is using a SQL server identity column as ID, this ID will be populated by EF after a call to SaveChanges.

See this thread on [StackOverflow](https://stackoverflow.com/a/41146434/190476)

### Relationships

- One to Many
  TL;DR;
  use HasOne and WithOne:

```csharp
// Code in a class that inherits from DbContext

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<ParentEntity>().ToTable(nameof(ParentEntity));
    modelBuilder.Entity<ChildEntity>().ToTable(nameof(ChildEntity));

    modelBuilder
        .Entity<ParentEntity>()
        .HasKey(parent => parent.ParentId);

    modelBuilder
        .Entity<ChildEntity>(builder =>
        {
            builder.HasKey(details => details.MessageDetailId);
            builder
                .HasOne(msg => msg.ParentEntity)
                .WithMany(it => it.ChildEntity)
                .HasForeignKey(it => it.ForeignKeyId);
        });
}
```

- One to One

- Many to Many
  https://github.com/aspnet/EntityFramework.Docs/tree/master/samples/core

## When queries cannot be evaluated server side

EF Core query could not be translated and will be evaluated locally
https://stackoverflow.com/q/45237492/190476

The problem: EF Core could not generate SQL according to the LINQ expression provided.
What is the downside: More data would be brought over from database than necessary as the query expression would be evaluated in client (C#) code

- See also, the difference between First, FirstOrDefault, Single and SingleOrDefault

## Transactions

When using EF, prefer using DbContext.SaveChanges to manage transactions.

Distributed transactions:
https://docs.microsoft.com/en-us/dotnet/api/system.transactions.transactionscope?view=netframework-4.8
NOTE: there is implicit vs explicit transactions. The default is implicit (using TransactionScope)
[This answer](https://stackoverflow.com/a/22406116/190476) claims distributed transaction isn't supported in cloud scenarios
distributed transactions may not scale well either (??)
Other considerations:

- why do we need a distributed transaction?
