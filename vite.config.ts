import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'

const SRC_PATH = path.resolve(__dirname, 'src/shared')
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, 'assets', 'svg-sprite')

// https://vite.dev/config/
export default defineConfig({
  base: '/Hiro-VPN/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    createSvgSpritePlugin({ svgFolder: SVG_FOLDER_PATH })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/shared/assets'),
      '@api': path.resolve(__dirname, 'src/api')
    }
  }
})
