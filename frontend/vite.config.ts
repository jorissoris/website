import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process?.env?.REMOTE_API ?? 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
});
