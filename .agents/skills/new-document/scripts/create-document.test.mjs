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
