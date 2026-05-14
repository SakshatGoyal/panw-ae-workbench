import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

// Opp full
await p.goto('http://localhost:38274/iframe.html?id=compositions-ae-opportunity-table--default&viewMode=story', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.screenshot({ path: '/tmp/opp-full.png', fullPage: true });

// Click Filters to open filter row, then screenshot
await p.click('button[aria-controls="opp-filter-row"]');
await p.waitForTimeout(300);
await p.screenshot({ path: '/tmp/opp-filterrow.png', clip: { x: 0, y: 0, width: 1440, height: 180 } });

await b.close();
