import { defineConfig } from 'vite'
import { viteRequire } from 'vite-require'
export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    viteRequire(/* options */)
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
})
