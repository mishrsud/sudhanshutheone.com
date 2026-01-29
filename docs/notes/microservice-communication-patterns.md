---
title: Inter-process Communication in Microservices
---

## Summary
In a microservices based architecture, there are many decisions to be made. One of the most basic and far-reaching decision is the choice of communication protocols used by microservices to integrate with each other.

>The choice of interaction style impacts the availability of the application composed from microservices

### Choices

### Integration methods
- Synchronous: HTTP+REST, gRPC
- Asynchronous: Messaging - AMQP, STOMP etc.

### Wire protocols
- JSON
- XML
- Binary: Avro, Protocol Buffers

### Client-service interaction styles
- one-to-one: Each client request is processed by exactly one microservice
- one-to-many: Several microservices participate to service a client request

### Key Design Considerations
- Log ingestion from various Microservices into a centralised store
- Correlation ids to trace operations, analytics, observability
- Monitoring
- Choreography rather than orchestration. Choreography implies event driven microservices

## References
- [Microservice Patterns](https://livebook.manning.com/#!/book/microservice-patterns/chapter-3/v-11/18)
