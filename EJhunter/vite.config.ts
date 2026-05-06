import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow tunnel hosts (e.g. ngrok) — subdomains change each session unless reserved
    allowedHosts: true,
  },
})
