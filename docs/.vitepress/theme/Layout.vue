<script setup>
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter, page } = useData()
const route = useRoute()

const section = computed(() => {
  const path = route.path || ''
  if (path.startsWith('/blog/')) {
    return { label: 'Blog', isIndex: path === '/blog/' || path === '/blog/index' }
  }
  if (path.startsWith('/notes/')) {
    return { label: 'Notes', isIndex: path === '/notes/' || path === '/notes/index' }
  }
  if (path.startsWith('/reads/')) {
    return { label: 'Reads', isIndex: path === '/reads/' || path === '/reads/index' }
  }
  return null
})

const title = computed(() => frontmatter.value?.title || page.value.title || '')

const tags = computed(() => {
  const raw = frontmatter.value?.tags
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.map(tag => String(tag).trim()).filter(Boolean)
  }
  return String(raw)
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
})

const dateText = computed(() => {
  const raw = frontmatter.value?.date
  if (!raw) return ''
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const showPostHeader = computed(() => {
  return section.value && !section.value.isIndex && (title.value || dateText.value || tags.value.length)
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <div v-if="showPostHeader" class="post-header">
        <p class="post-header__eyebrow">{{ section?.label }}</p>
        <h1 class="post-header__title">{{ title }}</h1>
        <p v-if="frontmatter.description" class="post-header__desc">
          {{ frontmatter.description }}
        </p>
        <div class="post-header__meta">
          <span v-if="dateText" class="post-header__date">Posted on {{ dateText }}</span>
          <div v-if="tags.length" class="post-header__tags">
            <span v-for="tag in tags" :key="tag" class="post-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
