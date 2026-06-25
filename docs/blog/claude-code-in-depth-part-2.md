---
title: "Claude Code in Depth, Part 2: Claude Code Remembers (If You Help It)"
description: "Every session starts with a blank slate. What carries across is entirely up to you, and knowing the three mechanisms that make it work is the difference between coherent multi-session work and context rot."
date: 2026-04-18
tags:
- AI
- Claude-Code
- Software-engineering
- Productivity
- AI-Coding-Agents
---

## Prologue

The first thing that surprises people about Claude Code is how much it can do. The second
thing that surprises them is how much it forgets.

Every session starts fresh. The context window, Claude Code's working memory, begins
empty each time you run `claude`. Anything from your previous session: the plan you
refined over two hours, the codebase conventions you explained, the specific warning about
the auth module. Gone, unless you put it somewhere that persists.

That is not a bug. It is a design choice, and once you understand why it exists, the
solution becomes obvious. The question is not "how do I make Claude Code remember
everything?" It is "what should it remember, and how do I make sure that knowledge is
where it needs to be?"

This post is about that problem. It covers the three mechanisms that carry knowledge
across sessions, the pattern for managing a session as context fills up, and what I
actually put in my own memory files, and what I deliberately leave out.

## A Fresh Start, Every Time

![Context window filling up](images/context-window-filling.png)

A session in Claude Code begins when you run `claude` in your terminal and ends when you
exit. Within a session, Claude holds everything in a context window: your messages, its
responses, every file it reads, every tool output, every plan it writes.

That window is 200,000 tokens. It sounds large until you run a complex task for an hour.
File reads, shell output, git history. It all accumulates. When the window fills, Claude
Code automatically compacts: it summarises the conversation history and discards the raw
transcript, keeping only what it judges important. You can trigger this yourself with
`/compact` if you want to compress early. Run `/context` at any point to see a live
breakdown of how your tokens are being spent.

The problem is what happens before compaction. Context does not degrade all at once. It
degrades gradually. Instructions given early in a long session get pushed further from
the active window. Rules that were clear at the start start to feel optional. The model's
output shifts in ways that are hard to diagnose because the cause is invisible.

I learned this the hard way. Before I understood how context rot works, I tried to go too
far in a single session: no spec, no task list, just a rough idea and an optimistic
prompt. What came back was code that missed requirements, a hallucinated database schema,
and a broken build. The model was not failing. It was working with degraded context and
filling the gaps with plausible-looking fiction.

That failure mode has a name. Matt Pocock calls it the reason you need the
Plan/Execute/Clear loop. Ray Amjad frames it as "avoiding context traps." Both are
describing the same thing: context fills up, coherence degrades, and if you are not
actively managing it, you will not notice until the output is already wrong.

## What Carries Across

![Memory mechanisms in Claude Code](images/claude-memory-mechanisms.png)

Two mechanisms are designed to survive session boundaries: CLAUDE.md files, which you
write, and auto memory, which Claude writes. Together they form the persistent layer that
makes multi-session work coherent.

CLAUDE.md is the simpler of the two. It is a plain markdown file that Claude Code reads
at the start of every session. Anything in it is available from the first prompt. Write
it for the things you would otherwise re-explain: project structure, naming conventions,
build commands, definition of done.

There are four scopes. The project-level file (`./CLAUDE.md` or `./.claude/CLAUDE.md`)
is committed to the repository and shared with the team. The user-level file
(`~/.claude/CLAUDE.md`) applies to every project on your machine. The local file
(`./CLAUDE.local.md`) is gitignored and personal: sandbox URLs, preferred test data,
anything you do not want to commit. An organisation-level managed policy file exists for
teams that want to enforce standards centrally.

My own project CLAUDE.md is deliberately short. I document the brief purpose and
structure of the project, naming and test naming conventions, BDD-style throughout, and the definition of done: changes or additions must have test coverage, and
all tests must pass. Specific build or test commands go in. That is roughly it.

What I leave out is just as deliberate. I do not try to document every detail, especially
anything the agent can discover itself by reading the code. A bloated CLAUDE.md costs
tokens and reduces adherence. Keep it to what Claude cannot infer, and what you do not
want to re-explain.

Ray Amjad's framing from [Master Claude Code](https://www.masterclaudecode.com/) puts it
well: CLAUDE.md is a steering mechanism, not documentation. You are not writing a spec
for a human reader. You are writing standing instructions for an agent.

Auto memory is the complementary system. Claude writes it, not you. When it learns
something worth keeping, such as a build command, a pattern you corrected, or a debugging
insight, it saves a note to `~/.claude/projects/<project>/memory/`. The index file `MEMORY.md` is
loaded at the start of every session (up to the first 200 lines or 25KB). Topic files
like `debugging.md` are loaded on demand, not at startup.

Claude does not save after every session. It decides whether the information would be
useful in a future conversation. The result is a growing knowledge base that does not
require your attention most of the time. Run `/memory` inside a session to browse, edit,
or delete what it has saved.

The honest limitation: auto memory is only as good as your sessions. It learns from
corrections and patterns. If a session degrades before Claude notices a mistake, that
degraded behaviour does not get remembered. Neither does the correction. The
deliberate management you do is what makes the memory reliable.

## The Rhythm That Keeps Sessions Coherent

![Engineer managing context rhythm](images/engineer-managing-context.png)

Understanding the memory mechanisms is necessary. Actively managing the context window is
what actually keeps sessions from going sideways.

My current setup uses the [`ccstatusline`](https://www.npmjs.com/package/ccstatusline)
package (`npx ccstatusline@latest`) to surface three status lines in the
terminal: model, context usage, and git branch on the first; session ID, context
percentage, and effort level on the second; and the current working directory on the
third. Having context percentage visible at a glance changes how I work.

When context approaches 60%, I stop and do three things. I make sure the task list is
current. I make sure the plan reflects the actual state of the work. I save anything that
needs saving. Then I decide: `/compact` if I want to keep the thread going (it
compresses conversation history and continues the session), or `/clear` if I am moving to
the next task and want a clean window.

Matt Pocock calls this the Plan/Execute/Clear loop. His framing in
[Claude Code for Real Engineers](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04)
is that the loop is not a workaround for context limitations. It is how you design
multi-session work. Features that exceed a single session's context budget should be
planned that way from the start, broken into context-window-sized chunks where each chunk
has a clear entry and exit state.

After `/compact`, Claude re-reads and re-injects the project-root CLAUDE.md from disk.
That is the mechanism that makes the rhythm work: standing instructions in CLAUDE.md
survive compaction. Instructions that only live in the conversation do not.

One limitation worth naming: compaction summarises, and it can misjudge. Important nuance
from early in a session can get compressed away. If post-compaction behaviour starts
drifting, the fix is usually to move the relevant context into CLAUDE.md or the task
file explicitly, not to rely on the summary to carry it.

## Epilogue

Context management is the governance question of the session. You are deciding what Claude
Code gets to hold in working memory, what it accumulates across sessions, and when to
reset. Done deliberately, this is what separates a session that builds toward something
from one that drifts into plausible-looking fiction.

Much of how I think about this was shaped by two educators who have put serious time into
Claude Code: Ray Amjad at [Master Claude Code](https://www.masterclaudecode.com/), over
1,800 hours in since March 2025, and Matt Pocock's cohort
[Claude Code for Real Engineers](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04).
Both arrived at similar conclusions from different angles, and I am grateful for the
clarity their content brought to my own practice.

The next post is about skills: the extension mechanism that lets you encode repeatable
workflows into Claude Code and invoke them on demand. Skills are, in a sense, the next
level of the same question: what do you want Claude Code to know before you start, and
how do you give it that without stuffing it all into CLAUDE.md?

## References

- [How Claude remembers your project](https://code.claude.com/docs/en/memory): Claude Code Docs
- [Explore the context window](https://code.claude.com/docs/en/context-window): Claude Code Docs
- [Master Claude Code](https://www.masterclaudecode.com/): Ray Amjad
- [Claude Code for Real Engineers](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04): Matt Pocock
- [ccstatusline](https://www.npmjs.com/package/ccstatusline): context usage status line for Claude Code
- [Claude Code in Depth, Part 1: Beyond the Autocomplete](/blog/claude-code-in-depth-part-1)
