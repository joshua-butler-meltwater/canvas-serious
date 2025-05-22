import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-figma-assets',
      resolveId(id) {
        if (id.startsWith('figma:asset/')) {
          // Use a resolved path relative to the project root
          return '/Users/joshuabutler/Downloads/AIChatInput/imports/figma-assets-mock.ts';
        }
        return null;
      }
    }
  ],
  resolve: {
    alias: {
      '@': '/Users/joshuabutler/Downloads/AIChatInput',
    },
  },
  base: '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
});
