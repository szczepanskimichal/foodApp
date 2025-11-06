import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/foodApp/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: '0.0.0.0', // Pozwala na dostęp z innych urządzeń w sieci
    port: 5173,
    strictPort: false, // Automatycznie znajdzie wolny port jeśli 5173 jest zajęty
    hmr: {
      clientPort: 5173, // Poprawia HMR z VPN
    },
    // Optymalizacje dla VPN
    watch: {
      usePolling: true, // Lepsze dla niektórych VPN
      interval: 1000,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})