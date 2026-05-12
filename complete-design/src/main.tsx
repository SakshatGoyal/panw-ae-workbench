import React from 'react'
import { createRoot } from 'react-dom/client'
import './system.scss'
import './styles/app.css'
import App from './App'

// Stage tokens are scoped under `.stage`. Apply to <body> (not a React wrapper)
// so portals from Flyout/Popover/Tooltip inherit the theme.
document.body.classList.add('stage')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
