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
    // chakra-dayzed-datepicker has no "exports" map, so tests resolve it by
    // "main" to its CommonJS build, which require()s Chakra's CommonJS build,
    // while the app imports Chakra's ES module build. The two hold separate
    // React contexts, and the date picker finds no ChakraProvider. Pointing
    // the tests at the picker's ES module build ("module", which the app
    // build already uses) and running it through Vite gives it the same
    // Chakra as everything else.
    alias: {
      'chakra-dayzed-datepicker': 'chakra-dayzed-datepicker/dist/chakra-dayzed-datepicker.esm.js',
    },
    server: {
      deps: {
        inline: ['chakra-dayzed-datepicker'],
      },
    },
  },
})
