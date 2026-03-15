<template>
  <div class="recent-posts">
    <h2 class="recent-posts__heading">Recent Posts</h2>
    <div v-for="post in posts" :key="post.url" class="post-item">
      <h3><a :href="post.url">{{ post.title }}</a></h3>
      <p v-if="post.description" class="post-desc">{{ post.description }}</p>
      <p v-if="post.date" class="post-meta"><em>{{ formatDate(post.date) }}</em></p>
    </div>
    <a href="/blog/" class="recent-posts__all">View all posts →</a>
  </div>
</template>

<script setup>
import { data as posts } from '../posts.data.mjs'

function formatDate(value) {
  const d = value instanceof Date ? value : new Date(`${value}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d)
}
</script>

<style scoped>
.recent-posts {
  margin: 2rem 0 3rem;
}

.recent-posts__heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
}

.recent-posts__all {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.recent-posts__all:hover {
  text-decoration: underline;
}
</style>
