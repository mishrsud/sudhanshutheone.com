---
Title: Event driven applications on AWS with C# and .NET Core
Lead: Building loosely coupled applications using C# and .NET Core on AWS
Published: 2019-07-09
Tags: 
- C#
- dotnet core
- AWS
- Messaging
---

## Resources
- [SQS long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-long-polling.html)

- As per [SQS FAQs](https://aws.amazon.com/sqs/faqs/), (see When should I use Amazon SQS long polling, and when should I use Amazon SQS short polling), for background workers, long polling is the preferred option that provides reduced cost as well as faster response times.
In a lambda that runs on a schedule, short polling may make more sense
If the lambda is triggered by an event: ?


## Examples
[Serverless app repo](https://aws.amazon.com/serverless/serverlessrepo/)