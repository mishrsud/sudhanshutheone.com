---
title: Azure Service bus with dotnet core
---

## Working with Azure Service bus using dotnet core
Pricing information: https://azure.microsoft.com/en-au/pricing/details/service-bus/
MS Docs: [Overview](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview)

Endpoint=sb://redpillaae.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=nQkHZVxQxFWJSfPmuoseHupdc/+PeVd9TVhGEqfYdEA=

Endpoint=sb://redpillaae.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=nQkHZVxQxFWJSfPmuoseHupdc/+PeVd9TVhGEqfYdEA=

Endpoint=sb://redpillaae.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=eBJtO8SPV2ZmwznVV4rSfDQA6GHsSygIAdto8Td7Hyg=

**NOTE**
Basic Tier cannot create topics!!! https://stackoverflow.com/a/52578784/190476

## Create and start subscriber
1. Add package: Microsoft.Azure.ServiceBus (v3.1.0 as of today)
2. Provide a connection string

**NOTE**: 
- TransportType = AmqpWebSockets is required when behind a proxy
- EntityPath is required, set it to the name of the Topic when using topics
- There needs to be an active subscription for the listener to start receiving messages
```json
"Endpoint=sb://mybus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XlUvL6vLbA+hZ7MGdNbNFnO17Kadsfgljaglj352/gI=;TransportType=AmqpWebSockets;EntityPath=whatever"
```
3. Alternatively, compose a connection string using ServiceBusConnectionStringBuilder
4. Use the ITopicClient to connect to a topic
```csharp
ITopicClient topicClient = new TopicClient(ServiceBusConnectionString, TopicName);
// If behind proxy:
topicClient.ServiceBusConnection.TransportType = TransportType.AmqpWebSockets; 
```

### Creating a Receiver daemon process
1. Use **Microsoft.Azure.ServiceBus.SubscriptionClient**
```csharp
using Microsoft.Azure.ServiceBus;

var connectionStringBuilder = new ServiceBusConnectionStringBuilder(connString);
var subscriptionName = "my-subscription";
var subscriber = new SubscriptionClient(connectionStringBuilder, subscriptionName)
```
2. Register a message handler
```csharp
// MyClassThatHandlesMessage is a type that has a Handle method
// with the signature: public Task Handle(Message message, CancellationToken cancellationToken)
var handler = new MyClassThatHandlesMessage();

subscriber.RegisterMessageHandler(async (message, cancellationToken) => {
    await handler.Handler(message, cancellationToken);
});
```

### Stuff to think about
1. When to trigger retry?
- The design needs to take due care when catching and throwing exceptions. 

2. What happens to DeadLetter queues?
Their is automatic retries for the number of retries configured, but what happens when a message fails even after retry?
- If a subscriber was building eventual state based on message received, the internal state would not be accurate if messages are unprocessed (lying in the deadletter queue for instance)

3. Configure number of retries, pre-fetch, lock duration and type
