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
