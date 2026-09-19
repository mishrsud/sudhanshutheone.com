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
