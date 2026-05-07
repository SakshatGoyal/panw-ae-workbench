export function formatTokenName(path: string | string[]): string {
  const segments = Array.isArray(path) ? path : path.split('.');
  return segments.join('-').replaceAll('.', '-');
}

export function resolveTokenPath<T>(
  tokenMap: Record<string, unknown>,
  path: string | string[],
): T | undefined {
  const segments = Array.isArray(path) ? path : path.split('.');

  return resolveSegments(tokenMap, segments) as T | undefined;
}

function resolveSegments(
  node: unknown,
  segments: string[],
): unknown | undefined {
  if (!node || typeof node !== 'object') {
    return undefined;
  }

  const record = node as Record<string, unknown>;

  for (let size = segments.length; size > 0; size -= 1) {
    const key = segments.slice(0, size).join('.');

    if (Object.hasOwn(record, key)) {
      if (size === segments.length) {
        return record[key];
      }

      return resolveSegments(record[key], segments.slice(size));
    }
  }

  return undefined;
}
