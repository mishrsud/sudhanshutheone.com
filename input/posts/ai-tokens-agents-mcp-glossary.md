---
Title: A Developer's Glossary to Modern AI - Tokens, Agents, and MCP
Lead: A quick guide to demystify the core concepts that power modern AI applications, from the fundamental unit of data to the protocols that let them interact with the world.
Published: 2025-10-19
Tags: 
- AI
- LLM
- Agents
- Tokens
- MCP
---

## Prologue
If you've ever used a powerful AI like ChatGPT, you know the experience can feel like magic. You ask a question, and a coherent, detailed answer appears in seconds. But behind this seamless interface, the mechanics of how AI operates are often counter-intuitive. The magic isn't just in the algorithms; it's in a set of core building blocks that work together.

This post serves as a simple glossary to demystify some of the essential terms you'll encounter when working with or building on top of Large Language Models (LLMs). Understanding these concepts is the first step to harnessing their power effectively.

[This post is a work-in-progress and will be updated over time as I refine the explanations and add more examples (and learn more).]

## The Glossary

### 1. Tokens: The Lifeblood of an LLM
**Definition:** A "token" is the basic unit of data an AI model processes. It's not always a full word. Simple words might be one token, while more complex words are often broken down into smaller, more manageable pieces.

**Example:**
- The word `cat` is one token.
- The word `unbelievable` is often split into multiple tokens like `un`, `believ`, and `able`.

**Why it matters:** Tokens are the currency of the AI world. Every interaction with an LLM, from asking a question to receiving an answer, has a token cost. For developers and businesses, managing token consumption is a critical balancing act between providing a rich user experience and controlling operational costs. An unexpectedly popular feature can lead to a massive spike in token usage, creating what some call a "Graph of Death" where demand outstrips your capacity to pay for it.

### 2. AI Agents: The "Doers" of the AI World
**Definition:** On its own, a Large Language Model (LLM) cannot take any action in the real world. It's a brilliant brain in a jar, capable of processing information and generating text, but it can't book a flight, search a live database, or send an email. An "AI Agent" is the layer of software that gives the LLM hands and feet. It acts as a project manager, connecting the LLM to the outside world through specialized "tools."

**Example:**
Imagine you're building an app called "FlyGBT" and a user asks it to book a flight to London.
1.  The **AI Agent** receives the request.
2.  It recognizes the need to interact with an airline's system. It uses a pre-defined `book_flight` tool.
3.  The tool interacts with the airline's API to get flight options.
4.  The agent passes this information back to the **LLM** (the brain) and asks it to format a response for the user.
5.  The user confirms, and the agent uses the tool again to complete the booking.

Without the agent, the LLM could only tell you *how* to book the flight; it couldn't do it for you.

### 3. Model Context Protocol (MCP): The Universal Translator
**Definition:** An AI Agent uses "tools" to take action, but how does it know how to talk to each tool? Every real-world service has a unique Application Programming Interface (API)—its own private language. A Model Context Protocol (MCP) acts as a universal translator. It's a standardized format that describes an application's capabilities (e.g., "search flights," "book flights") and defines the precise structure for its inputs and outputs.

**Example:**
An airline's API might use the command `/API/flights` with a field named `destination`. Another might use `/flights-list` with a field named `to`.

Instead of writing custom code for each variation, an MCP provides a single, structured "guide" like this:
```json
{
  "name": "search_flights",
  "description": "Search for available flights.",
  "parameters": {
    "destination": "The city to fly to.",
    "date": "The desired departure date."
  }
}
```
The AI Agent can read this standardized description and instantly understand how to use the tool, regardless of the underlying API's specific quirks. This makes it possible to build scalable agents that can reliably connect to a vast range of services.

Happy Engineering!