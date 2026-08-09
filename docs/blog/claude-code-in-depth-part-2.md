---
title: "Claude Code in Depth, Part 2: Claude Code Remembers (If You Help It)"
description: "Every session starts with a blank slate. What carries across is entirely up to you, and knowing the three systems that make it work is the difference between coherent multi-session work and context rot."
date: 2026-04-18
tags:
- AI
- Claude-Code
- Software-engineering
- Productivity
- AI-Coding-Agents
---

Every session starts fresh. Claude Code's working memory begins empty each time you run `claude`. The plan you spent two hours refining, the conventions you explained, the warning about the auth module. Gone, unless you put it somewhere that persists.

This is by design. The real question is not how to make it remember everything, but what should carry across and how.

## A fresh start, every time

![Context window filling up](images/context-window-filling.png)

A session runs in a 200,000 token window. It sounds roomy until you spend an hour on something complex. File reads, shell output, git history. It all piles up. When it gets tight, Claude Code compacts: it summarizes the conversation and drops the raw transcript, keeping what it judges important. Run `/compact` to trigger this early. Run `/context` to see where your tokens went.

The tricky part is what happens before compaction. Context degrades gradually, not all at once. Instructions from early in a long session drift away from the active window. Rules that were clear turn fuzzy. Output shifts in ways you struggle to diagnose because the cause is invisible.

I learned this the hard way. I used to run long sessions with no spec, no task list, just a rough idea and an optimistic prompt. What came back: missing requirements, a hallucinated database schema, a broken build. The model was not failing. It was working with degraded context and filling the gaps with plausible fiction.

Matt Pocock calls this the reason you need the Plan/Execute/Clear loop. Ray Amjad frames it as "avoiding context traps." Both describe the same thing: context fills up, coherence degrades, and if you are not actively managing it, you will not notice until the output is already wrong.

## What carries across

![Memory systems in Claude Code](images/claude-memory-mechanisms.png)

Two systems survive session boundaries: CLAUDE.md files, which you write, and auto memory, which Claude writes. Together they make multi-session work possible.

CLAUDE.md is the simpler of the two. A plain markdown file that Claude Code reads at the start of every session. Anything in it is available from the first prompt. Write it for the things you would re-explain: project structure, naming conventions, build commands, definition of done.

Four scopes exist. The project-level file (`./CLAUDE.md` or `./.claude/CLAUDE.md`) is committed and shared with the team. The user-level file (`~/.claude/CLAUDE.md`) applies to every project on your machine. The local file (`./CLAUDE.local.md`) is gitignored and personal: sandbox URLs, preferred test data, anything you do not want to commit. An organisation-level managed policy file exists for teams that want to enforce standards centrally.

My own project CLAUDE.md is short. I document the project purpose, structure, naming conventions, BDD-style throughout, and the definition of done: changes or additions must have test coverage, and all tests must pass. Specific build or test commands go in. That is roughly it.

What I leave out matters too. I skip anything the agent can learn by reading the code. A bloated CLAUDE.md costs tokens and reduces adherence. Keep it to what Claude cannot infer, and what you do not want to re-explain.

Ray Amjad puts it well: CLAUDE.md is a steering mechanism, not documentation. You are writing standing instructions for an agent, not a spec for a human reader.

Auto memory is the counterpart. Claude writes it, not you. When it learns something worth keeping, a build command, a pattern you corrected, a debugging insight, it saves a note to `~/.claude/projects/<project>/memory/`. The index file `MEMORY.md` loads at the start of every session (up to the first 200 lines or 25KB). Topic files like `debugging.md` load on demand, not at startup.

Claude decides whether the information would be useful in a future conversation. It does not save after every session. Run `/memory` inside a session to browse, edit, or delete what it has stored.

The catch: auto memory is only as good as your sessions. It learns from corrections and patterns. If a session degrades before Claude spots a mistake, that degraded behaviour does not get remembered. Neither does the correction. Making the memory reliable requires deliberate management.

## The rhythm that keeps sessions coherent

![Engineer managing context rhythm](images/engineer-managing-context.png)

Understanding the memory systems helps. Actively managing the context window is what keeps sessions from going sideways.

My current setup uses the [`ccstatusline`](https://www.npmjs.com/package/ccstatusline) package (`npx ccstatusline@latest`) to show model, context usage, git branch, session ID, context percentage, and working directory on three status lines. Seeing context percentage at a glance changes how I work.

When context approaches 60%, I stop and do three things. Update the task list. Update the plan to reflect the actual state of the work. Save anything that needs saving. Then I decide: `/compact` if I want to keep the thread going, or `/clear` if I am moving to the next task and want a clean window.

Matt Pocock calls this the Plan/Execute/Clear loop. His framing is that the loop is not a workaround. Features that exceed a single session's context budget should be planned that way from the start, broken into context-window-sized chunks where each chunk has a clear entry and exit state.

After `/compact`, Claude re-reads the project CLAUDE.md from disk. Standing instructions survive compaction. Instructions that only live in the conversation do not.

One caveat: compaction summarizes, and summaries lose nuance. Important details from early in a session can get compressed away. If post-compaction drift appears, move the relevant context into CLAUDE.md or the task file explicitly. Do not rely on the summary to carry it.

## Epilogue

Context management is the governance question of the session. You decide what Claude Code keeps in working memory, what it accumulates across sessions, and when to reset. Done deliberately, this is what separates a session that builds toward something from one that drifts into plausible fiction.

Much of how I think about this was shaped by Ray Amjad and Matt Pocock, two people who have put serious time into Claude Code. Ray has logged over 1,800 hours since March 2025. Matt runs a cohort called Claude Code for Real Engineers. Both arrived at similar conclusions from different angles, and I am grateful for the clarity their work brought to my own practice.

The next post is about skills: the extension system for encoding repeatable workflows into Claude Code. Skills are the next level of the same question: what do you want Claude Code to know before you start, and how do you give it that without stuffing everything into CLAUDE.md?

## References

- [How Claude remembers your project](https://code.claude.com/docs/en/memory): Claude Code Docs
- [Explore the context window](https://code.claude.com/docs/en/context-window): Claude Code Docs
- [Master Claude Code](https://www.masterclaudecode.com/): Ray Amjad
- [Claude Code for Real Engineers](https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04): Matt Pocock
- [ccstatusline](https://www.npmjs.com/package/ccstatusline): context usage status line for Claude Code
- [Claude Code in Depth, Part 1: Beyond the Autocomplete](/blog/claude-code-in-depth-part-1)
