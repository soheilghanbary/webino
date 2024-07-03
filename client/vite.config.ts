import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: '../dist',
    minify: true,
    cssMinify: true,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react/jsx-runtime']
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@server': path.resolve(import.meta.dirname, '../server'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
