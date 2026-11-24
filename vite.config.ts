import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' — работает на GitHub Pages в любом репозитории
export default defineConfig({ base: './', plugins: [react()] })
