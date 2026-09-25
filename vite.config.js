import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

process.env.BROWSER = 'google-chrome'
process.env.BROWSER_ARGS = '--new-tab'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
})
