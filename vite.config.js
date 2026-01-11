import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// HTTPS Configuration for React Frontend
// Set VITE_DISABLE_HTTPS=true in .env to use HTTP instead of HTTPS
const disableHTTPS = process.env.VITE_DISABLE_HTTPS === 'true'

const httpsConfig = (() => {
  // Skip HTTPS if explicitly disabled
  if (disableHTTPS) {
    console.log('ℹ️  HTTPS disabled via VITE_DISABLE_HTTPS=true')
    console.log('   Access at: http://localhost:5173')
    return false
  }

  const certPath = path.resolve(__dirname, 'ssl', 'cert.pem')
  const keyPath = path.resolve(__dirname, 'ssl', 'key.pem')
  
  // Check if SSL certificates exist
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    try {
      const cert = fs.readFileSync(certPath)
      const key = fs.readFileSync(keyPath)
      console.log('✅ HTTPS enabled with SSL certificates')
      console.log('   Access at: https://localhost:5173')
      console.log('   ⚠️  Browser will show "Not Secure" - this is normal for self-signed certificates')
      console.log('   Click "Advanced" → "Proceed to localhost" to accept the certificate')
      return { cert, key }
    } catch (error) {
      console.warn('⚠️  Warning: Could not read SSL certificates:', error.message)
      console.warn('   Falling back to HTTP. Run: node generate-ssl-cert.js')
      return false
    }
  } else {
    console.warn('⚠️  SSL certificates not found in ssl/ directory')
    console.warn('   HTTPS disabled. Access at: http://localhost:5173')
    console.warn('   To enable HTTPS, run: node generate-ssl-cert.js')
    return false
  }
})()

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
    host: '0.0.0.0', // ✅ Allow external connections
    port: 5173,
    strictPort: false, // ✅ Allow port fallback
    cors: true, // ✅ Enable CORS in dev server
    // ✅ HTTPS Configuration - Enable HTTPS if certificates exist
    https: httpsConfig || false, // Use HTTPS if certificates are available
    // ✅ Note: Self-signed certificates will show "Not Secure" in browser
    //    Click "Advanced" → "Proceed to localhost (unsafe)" to accept
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: httpsConfig ? 'wss' : 'ws' // Use WSS for HTTPS, WS for HTTP
    },
    // ✅ BURP SUITE FIX: Disable proxy by default to allow Burp Suite interception
    // The frontend API is configured to use direct backend URL (http://localhost:5050/api)
    // This ensures all API requests go through Burp Suite when browser proxy is configured
    // Set VITE_ENABLE_PROXY=true in .env to enable proxy for normal development
    proxy: process.env.VITE_ENABLE_PROXY === 'true' ? {
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
    } : {} // Empty proxy object - requests go directly to backend
  }
})
