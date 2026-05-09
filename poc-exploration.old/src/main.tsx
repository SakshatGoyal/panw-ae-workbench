import React from 'react'
import ReactDOM from 'react-dom/client'
import './system.scss'

// Eagerly import all explorations so the nav can enumerate them.
// Each exploration file must export a default React component.
const modules = import.meta.glob('./explorations/*.tsx', { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>

// Active exploration from ?e=<name> query param, falling back to the first available.
const firstKey = Object.keys(modules)[0]?.replace('./explorations/', '').replace('.tsx', '') ?? ''
const name = new URLSearchParams(location.search).get('e') ?? firstKey
const explorationKey = `./explorations/${name}.tsx`
const ExplorationComponent =
  modules[explorationKey]?.default ??
  (() => (
    <div
      style={{
        padding: 32,
        fontFamily: 'var(--ds-type-font-family-sans)',
        color: 'var(--ds-text-secondary-rest)',
        fontSize: 14,
      }}
    >
      Exploration not found: <code>{name}</code>
    </div>
  ))

const explorationNames = Object.keys(modules).map(k =>
  k.replace('./explorations/', '').replace('.tsx', '')
)

function App() {
  return (
    <div className="stage">
      {/* ── Navigation bar ─────────────────────────────────────────────── */}
      {explorationNames.length > 1 && (
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '0 16px',
            height: 40,
            borderBottom: '1px solid var(--ds-lines-neutral-rest)',
            background: 'var(--ds-surface-rest)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--ds-type-font-family-sans)',
              color: 'var(--ds-text-tertiary-rest)',
              marginRight: 8,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            POC
          </span>
          {explorationNames.map(n => (
            <a
              key={n}
              href={`?e=${n}`}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--ds-radius-tight)',
                fontSize: 13,
                fontFamily: 'var(--ds-type-font-family-sans)',
                fontWeight: n === name ? 500 : 400,
                textDecoration: 'none',
                color:
                  n === name
                    ? 'var(--ds-text-brand-rest)'
                    : 'var(--ds-text-secondary-rest)',
                background:
                  n === name
                    ? 'var(--ds-ghost-highlight-hover)'
                    : 'transparent',
              }}
            >
              {n}
            </a>
          ))}
        </nav>
      )}

      {/* ── Active exploration ─────────────────────────────────────────── */}
      <ExplorationComponent />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
