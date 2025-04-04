import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000 // 5MB بدل 2MB
      },
      manifest: {
        name: 'Real Estate CRM',
        short_name: 'CRM',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        "id": "/",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          }
        ],
        "screenshots": [
          {
            "src": "/Screenshot (187).png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
          },
          {
            "src": "/Screenshot (188).png",
            "sizes": "720x1280",
            "type": "image/png",
            "form_factor": "narrow"
          }
        ]

      },
    }),
  ]

})
