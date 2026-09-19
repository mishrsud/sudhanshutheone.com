# Agent-Agnostic New Document Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repository-local `new-document` skill that safely scaffolds dated Markdown files in any existing documentation section and is directly discoverable by Codex and Claude Code.

**Architecture:** Keep one canonical Agent Skills package under `.agents/skills/new-document`. A dependency-free Node.js helper owns deterministic validation, slug generation, date formatting, and exclusive file creation; a symlink exposes that same package through Claude Code's `.claude/skills` discovery path.

**Tech Stack:** Agent Skills `SKILL.md`, Node.js ES modules, built-in `node:test`, filesystem symlink

---

### Task 1: Build the document scaffold helper test-first

**Files:**
- Create: `.agents/skills/new-document/scripts/create-document.test.mjs`
- Create: `.agents/skills/new-document/scripts/create-document.mjs`

- [ ] **Step 1: Write the failing helper tests**

Create `.agents/skills/new-document/scripts/create-document.test.mjs`:

```js
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import {
  createDocument,
  formatLocalDate,
  slugify
} from './create-document.mjs'

const scriptPath = fileURLToPath(new URL('./create-document.mjs', import.meta.url))

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'new-document-'))
  fs.mkdirSync(path.join(root, 'docs', 'notes'), { recursive: true })
  return root
}

test('slugifies a summary as a readable kebab-case filename', () => {
  assert.equal(slugify('Résumé: Agents & Memory!'), 'resume-agents-memory')
  assert.equal(slugify("What's New in C#?"), 'whats-new-in-c')
})

test('formats a date using local calendar values', () => {
  assert.equal(formatLocalDate(new Date(2026, 8, 19, 23, 30)), '2026-09-19')
})

test('creates a document with placeholders and the supplied date', () => {
  const root = fixture()

  try {
    const output = createDocument({
      root,
      category: 'notes',
      summary: 'How Agents Remember Context',
      date: '2026-09-19'
    })

    assert.equal(
      output,
      path.join(root, 'docs', 'notes', 'how-agents-remember-context.md')
    )
    assert.equal(
      fs.readFileSync(output, 'utf8'),
      `---
title: "TODO: Add title"
description: "TODO: Add description"
date: 2026-09-19
tags:
- TODO
---

<!-- TODO: Write content. -->
`
    )
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('rejects unsafe, missing, or unusable inputs', () => {
  const root = fixture()

  try {
    assert.throws(
      () => createDocument({ root, category: '../notes', summary: 'Unsafe path' }),
      /category must contain only lowercase letters, numbers, and hyphens/
    )
    assert.throws(
      () => createDocument({ root, category: 'blog', summary: 'Missing category' }),
      /docs\/blog does not exist/
    )
    assert.throws(
      () => createDocument({ root, category: 'notes', summary: '' }),
      /summary is required/
    )
    assert.throws(
      () => createDocument({ root, category: 'notes', summary: '!!!' }),
      /summary must contain at least one letter or number/
    )
    assert.throws(
      () => createDocument({ root, category: 'notes', summary: 'Valid', date: '19-09-2026' }),
      /date must use YYYY-MM-DD/
    )
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('never overwrites an existing document', () => {
  const root = fixture()

  try {
    const options = {
      root,
      category: 'notes',
      summary: 'Existing Document',
      date: '2026-09-19'
    }
    createDocument(options)
    assert.throws(() => createDocument(options), /already exists/)
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

test('runs end-to-end through the command line', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'new-document-cli-'))
  fs.mkdirSync(path.join(root, 'docs', 'reads'), { recursive: true })

  try {
    const result = spawnSync(
      process.execPath,
      [
        scriptPath,
        '--root', root,
        '--category', 'reads',
        '--summary', 'Agent Memory: A Field Guide',
        '--date', '2026-09-19'
      ],
      { encoding: 'utf8' }
    )

    assert.equal(result.status, 0, result.stderr)
    assert.equal(
      result.stdout.trim(),
      'docs/reads/agent-memory-a-field-guide.md'
    )
    assert.equal(
      fs.existsSync(path.join(root, result.stdout.trim())),
      true
    )
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```bash
node --test .agents/skills/new-document/scripts/create-document.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `create-document.mjs`.

- [ ] **Step 3: Implement the minimal helper**

Create `.agents/skills/new-document/scripts/create-document.mjs`:

```js
#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)

export function slugify(summary) {
  return String(summary)
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatLocalDate(value = new Date()) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validateDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('date must use YYYY-MM-DD')
  }

  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error('date must be a valid calendar date')
  }
}

export function createDocument({
  root = process.cwd(),
  category,
  summary,
  date = formatLocalDate()
}) {
  if (!/^[a-z0-9-]+$/.test(category || '')) {
    throw new Error('category must contain only lowercase letters, numbers, and hyphens')
  }
  if (!String(summary || '').trim()) {
    throw new Error('summary is required')
  }

  const slug = slugify(summary)
  if (!slug) {
    throw new Error('summary must contain at least one letter or number')
  }
  validateDate(date)

  const categoryDir = path.join(path.resolve(root), 'docs', category)
  let categoryStat
  try {
    categoryStat = fs.statSync(categoryDir)
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`docs/${category} does not exist`)
    }
    throw error
  }
  if (!categoryStat.isDirectory()) {
    throw new Error(`docs/${category} is not a directory`)
  }

  const output = path.join(categoryDir, `${slug}.md`)
  const content = `---
title: "TODO: Add title"
description: "TODO: Add description"
date: ${date}
tags:
- TODO
---

<!-- TODO: Write content. -->
`

  try {
    fs.writeFileSync(output, content, { encoding: 'utf8', flag: 'wx' })
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(`docs/${category}/${slug}.md already exists`)
    }
    throw error
  }

  return output
}

function readOption(args, name, { required = false } = {}) {
  const index = args.indexOf(`--${name}`)
  if (index === -1) {
    if (required) throw new Error(`--${name} is required`)
    return undefined
  }
  const value = args[index + 1]
  if (!value || value.startsWith('--')) {
    throw new Error(`--${name} requires a value`)
  }
  return value
}

function main(args) {
  try {
    const root = readOption(args, 'root') || process.cwd()
    const output = createDocument({
      root,
      category: readOption(args, 'category', { required: true }),
      summary: readOption(args, 'summary', { required: true }),
      date: readOption(args, 'date') || formatLocalDate()
    })
    process.stdout.write(`${path.relative(path.resolve(root), output)}\n`)
  } catch (error) {
    process.stderr.write(`${error.message}\n`)
    process.exitCode = 1
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  main(process.argv.slice(2))
}
```

- [ ] **Step 4: Run the helper tests and verify GREEN**

Run:

```bash
node --test .agents/skills/new-document/scripts/create-document.test.mjs
```

Expected: six passing tests, zero failures.

- [ ] **Step 5: Commit the tested helper**

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git add .agents/skills/new-document/scripts/create-document.mjs .agents/skills/new-document/scripts/create-document.test.mjs
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git commit -m "Add new document scaffold helper"
```

Expected: the commit contains only the helper and its tests.

### Task 2: Add and expose the portable skill

**Files:**
- Create: `.agents/skills/new-document/scripts/skill-package.test.mjs`
- Create: `.agents/skills/new-document/SKILL.md`
- Create symlink: `.claude/skills/new-document`

- [ ] **Step 1: Write the failing package test**

Create `.agents/skills/new-document/scripts/skill-package.test.mjs`:

```js
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const skillRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const skillFile = path.join(skillRoot, 'SKILL.md')
const claudeSkill = path.resolve(skillRoot, '../../../.claude/skills/new-document')

test('uses portable Agent Skills metadata and documents the required inputs', () => {
  const content = fs.readFileSync(skillFile, 'utf8')
  assert.match(content, /^---\nname: new-document\ndescription: Use when /)
  assert.match(content, /category/)
  assert.match(content, /summary/)
  assert.doesNotMatch(content, /allowed-tools|disable-model-invocation|agents\/openai\.yaml/)
})

test('Claude discovers the canonical skill through a symlink', () => {
  assert.equal(fs.lstatSync(claudeSkill).isSymbolicLink(), true)
  assert.equal(fs.realpathSync(claudeSkill), fs.realpathSync(skillRoot))
})
```

- [ ] **Step 2: Run the package test and verify RED**

Run:

```bash
node --test .agents/skills/new-document/scripts/skill-package.test.mjs
```

Expected: FAIL with `ENOENT` because `SKILL.md` does not exist.

- [ ] **Step 3: Write the minimal provider-neutral skill**

Create `.agents/skills/new-document/SKILL.md`:

```markdown
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
```

- [ ] **Step 4: Add the Claude Code discovery symlink**

Run:

```bash
mkdir -p .claude/skills
ln -s ../../.agents/skills/new-document .claude/skills/new-document
```

Expected: `.claude/skills/new-document/SKILL.md` resolves to the canonical `.agents` skill.

- [ ] **Step 5: Run package and standards validation**

Run:

```bash
node --test .agents/skills/new-document/scripts/skill-package.test.mjs
python3 /Users/sudhanshu/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/new-document
```

Expected: two package tests pass and the validator reports `Skill is valid!`.

- [ ] **Step 6: Commit the portable skill package**

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git add .agents/skills/new-document/SKILL.md .agents/skills/new-document/scripts/skill-package.test.mjs .claude/skills/new-document
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git commit -m "Add agent-agnostic new document skill"
```

Expected: the commit contains the canonical skill instructions, package test, and Claude discovery symlink.

### Task 3: Verify the complete workflow

**Files:**
- Verify: `.agents/skills/new-document/SKILL.md`
- Verify: `.agents/skills/new-document/scripts/create-document.mjs`
- Verify: `.claude/skills/new-document`

- [ ] **Step 1: Run every skill test together**

Run:

```bash
node --test .agents/skills/new-document/scripts/*.test.mjs
```

Expected: eight passing tests, zero failures. The CLI test proves an isolated end-to-end scaffold without changing the repository's `docs` tree.

- [ ] **Step 2: Re-run the standard skill validator**

Run:

```bash
python3 /Users/sudhanshu/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/new-document
```

Expected: `Skill is valid!`.

- [ ] **Step 3: Verify both discovery paths resolve to one package**

Run:

```bash
test "$(realpath .claude/skills/new-document)" = "$(realpath .agents/skills/new-document)"
test -f .claude/skills/new-document/SKILL.md
```

Expected: both commands exit successfully.

- [ ] **Step 4: Review the final commits and preserve unrelated work**

Run:

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git show --check --stat --oneline HEAD~1..HEAD
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git status --short
```

Expected: the skill commits contain only `.agents/skills/new-document` and `.claude/skills/new-document`; all pre-existing unstaged documentation and mockup files remain untouched.
