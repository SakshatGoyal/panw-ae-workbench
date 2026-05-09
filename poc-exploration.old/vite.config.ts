import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Resolve a @ds package by pointing Vite at the package directory.
// Using the directory (not src/index.ts) lets Vite read the package.json
// exports field, which handles both the root barrel import AND subpath
// imports like @ds/button/src/internal/usePrefix used across components.
const ds = (pkg: string) =>
  path.resolve(__dirname, `../design-system/packages/${pkg}`)

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  css: {
    preprocessorOptions: {
      scss: {
        // Resolve @ds/colors, @ds/themes, @ds/type inside SCSS @use statements.
        // design-system/node_modules holds the workspace symlinks for these packages.
        loadPaths: [
          // Resolves @use 'styles' and @use 'styles/scss/components/...' inside system.scss
          path.resolve(__dirname, '../design-system/packages'),
          // Resolves @ds/colors, @ds/themes, @ds/type inside the imported SCSS files
          path.resolve(__dirname, '../design-system/node_modules'),
        ],
      },
    },
  },
  resolve: {
    alias: {
      // ── Component packages ───────────────────────────────────────────────
      '@ds/accordion':           ds('accordion'),
      '@ds/breadcrumbs':         ds('breadcrumbs'),
      '@ds/button':              ds('button'),
      '@ds/cell-contents':       ds('cell-contents'),
      '@ds/cells-standard':      ds('cells-standard'),
      '@ds/checkbox':            ds('checkbox'),
      '@ds/chips':               ds('chips'),
      '@ds/content-switcher':    ds('content-switcher'),
      '@ds/dropdown':            ds('dropdown'),
      '@ds/flyout':              ds('flyout'),
      '@ds/header':              ds('header'),
      '@ds/inline-notification': ds('inline-notification'),
      '@ds/link':                ds('link'),
      '@ds/multi-select':        ds('multi-select'),
      '@ds/number-input':        ds('number-input'),
      '@ds/pagination':          ds('pagination'),
      '@ds/popover':             ds('popover'),
      '@ds/progress-step':       ds('progress-step'),
      '@ds/radio-button':        ds('radio-button'),
      '@ds/search':              ds('search'),
      '@ds/tabs':                ds('tabs'),
      '@ds/tags':                ds('tags'),
      '@ds/text-entry':          ds('text-entry'),
      '@ds/toggle':              ds('toggle'),
      '@ds/tooltip':             ds('tooltip'),

      // ── Token / primitive packages ───────────────────────────────────────
      '@ds/colors':              ds('colors'),
      '@ds/themes':              ds('themes'),
      '@ds/type':                ds('type'),
    },
  },
})
