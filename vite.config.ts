import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools(), UnoCSS()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
