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
