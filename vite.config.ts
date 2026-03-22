import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production-only workflow: use `vite build` then `vite preview` locally.
// No dev server — the app is always built with production optimizations.
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3000,
    open: true,
  },
  build: {
    // Explicit production defaults (Vite already uses these for `vite build`)
    minify: true,
    sourcemap: false,
  },
})
