import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1280, height: 1400 });

async function takeScreenshot(name) {
  await page.waitForTimeout(300);
  await page.screenshot({ 
    path: `/tmp/opp-${name}.png`,
    fullPage: true
  });
  console.log(`✓ ${name}`);
}

try {
  await page.goto('http://localhost:38274/iframe.html?id=compositions-ae-opportunity-table--default&viewMode=story', { 
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await takeScreenshot('00-baseline');
  
  // Search focused
  const searchInput = await page.locator('input[placeholder*="account"]').first();
  await searchInput.click();
  await takeScreenshot('01-search-focused');
  await searchInput.clear();
  
  // Tags filter open
  const allButtons = await page.locator('button').all();
  for (const btn of allButtons) {
    const txt = await btn.textContent();
    if (txt && txt.includes('tags')) {
      await btn.click();
      await takeScreenshot('02-tags-filter-open');
      await btn.click();
      break;
    }
  }
  
  // Sort open
  for (const btn of allButtons) {
    const txt = await btn.textContent();
    if (txt && txt.includes('sort:')) {
      await btn.click();
      await takeScreenshot('03-sort-open');
      await btn.click();
      break;
    }
  }
  
  // Row hover
  const firstRow = await page.locator('tbody tr').first();
  await firstRow.hover();
  await takeScreenshot('04-row-hover');
  
  console.log('Done');
} catch (err) {
  console.error('Error:', err.message);
} finally {
  await browser.close();
}
