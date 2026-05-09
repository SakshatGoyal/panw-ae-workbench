#!/usr/bin/env node
/**
 * Storybook prestart guard.
 *
 * Why this exists: `storybook dev -p <port>` silently bumps to the next free
 * port if the requested one is taken. So every accidental re-run leaves the
 * old process alive and starts a new one on a fresh port. Over a session this
 * accumulates — three storybooks, two stale, no warning. Worse: when
 * pnpm-install reorganizes node_modules, every running server's cached file
 * paths go stale at the same moment. The user sees an infinite spinner; the
 * console says "Cannot find module …builder-vite/input/iframe.html"; the
 * fix is to kill the stale process. We should not have to debug that.
 *
 * What this does, on every `pnpm storybook` invocation:
 *   1. Take the canonical port from argv[2].
 *   2. Find any process listening on that port.
 *   3. If it's a storybook dev server, kill it. (Anything else: warn and exit.)
 *   4. Wait briefly for the port to free.
 *   5. Exit 0 — Storybook starts cleanly on the same port, every time.
 *
 * Result: one storybook per project, on the port the user expects, always.
 */

import { execSync } from 'node:child_process';

const port = process.argv[2];
if (!port || !/^\d+$/.test(port)) {
  console.error('storybook-prestart: usage: storybook-prestart.mjs <port>');
  process.exit(1);
}

function listeners() {
  try {
    const out = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return out.trim().split('\n').filter(Boolean).map(Number);
  } catch {
    return [];
  }
}

function describe(pid) {
  try {
    return execSync(`ps -p ${pid} -o args=`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '(process gone)';
  }
}

const pids = listeners();
if (pids.length === 0) {
  // Port is free. Nothing to do.
  process.exit(0);
}

let killed = 0;
let foreign = 0;
for (const pid of pids) {
  const cmd = describe(pid);
  // Be conservative: only kill if the process command line looks like a
  // storybook dev server. Random other process holding the port (e.g. a
  // user's own webserver) gets reported, not nuked.
  if (/storybook[^/]*dev|storybook\/bin\/index/.test(cmd) || /node.*storybook/.test(cmd)) {
    console.log(`[storybook-prestart] killing stale storybook on :${port} (pid ${pid})`);
    try {
      execSync(`kill ${pid}`);
      killed++;
    } catch (e) {
      console.error(`[storybook-prestart] failed to kill ${pid}: ${e.message}`);
    }
  } else {
    console.error(`[storybook-prestart] port :${port} is held by a non-storybook process (pid ${pid}):`);
    console.error(`    ${cmd}`);
    foreign++;
  }
}

if (foreign > 0) {
  console.error(`[storybook-prestart] refusing to kill ${foreign} non-storybook process(es). Free port :${port} manually.`);
  process.exit(2);
}

// Wait up to 3s for the port to actually free.
const deadline = Date.now() + 3000;
while (Date.now() < deadline && listeners().length > 0) {
  // Busy-wait with a small sleep.
  execSync('sleep 0.2');
}

if (listeners().length > 0) {
  console.error(`[storybook-prestart] killed ${killed} process(es) but port :${port} is still held. Aborting.`);
  process.exit(3);
}

console.log(`[storybook-prestart] port :${port} cleared (${killed} stale process${killed === 1 ? '' : 'es'} killed)`);
