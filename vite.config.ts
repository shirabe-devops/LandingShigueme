import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Isso diz ao site para usar caminhos relativos
  // permitindo que ele funcione em qualquer subdiretório do GitHub Pages
  base: './', 
})
