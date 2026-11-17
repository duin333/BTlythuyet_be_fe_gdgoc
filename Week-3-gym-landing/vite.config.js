import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/BTlythuyet_be_fe_gdgoc/',
  plugins: [react(), tailwindcss()],
})