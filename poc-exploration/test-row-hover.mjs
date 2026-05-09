import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1280, height: 1200 });

try {
  await page.goto('http://localhost:38274/iframe.html?id=compositions-ae-opportunity-table--default&viewMode=story', { 
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Get the table
  const table = await page.locator('.opp-table');
  await table.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  
  // Hover over first row
  const firstRow = await page.locator('.opp-table tbody tr').first();
  await firstRow.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  
  // Use mouse to hover
  const box = await firstRow.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/opp-04-row-hover.png', fullPage: true });
    console.log('✓ row-hover');
  }
  
} catch (err) {
  console.error('Error:', err.message);
} finally {
  await browser.close();
}
