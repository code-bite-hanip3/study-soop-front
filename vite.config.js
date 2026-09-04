import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'node:path';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 백엔드(포트 30000)로 프록시
      '/api': {
        target: 'http://localhost:30000',
        changeOrigin: true,
      },
    },
  },
});