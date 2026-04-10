---
Title: Agentic Workflows for Legacy Codebases — Part 1: The Reality and What's Possible
Lead: Most engineers don't build new things. They maintain, extend, and make sense of code written by others—often in production, often without documentation. Here's what agentic coding workflows actually bring to that work.
Published: 2026-04-11
Tags:
- AI
- Agents
- Legacy-code
- Software-engineering
- Claude
- Developer-productivity
---

## Prologue

Picture the launch tweet: "Built this in a weekend with AI." A clean repo, zero dependencies inherited from anyone else, no on-call rotation breathing down your neck. The greenfield moment — product hunt launch pending, dopamine high, everything is possible. This is the story the industry tells itself about AI-assisted development. It's real, it's exciting, and it represents a small fraction of what most engineers actually do on any given Tuesday.

The larger reality is quieter. It's a Slack message at 9 AM: "payments are behaving weird, can you look?" It's a codebase where the person who wrote the critical scheduling module left eighteen months ago, the documentation hasn't been touched since the Obama administration, and the test suite takes forty minutes to run — when it runs at all. It's inheriting three years of someone else's decisions, made under constraints you'll never fully reconstruct, and being asked to extend it safely without breaking what's already working.

This is maintenance. And it is, by a significant margin, what software engineering actually is.

Barry Boehm documented this in 1981, which should tell you something about how long the industry has known and quietly ignored it: maintenance consumes between 40 and 80 percent of total software lifecycle costs. That number has proven durable precisely because it's structural, not incidental. Software that survives long enough to matter accumulates complexity faster than it sheds it. Dave Farley makes the same point in *Modern Software Engineering* — maintenance isn't a failure mode, it's the dominant mode for any system that outlives its initial build. His framing is worth sitting with: "if you can't test it, you can't change it safely." Not as a best-practice recommendation. As a hard constraint on what is actually possible.

Surveys consistently show that developers spend more time reading and understanding existing code than writing new code — the Stack Overflow Developer Survey, drawing on responses from around 90,000 developers, points in this direction year after year. It's a directional finding more than a precise measurement, but the direction is clear and matches what engineers will tell you off the record: the hard part isn't writing code from scratch. The hard part is figuring out what the existing code is actually doing before you're allowed to touch it.

This is where the conversation about agentic AI workflows gets interesting — and where most of the current discourse misses the point. The dominant narrative is about greenfield velocity: ship faster, prototype quicker, scaffold a new service in minutes. Those wins are real. But they're not where most engineering time is spent, and they're not where the highest-stakes decisions get made.

The real opportunity for agentic workflows isn't velocity on new code. It's changing what's possible when you're working with what's already there — the production system, the inherited codebase, the thing that's making money right now and absolutely cannot go down. That's the problem worth solving. And it turns out agents are, in some specific and practical ways, well-suited to it.

## The Five Scenarios

### 1. Code Understanding & Navigation

### 2. Refactoring & Modernization

### 3. Debugging & Incident Response

### 4. Test Coverage & Safety Nets

### 5. Tech Debt Payoff

## The Tools

## When Agentic Workflows Win (and When They Don't)

## Epilogue
