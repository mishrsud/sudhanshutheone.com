# Reads Index Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the generated Reads index produce the same year-based VitePress page outline and formatted dates as the Notes index.

**Architecture:** Keep the shared section-index generator unchanged except for enabling its existing date-grouping path for `reads`. Verify behavior through a black-box Node test that runs the generator against a temporary documentation tree, then verify the real VitePress build emits outline links for the Reads years.

**Tech Stack:** Node.js ES modules, built-in `node:test`, VitePress 1.6, Markdown

---

### Task 1: Cover Reads date grouping with a regression test

**Files:**
- Create: `tools/generate-section-indexes.test.mjs`

- [ ] **Step 1: Write the failing black-box test**

Create `tools/generate-section-indexes.test.mjs`:

```js
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const generator = fileURLToPath(new URL('./generate-section-indexes.mjs', import.meta.url))

test('groups Reads entries by year and renders their publication dates', () => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'section-indexes-'))

  try {
    const readsDir = path.join(fixtureRoot, 'docs', 'reads')
    fs.mkdirSync(readsDir, { recursive: true })
    fs.writeFileSync(
      path.join(readsDir, 'newer-book.md'),
      `---
title: Newer Book
description: The newer read.
date: 2026-09-19
---
`
    )
    fs.writeFileSync(
      path.join(readsDir, 'older-book.md'),
      `---
title: Older Book
description: The older read.
date: 2020-08-12
---
`
    )

    execFileSync(process.execPath, [generator], { cwd: fixtureRoot })

    const index = fs.readFileSync(path.join(readsDir, 'index.md'), 'utf8')
    assert.match(index, /## 2026/)
    assert.match(index, /Posted on Saturday, 19 September 2026/)
    assert.match(index, /## 2020/)
    assert.match(index, /Posted on Wednesday, 12 August 2020/)
    assert.ok(index.indexOf('## 2026') < index.indexOf('## 2020'))
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true })
  }
})
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```bash
node --test tools/generate-section-indexes.test.mjs
```

Expected: FAIL because the generated Reads index does not contain `## 2026` or a `Posted on ...` line.

### Task 2: Enable existing date presentation for Reads

**Files:**
- Modify: `tools/generate-section-indexes.mjs:9`

- [ ] **Step 1: Apply the minimal generator change**

Change the Reads section entry from:

```js
{ name: 'reads', title: 'Reads', showDate: false }
```

to:

```js
{ name: 'reads', title: 'Reads', showDate: true }
```

- [ ] **Step 2: Run the focused test and verify it passes**

Run:

```bash
node --test tools/generate-section-indexes.test.mjs
```

Expected: one passing test, zero failures.

- [ ] **Step 3: Regenerate the real section indexes**

Run:

```bash
node tools/generate-section-indexes.mjs
```

Expected: `docs/reads/index.md` contains `## 2026`, `## 2020`, and formatted publication dates. Preserve the user's existing Reads article and generated-index edits; do not stage unrelated content changes.

- [ ] **Step 4: Commit the tested generator behavior**

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git add tools/generate-section-indexes.mjs tools/generate-section-indexes.test.mjs
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git commit -m "Show year sidebar on reads index"
```

Expected: the commit contains only the generator and its regression test.

### Task 3: Verify the production documentation build

**Files:**
- Verify generated file: `docs/reads/index.md`
- Verify build output: `docs/.vitepress/dist/reads/index.html`

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run docs:build
```

Expected: VitePress completes successfully with no dead-link or compilation errors.

- [ ] **Step 2: Verify the generated Markdown**

Run:

```bash
rg -n '^## 2026$|^## 2020$|Posted on' docs/reads/index.md
```

Expected: both year headings and one formatted date line for each Reads entry are present.

- [ ] **Step 3: Verify the built sidebar anchors**

Run:

```bash
rg -o 'href="#_2026"|href="#_2020"' docs/.vitepress/dist/reads/index.html
```

Expected: the rendered Reads HTML contains links to both year headings, confirming VitePress generated the anchors used by the page outline. VitePress prefixes numeric-only heading slugs with `_`, matching the Notes build.

- [ ] **Step 4: Review the final diff**

Run:

```bash
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git diff -- tools/generate-section-indexes.mjs tools/generate-section-indexes.test.mjs docs/reads/index.md
DEVELOPER_DIR=/Library/Developer/CommandLineTools /usr/bin/git status --short
```

Expected: generator behavior and its test are committed; `docs/reads/index.md` reflects the correct generated layout while the user's pre-existing content changes remain unstaged.
