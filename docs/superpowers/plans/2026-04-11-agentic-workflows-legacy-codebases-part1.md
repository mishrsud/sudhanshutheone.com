# Agentic Workflows for Legacy Codebases — Part 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write and publish Part 1 of a multi-part series exploring how agentic coding workflows transform legacy codebase maintenance — covering all five challenge scenarios at breadth with concrete personal examples.

**Architecture:** Collaborative writing process — each scenario section is drafted only after the author provides a personal example. Research is gathered upfront to support the Prologue. All other sections (Tools, Limitations, Epilogue) are drafted without blocking on user input.

**Tech Stack:** Markdown, blog frontmatter (Title/Lead/Published/Tags), file at `input/posts/`

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `input/posts/agentic-workflows-legacy-code-part-1.md` | Create | The blog post |
| `docs/superpowers/specs/2026-03-21-agentic-workflows-legacy-codebases-design.md` | Reference | Design spec |

---

## Task 1: Research — Supporting Context for Prologue

Gather the data points that will anchor the Prologue's "reality check" argument. This is background research, not the primary arc.

**Files:**
- Reference: `docs/superpowers/specs/2026-03-21-agentic-workflows-legacy-codebases-design.md`

- [ ] **Step 1: Gather Thoughtworks Tech Radar data points**

Search for Thoughtworks Tech Radar findings on legacy modernization, maintenance tooling, and AI-assisted development. Focus on Radar blips from 2022–2025 that signal the industry's posture toward legacy systems.

Key search terms: "Thoughtworks Tech Radar legacy modernization", "Thoughtworks AI-assisted development radar"

Note findings: relevant blips, adopt/trial/assess/hold status for related tools, and any commentary on maintenance vs. greenfield priorities.

- [ ] **Step 2: Gather InfoQ data points**

Search InfoQ for articles and surveys on time spent on maintenance vs. new features, and on adoption of AI coding tools in enterprise settings.

Key search terms: "InfoQ engineering culture survey maintenance", "InfoQ AI developer tools legacy code"

Note findings: any survey statistics on how engineers spend their time, adoption curves for agentic tools.

- [ ] **Step 3: Note Dave Farley / Modern Software Engineering references**

From *Modern Software Engineering* (Dave Farley, 2021): note relevant arguments about the nature of software work, feedback loops, and the reality of legacy systems in production engineering.

Key themes to reference: "most code is maintenance", the cost of change, the value of test safety nets, the myth of "done" software.

- [ ] **Step 4: Note any other supporting data**

Optional: Note any widely-cited statistics (e.g., "60-80% of software costs are maintenance" — Barry Boehm, NATO Software Engineering Conference, etc.)

---

## Task 2: Create Post File with Frontmatter and Shell

**Files:**
- Create: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Create the file with frontmatter**

```markdown
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
```

- [ ] **Step 2: Add section skeleton**

Add the top-level section headers as scaffolding:

```markdown
## Prologue

## The Five Scenarios

### 1. Code Understanding & Navigation

### 2. Refactoring & Modernization

### 3. Debugging & Incident Response

### 4. Test Coverage & Safety Nets

### 5. Tech Debt Payoff

## The Tools

## When Agentic Workflows Win (and When They Don't)

## Epilogue
```

- [ ] **Step 3: Commit the shell**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Part 1 post shell with frontmatter and section skeleton"
```

---

## Task 3: Write the Prologue

No user input required. Draw on research from Task 1.

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Draft the Prologue**

Write ~500 words covering:
- Open with the narrative: vibe coding, weekend apps, startup velocity — the story the industry tells
- Pivot to reality: most engineers, most of the time, are in someone else's code, under production constraints
- Cite research (Thoughtworks, InfoQ, Farley) as supporting context
- State the thesis: the real opportunity for agentic workflows isn't greenfield velocity, it's transforming how we work with what's already there

Tone: grounded, slightly wry. Don't dismiss greenfield — acknowledge it's real. But position legacy maintenance as the quieter, larger part of the job.

- [ ] **Step 2: Self-review checklist**

- [ ] Opens with a concrete image or moment, not an abstract statement
- [ ] Research cited naturally (not listed like a bibliography)
- [ ] Thesis is stated clearly but not mechanically
- [ ] Word count: 400-600 words
- [ ] Tone matches existing posts (see: trust-security-ai-era.md)

- [ ] **Step 3: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Prologue to Part 1"
```

---

## Task 4: Write Scenario 1 — Code Understanding & Navigation

**⚠️ USER INPUT REQUIRED before drafting.** Ask the author:

> "For the 'Code Understanding & Navigation' section, can you share a specific moment from your experience? Ideally: a real scenario where you needed to understand an unfamiliar or complex legacy codebase quickly, and used Claude or Claude Code to help. What was the codebase like? What did you ask? What was useful, what wasn't?"

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Collect author's personal example**

Wait for author input. Note key details:
- What the codebase was (tech stack, size, state of documentation)
- The problem they needed to solve
- How the agent workflow helped (what prompts/interactions mattered)
- Any friction or limitations encountered

- [ ] **Step 2: Draft the section**

Write ~500 words covering:
- Set the scene: the kind of codebase, the kind of problem (use author's example)
- What a traditional approach looks like (grep, reading files, asking colleagues)
- What Claude/Claude Code brings: multi-turn exploration, cross-file reasoning, asking "why does this exist" not just "what does this do"
- The author's concrete example, articulated clearly
- One honest limitation or caveat

Format: narrative prose with 1-2 specific moments. Not a how-to list.

- [ ] **Step 3: Self-review checklist**

- [ ] Personal example is central, not buried
- [ ] The "before agents" baseline is clear (so the contrast lands)
- [ ] Tool specificity: Claude/Claude Code named and what they specifically do here
- [ ] One limitation included (prevents it reading like an ad)
- [ ] Word count: 400-600 words

- [ ] **Step 4: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Scenario 1: Code Understanding & Navigation"
```

---

## Task 5: Write Scenario 2 — Refactoring & Modernization

**⚠️ USER INPUT REQUIRED before drafting.** Ask the author:

> "For the 'Refactoring & Modernization' section — can you share a real scenario where you used Claude, Claude Code, or Codex to help with refactoring or modernizing legacy code? What was the goal (extract a module, break up a monolith, migrate a framework)? What did the agent help with specifically?"

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Collect author's personal example**

Note key details:
- What the refactoring goal was
- What made it risky or complex in a legacy context
- How the agent workflow helped (suggestions, dependency analysis, safety checks)
- What the agent got wrong or where human judgment was essential

- [ ] **Step 2: Draft the section**

Write ~500 words covering:
- The scenario: what refactoring in a legacy codebase feels like (fear, unknown dependencies, no tests)
- What agents bring: reasoning about impact, suggesting extraction patterns, validating against existing behavior
- Author's concrete example
- The human-agent handoff: where the engineer's judgment is irreplaceable

- [ ] **Step 3: Self-review checklist**

- [ ] The "fear" of legacy refactoring is validated (readers should nod)
- [ ] Agent role is specific — not just "AI suggests things"
- [ ] Author's example is the anchor, not an afterthought
- [ ] One limitation included
- [ ] Word count: 400-600 words

- [ ] **Step 4: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Scenario 2: Refactoring & Modernization"
```

---

## Task 6: Write Scenario 3 — Debugging & Incident Response

**⚠️ USER INPUT REQUIRED before drafting.** Ask the author:

> "For the 'Debugging & Incident Response' section — can you share a moment where you were debugging a production issue in unfamiliar code, and used an agent workflow to help? What was the incident or bug? How did you use the agent (logs + code reasoning, tracing call paths, proposing hypotheses)?"

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Collect author's personal example**

Note key details:
- The incident/bug context (severity, time pressure, familiarity with the code)
- The agent workflow used (what you fed it, what it returned)
- What worked (narrowing scope, proposing hypotheses)
- What required human judgment (domain knowledge, deployment context)

- [ ] **Step 2: Draft the section**

Write ~500 words covering:
- The scenario: production is broken, you don't know the code, the clock is running
- What agents bring under time pressure: parallel reasoning across logs and code, hypothesis generation, help forming the right question
- Author's concrete example
- The limit: agents don't know your deployment topology, your team's tribal knowledge, your SLAs

- [ ] **Step 3: Self-review checklist**

- [ ] Time pressure and unfamiliarity are conveyed (emotional truth)
- [ ] Agent role is clear and specific (not just "AI helped me debug")
- [ ] Author's example is central
- [ ] Limitation is honest and specific
- [ ] Word count: 400-600 words

- [ ] **Step 4: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Scenario 3: Debugging & Incident Response"
```

---

## Task 7: Write Scenario 4 — Test Coverage & Safety Nets

**⚠️ USER INPUT REQUIRED before drafting.** Ask the author:

> "For the 'Test Coverage & Safety Nets' section — have you used Claude, Claude Code, or Codex to add tests to untested legacy code? What was the codebase like, what was your strategy, and what did the agent help with? Any surprises?"

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Collect author's personal example**

Note key details:
- The codebase state (no tests, fragile tests, unknown behavior)
- The strategy (characterization tests, integration tests, unit tests)
- What the agent helped generate or suggest
- Where the agent's tests were wrong or needed correction

- [ ] **Step 2: Draft the section**

Write ~500 words covering:
- The scenario: code you're afraid to change because there are no tests
- The classic dilemma: you need to understand the code to write the tests, but you need to change the code to understand it
- What agents bring: generating test scaffolding, suggesting edge cases, characterization-style coverage
- Author's concrete example
- The critical caveat: agent-generated tests can test the wrong thing — they describe existing behavior, not correct behavior

- [ ] **Step 3: Self-review checklist**

- [ ] The test-coverage dilemma is clearly articulated
- [ ] Characterization testing concept explained accessibly
- [ ] Agent role is specific and honest (including the wrong-thing risk)
- [ ] Author's example is central
- [ ] Word count: 400-600 words

- [ ] **Step 4: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Scenario 4: Test Coverage & Safety Nets"
```

---

## Task 8: Write Scenario 5 — Tech Debt Payoff

**⚠️ USER INPUT REQUIRED before drafting.** Ask the author:

> "For the 'Tech Debt Payoff' section — do you have an example of using agents to tackle systematic tech debt? (dependency upgrades, dead code removal, pattern modernization, security patching). What was the scope, and what did the agent workflow look like?"

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Collect author's personal example**

Note key details:
- The type of tech debt (dependencies, dead code, patterns, security)
- The scale (isolated files vs. cross-cutting concern)
- The agent workflow (mapping impact, automating changes, validating)
- What required human decisions (business context, risk tolerance)

- [ ] **Step 2: Draft the section**

Write ~500 words covering:
- The scenario: debt that accumulates until it becomes a crisis — the "we'll fix it later" that never gets fixed
- What agents bring: mapping change impact, automating repetitive transformation, maintaining consistency across files
- Author's concrete example
- The limit: agents can automate the mechanical parts, but decisions about what to change and why require engineering judgment

- [ ] **Step 3: Self-review checklist**

- [ ] The "never gets fixed" feeling is validated (readers nod)
- [ ] Agent's role in repetitive/mechanical transformation is clear
- [ ] Human judgment role is specific (not just "you still need to think")
- [ ] Author's example is central
- [ ] Word count: 400-600 words

- [ ] **Step 4: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Scenario 5: Tech Debt Payoff"
```

---

## Task 9: Write The Tools Section

No user input required. Brief framing for each tool.

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Draft the section**

Write ~400 words total (short per-tool framing, not deep dives):

**Claude (chat/API)**
- Best for: reasoning about large codebases when pasted in context, multi-turn exploration, "explain this to me" and "what would happen if I changed X"
- Workflow pattern: paste relevant files/snippets, ask layered questions, iterate

**Claude Code**
- Best for: in-editor understanding, real-time refactoring, working with files without manual copy-paste
- Workflow pattern: open the codebase, ask it to navigate and explain, let it propose changes you review

**Codex agents**
- Best for: multi-step automated workflows, orchestrated tasks (e.g., "run tests, find failures, suggest fixes")
- Workflow pattern: define the task and constraints, let the agent execute steps, review checkpoints

Close with: "These aren't replacements for understanding — they're amplifiers for the understanding you bring."

- [ ] **Step 2: Self-review checklist**

- [ ] Each tool described in 2-4 sentences max
- [ ] Workflow pattern for each is concrete (not vague)
- [ ] Closing line lands the right message (amplifier, not replacement)
- [ ] Word count: 300-450 words

- [ ] **Step 3: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add The Tools section"
```

---

## Task 10: Write When Agentic Workflows Win (and When They Don't)

No user input required.

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Draft the section**

Write ~400 words covering:

**Where they win:**
- Scaling reasoning across large codebases (cross-file, cross-module understanding)
- Generating boilerplate safely (tests, documentation, transformation)
- Accelerating the "orientation" phase when entering unfamiliar code
- Hypothesis generation during debugging (more angles, faster)

**Where they struggle:**
- Domain context that lives in people's heads, not the code
- Decisions requiring business judgment (what *should* this do, not what *does* it do)
- Trust: agent-generated code in production still needs review — possibly more, not less
- Long tail edge cases (agents optimize for the likely path)

Close with: A simple heuristic — if you'd feel comfortable explaining the task to a very capable junior engineer who doesn't know the domain, agents will probably help. If the task requires knowledge that isn't in the code or the conversation, you're the one who needs to lead.

- [ ] **Step 2: Self-review checklist**

- [ ] "Win" cases are specific and defensible (not just "AI is great")
- [ ] "Struggle" cases are honest and specific (not just "AI has limits")
- [ ] Closing heuristic is practical and memorable
- [ ] Word count: 350-450 words

- [ ] **Step 3: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add When Agentic Workflows Win section"
```

---

## Task 11: Write the Epilogue

No user input required.

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Draft the Epilogue**

Write ~200 words:
- Acknowledge the hype is real — but the real value is quieter
- The engineers who benefit most aren't the weekend hackers, they're the ones who spend their days in systems that predate them
- Tease the deep dives: "In Part 2, we'll go deep on [scenario] — real code, real workflow, real gotchas"
- Invite reader response: "What's your legacy codebase nightmare? I'd love to hear what you're working with."

- [ ] **Step 2: Self-review checklist**

- [ ] Doesn't oversell or repeat what was already said
- [ ] Tease for Part 2 is specific (names the scenario)
- [ ] Closing invitation feels genuine, not boilerplate
- [ ] Word count: 150-250 words

- [ ] **Step 3: Commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Add Epilogue to Part 1"
```

---

## Task 12: Final Review and Polish

**Files:**
- Modify: `input/posts/agentic-workflows-legacy-code-part-1.md`

- [ ] **Step 1: Full post read-through**

Read the complete post end-to-end. Check:
- [ ] Does it read as a coherent essay, not a listicle?
- [ ] Is the thesis from the Prologue echoed (implicitly) throughout?
- [ ] Are all five scenario examples from the author clearly articulated (not paraphrased into vagueness)?
- [ ] Does each scenario have exactly one honest limitation?
- [ ] Are Thoughtworks/InfoQ/Farley citations present in the Prologue and not repeated elsewhere?
- [ ] Total word count: 3,000–4,000 words

- [ ] **Step 2: Check frontmatter**

Verify Published date is correct, Tags are complete, Lead accurately summarizes the post.

- [ ] **Step 3: Final commit**

```bash
git add input/posts/agentic-workflows-legacy-code-part-1.md
git commit -m "Part 1 complete: Agentic Workflows for Legacy Codebases"
```

---

## Notes for Execution

1. **Tasks 4–8 are blocked on user input.** Do not draft scenario sections without the author's personal example. Ask explicitly before drafting.
2. **Tasks 1, 3, 9, 10, 11 can be done without user input.** These can proceed in parallel or ahead of time.
3. **Task 2 (shell + frontmatter)** should be done first.
4. The order of scenario sections can flex — if the author has an example ready for Scenario 3 before Scenario 1, draft in that order.
