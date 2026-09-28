import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
// base 说明：本地开发与 Vercel 部署用默认 '/'；
// 部署到 GitHub Pages 项目页时执行：set VITE_BASE=/你的仓库名/ && npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
