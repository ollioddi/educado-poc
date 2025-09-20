import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    })
  ],
  resolve: {
    alias: {
      '@/shared': resolve(__dirname, './src/shared'),
      '@/login': resolve(__dirname, './src/features/login'),
      '@/author': resolve(__dirname, './src/features/author'),
      '@/course': resolve(__dirname, './src/features/course'),
      '@/lesson': resolve(__dirname, './src/features/lesson'),
      '@/quiz': resolve(__dirname, './src/features/quiz'),
      '@/section': resolve(__dirname, './src/features/section'),
      '@/user': resolve(__dirname, './src/features/user'),
      '@/integrations': resolve(__dirname, './src/integrations'),
      '@/routes': resolve(__dirname, './src/routes'),
    },
  },
})
