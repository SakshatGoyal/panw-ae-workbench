import { ShellTokens as shell } from './shell.js';
import { StageTokens as stage } from './stage.js';
import { EmphasisTokens as emphasis } from './emphasis.js';
import { GlobalTokens as global } from './global.js';

export { shell, stage, emphasis, global };
export {
  shell as ShellTokens,
  stage as StageTokens,
  emphasis as EmphasisTokens,
  global as GlobalTokens,
};

export const tokens = {
  shell,
  stage,
  emphasis,
  global,
} as const;

export type TokenValue = string | null;
export type ShellTokenShape = typeof shell;
export type StageTokenShape = typeof stage;
export type EmphasisTokenShape = typeof emphasis;
export type GlobalTokenShape = typeof global;
export type SemanticTokens = typeof tokens;
export type ModeName = keyof SemanticTokens;

function flattenTokenPaths(node: unknown, pathSegments: string[] = []): string[] {
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    return Object.entries(node).flatMap(([key, value]) =>
      flattenTokenPaths(value, [...pathSegments, key]),
    );
  }

  return [pathSegments.join('.')];
}

export const tokenPaths = flattenTokenPaths(tokens);
export { formatTokenName, resolveTokenPath } from './tools.js';
