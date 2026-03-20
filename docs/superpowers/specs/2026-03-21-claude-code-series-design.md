# Design Spec: "Claude Code in Depth" Blog Series

**Date:** 2026-03-21
**Author:** Sudhanshu Mishra
**Status:** Approved

---

## Overview

A 7-post blog series on Claude Code for the sudhanshutheone.com blog. The series moves from foundational concepts to advanced multi-agent orchestration, pitched at a mixed audience: the intro post is accessible to practitioners new to Claude Code, while the deep-dive posts assume engineering competence and reward readers who already use the tool.

**Series title:** Claude Code in Depth
**Tagline:** A practitioner's guide to working with Claude Code — from first session to multi-agent orchestration
**Through-line:** More capability demands more intentionality. Each post reinforces the same governance question in a new context: *as this tool does more for you, what decisions are you handing over, and which ones must you keep?*

---

## Audience

- **Primary (intro post):** Practitioners who have heard of Claude Code and want to get started with the right mental model
- **Primary (deep-dive posts):** Senior engineers and engineering leads who already use Claude Code and want to go deeper
- **Structure:** Intro does orientation work so deep dives can skip the basics. Each deep-dive post includes a one-line "Prerequisites" note so readers jumping in mid-series know what to catch up on.

---

## Publishing Cadence

One post every 2–3 days, published in sequence. Series runs approximately 2–3 weeks end-to-end.

---

## Writing Workflow

Claude drafts each post with `[YOUR TAKE]` placeholders at points requiring personal anecdote, opinion, or experience. Author refines, fills placeholders (minimum 3 per post), and publishes.

---

## Post Structure (per post)

Each post follows the established blog format:

```yaml
---
title: <title>
description: <one-sentence summary>
date: <YYYY-MM-DD>
tags:
  - AI
  - Claude-Code
  - Software-engineering
  - Productivity
  - AI-Coding-Agents
---
```

Body structure:
- **Prerequisites** (deep-dive posts only) — one line: "This post assumes familiarity with X from Post N."
- **Prologue** — 1–2 paragraphs setting the problem or context
- **3–5 `##` sections** — substantive content, with at least one concrete copy-paste-ready example per post (config, command, or code snippet). Examples are self-contained — each post's examples stand alone and do not require prior posts to run.
- **`[YOUR TAKE]` placeholders** — minimum 3 per post, for personal anecdotes, opinions, or examples
- **Epilogue** — synthesis and a closing question to readers
- **References** — linked sources

---

## Series Map

### Post 1 — Intro: The Lay of the Land
**Working title:** "Claude Code: Beyond the Autocomplete"
**Target audience:** B readers primarily; gives A readers the series map
**Prerequisites:** None
**Core message:** Claude Code is an agentic CLI, not a copilot. Using it well requires a different mental model — and understanding that model is what the rest of this series is about.
**Governance angle:** What does it mean to hand control to an agent? What stays with you?

**Sections:**
1. What Claude Code actually is (and what it isn't)
2. The mental model shift: from autocomplete to delegation
3. A map of the concepts this series covers (sessions, memory, skills, plugins, sub-agents, skill-creator)
4. Introducing the superpowers pack: the community skill collection that unlocks the workflows in this series
5. A preview of the ceiling: what the full stack looks like in action (teaser to Post 6)

**`[YOUR TAKE]`:**
- When you first realised Claude Code was different from other AI tools
- Your first reaction to the superpowers pack
- What you wish someone had told you at the start

---

### Post 2 — Sessions, Context Window & Memory
**Working title:** "Claude Code Remembers (If You Help It)"
**Prerequisites:** None (follows naturally from Post 1)
**Core message:** Context windows degrade; deliberate memory management is what separates a chaotic session from a productive one.
**Governance angle:** What you put in memory is a policy decision. What does Claude get to know about your codebase, your rules, your constraints — and what do you keep out?

**Sections:**
1. What a session is and how it starts/ends
2. The context window in plain English — why it fills up and what happens when it does
3. Three memory mechanisms: in-session context, `CLAUDE.md` as constitution, `~/.claude/` memory files
4. The "document and clear" rhythm — dump state, clear context, reload and continue
5. Practical memory file structure that works

**`[YOUR TAKE]`:**
- Your own memory folder structure and what you put in it
- A session that went wrong because context degraded — and how you fixed it
- What you deliberately keep *out* of your `CLAUDE.md`

---

### Post 3 — Skills
**Working title:** "Teaching Claude Code New Tricks"
**Prerequisites:** Familiarity with sessions and CLAUDE.md (Post 2)
**Core message:** Skills are the extension mechanism that lets Claude Code go beyond its defaults — and choosing the right ones matters as much as using them.
**Governance angle:** A skill changes what Claude will do for you. Installing one is a delegation decision. Which behaviours do you want to encode, and which do you want to keep ad hoc?

**Sections:**
1. What a skill is and how it differs from a prompt
2. How skills are invoked: the Skill tool and slash commands
3. What skills can and can't do (scope and limitations)
4. Walkthrough of a skill in action (concrete, runnable example)
5. How to find and evaluate skills before installing them

**`[YOUR TAKE]`:**
- Which skills changed your workflow most and why
- A skill you tried and removed — and what that taught you
- How you decide whether something deserves a skill or just a good prompt

---

### Post 4 — Plugins & the Marketplace
**Working title:** "The Claude Code Ecosystem"
**Prerequisites:** Understanding of skills (Post 3)
**Core message:** Plugins extend Claude Code at the tool and agent level. The marketplace is where the community's best workflows live — but installing is the easy part; governing what you've installed is the discipline.
**Governance angle:** Every plugin you install changes what Claude Code can do — and what it can access. What's your review process before you install?

**Sections:**
1. What plugins are and how they differ from skills
2. How the marketplace works and what lives there
3. Installing and managing plugins via `/plugin`
4. The superpowers pack in depth: what it contains, how the pieces fit together
5. How to evaluate a plugin before committing to it (permissions, scope, trust)

**`[YOUR TAKE]`:**
- Your current plugin stack and how you settled on it
- A plugin you uninstalled and why
- Your personal checklist before installing something from the marketplace

---

### Post 5 — Sub-agents & Sub-agent Driven Development (Part 1)
**Working title:** "Delegation at Scale: Sub-agents in Claude Code"
**Prerequisites:** Skills and plugins (Posts 3–4)
**Core message:** Sub-agents let you decompose complex work into parallel, isolated workstreams — but the orchestration design, the failure handling, and the verification are entirely your responsibility.
**Governance angle:** When an agent spawns agents, who is accountable for what they do? How do you know when something went wrong?

**Sections:**
1. What sub-agents are and how the Agent tool works
2. Parallel vs sequential dispatch — when to use each and the failure modes of each
3. Isolation modes: worktrees, context boundaries, and why they matter
4. The superpowers sub-agent-driven-development skill in practice (runnable example)
5. When sub-agents fail: recovery patterns, debugging cascades, and what to log
6. **Teaser:** "What if your planner and your builder use different models?" — frames the cost/quality question, does not answer it, links to Part 2

**`[YOUR TAKE]`:**
- A real task you delegated to sub-agents and what surprised you
- A sub-agent failure you had to debug — and how you found the root cause
- Your instinct on when *not* to use sub-agents

---

### Post 6 — Sub-agents Part 2: Cost-Aware Multi-Agent Architectures
**Working title:** "Opus Plans, Haiku Builds"
**Prerequisites:** Sub-agents Part 1 (Post 5)
**Core message:** You don't need the most capable model for every task. Deliberate model assignment across agents is a leverage point most teams ignore — but it's also a governance decision, not just a cost optimisation.
**Governance angle:** Choosing a cheaper model for execution tasks isn't just economics — it's a policy: you're deciding what level of capability you need for each class of work, and accepting the failure modes that come with that choice.

**Sections:**
1. The question from Part 1 answered: yes, you can use different models per agent
2. The model landscape: when Opus/Sonnet earns its cost, when Haiku is enough
3. Practical patterns: plan once with the expensive model, parallelise cheap workers
4. Cost implications and how to think about the trade-off (with real numbers)
5. The governance layer: who decides model assignments, and how do you audit them?
6. When this architecture doesn't make sense (guardrails against over-engineering)

**`[YOUR TAKE]`:**
- Your own experiments with model selection — cost vs quality results
- A case where you used a cheaper model and paid for it in output quality
- How you document your model assignment decisions

---

### Post 7 — Skill-creator: Build the Tools That Build For You
**Working title:** "Build the Tools That Build For You"
**Prerequisites:** Skills (Post 3); familiarity with sub-agents (Posts 5–6) helpful but not required
**Core message:** The skill-creator skill closes the loop — you can design, build, test, and iterate on custom skills without leaving Claude Code. But a skill you can't evaluate is a skill you can't trust.
**Governance angle:** A custom skill is a standing instruction to Claude. Getting it wrong doesn't just affect one session — it affects every session where it runs. The eval loop is not optional.

**Sections:**
1. Why you'd build a custom skill vs using an existing one
2. How skill-creator works: the design → create → validate → refine loop
3. Writing a skill spec that produces reliable, consistent results
4. The eval loop: how to know when a skill is actually done (and when to kill it)
5. Keeping skills lean and maintaining them as Claude Code evolves

**Note on scope:** If draft exceeds 3,500 words, split into Post 7 (mechanics + eval loop) and a bonus Post 8 (maintenance, versioning, and skill lifecycle). Do not compress the eval loop section — it is the governance anchor of the post.

**`[YOUR TAKE]`:**
- A skill you built, the problem it solved, and what you'd do differently
- A skill that looked right but produced unreliable output — and how the eval loop caught it
- Your bar for "this deserves a skill" vs "this is just a good prompt"

---

## Series Cross-references

- Each post references the previous and next post where natural
- Post 1 maps the full series and introduces the superpowers pack
- Posts 5 and 6 are explicitly linked (teaser → deep dive)
- Posts 3 and 7 are implicitly linked (skills as consumer → skills as creator)

---

## Out of Scope

- Video or companion content
- Claude Code installation and setup (covered by official docs)
- Enterprise governance frameworks (covered in prior posts on the blog)
- Multi-tenancy, API key management, or team-level Claude Code administration

---

## Success Criteria

| Criterion | How to verify |
|---|---|
| Each post stands alone but rewards reading in sequence | Read Post 4 in isolation: a new reader can follow it without prior posts |
| A reader who completes the series can set up a cost-aware multi-agent workflow | Post 6 contains a complete, runnable example with model assignments |
| Every post has at least one copy-paste-ready example | Count: config snippet, slash command, or code block present in each post |
| Minimum 3 `[YOUR TAKE]` placeholders per post | Count before publishing |
| Governance angle present in every post | Each post's Prologue or first section names what you're handing over and what you keep |
