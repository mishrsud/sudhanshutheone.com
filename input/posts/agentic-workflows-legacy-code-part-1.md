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

There's a particular kind of pressure that comes with being handed a large, unfamiliar codebase and a specific deliverable. Not idle curiosity — not "let's poke around and see what's here." Something with stakes: a technical roadmap, an architecture review, an uplift plan that will go in front of leadership and inform actual decisions. You need to understand the system well enough to say something true about it, in writing, on a deadline.

The traditional workflow for this is slow in a very specific way. You read code — lots of it — following threads through files and modules that half-document themselves and half-contradict what the other half implies. You look for tests, if the codebase has a test suite worth reading, and try to infer intent from what someone thought was worth checking. Then, when you've hit the limit of what you can figure out alone, you start scheduling meetings. And this is where the real bottleneck appears: the engineers who actually know how the system works are also the busiest people in the organization. Their calendars don't have gaps. You might get thirty minutes on a Thursday, two weeks out, with three other things competing for the time. You piece together understanding across multiple sessions, over multiple weeks, hoping the picture you're assembling is accurate enough to act on.

I went through this when I needed to produce an uplift plan for a production codebase — a concrete technical roadmap grounded in the actual state of the system, not a generic set of best-practice recommendations that could have been written without ever looking at the code. The manual work was fine; it's just what the job required. The bottleneck was the human-coordination layer: getting synchronous time from people who had the context I needed but couldn't easily free up the hours to share it.

The agentic version of this workflow looks different at nearly every step. I'd start by drafting a prompt — or, more often now, giving Claude Code a rough intent statement and asking it to generate a structured discovery prompt from that. Something like: "I need to understand this codebase well enough to identify the highest-risk areas and draft an uplift plan." The agent turns that into a concrete exploration: which files to read, which dependencies to trace, which patterns to surface. Then it runs. It navigates the repo, reads source files, follows import chains, notes what's tested and what isn't, flags things that look like load-bearing complexity with no safety net. The output is an artifact — a draft uplift plan that is, in my experience, about 80% of the way there.

That last part matters more than the speed. Because now the ask to the busy engineers changes in kind, not just in degree. Instead of "can you walk me through this system" — a request that pulls hours of synchronous attention — it becomes "here's a draft of what I found; is this right, and what did I miss?" Engineers can read and comment asynchronously, in whatever ten-minute gaps they have. The artifact does the work of representing your understanding; they're correcting and extending it rather than generating it from scratch.

The honest limitation here is worth naming: agents can surface what's in the code, but they can't reconstruct *why* decisions were made. The architectural choices, the business constraints that were true at the time, the reasoning behind a pattern that now looks strange — that institutional context doesn't live in the repository. It lives in people's heads, and sometimes it's left the company entirely. An agent can tell you that a critical service has no retry logic; it cannot tell you whether that was a considered tradeoff or an oversight from a sprint that was already running late. For that, you still need the humans. The difference is that by the time you're asking, you already know what questions to ask.

### 2. Refactoring & Modernization

### 3. Debugging & Incident Response

### 4. Test Coverage & Safety Nets

### 5. Tech Debt Payoff

## The Tools

## When Agentic Workflows Win (and When They Don't)

## Epilogue
