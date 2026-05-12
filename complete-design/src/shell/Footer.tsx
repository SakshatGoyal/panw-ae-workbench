import { ChevronRight } from '@ds/icons'

/**
 * PANW mark: @ds/icons doesn't carry a brand mark in Stage 1, so this is a
 * placeholder — a 20px square with the letters "PANW". Swap to the real mark
 * when one is added to the icon set.
 */
function PanwMark() {
  return (
    <span className="cd-footer__mark" aria-label="Palo Alto Networks">
      PANW
    </span>
  )
}

export default function Footer() {
  const inert = (e: React.MouseEvent) => e.preventDefault()
  return (
    <footer className="cd-footer" role="contentinfo">
      <span className="cd-footer__brand">
        <PanwMark />
      </span>
      <span className="cd-footer__copy">
        © 2026 Palo Alto Networks Sales Ops
      </span>
      <span className="cd-footer__links">
        <a className="cd-footer__link" href="#" onClick={inert}>Terms of Service</a>
        <span className="cd-footer__sep" aria-hidden="true">|</span>
        <a className="cd-footer__link" href="#" onClick={inert}>Privacy Policy</a>
        <span className="cd-footer__sep" aria-hidden="true">|</span>
        <a className="cd-footer__link" href="#" onClick={inert}>Send Feedback</a>
        <span className="cd-footer__sep" aria-hidden="true">|</span>
        <a className="cd-footer__link" href="#" onClick={inert}>
          Refresh report
          <ChevronRight size={12} />
        </a>
      </span>
    </footer>
  )
}
