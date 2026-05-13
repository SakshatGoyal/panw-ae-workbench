import { useCallback, useEffect, useRef, useState } from 'react'
import { Informational } from '@ds/icons'

const STORAGE_KEY = 'complete-design.right-rail-width'
const MIN = 320
const MAX = 480
const DEFAULT = 430
const KEYBOARD_STEP = 8

function readStored(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT
    const n = parseInt(raw, 10)
    if (Number.isNaN(n)) return DEFAULT
    return Math.min(MAX, Math.max(MIN, n))
  } catch {
    return DEFAULT
  }
}

function persist(width: number) {
  try { localStorage.setItem(STORAGE_KEY, String(width)) } catch {}
}

interface ResizableRightRailProps {
  children?: React.ReactNode
}

export default function ResizableRightRail({ children }: ResizableRightRailProps) {
  const [width, setWidth] = useState<number>(() => readStored())
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--cd-right-rail-width', `${width}px`)
  }, [width])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, startWidth: width }
    setDragging(true)
  }, [width])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const next = Math.min(MAX, Math.max(MIN, dragRef.current.startWidth - dx))
    setWidth(next)
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current) return
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    dragRef.current = null
    setDragging(false)
    setWidth(w => { persist(w); return w })
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setWidth(w => { const n = Math.min(MAX, w + KEYBOARD_STEP); persist(n); return n })
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setWidth(w => { const n = Math.max(MIN, w - KEYBOARD_STEP); persist(n); return n })
    } else if (e.key === 'Home') {
      e.preventDefault()
      setWidth(() => { persist(DEFAULT); return DEFAULT })
    }
  }, [])

  return (
    <aside className="cd-app__rail-right" aria-label="Detail panel">
      <button
        type="button"
        className="cd-resize-handle"
        aria-label="Resize detail panel"
        aria-orientation="vertical"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={width}
        data-dragging={dragging || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      />
      {children ?? (
        <div className="cd-rail-empty" role="status">
          <span className="cd-rail-empty__icon" aria-hidden="true">
            <Informational size={20} />
          </span>
          <span className="cd-rail-empty__text">
            Select a row to see opportunity or account details here.
          </span>
        </div>
      )}
    </aside>
  )
}
