import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Sudhanshu Mishra',
  description: "Sudhanshu Mishra's personal website and blog",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'Reads', link: '/reads/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Talks', link: '/talks' },
      { text: 'About', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mishrsud' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/sudhanshutheone/' },
      { icon: 'twitter', link: 'https://twitter.com/sudhanshutheone' }
    ],
    footer: {
      message: `<span class="site-footer">
        <span>Elsewhere</span>
        <span class="site-footer__links">
          <a class="site-footer__link" href="https://www.linkedin.com/in/sudhanshutheone/" target="_blank" rel="noreferrer">
            <svg class="site-footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M22.225 0h-20.45C.792 0 0 .774 0 1.727v20.545C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.727C24 .774 23.2 0 22.222 0h.003zM7.119 20.452H3.555V9h3.564v11.452zM5.337 7.433A2.067 2.067 0 1 1 5.337 3.3a2.067 2.067 0 0 1 0 4.133zm15.115 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.357V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.603 0 4.267 2.37 4.267 5.455v6.288z"></path>
            </svg>
            LinkedIn
          </a>
          <a class="site-footer__link" href="https://github.com/mishrsud" target="_blank" rel="noreferrer">
            <svg class="site-footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.096 3.293 9.41 7.863 10.94.575.104.785-.25.785-.556 0-.274-.01-1.002-.016-1.967-3.197.694-3.872-1.542-3.872-1.542-.523-1.329-1.277-1.684-1.277-1.684-1.043-.713.08-.698.08-.698 1.152.082 1.758 1.184 1.758 1.184 1.025 1.757 2.691 1.25 3.347.956.104-.742.401-1.25.73-1.538-2.553-.29-5.236-1.277-5.236-5.684 0-1.256.448-2.284 1.184-3.088-.119-.29-.513-1.459.112-3.043 0 0 .965-.309 3.162 1.18.918-.255 1.902-.382 2.88-.386.979.004 1.964.131 2.884.386 2.195-1.489 3.159-1.18 3.159-1.18.627 1.584.233 2.753.114 3.043.738.804 1.184 1.832 1.184 3.088 0 4.418-2.688 5.39-5.25 5.676.412.355.78 1.055.78 2.128 0 1.538-.014 2.779-.014 3.157 0 .309.207.666.792.553C20.21 21.406 23.5 17.094 23.5 12 23.5 5.648 18.352.5 12 .5z"></path>
            </svg>
            GitHub
          </a>
          <a class="site-footer__link" href="https://twitter.com/sudhanshutheone" target="_blank" rel="noreferrer">
            <svg class="site-footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.556-3.594-1.556-2.72 0-4.924 2.204-4.924 4.924 0 .39.045.765.127 1.124-4.09-.205-7.719-2.164-10.148-5.144-.424.729-.666 1.574-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.016-.637.961-.689 1.8-1.56 2.46-2.548z"></path>
            </svg>
            Twitter
          </a>
        </span>
      </span>`
    }
  }
})
