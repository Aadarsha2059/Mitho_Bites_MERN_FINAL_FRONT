import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
    css: true,
    exclude: [
      'tests/e2e/**',
      '**/*.spec.js',
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '**/msw/**',
      '**/test-utils/**',
      '**/setup.js',
    ]
  }
})
