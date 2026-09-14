---
title: Notes on AI Agent Memory types 
description: Information collected from various sources on agent memory.
tags: 
- AI
- Agent-Memory
---

## Central idea

AI agent memory is not simply storing information. It is the system’s ability to bring the right information back, for the right task, at the right time. Memory is therefore a key part of context engineering—deciding what the model receives before it responds or acts.

## Seven types of agent memory

| Type | Purpose | Example |
| --- | --- | --- |
| Working memory | Information available to the model right now | Current request, recent messages, selected documents, tool results |
| Semantic memory | Durable facts and preferences | User’s name, time zone, language preference |
| Episodic memory | Records of specific past events or agent runs | What happened in a previous support case and what resolved it |
| Procedural memory | Rules and methods governing how the agent works | Validate a query before running it; require approval before a refund |
| External memory | Information stored outside the model | Databases, documents, emails, business systems |
| Parametric memory | General knowledge encoded in the model’s trained weights | Language ability, coding knowledge, common concepts |
| Prospective memory | Commitments or tasks that must resume in the future | Check for a reply on Friday and prepare a follow-up |

## Key themes and insights

1. **Storage is not retrieval**
    
    Keeping thousands of messages does not mean an agent can remember effectively. Information becomes useful only when the relevant portion is retrieved at the appropriate moment.
    
2. **Memory types describe jobs, not databases**
    
    The seven categories can overlap and do not require seven separate storage systems. They describe distinct functions within an agent architecture.
    
3. **Working memory is scarce**
    
    Context windows are limited. Retaining too much increases cost and latency and can obscure important details. Long conversations therefore require selection, summarization, and removal.
    
4. **Durable facts require governance**
    
    Semantic memories should have an owner, scope, and lifetime. They must be updateable and deletable, and untrusted content from websites, emails, or tools should not automatically become trusted memory.
    
5. **Facts, experiences, and procedures are different**
    
    Semantic memory captures what is true; episodic memory captures what happened; procedural memory captures how work should be done. Repeated lessons from episodes may eventually become procedures.
    
6. **Retrieval should match the question**
    
    Exact lookups, keyword search, and embedding-based similarity search solve different problems. Vector search is useful but not universally necessary.
    
7. **Retrieval quality must be evaluated separately**
    
    A polished, confident answer does not prove that the correct information was retrieved. Systems should independently test relevance, freshness, permissions, and user isolation.
    
8. **Model knowledge has clear limits**
    
    Parametric memory provides broad capabilities but may be outdated and cannot contain private or newly changing information unless it is supplied externally. Fine-tuning is generally unsuitable for frequently changing facts.
    
9. **Future commitments need infrastructure**
    
    A model cannot independently “remember to check Friday” when it is not running. Prospective memory requires a persistent task, a trigger or scheduler, current-state checks, approval handling, status tracking, and protection against duplicate execution.
    
10. **Good memory is selective**
    
    The objective is not maximum retention. It is supplying the minimum relevant information needed for a sound decision or action.
    

## Practical design questions

Before choosing a database or retrieval technology, ask:

- What information should survive beyond the current interaction?
- How should that information return when needed?
- When should it be updated, expire, or be forgotten?
- Does the system need to wake up and continue work later?