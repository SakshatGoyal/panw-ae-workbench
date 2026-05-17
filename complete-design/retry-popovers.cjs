const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });

  // ─── Target 1: Opp table Cortex XSOAR SKU popover ───────────────────────────
  console.log('[1] Loading opp table story...');
  await page.goto('http://localhost:7007/iframe.html?id=compositions-ae-opportunity-table--default&viewMode=story');
  await page.waitForTimeout(3000);

  const xsoarTag = page.locator('text=Cortex XSOAR').first();
  const xsoarCount = await xsoarTag.count();
  console.log(`[1] Found ${xsoarCount} element(s) matching "Cortex XSOAR"`);

  if (xsoarCount > 0) {
    await xsoarTag.scrollIntoViewIfNeeded();
    await xsoarTag.hover();
    console.log('[1] Hovered Cortex XSOAR tag, waiting 2000ms...');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/sku-popover-opp.png', fullPage: true });
    console.log('[1] Screenshot saved to /tmp/sku-popover-opp.png');
  } else {
    console.log('[1] WARNING: Cortex XSOAR tag not found');
    await page.screenshot({ path: '/tmp/sku-popover-opp.png', fullPage: true });
    console.log('[1] Saved baseline screenshot (no hover) to /tmp/sku-popover-opp.png');
  }

  // ─── Target 2: Account panel product popover ─────────────────────────────────
  console.log('[2] Loading account panel story...');
  await page.goto('http://localhost:7007/iframe.html?id=compositions-ae-account-panel--default&viewMode=story');
  await page.waitForTimeout(4000);

  // Try the specific selector first
  let productTag = page.locator('.acc-product-cluster .panw--tag').first();
  let productCount = await productTag.count();
  console.log(`[2] Found ${productCount} element(s) matching '.acc-product-cluster .panw--tag'`);

  // If not found, try broader selectors
  if (productCount === 0) {
    productTag = page.locator('.panw--tag').first();
    productCount = await productTag.count();
    console.log(`[2] Fallback: Found ${productCount} element(s) matching '.panw--tag'`);
  }

  if (productCount > 0) {
    await productTag.scrollIntoViewIfNeeded();
    const box = await productTag.boundingBox();
    console.log(`[2] Tag bounding box: ${JSON.stringify(box)}`);

    await productTag.hover();
    console.log('[2] Hovered product tag, waiting 2000ms...');
    await page.waitForTimeout(2000);

    await page.screenshot({ path: '/tmp/sku-popover-acc.png', fullPage: true });
    console.log('[2] Full-page screenshot saved to /tmp/sku-popover-acc.png');

    if (box) {
      const clipX = Math.max(0, box.x - 200);
      const clipY = Math.max(0, box.y - 200);
      const clipW = Math.min(1400, box.width + 400);
      const clipH = Math.min(900, box.height + 400);
      await page.screenshot({
        path: '/tmp/sku-popover-acc-crop.png',
        clip: { x: clipX, y: clipY, width: clipW, height: clipH }
      });
      console.log('[2] Cropped screenshot saved to /tmp/sku-popover-acc-crop.png');
    }
  } else {
    console.log('[2] WARNING: No product tags found at all');
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/sku-popover-acc.png', fullPage: true });
    console.log('[2] Saved baseline screenshot (scrolled) to /tmp/sku-popover-acc.png');
  }

  // ─── Log popover elements in DOM after hover ──────────────────────────────────
  console.log('\n[debug] Checking for popover elements after hover on account panel...');
  const popoverHandles = await page.$$('[role="tooltip"], [data-radix-popper-content-wrapper], .popover, [class*="popover"]');
  console.log(`[debug] Found ${popoverHandles.length} popover-like element(s) in DOM`);

  await browser.close();
  console.log('\nDone.');
})();
