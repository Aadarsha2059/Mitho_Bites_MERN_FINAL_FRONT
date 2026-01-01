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
  },
  server: {
    host: '0.0.0.0', // ✅ Allow external connections (Burp Suite)
    port: 5173,
    strictPort: false, // ✅ Allow port fallback
    cors: true, // ✅ Enable CORS in dev server
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true, // ✅ Important for CORS
        secure: false,
        ws: true, // ✅ WebSocket support
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
