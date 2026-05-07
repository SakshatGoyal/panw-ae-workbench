import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const STORIES = [
  ['accordion', 'components-accordion--all-variants'],
  ['cell-contents', 'components-cellcontents--all-variants'],
  ['dropdown', 'components-dropdown--all-variants'],
  ['multi-select', 'components-multiselect--all-variants'],
  ['header', 'components-header--all-variants'],
  ['inline-notification', 'components-inlinenotification--all-variants'],
  ['number-input', 'components-numberinput--all-variants'],
  ['search', 'components-search--all-variants'],
  ['tabs', 'components-tabs--all-variants'],
  ['text-entry-rounded', 'components-textentryrounded--all-variants'],
  ['tooltip', 'components-tooltip--all-variants'],
  ['tooltip-descriptive', 'components-tooltip--descriptive'],
  ['pagination', 'components-pagination--all-variants'],
];

const OUT_DIR = path.resolve('design-system/.tmp/storybook-screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1024 } });

for (const [name, id] of STORIES) {
  const page = await ctx.newPage();
  const url = `http://localhost:6011/iframe.html?id=${id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(750);
    const out = path.join(OUT_DIR, `${name}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`✔ ${name} → ${out}`);
  } catch (e) {
    console.log(`✘ ${name}: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('done');
