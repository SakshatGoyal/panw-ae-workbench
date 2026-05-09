import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1280, height: 1200 });

async function takeScreenshot(name) {
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/opp-${name}.png`, fullPage: true });
  console.log(`✓ ${name}`);
}

try {
  await page.goto('http://localhost:38274/iframe.html?id=compositions-ae-opportunity-table--default&viewMode=story', { 
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Click column header to sort
  const oppHeader = await page.locator('th').filter({ hasText: 'opportunity' }).first();
  await oppHeader.click();
  await takeScreenshot('05-column-header-sort');
  
  // Click another filter - "type"
  const allButtons = await page.locator('button').all();
  for (const btn of allButtons) {
    const txt = await btn.textContent();
    if (txt && txt.includes('type') && !txt.includes('sort')) {
      await btn.click();
      await takeScreenshot('06-type-filter-open');
      
      // Click an option
      const options = await page.locator('[role="option"]').all();
      if (options.length > 0) {
        await options[0].click();
        await takeScreenshot('07-type-filter-selected');
      }
      
      await btn.click(); // close
      break;
    }
  }
  
  // Test pagination
  const nextPageBtn = await page.locator('button').filter({ hasText: /next/i }).first();
  if (nextPageBtn && await nextPageBtn.isVisible()) {
    await nextPageBtn.click();
    await takeScreenshot('08-pagination-next');
  }
  
  console.log('Done');
} catch (err) {
  console.error('Error:', err.message);
  console.error(err.stack);
} finally {
  await browser.close();
}
