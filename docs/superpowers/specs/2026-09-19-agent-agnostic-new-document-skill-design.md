# Agent-Agnostic New Document Skill Design

## Goal

Create a repository-local skill that scaffolds a Markdown document in any existing `docs/<category>/` section. The same canonical skill must be directly invocable from Codex, Claude Code, and other tools that support the Agent Skills standard.

## Distribution

The canonical skill will live at:

```text
.agents/skills/new-document/
```

Claude Code will discover the same files through this symlink:

```text
.claude/skills/new-document -> ../../.agents/skills/new-document
```

The canonical `SKILL.md` will use only the standard `name` and `description` frontmatter fields and provider-neutral instructions. It will not contain Codex- or Claude-specific tool syntax.

## Inputs and Invocation

The workflow requires:

- `category`: the name of an existing direct child directory under `docs`, such as `blog`, `notes`, or `reads`;
- `summary`: a short description used only to derive the filename.

If either value is missing, the invoking agent asks for it before running the scaffold script. The summary does not populate any document frontmatter or body content.

Example invocations include `$new-document` in Codex and `/new-document` in Claude Code.

## Generated Document

The helper converts the summary to a lowercase kebab-case slug and creates:

```text
docs/<category>/<slug>.md
```

For example, `How Agents Remember Context` becomes `how-agents-remember-context.md`.

The document contains:

```markdown
---
title: "TODO: Add title"
description: "TODO: Add description"
date: YYYY-MM-DD
tags:
- TODO
---

<!-- TODO: Write content. -->
```

The date uses the machine's current local date at execution time. All other values remain explicit placeholders.

## Components

### Skill instructions

`.agents/skills/new-document/SKILL.md` explains when the skill applies, gathers missing inputs, runs the helper, and reports the created path. It remains concise and agent-neutral.

### Scaffold helper

`.agents/skills/new-document/scripts/create-document.mjs` performs deterministic path validation, slug generation, date formatting, file creation, and overwrite protection. It uses only Node.js built-ins so no dependency installation is needed.

The helper accepts optional root and date overrides solely to make isolated automated tests deterministic. Normal skill usage omits both and uses the repository root and current local date.

### Automated tests

`.agents/skills/new-document/scripts/create-document.test.mjs` uses `node:test` and temporary directories to verify filename generation, exact frontmatter, existing-category validation, unsafe-category rejection, empty-slug rejection, and overwrite protection.

## Safety and Error Handling

- Accept category names containing lowercase letters, numbers, and hyphens only.
- Require `docs/<category>/` to exist and be a directory.
- Reject path traversal, absolute paths, empty summaries, and summaries that produce an empty slug.
- Use exclusive file creation so an existing document is never overwritten, including under concurrent invocation.
- Create only the requested Markdown document; do not regenerate indexes, build the site, or modify other content.
- On failure, leave existing files unchanged and return a clear error.

## Verification

- Run the helper's Node test suite.
- Run the standard skill validator against the canonical skill folder.
- Verify the Claude path resolves to the canonical skill.
- Perform an isolated end-to-end scaffold in a temporary documentation tree and inspect the created path and contents.
