/**
 * Returns the CSS class prefix used by all PANW design system components.
 * Mirrors Carbon's usePrefix hook pattern; future versions may source this
 * from a React context to support multi-tenant prefix overrides.
 */
export function usePrefix(): string {
  return 'panw';
}
