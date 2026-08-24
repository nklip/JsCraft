import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // keep the output directory CRA used
  },
  test: {
    globals: true,          // so tests keep using bare test/expect, as they did under CRA
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
})
