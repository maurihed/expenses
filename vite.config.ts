import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'node:url'


const manifestPWA: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Gastos',
    short_name: 'Gastos',
    description: 'App para registrar tus gastos',
    icons: [
      {
        src: '/expenses-logo-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/expenses-logo-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/expenses-logo-180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon'
      },
      {
        src: '/maskable-icon.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any maskable'
      },
    ],
    theme_color: '#171717',
    background_color: '#e8ebf2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestPWA)],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
    ]
  }
})
