import fs from 'node:fs';
import path from 'node:path';

export function readJsonWithComments(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLineComments = withoutBlockComments.replace(/(^|[^:])\/\/.*$/gm, '$1');
  return JSON.parse(withoutLineComments);
}

export function flattenLeaves(node, pathSegments = []) {
  if (node && typeof node === 'object' && !Array.isArray(node)) {
    return Object.entries(node).flatMap(([key, value]) => {
      return flattenLeaves(value, [...pathSegments, key]);
    });
  }

  return [{ path: pathSegments, value: node }];
}

export function pathToCssName(pathSegments) {
  return pathSegments.join('-').replaceAll('.', '-');
}

export function tokenPathToSegments(tokenPath) {
  return tokenPath.split('.');
}

export function toSass(value, level = 0) {
  const indent = '  '.repeat(level);
  const nextIndent = '  '.repeat(level + 1);

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'string') {
    return value.startsWith('#') ? value : `"${value}"`;
  }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return String(value);
  }

  const entries = Object.entries(value).map(([key, child]) => {
    return `${nextIndent}"${key}": ${toSass(child, level + 1)}`;
  });

  return `(\n${entries.join(',\n')}\n${indent})`;
}

export function writeGenerated(filePath, content, scriptPath, comment = '//') {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${comment} AUTO-GENERATED. Do not edit by hand. See ${scriptPath}.\n\n${content}`, 'utf8');
}

export function cleanDirectory(directory) {
  fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdirSync(directory, { recursive: true });
}
