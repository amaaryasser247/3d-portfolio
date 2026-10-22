import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Relative asset base so the build works on GitHub Pages project URLs
  // (https://<user>.github.io/3d-portfolio/) and on root domains alike.
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}));
