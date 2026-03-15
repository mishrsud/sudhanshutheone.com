import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  transform(data) {
    return data
      .filter(({ frontmatter }) => frontmatter.date)
      .sort((a, b) => {
        const da = a.frontmatter.date instanceof Date ? a.frontmatter.date : new Date(a.frontmatter.date)
        const db = b.frontmatter.date instanceof Date ? b.frontmatter.date : new Date(b.frontmatter.date)
        return db - da
      })
      .slice(0, 2)
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        description: frontmatter.description || frontmatter.lead || '',
        date: frontmatter.date instanceof Date
          ? frontmatter.date.toISOString().slice(0, 10)
          : frontmatter.date
      }))
  }
})
