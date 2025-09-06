import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.jsx', '.js', '.ts', '.tsx']
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.jsx'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://localhost:7108',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
