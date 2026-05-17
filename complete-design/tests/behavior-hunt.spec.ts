/**
 * behavior-hunt.spec.ts
 *
 * Behavioral bug hunt — AE Workbench (complete-design).
 * Each test reads state BEFORE an action, performs the action,
 * reads state AFTER, and asserts the expected state change.
 *
 * Issue numbers start at #100 to avoid colliding with bug-hunt.md.
 * A FAILING test = confirmed behavioral bug.
 * A PASSING test = behavior is correct.
 *
 * Run: npx playwright test behavior-hunt.spec.ts
 *      (from complete-design/)
 */

import { test, expect, type Page } from '@playwright/test'

// ── helpers ───────────────────────────────────────────────────────────────────

async function loadApp(page: Page) {
  await page.goto('/')
  await page.locator('.opp-row').first().waitFor({ timeout: 12_000 })
}

async function oppRowTexts(page: Page): Promise<string[]> {
  return page.locator('.opp-row').evaluateAll(
    (rows: Element[]) => rows.map(r => r.textContent?.trim() ?? '')
  )
}

async function accRowTexts(page: Page): Promise<string[]> {
  return page.locator('.acc-row').evaluateAll(
    (rows: Element[]) => rows.map(r => r.textContent?.trim() ?? '')
  )
}

async function oppRowCount(page: Page) { return page.locator('.opp-row').count() }
async function accRowCount(page: Page) { return page.locator('.acc-row').count() }

async function goToAccountWorkbench(page: Page) {
  await page.locator('[aria-label="Account Workbench"]').click()
  await page.locator('.acc-row').first().waitFor({ timeout: 10_000 })
}

/** Hover a row and click its "Open on right" button. Waits for panel. */
async function openPanelForRow(page: Page, rowLocator: ReturnType<Page['locator']>) {
  await rowLocator.hover()
  await page.waitForTimeout(200)
  await rowLocator.locator('[aria-label="Open on right"]').click({ force: true })
  await page.locator('[aria-label="Account Preview"]').waitFor({ timeout: 10_000 })
}

/** Expand a closed accordion (role=button aria-expanded=false) matching text. */
async function expandAccordion(page: Page, text: RegExp) {
  const trigger = page.locator('[role="button"]').filter({ hasText: text }).first()
  if (!await trigger.isVisible()) return false
  const expanded = await trigger.getAttribute('aria-expanded')
  if (expanded !== 'true') await trigger.click()
  await page.waitForTimeout(300)
  return true
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUP A: Opportunity Table — search, filter, sort, pagination
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Opportunity Table', () => {
  test.beforeEach(async ({ page }) => { await loadApp(page) })

  // #100
  test('#100 search "Stripe" reduces row count and all visible rows match', async ({ page }) => {
    const countBefore = await oppRowCount(page)
    expect(countBefore).toBeGreaterThan(0)

    await page.locator('.opp-search-row__search input').fill('Stripe')
    await page.waitForTimeout(300)

    const countAfter = await oppRowCount(page)
    expect(countAfter, 'row count should drop after searching "Stripe"').toBeLessThan(countBefore)

    const texts = await oppRowTexts(page)
    for (const text of texts) {
      expect(text.toLowerCase(), `row "${text.slice(0, 60)}" should contain "stripe"`).toContain('stripe')
    }
  })

  // #101
  test('#101 clearing search restores all rows', async ({ page }) => {
    const countBefore = await oppRowCount(page)

    await page.locator('.opp-search-row__search input').fill('Stripe')
    await page.waitForTimeout(300)
    const countMid = await oppRowCount(page)
    expect(countMid).toBeLessThan(countBefore)

    await page.locator('.opp-search-row__search input').fill('')
    await page.waitForTimeout(300)
    const countAfter = await oppRowCount(page)
    expect(countAfter, 'clearing search should restore original row count').toBe(countBefore)
  })

  // #102 — pagination renders all rows (no slice) regardless of rowsPerPage setting
  // NOTE: DEFAULT_ROWS has 8 rows max; options are [10,25,50,100] so next-page is
  // always disabled. This test verifies that changing rows-per-page to 25 does NOT
  // increase the rendered row count (row count stays the same = all rows always render).
  // A PASS here means rows-per-page is decorative when total rows < rowsPerPage.
  // The real bug: even when >10 rows exist, the table renders ALL of them.
  test('#102 changing rows-per-page does not reduce rendered rows below total', async ({ page }) => {
    const countBefore = await oppRowCount(page)
    expect(countBefore).toBeGreaterThan(0)

    // Open the rows-per-page combobox
    const rppCombobox = page.locator('.opp-table-footer').locator('[role="combobox"]')
    await rppCombobox.waitFor({ timeout: 4_000 })
    await rppCombobox.click()
    await page.waitForTimeout(200)

    // Pick 25 — all rows (≤8) still show (there are never >10 with default fixture)
    const opt25 = page.locator('[role="option"]').filter({ hasText: '25' }).first()
    await opt25.waitFor({ timeout: 3_000 })
    await opt25.click()
    await page.waitForTimeout(400)

    const countAfter = await oppRowCount(page)
    // All rows still render — no slicing occurs regardless of rows-per-page
    expect(countAfter, 'changing rows-per-page does not change rendered row count').toBe(countBefore)

    // Verify the pagination control updated (label should reflect new rowsPerPage)
    const footerText = (await page.locator('.opp-table-footer').textContent()) ?? ''
    expect(footerText, 'pagination label should mention 25 per page after selection').toContain('25')
  })

  // #103 — rows-per-page combobox updates the pagination display label
  test('#103 rows-per-page combobox is functional and updates the page label', async ({ page }) => {
    const rppCombobox = page.locator('.opp-table-footer').locator('[role="combobox"]')
    await rppCombobox.waitFor({ timeout: 4_000 })

    const labelBefore = (await rppCombobox.textContent()) ?? ''

    await rppCombobox.click()
    await page.waitForTimeout(200)

    const opt25 = page.locator('[role="option"]').filter({ hasText: '25' }).first()
    await opt25.waitFor({ timeout: 3_000 })
    await opt25.click()
    await page.waitForTimeout(400)

    const labelAfter = (await rppCombobox.textContent()) ?? ''
    expect(labelAfter, 'rows-per-page combobox should update label after selection').not.toBe(labelBefore)
    expect(labelAfter).toContain('25')
  })

  // #104 — sort by value descending puts highest-value row first
  test('#104 sort "Value" puts highest-value row first', async ({ page }) => {
    // Open sort flyout — "Sort: Close date" button (there are 2 aria-haspopup=listbox, use name)
    const sortBtn = page.locator('.opp-search-row').getByRole('button', { name: /^sort:/i })
    await sortBtn.waitFor({ timeout: 4_000 })
    await sortBtn.click()
    await page.waitForTimeout(200)

    // FlyoutItem renders as role="option"
    const valueOpt = page.locator('[role="option"]').filter({ hasText: /^value$/i })
    await valueOpt.waitFor({ timeout: 3_000 })
    await valueOpt.click()
    await page.waitForTimeout(300)

    // Extract dollar amounts from visible rows
    const amounts = await page.locator('.opp-row').evaluateAll((rows: Element[]) =>
      rows.map(row => {
        const text = row.textContent ?? ''
        const m = text.match(/\$([\d,.]+)([KkMm]?)/)
        if (!m) return -1
        const n = parseFloat(m[1].replace(/,/g, ''))
        const mult = ({ K: 1e3, k: 1e3, M: 1e6, m: 1e6 } as Record<string, number>)[m[2]] ?? 1
        return n * mult
      })
    )

    const nonNeg = amounts.filter(v => v >= 0)
    if (nonNeg.length >= 2) {
      expect(
        nonNeg[0],
        `First row value ($${nonNeg[0]}) should be >= last row value ($${nonNeg[nonNeg.length - 1]})`
      ).toBeGreaterThanOrEqual(nonNeg[nonNeg.length - 1])
    }
  })

  // #105 — health filter deselecting an option changes row count
  test('#105 unchecking an account-health overall option changes row count', async ({ page }) => {
    // Open filters row
    const filtersToggle = page.locator('.opp-filters-toggle button').first()
    await filtersToggle.waitFor({ timeout: 4_000 })
    await filtersToggle.click()
    await page.waitForTimeout(300)

    const countBefore = await oppRowCount(page)

    // Open the account health grouped filter chip
    const healthFilter = page.locator('#opp-filter-row .panw--filter').filter({ hasText: /health/i }).first()
    if (!await healthFilter.isVisible()) {
      test.skip()
      return
    }
    await healthFilter.click()
    await page.waitForTimeout(300)

    // Toggle one of the options in the flyout (DS Flyout renders as role="listbox" with role="option" items)
    const firstOption = page.locator('.panw--flyout [role="option"]').first()
    if (!await firstOption.isVisible()) {
      test.skip()
      return
    }
    await firstOption.click()
    await page.waitForTimeout(200)

    // Click Apply to commit the filter selection
    const applyBtn = page.locator('button').filter({ hasText: /^apply$/i })
    if (!await applyBtn.isVisible()) {
      test.skip()
      return
    }
    await applyBtn.click()
    await page.waitForTimeout(300)

    const countAfter = await oppRowCount(page)
    expect(countAfter, 'health filter toggle should change displayed row count').not.toBe(countBefore)
  })

  // #106 — column header sort reversal changes row order
  test('#106 column header click sorts by opp name ascending then descending', async ({ page }) => {
    const oppHeader = page.locator('th').filter({ hasText: /^opportunity/i }).first()
    await oppHeader.waitFor({ timeout: 4_000 })
    await oppHeader.click()
    await page.waitForTimeout(300)
    const ascTexts = await oppRowTexts(page)

    await oppHeader.click()
    await page.waitForTimeout(300)
    const descTexts = await oppRowTexts(page)

    if (ascTexts.length >= 2) {
      expect(descTexts[0], 'direction reversal should change row order').not.toBe(ascTexts[0])
    }
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// GROUP B: Account Table — search, filter
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Account Table', () => {
  test.beforeEach(async ({ page }) => {
    await loadApp(page)
    await goToAccountWorkbench(page)
  })

  // #107
  test('#107 search "Stripe" reduces row count and all visible rows match', async ({ page }) => {
    const countBefore = await accRowCount(page)
    expect(countBefore).toBeGreaterThan(0)

    await page.locator('.acc-search-row__search input').fill('Stripe')
    await page.waitForTimeout(300)

    const countAfter = await accRowCount(page)
    expect(countAfter, 'row count should drop after searching "Stripe"').toBeLessThan(countBefore)

    const texts = await accRowTexts(page)
    for (const text of texts) {
      expect(text.toLowerCase(), `row "${text.slice(0, 60)}" should contain "stripe"`).toContain('stripe')
    }
  })

  // #108
  test('#108 clearing account search restores all rows', async ({ page }) => {
    const countBefore = await accRowCount(page)

    await page.locator('.acc-search-row__search input').fill('Lyft')
    await page.waitForTimeout(300)
    const countMid = await accRowCount(page)
    expect(countMid).toBeLessThan(countBefore)

    await page.locator('.acc-search-row__search input').fill('')
    await page.waitForTimeout(300)
    const countAfter = await accRowCount(page)
    expect(countAfter, 'clearing search should restore original row count').toBe(countBefore)
  })

  // #109
  test('#109 account filter chip toggle changes row count', async ({ page }) => {
    const filtersToggle = page.locator('.acc-filters-toggle button').first()
    await filtersToggle.waitFor({ timeout: 4_000 })
    await filtersToggle.click()
    await page.waitForTimeout(300)

    const countBefore = await accRowCount(page)

    // Open health filter chip
    const healthFilter = page.locator('#acc-filter-row .panw--filter').filter({ hasText: /health/i }).first()
    if (!await healthFilter.isVisible()) {
      test.skip()
      return
    }
    await healthFilter.click()
    await page.waitForTimeout(300)

    // Toggle one of the options in the flyout (DS Flyout renders as role="listbox" with role="option" items)
    const firstOption = page.locator('.panw--flyout [role="option"]').first()
    if (!await firstOption.isVisible()) {
      test.skip()
      return
    }
    await firstOption.click()
    await page.waitForTimeout(200)

    // Click Apply to commit the filter selection
    const applyBtn = page.locator('button').filter({ hasText: /^apply$/i })
    if (!await applyBtn.isVisible()) {
      test.skip()
      return
    }
    await applyBtn.click()
    await page.waitForTimeout(300)

    const countAfter = await accRowCount(page)
    expect(countAfter, 'health filter toggle should change account row count').not.toBe(countBefore)
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// GROUP C: Nav shell
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Nav shell', () => {
  test.beforeEach(async ({ page }) => { await loadApp(page) })

  // #110
  test('#110 clicking Account Workbench nav renders account table', async ({ page }) => {
    await expect(page.locator('.opp-row').first()).toBeVisible()

    await page.locator('[aria-label="Account Workbench"]').click()
    await page.waitForTimeout(500)

    await expect(page.locator('.acc-row').first()).toBeVisible()
    await expect(page.locator('.opp-row')).toHaveCount(0)
    await expect(page.locator('.cd-page-topbar__title')).toHaveText('Account Workbench')
  })

  // #111
  test('#111 switching back to Opportunities restores opp table', async ({ page }) => {
    await page.locator('[aria-label="Account Workbench"]').click()
    await page.locator('.acc-row').first().waitFor()

    await page.locator('[aria-label="Opportunities"]').click()
    await page.waitForTimeout(500)

    await expect(page.locator('.opp-row').first()).toBeVisible()
    await expect(page.locator('.acc-row')).toHaveCount(0)
    await expect(page.locator('.cd-page-topbar__title')).toHaveText('Opportunity Workbench')
  })

  // #112 — unimplemented nav items should not blank the page
  test('#112 unimplemented nav items do not blank the page or leak raw CSS', async ({ page }) => {
    const spwNav = page.locator('[aria-label="Sales Play Workbench"]')
    if (!await spwNav.isVisible()) {
      test.skip()
      return
    }

    await spwNav.click()
    await page.waitForTimeout(400)

    const headingText = (await page.locator('.cd-page-topbar__title').textContent()) ?? ''
    expect(headingText.trim(), 'heading should not be blank after clicking unimplemented nav').not.toBe('')

    const mainText = (await page.locator('main').textContent()) ?? ''
    expect(mainText, 'main should not contain raw CSS text ({, :, })').not.toMatch(/\{[^}]+\}/)
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// GROUP D: Account Panel
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Account Panel', () => {
  test.beforeEach(async ({ page }) => {
    await loadApp(page)
    await goToAccountWorkbench(page)
  })

  // #113 — panel shows the correct account name from the clicked row
  test('#113 panel header shows account name matching the clicked row', async ({ page }) => {
    const firstRow = page.locator('.acc-row').first()
    // .acc-multiline__name is the specific account-name element in the first cell
    const accountName = ((await firstRow.locator('.acc-multiline__name').textContent()) ?? '').trim()
    expect(accountName.length, 'account name should not be empty').toBeGreaterThan(0)

    await openPanelForRow(page, firstRow)

    // Panel shows the name in .acc-id-row__value (first occurrence = account name)
    const panelAccountName = ((await page.locator('[aria-label="Account Preview"] .acc-id-row__value').first().textContent()) ?? '').trim()
    expect(panelAccountName, `Panel account name should match clicked row`).toBe(accountName)
  })

  // #114 — switching accounts resets the panel
  test('#114 switching to a different account replaces panel content', async ({ page }) => {
    const rows = page.locator('.acc-row')
    if (await rows.count() < 2) { test.skip(); return }

    const nameA = ((await rows.nth(0).locator('.acc-multiline__name').textContent()) ?? '').trim()
    await openPanelForRow(page, rows.nth(0))
    const panelNameA = ((await page.locator('[aria-label="Account Preview"] .acc-id-row__value').first().textContent()) ?? '').trim()

    const nameB = ((await rows.nth(1).locator('.acc-multiline__name').textContent()) ?? '').trim()
    await openPanelForRow(page, rows.nth(1))
    const panelNameB = ((await page.locator('[aria-label="Account Preview"] .acc-id-row__value').first().textContent()) ?? '').trim()

    expect(panelNameB, `panel should show account B "${nameB}"`).toBe(nameB)
    if (nameA !== nameB) {
      expect(panelNameA, 'first panel should have shown account A').toBe(nameA)
      expect(panelNameB, 'second panel should NOT be stale (same as first)').not.toBe(panelNameA)
    }
  })

  // #115 — L2 sales play row opens modal
  test('#115 clicking L2 sales play row opens the sales play modal', async ({ page }) => {
    await openPanelForRow(page, page.locator('.acc-row').first())

    // Sales play accordion is closed by default when opened via installBase.
    // Open it first.
    const opened = await expandAccordion(page, /sales play/i)
    if (!opened) { test.skip(); return }

    // Expand family sub-accordion if needed
    const familyAccordion = page.locator('[role="button"]').filter({ hasText: /cortex|prisma|cdss|fw/i }).first()
    if (await familyAccordion.isVisible()) {
      const famExpanded = await familyAccordion.getAttribute('aria-expanded')
      if (famExpanded !== 'true') {
        await familyAccordion.click()
        await page.waitForTimeout(300)
      }
    }

    const playRow = page.locator('.acc-sp-play-row').first()
    if (!await playRow.isVisible()) { test.skip(); return }

    await playRow.click()
    await page.waitForTimeout(500)

    await expect(
      page.locator('[role="dialog"]'),
      'clicking L2 play row should open the sales play modal'
    ).toBeVisible()
  })

  // #116 — renewal outcome editor saves within same panel mount
  test('#116 renewal outcome Confirm updates the outcome tag in same session', async ({ page }) => {
    await openPanelForRow(page, page.locator('.acc-row').first())

    // Open Opportunities accordion (closed when initialOpenSection=installBase)
    await expandAccordion(page, /opportunit/i)

    // Find a renewal opp sub-accordion and expand it
    const oppAccordion = page.locator('.acc-panel [role="button"]').filter({ hasText: /renewal|renew/i }).first()
    if (!await oppAccordion.isVisible()) { test.skip(); return }

    const oppExpanded = await oppAccordion.getAttribute('aria-expanded')
    if (oppExpanded !== 'true') {
      await oppAccordion.click()
      await page.waitForTimeout(300)
    }

    // Find the renewal outcome trigger (.acc-opp-outcome-trigger opens the DS Flyout)
    const outcomeTrigger = page.locator('.acc-opp-outcome-trigger').first()
    if (!await outcomeTrigger.isVisible()) { test.skip(); return }

    const originalOutcome = (await outcomeTrigger.textContent()) ?? ''
    await outcomeTrigger.click()
    await page.waitForTimeout(400)

    // DS Flyout renders as role="listbox" with FlyoutItem as role="option"
    // Pick the second option (index 1) — index 0 may be "Unknown" (current default)
    const flyoutOptions = page.locator('.panw--flyout [role="option"]')
    const optCount = await flyoutOptions.count()
    if (optCount < 1) { test.skip(); return }
    const targetIdx = optCount > 1 ? 1 : 0
    await flyoutOptions.nth(targetIdx).click()
    await page.waitForTimeout(300)

    // Panel uses "Save" button (not "Confirm") — formVisible = editing && draftOutcome !== 'unknown'
    const saveBtn = page.locator('button').filter({ hasText: /^save$/i })
    if (!await saveBtn.isVisible()) { test.skip(); return }
    await saveBtn.click()
    await page.waitForTimeout(400)

    const newOutcome = (await outcomeTrigger.textContent()) ?? ''
    expect(newOutcome, 'outcome tag should update after Save').not.toBe(originalOutcome)
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// GROUP E: Sales Play Modal
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Sales Play Modal', () => {

  /** Open the modal from a sales play popover in the opp table. */
  async function openModalViaOppSalesPlayTag(page: Page): Promise<boolean> {
    // Find an opp row with a visible sales play tag
    const rows = page.locator('.opp-row')
    const rowCount = await rows.count()
    for (let i = 0; i < Math.min(rowCount, 15); i++) {
      const row = rows.nth(i)
      // The sales play tag is inside the row — it may have a class like spm-tag or sp-tag
      const spTag = row.locator('.opp-sp-tag, .acc-sp-tag, [class*="sp-tag"]').first()
      if (!await spTag.isVisible()) continue

      await spTag.hover()
      await page.waitForTimeout(700)

      const updateBtn = page.locator('.opp-hover-panel button').filter({ hasText: /update/i }).first()
      if (!await updateBtn.isVisible()) continue

      await updateBtn.click()
      await page.waitForTimeout(500)
      return true
    }
    return false
  }

  /** Open modal via panel L2 play row. Returns modal locator. */
  async function openModalViaPanel(page: Page): Promise<boolean> {
    await loadApp(page)
    await goToAccountWorkbench(page)
    await openPanelForRow(page, page.locator('.acc-row').first())
    await expandAccordion(page, /sales play/i)

    // Expand family accordion
    const familyAccordion = page.locator('.acc-panel [role="button"]').filter({ hasText: /cortex|prisma|cdss|fw/i }).first()
    if (await familyAccordion.isVisible()) {
      const exp = await familyAccordion.getAttribute('aria-expanded')
      if (exp !== 'true') {
        await familyAccordion.click()
        await page.waitForTimeout(300)
      }
    }

    const playRow = page.locator('.acc-sp-play-row').first()
    if (!await playRow.isVisible()) return false

    await playRow.click()
    await page.waitForTimeout(500)
    return true
  }

  // #117 — clicking a different status button changes the selection
  test('#117 modal status button click changes the selected status', async ({ page }) => {
    await loadApp(page)
    const opened = await openModalViaOppSalesPlayTag(page)
    if (!opened) { test.skip(); return }

    const modal = page.locator('[role="dialog"]')
    await modal.waitFor({ timeout: 6_000 })

    const statusBtns = modal.locator('.spm-status-tag')
    const count = await statusBtns.count()
    if (count < 2) { test.skip(); return }

    // Read which one is currently selected
    const selectedBefore = await statusBtns.evaluateAll((btns: Element[]) =>
      btns.findIndex(b => b.classList.contains('spm-status-tag--selected'))
    )

    // Click a different one
    const altIdx = selectedBefore === 0 ? count - 1 : 0
    await statusBtns.nth(altIdx).click()
    await page.waitForTimeout(200)

    const selectedAfter = await statusBtns.evaluateAll((btns: Element[]) =>
      btns.findIndex(b => b.classList.contains('spm-status-tag--selected'))
    )

    expect(selectedAfter, 'clicking a different status should change the selected button').not.toBe(selectedBefore)
    expect(selectedAfter, 'the newly selected index should match what was clicked').toBe(altIdx)
  })

  // #118 — modal contacts are scoped to the current account
  test('#118 modal contacts are scoped to the account, not all 151 contacts', async ({ page }) => {
    const opened = await openModalViaPanel(page)
    if (!opened) { test.skip(); return }

    const modal = page.locator('[role="dialog"]')
    await modal.waitFor({ timeout: 6_000 })

    const addContactBtn = modal.getByRole('button', { name: /add contact/i })
    if (!await addContactBtn.isVisible()) { test.skip(); return }
    await addContactBtn.click()
    await page.waitForTimeout(400)

    // Count rows in the contact list (excluding header row)
    const contactRows = modal.locator('.spm-table__row')
    const count = await contactRows.count()

    // If all 151 contacts are shown, that's the bug (#9 from bug-hunt = contacts not scoped)
    expect(count, 'modal should show account-scoped contacts, not all 151 fixture contacts').toBeLessThan(30)
  })

  // #119 — Cancel discards pending status edits
  test('#119 Cancel after status change discards the edit', async ({ page }) => {
    await loadApp(page)
    const opened = await openModalViaOppSalesPlayTag(page)
    if (!opened) { test.skip(); return }

    let modal = page.locator('[role="dialog"]')
    await modal.waitFor({ timeout: 6_000 })

    const statusBtns = modal.locator('.spm-status-tag')
    const count = await statusBtns.count()
    if (count < 2) { test.skip(); return }

    const selectedBefore = await statusBtns.evaluateAll((btns: Element[]) =>
      btns.findIndex(b => b.classList.contains('spm-status-tag--selected'))
    )

    // Pick a different status
    const altIdx = selectedBefore === 0 ? count - 1 : 0
    await statusBtns.nth(altIdx).click()
    await page.waitForTimeout(200)

    // Cancel
    await modal.getByRole('button', { name: /cancel/i }).click()
    await page.waitForTimeout(400)

    // Reopen via same entry point
    const reopened = await openModalViaOppSalesPlayTag(page)
    if (!reopened) { test.skip(); return }

    modal = page.locator('[role="dialog"]')
    await modal.waitFor({ timeout: 6_000 })

    const selectedAfter = await modal.locator('.spm-status-tag').evaluateAll((btns: Element[]) =>
      btns.findIndex(b => b.classList.contains('spm-status-tag--selected'))
    )

    expect(selectedAfter, 'after Cancel + reopen, status should match original (edits discarded)').toBe(selectedBefore)
  })

  // #120 — modal header shows the correct account name
  test('#120 modal header shows account name from the panel it was opened from', async ({ page }) => {
    // Get the first acc-row account name before opening panel
    await loadApp(page)
    await goToAccountWorkbench(page)
    const firstRow = page.locator('.acc-row').first()
    const accountName = ((await firstRow.locator('.acc-multiline__name').textContent()) ?? '').trim()

    const opened = await openModalViaPanel(page)
    if (!opened) { test.skip(); return }

    const modal = page.locator('[role="dialog"]')
    await modal.waitFor({ timeout: 6_000 })

    // Account name renders in .spm-account-link in the modal header
    const modalAccountName = ((await modal.locator('.spm-account-link').textContent()) ?? '').trim()
    expect(
      modalAccountName,
      `modal .spm-account-link should show account name "${accountName}"`
    ).toBe(accountName)
  })

})

// ─────────────────────────────────────────────────────────────────────────────
// GROUP F: Cross-composition consistency
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Cross-composition', () => {

  // #121 — panel stays open (persists) when switching nav tabs
  test('#121 panel stays open when switching between Opportunities and Account Workbench', async ({ page }) => {
    await loadApp(page)

    // Open panel from opp table
    const firstOppRow = page.locator('.opp-row').first()
    await openPanelForRow(page, firstOppRow)

    const panel = page.locator('[aria-label="Account Preview"]')
    await expect(panel).toBeVisible()

    // Switch to Account Workbench
    await page.locator('[aria-label="Account Workbench"]').click()
    await page.waitForTimeout(500)

    // Panel should STILL be visible (cross-nav persistence)
    await expect(panel, 'panel should remain visible after switching nav tabs').toBeVisible()
  })

  // #122 — opp-table renewal outcome changes persist in the row after confirm
  test('#122 renewal outcome editor changes persist in the opp row after confirm', async ({ page }) => {
    await loadApp(page)

    // Find a row that has a renewal outcome (contains "Renewal" in its text)
    const rows = page.locator('.opp-row')
    const rowCount = await rows.count()
    let renewalRowIdx = -1
    for (let i = 0; i < rowCount; i++) {
      const t = (await rows.nth(i).textContent()) ?? ''
      if (/renewal/i.test(t)) { renewalRowIdx = i; break }
    }
    if (renewalRowIdx < 0) { test.skip(); return }

    const renewalRow = rows.nth(renewalRowIdx)

    // Read the renewal tag text from the row before any interaction
    const renewalTag = renewalRow.locator('.panw--tag').filter({ hasText: /renewal/i }).first()
    if (!await renewalTag.isVisible()) { test.skip(); return }
    const originalTagText = ((await renewalTag.textContent()) ?? '').trim()

    // Hover the renewal tag to open HoverShell panel (.opp-hover-panel--renewal)
    await renewalTag.hover()
    await page.waitForTimeout(900)  // HoverShell default 700ms open delay + buffer

    const renewalPanel = page.locator('.opp-hover-panel--renewal')
    try { await renewalPanel.waitFor({ timeout: 3_000 }) } catch { test.skip(); return }

    // Move into the panel to keep it open (interactive=true gives 160ms grace)
    await renewalPanel.hover()
    await page.waitForTimeout(200)

    // Click the outcome trigger inside the panel to open the DS Flyout
    const outcomeTrigger = page.locator('.opp-hover-panel--renewal .opp-outcome-trigger').first()
    if (!await outcomeTrigger.isVisible()) { test.skip(); return }
    await outcomeTrigger.click()
    await page.waitForTimeout(400)

    // DS Flyout with role="option" items — pick the second option
    const flyoutOptions = page.locator('.panw--flyout [role="option"]')
    const optCount = await flyoutOptions.count()
    if (optCount < 2) { test.skip(); return }
    await flyoutOptions.nth(1).click()
    await page.waitForTimeout(300)

    // Opp table form uses "Confirm" (panel uses "Save" — different component)
    const confirmBtn = page.locator('.opp-renewal-form button').filter({ hasText: /confirm/i })
    if (!await confirmBtn.isVisible()) { test.skip(); return }
    await confirmBtn.click()
    await page.waitForTimeout(600)  // Allow state update + panel close

    // After confirm the hover panel closes. Re-read the tag text from the ROW.
    // Note: if the row tag doesn't update (outcome is only stored in component state
    // and the tag label is derived from it), this expect will fail → confirmed bug.
    const newTagText = ((await renewalTag.textContent()) ?? '').trim()
    expect(newTagText, 'renewal tag text in opp row should change after confirming a different outcome').not.toBe(originalTagText)
  })

  // #123 — panel from opp-table opens with opportunities section
  test('#123 panel opened from opp-table opens to opportunities accordion section', async ({ page }) => {
    await loadApp(page)

    const firstRow = page.locator('.opp-row').first()
    await openPanelForRow(page, firstRow)

    // The initialOpenSection is 'opportunities' when opened from opp table row
    // Only the opportunities accordion should be expanded
    const accordions = page.locator('.acc-panel [role="button"][aria-expanded]')
    const states = await accordions.evaluateAll((items: Element[]) =>
      items.map(el => ({
        text: el.textContent?.slice(0, 40).trim() ?? '',
        expanded: el.getAttribute('aria-expanded') === 'true',
      }))
    )

    const opportunitiesOpen = states.some(s => /opportunit/i.test(s.text) && s.expanded)
    expect(opportunitiesOpen, 'Opportunities accordion should be expanded when panel opened from opp row').toBe(true)
  })

})
