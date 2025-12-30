
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  define: {
    // If you need process.env.NODE_ENV specifically, you can leave it, but removing the catch-all is safer.
    // However, some legacy libs might need it. For now, we remove the unsafe catch-all.
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
