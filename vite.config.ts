import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion') || id.includes('gsap')) return 'motion'
          if (id.includes('node_modules/react') || id.includes('react-router-dom')) return 'vendor'
        },
      },
    },
  },
})
