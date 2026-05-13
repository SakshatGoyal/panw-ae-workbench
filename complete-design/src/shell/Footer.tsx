import { BrandPanw, ChevronRight } from '@ds/icons'

export default function Footer() {
  const inert = (e: React.MouseEvent) => e.preventDefault()
  return (
    <footer className="cd-footer" role="contentinfo">
      <span className="cd-footer__brand" aria-label="Palo Alto Networks">
        <BrandPanw size={20} />
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
