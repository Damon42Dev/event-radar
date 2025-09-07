import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import fs from 'fs'

const manifest = JSON.parse(
  fs.readFileSync(new URL('./public/manifest.json', import.meta.url), 'utf-8')
)

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

