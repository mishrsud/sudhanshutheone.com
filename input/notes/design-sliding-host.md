---
Title: Designing a .NET Core Host that lives only as long as required
Lead: Designing a .NET Core Host that lives only as long as required.
Published: 2019-04-26
Tags: 
- C#
- dotnet core
- Best Practices
---

## The scenario
A message consumer hosted in a container
Woken up by a lambda/function

### Constraint
- The process should stay alive during busy periods 
- this "keep alive" should be sliding. i.e. if no messages arrive in "n" seconds/minutes, the process should end

### Design
A timed hosted service that keeps track of last "keep-alive" check
If (current time - last check) > Threshold 
   Send shutdown signal
Else
   keep going