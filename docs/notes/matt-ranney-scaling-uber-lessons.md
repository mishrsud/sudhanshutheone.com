---
title: Notes from Matt Ranney's talk on scaling Uber
description: Distilled notes from the talk.
date: 2025-04-20
tags: 
- Architecture
- Microservices
- System Design
---

## Key Insights

- Uber’s engineering organization grew from roughly **200 to 2,000 engineers in 18 months**, forcing architectural decisions to operate under extreme organizational scaling.
- Microservices let teams **form quickly, move independently, release independently, and “own your own uptime.”**
- “Everything is a trade-off”; microservices solve organizational scaling problems while introducing distributed-system, operational, cultural, and coordination costs.
- The time software is most likely to break is **when it changes**; sufficiently stable microservices may effectively become “immutable” because nobody wants to touch them.
- Microservices can encourage teams to **build around broken systems instead of fixing them**, accumulating complexity over time.
- Teams can “trade complexity for politics” by creating new services rather than having difficult conversations or modifying another team’s code.
- Language freedom can preserve engineers’ existing biases: teams may build new services in preferred languages even when that is not best for the organization or system.
- Supporting many languages creates a **switching cost between teams** because expertise accumulated in one platform does not transfer directly to another.
- Multiple languages can **fragment the culture** into camps such as “Node programmer,” “Go programmer,” or “Java programmer.”
- In a microservices architecture, “everything becomes an RPC,” introducing failure modes that do not exist with an in-process function call.
- HTTP introduces unnecessary semantic ambiguity for internal server-to-server RPCs: status codes, headers, query strings, REST semantics, and methods all require interpretation.
- JSON without types is “borrowing against a future crazy mess” because downstream services can depend on subtle distinctions such as empty string versus null or language-specific coercion.
- Typed service interfaces would have prevented many cross-service compatibility failures.
- “Servers are not browsers”; when both sides of an internal interaction are controlled, treating communication like a **function call** is preferable to treating it like a web request.
- Repository strategy has real trade-offs: many repos improve modularity and open-source friendliness but make cross-cutting changes and navigation harder; one repo simplifies coordinated changes but eventually requires specialized tooling.
- Uber had grown to **more than 8,000 repositories**, placing it extremely far toward the “many repos” end of the spectrum.
- “Own your own uptime” creates coordination problems when another team needs to modify or release a service it does not own.
- Decomposing the system into independent services does not remove the need to understand **“the whole Service as one thing… as one giant machine system.”**
- Language-specific performance tooling creates friction when diagnosing performance across a polyglot architecture.
- A common profiling representation such as **flame graphs** reduces the cost of understanding performance across Go, Node, Python, Java, and other runtimes.
- Service dashboards should be **generated automatically and standardized**, rather than left for individual teams to design.
- Performance “doesn’t matter until it does”; a culture that treats performance as irrelevant can make eventual performance incidents difficult to address.
- Every service should have a **performance SLA by default**, even if the initial number is loose, so there is always a measurable baseline and a knob that can be tightened.
- “Good is not required but you have to at least know where you stand.”
- Fan-out amplifies tail latency because an overall request must wait for the slowest dependency.
- A dependency that is slow only 1% of the time becomes a frequent user-visible problem when a request fans out across many calls.
- Distributed tracing is essential for diagnosing fan-out because individual services can appear healthy while the aggregate request is pathological.
- A common request ID propagated through logs is a viable lightweight substitute for full distributed tracing at smaller scale.
- Bulk APIs can eliminate unintentional fan-out where a service resolves a collection of IDs through many concurrent individual RPCs.
- Abstractions such as ORMs can hide enormous fan-out; an apparently ordinary object traversal can unexpectedly produce thousands of database requests.
- Tracing itself has overhead, so only a statistically significant sample of traffic should be traced rather than every request.
- Cross-language **context propagation** is foundational infrastructure for tracing, authentication state, experimentation context, test markers, and other request-scoped information.
- Intermediate services should propagate request context they do not understand so downstream services can still consume it.
- Consistent structured logging should come from tools that are **“so obvious and easy to use that [people] wouldn’t do it any other way.”**
- Logging requires back pressure because incidents often increase log volume, and excessive logging can worsen the incident itself.
- Log generation needs **accounting or attribution** because resources treated as free are consumed without feedback.
- Realistic load testing cannot always be reproduced in a test environment, so Uber began testing against production during off-peak periods.
- Production load testing depends on propagated context that marks test requests so they can be excluded from normal traffic metrics and alerting.
- Systems should ideally remain near peak operating conditions using synthetic load so latent bugs surface before real traffic reaches the same level.
- Failure testing should be a **mandatory property of going to production**, not something service teams opt into later.
- Teams often resist chaos testing when it is introduced after their service is already running because they perceive deliberate failure as an attack on something they built.
- Large-scale systems are in **continuous migration**; “someone is always migrating something somewhere.”
- Global businesses effectively have **no maintenance window** because it is always peak time somewhere.
- Services that remain untouched for long periods become expensive to migrate when a later cross-cutting change becomes unavoidable.
- Migration mandates are bad; infrastructure teams should use **“pure carrots, no sticks”** except for requirements such as security or compliance.
- New infrastructure should be compelling enough that teams voluntarily migrate because the replacement is obviously better.
- Infrastructure and platform technology tends toward **“undifferentiated commodity”**; something built internally today may eventually be delivered cheaper and better as an external service.
- Engineers can become emotionally invested in internal infrastructure and resist replacing it even when the build-versus-buy trade-off changes.
- Politics occurs when decisions prioritize **self over team, or team over company**.
- Highly modular architectures and incentives around rapid individual shipping can make it easier to optimize for team-level accomplishments rather than company-level outcomes.
- The central lesson is to make architectural trade-offs **intentionally**, especially when organizational momentum makes decisions appear to be happening automatically.
- Service coupling cannot always be eliminated; some downstream dependencies have no useful degraded response when unavailable.
- The benefit of microservices remains even when coupling exists because teams can still release, monitor, and operate individual components independently.

## Action Items

| What to do | Why | Conditions / Constraints |
| --- | --- | --- |
| Evaluate microservices as an organizational trade-off, not an automatic architectural improvement. | “Everything is a trade-off.” | Account for distributed systems, coordination, culture, operations, and tooling costs. |
| Avoid creating new services solely to bypass difficult codebases or team discussions. | This can “trade complexity for politics.” | Prefer fixing underlying problems when doing so benefits the system as a whole. |
| Limit unnecessary language proliferation. | Multiple languages create switching costs and “fragment the culture.” | Allow additional languages only when the benefit outweighs organizational and tooling costs. |
| Use typed RPC interfaces for internal service communication. | Untyped JSON creates subtle downstream compatibility failures. | Especially important across multiple languages. |
| Treat internal server communication like function calls rather than browser-style web requests. | “Servers are not browsers.” | Applies when you control both sides of the interaction. |
| Choose repository boundaries intentionally. | Both one-repo and many-repo models impose substantial costs. | One repo at extreme scale requires specialized tooling; many repos complicate coordinated changes. |
| Preserve a whole-system operational view despite service decomposition. | The entire architecture still operates “as one giant machine system.” | Requires tooling that crosses ownership and service boundaries. |
| Standardize profiling across languages. | Different runtime tools create performance-debugging friction. | A common format such as flame graphs can provide the shared representation. |
| Automatically provision the same baseline dashboard for every service. | Team-specific dashboards make cross-service debugging harder. | Teams can add extra metrics, but the common baseline should require no work. |
| Give every service a default performance SLA. | Performance “doesn’t matter until it does.” | The first threshold can be loose; teams can opt into stricter targets. |
| Deploy distributed tracing before fan-out becomes a major problem. | Service-level metrics can hide request-level pathologies. | At smaller scale, propagate a common request ID through logs. |
| Replace repeated per-item RPCs with bulk APIs where appropriate. | Large fan-out magnifies latency and request volume. | Particularly when a caller retrieves a list and then resolves every item individually. |
| Inspect abstractions for hidden network or database fan-out. | Innocent-looking operations can produce thousands of calls. | ORMs and other “magic” abstractions are explicit risk areas. |
| Sample distributed traces rather than tracing everything. | Tracing overhead can alter performance results. | Use a statistically meaningful fraction; Uber used roughly 1% as an example. |
| Build cross-language request-context propagation into service infrastructure. | It enables tracing, authentication, experimentation, load-test markers, and other cross-cutting behavior. | Intermediate services must forward fields they do not understand. |
| Make structured logging the default through shared libraries. | Consistency must be easier than creating custom logging behavior. | Particularly important in a polyglot environment. |
| Add back pressure to logging. | Excess logging during incidents can create a second failure. | Drop messages when logging cannot keep up. |
| Attribute logging costs to the producing service or team. | “If it’s free,” teams have little feedback against excessive logging. | Attribution should expose who is consuming shared indexing/storage capacity. |
| Design services to recognize synthetic production traffic. | Production load testing otherwise corrupts metrics and alerts. | The test marker must propagate through the full request chain. |
| Run failure testing automatically as part of production readiness. | Teams are unlikely to volunteer for deliberate failures later. | Services should tolerate killing, slowing, and other perturbations before production approval. |
| Design every platform with migration in mind. | Large systems are continuously migrating and have no practical maintenance window. | Cross-cutting changes must be possible without long service outages. |
| Drive infrastructure migration through “pure carrots, no sticks.” | Forced migration generates resistance. | Security and compliance are stated exceptions. |
| Assume internally built infrastructure may become a commodity. | External providers may eventually deliver it “cheaper and better.” | Revisit build-versus-buy decisions as the market changes. |
| Evaluate decisions against self → team → company priorities. | Violating that ordering is the speaker’s definition of politics. | Especially important when local shipping incentives conflict with system-wide outcomes. |
| Explicitly document architectural trade-offs before momentum turns them into defaults. | The biggest regret was failing to make trade-offs intentionally. | Revisit assumptions as scale, team size, and operational constraints change. |

## Key Concepts and Terms

- **Microservices** — Small independently operated services that allow teams to form, release, and operate independently.
- **Own your own uptime** — Teams run and remain on call for the services they write.
- **Immutable microservices** — Stable services that may effectively stop changing because modifications introduce reliability risk.
- **Distributed system** — The unavoidable result of decomposing a monolith into networked services.
- **RPC** — The primary interaction model between services; framed as remote function execution.
- **HTTP semantics** — Status codes, headers, query strings, REST conventions, and methods whose ambiguity becomes costly for internal APIs.
- **Typed interfaces** — Explicit service contracts that prevent subtle cross-language interpretation failures.
- **One repo / many repos** — Competing repository organization models with different scaling and cross-cutting-change trade-offs.
- **Flame graphs** — A common profiling representation used to normalize performance analysis across runtimes.
- **Performance SLA** — A default measurable performance target attached to every service.
- **Fan out** — One request generating many downstream requests, increasing exposure to tail latency.
- **P99 / P95** — Tail-latency percentiles whose effects become amplified by fan-out.
- **Distributed tracing** — Tracking a request’s journey through multiple services.
- **Zipkin** — Distributed tracing system used in Uber’s production examples.
- **OpenTracing** — Cross-platform tracing effort referenced by the speaker.
- **Context propagation** — Passing request-scoped information across languages, services, and downstream calls.
- **Structured logging** — Logging in a standardized machine-readable representation.
- **Back pressure** — Dropping or constraining logs when the logging system cannot keep up.
- **Zap** — Uber’s open-sourced Go structured-logging library referenced in the talk.
- **Load testing in production** — Generating synthetic traffic against actual production capacity.
- **Failure testing** — Deliberately killing, slowing, or perturbing services to verify resilience.
- **Chaos Monkey** — Failure-testing approach referenced by the speaker.
- **Migration** — Continuous movement from legacy infrastructure to newer infrastructure while the business remains live.
- **Pure carrots, no sticks** — Migration philosophy where improved infrastructure attracts adoption rather than being mandated.
- **Undifferentiated commodity** — Infrastructure capability likely to become externally available as a cheaper or better service.
- **Politics** — Decisions that put the values of the individual above the team, or the team above the company.

## High Signal Quotes

> “Everything is a trade-off, even if you don’t realize you’re making it.”
> 

> “You might trade complexity for politics.”
> 

> “Without types it is a crazy, crazy mess.”
> 

> “Servers are not browsers.”
> 

> “We should still be able to understand the whole system working as one.”
> 

> “Performance doesn’t matter until it does.”
> 

> “Good is not required, but you have to at least know where you stand.”
> 

> “Make failure testing happen to you whether you liked it or not.”
> 

> “Someone is always migrating something somewhere.”
> 

> “Pure carrots, no sticks.”
> 

> “I wish that I knew how to better make these trade-offs intentionally.”
>