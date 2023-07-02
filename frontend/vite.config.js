import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@UI': path.resolve(__dirname, 'src/components/UI'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
});
