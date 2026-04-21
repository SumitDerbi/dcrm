import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import type { Plugin } from 'vite'

function copyIndexHtml(): Plugin {
    return {
        name: 'copy-index-html',
        closeBundle() {
            const src = path.resolve(__dirname, '../static/frontend/index.html')
            const destDir = path.resolve(__dirname, '../templates/frontend')
            const dest = path.resolve(destDir, 'index.html')
            fs.mkdirSync(destDir, { recursive: true })
            if (fs.existsSync(src)) {
                fs.copyFileSync(src, dest)
            }
        },
    }
}

export default defineConfig(({ command }) => ({
    plugins: [react(), tailwindcss(), copyIndexHtml()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: '../static/frontend',
        emptyOutDir: true,
    },
    base: command === 'build' ? '/static/frontend/' : '/',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
            '/admin': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
            '/media': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
}))
