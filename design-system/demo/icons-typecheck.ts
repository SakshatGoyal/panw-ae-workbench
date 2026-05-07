/**
 * Type-check only — not compiled to JS, not served.
 * Run: npx tsc --project demo/tsconfig.icons.json --noEmit
 *
 * Verifies:
 *  - Named icon imports resolve (Settings, ChevronDown)
 *  - `size` prop is accepted
 *  - `color` prop is accepted
 *  - `ref` is typed as SVGSVGElement
 */
import React from 'react';
import { Settings, ChevronDown, type LucideProps } from 'lucide-react';

// size prop — must accept number
const _a: React.ReactElement = React.createElement(Settings, { size: 48 });

// color prop — must accept string
const _b: React.ReactElement = React.createElement(ChevronDown, { color: 'red' });

// ref — must be SVGSVGElement
const ref = React.createRef<SVGSVGElement>();
const _c: React.ReactElement = React.createElement(Settings, { ref });

// LucideProps — should be importable
const _props: LucideProps = { size: 24, strokeWidth: 1.5 };

export {};
