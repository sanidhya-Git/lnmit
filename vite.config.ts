import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: 'public/newtab.html'
      },
      output: {
        entryFileNames: (chunk) => {
          // ensure background service worker has specific name so manifest.json's background.js matches
          if (chunk.name === 'background') return 'background.js';
          return 'assets/[name]-[hash].js';
        }
      }
    }
  }
});
