import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const sections = [
  { name: 'blog', title: 'Blog', showDate: true },
  { name: 'notes', title: 'Notes', showDate: true },
  { name: 'reads', title: 'Reads', showDate: false }
]

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return {}
  const end = text.indexOf('\n---', 3)
  if (end === -1) return {}
  const fm = text.slice(3, end).trim().split('\n')
  const out = {}
  for (const line of fm) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!m) continue
    out[m[1]] = m[2]
  }
  return out
}

function titleFromFilename(file) {
  const base = path.basename(file, '.md')
  return base.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function safeDate(value) {
  if (!value) return null
  const d = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

function formatDate(value) {
  const d = safeDate(value)
  if (!d) return ''
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d)
}

function buildIndex(section) {
  const sectionDir = path.join(root, 'docs', section.name)
  if (!fs.existsSync(sectionDir)) return

  const indexPath = path.join(sectionDir, 'index.md')

  const entries = fs
    .readdirSync(sectionDir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((file) => {
      const full = path.join(sectionDir, file)
      const text = fs.readFileSync(full, 'utf8')
      const fm = parseFrontmatter(text)
      const title = fm.title ? fm.title.replace(/^"|"$/g, '') : titleFromFilename(file)
      const date = fm.date ? fm.date.trim() : ''
      const description = (fm.description || fm.lead || '')
        .replace(/^"|"$/g, '')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      return { file, title, date, description }
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  const lines = ['---', `title: ${section.title}`, '---', '']

  let currentYear = null
  for (const e of entries) {
    const d = safeDate(e.date)
    const year = d ? d.getUTCFullYear() : 'Unknown'
    if (section.showDate) {
      if (year !== currentYear) {
        if (currentYear !== null) lines.push('')
        lines.push(`## ${year}`, '')
        currentYear = year
      }
    }

    const link = `/${section.name}/${e.file.replace(/\.md$/, '')}`
    const formattedDate = e.date ? formatDate(e.date) : ''

    lines.push('<div class="post-item">')
    lines.push(`  <h3><a href="${link}">${e.title}</a></h3>`)
    if (e.description) {
      lines.push(`  <p class="post-desc">${e.description}</p>`)
    }
    if (section.showDate && formattedDate) {
      lines.push(`  <p class="post-meta"><em>Posted on ${formattedDate}</em></p>`)
    }
    lines.push('</div>', '')
  }

  fs.writeFileSync(indexPath, lines.join('\n'), 'utf8')
}

for (const section of sections) {
  buildIndex(section)
}
