import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const dsRoot = path.resolve(__dirname, '../design-system/packages')

const packages = fs.readdirSync(dsRoot).filter(name =>
  fs.statSync(path.join(dsRoot, name)).isDirectory() &&
  fs.existsSync(path.join(dsRoot, name, 'package.json'))
)

const aliases: Record<string, string> = {}
for (const name of packages) {
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(dsRoot, name, 'package.json'), 'utf8')
  )
  if (pkgJson.name) aliases[pkgJson.name] = path.join(dsRoot, name)
}

export default defineConfig({
  plugins: [react()],
  resolve: { alias: aliases },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          dsRoot,
          path.resolve(__dirname, '../design-system/node_modules')
        ]
      }
    }
  }
})
