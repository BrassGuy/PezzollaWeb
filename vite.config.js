import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // project root is PezzollaWeb directory
  server: {
    port: 3000,
  },
}); 