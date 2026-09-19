---
name: new-document
description: Use when creating or scaffolding a new Markdown document in a docs section of this repository, including blog posts, notes, reads, or another existing category.
---

# New Document

Create one safely named, dated Markdown scaffold without modifying other content.

## Required inputs

Collect both values before creating anything:

- `category`: an existing direct child of `docs`, such as `blog`, `notes`, or `reads`.
- `summary`: a short explanation of the document, used only to derive its filename.

Ask for any missing value. Do not use the summary as the title, description, tags, or body.

## Create the scaffold

From the repository root, run:

```bash
node .agents/skills/new-document/scripts/create-document.mjs --category "<category>" --summary "<summary>"
```

The helper generates the current local date and leaves explicit placeholders for `title`, `description`, `tags`, and body content.

## Boundaries

- Do not create a missing category directory.
- Never overwrite or rename an existing document.
- Do not regenerate section indexes, build the site, or edit any other file.
- If creation fails, report the error without attempting a workaround that weakens these safeguards.

Report the relative path printed by the helper.
