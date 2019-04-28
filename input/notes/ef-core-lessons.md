---
Title: Entity Framework Core Lessons
Lead: Lessons learned whilst using (and misusing) Entity Framework Core.
Published: 2019-02-17
Tags: 
- C#
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
