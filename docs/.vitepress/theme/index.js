import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import RecentPosts from './RecentPosts.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('RecentPosts', RecentPosts)
  }
}
