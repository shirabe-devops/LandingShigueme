import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://n8nwebhook.shirabe.com.br/webhook/lpshigueme',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => '' // Remove o /api/webhook e envia direto para a URL alvo
      }
    }
  },
  build: {
    outDir: 'dist',
  }
})