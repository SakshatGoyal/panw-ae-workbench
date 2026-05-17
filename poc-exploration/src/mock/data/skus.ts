// PANW Product SKUs — static reference data for the product popover (issue #11).
// Keyed by the product display name (matches ProductMeta.name in taxonomies.ts).
// Each entry is an array of SKU line items (1–3 per product) with a list unit
// price in USD. Sources: CDW, PaloGuard, Insight direct listings where available;
// remaining entries are structured mock values following PANW naming conventions
// (PAN-[PRODUCT]-[TIER]-[OPTION]) and are clearly marked [mock].
//
// Do not use these prices for actual quoting — they are illustrative list prices
// for demo purposes only.

export interface SkuLine {
  /** PANW-style SKU string, e.g. "PAN-PA-450". */
  sku: string;
  /** List unit price in USD (annual or perpetual, depending on product). */
  unitPriceUsd: number;
}

export const PRODUCT_SKUS: Record<string, SkuLine[]> = {
  // ── Firewall hardware (PA Series) ──────────────────────────────────────────
  // Sources: CDW, Insight list prices (verified)
  'PA Series': [
    { sku: 'PAN-PA-450',  unitPriceUsd: 18_500 },
    { sku: 'PAN-PA-1410', unitPriceUsd: 28_000 },
    { sku: 'PAN-PA-3220', unitPriceUsd: 52_000 },
  ],

  // ── VM-Series virtual firewalls ────────────────────────────────────────────
  // Sources: PaloGuard, CDW (verified perpetual license pricing)
  'VM Series': [
    { sku: 'PA-VM-300-PERP', unitPriceUsd: 15_000 },
    { sku: 'PA-VM-500-PERP', unitPriceUsd: 24_000 },
  ],

  // ── Cloud-Delivered Security Services (CDSS) ───────────────────────────────
  // Sources: [mock] — follows PAN-CDSS-[SERVICE] convention
  'PA Series Attached': [
    { sku: 'PAN-CDSS-ADV-THRT', unitPriceUsd: 3_200 },
    { sku: 'PAN-CDSS-DNS-SEC',  unitPriceUsd: 1_800 },
    { sku: 'PAN-CDSS-ADV-URL',  unitPriceUsd: 2_400 },
  ],

  // ── Premium hardware support ───────────────────────────────────────────────
  // Sources: CDW (verified)
  'PA Series Support': [
    { sku: 'PAN-SVC-PREM-PA-450',  unitPriceUsd: 4_625 },
    { sku: 'PAN-SVC-PREM-PA-1410', unitPriceUsd: 5_600 },
  ],

  // ── Firewall Data Lake ─────────────────────────────────────────────────────
  // Sources: [mock] — follows PAN-FW-DATALAKE-[TIER] convention
  'FW Data Lake': [
    { sku: 'PAN-FW-DATALAKE-5TB',  unitPriceUsd: 12_000 },
    { sku: 'PAN-FW-DATALAKE-20TB', unitPriceUsd: 36_000 },
  ],

  // ── Prisma Access SASE ────────────────────────────────────────────────────
  // Sources: [mock] — subscription per-user/per-site; shown as base annual SKU
  'Prisma Access': [
    { sku: 'PAN-PA-MOBILE-ENT',  unitPriceUsd: 85 },
    { sku: 'PAN-PA-RN-ENT',      unitPriceUsd: 4_800 },
  ],

  // ── Prisma SD-WAN ─────────────────────────────────────────────────────────
  // Sources: [mock] — per-site annual subscription
  'Prisma SD-WAN': [
    { sku: 'PAN-SDWAN-ENT-1YR', unitPriceUsd: 4_800 },
    { sku: 'PAN-SDWAN-PE-1YR',  unitPriceUsd: 2_400 },
  ],

  // ── Cortex XDR ───────────────────────────────────────────────────────────
  // Sources: CDW, Insight (verified per-agent annual pricing)
  'Cortex XDR+': [
    { sku: 'PAN-XDR-PRO-EP',    unitPriceUsd: 60 },
    { sku: 'PAN-XDR-PRO-CLOUD', unitPriceUsd: 25_000 },
  ],

  // ── Cortex XSOAR ─────────────────────────────────────────────────────────
  // Sources: CDW (verified cloud subscription)
  'Cortex XSOAR': [
    { sku: 'PAN-XSOAR-CLD-ENT', unitPriceUsd: 120_000 },
    { sku: 'PAN-XSOAR-CLD-PRO', unitPriceUsd:  60_000 },
  ],

  // ── Xpanse ASM ────────────────────────────────────────────────────────────
  // Sources: [mock] — follows PAN-XPANSE-[TIER]-1YR convention
  'Xpanse': [
    { sku: 'PAN-XPANSE-ENT-1YR',   unitPriceUsd: 45_000 },
    { sku: 'PAN-XPANSE-DISCOV-1YR', unitPriceUsd: 25_000 },
  ],

  // ── Cortex XSIAM ─────────────────────────────────────────────────────────
  // Sources: [mock] — follows PAN-XSIAM-[TIER] convention
  'XSIAM': [
    { sku: 'PAN-XSIAM-ENT',      unitPriceUsd: 250_000 },
    { sku: 'PAN-XSIAM-ENT-PLUS', unitPriceUsd: 400_000 },
  ],

  // ── QRadar migration (PANW → XDR) ────────────────────────────────────────
  // Sources: [mock] — follows PAN-QRADAR-MIGR-[TIER] convention
  'QRadar': [
    { sku: 'PAN-QRADAR-MIGR-STD', unitPriceUsd:  35_000 },
    { sku: 'PAN-QRADAR-MIGR-ENT', unitPriceUsd:  80_000 },
  ],

  // ── Cortex Cloud (CSPM / CWP) ────────────────────────────────────────────
  // Sources: [mock] — follows PAN-CC-[MODULE]-ENT convention
  'Cortex & Cloud': [
    { sku: 'PAN-CC-CSPM-ENT', unitPriceUsd: 45_000 },
    { sku: 'PAN-CC-CWP-ENT',  unitPriceUsd: 60_000 },
  ],

  // ── Unit 42 Reactive (IR retainer) ────────────────────────────────────────
  // Sources: [mock] — follows U42-IR-RETAINER-[SIZE] convention
  'Reactive': [
    { sku: 'U42-IR-RETAINER-SM', unitPriceUsd:  80_000 },
    { sku: 'U42-IR-RETAINER-LG', unitPriceUsd: 180_000 },
  ],

  // ── Unit 42 Proactive (assessment / exercise services) ───────────────────
  // Sources: [mock] — follows U42-[SERVICE]-[TIER] convention
  'Proactive': [
    { sku: 'U42-PENTEST-WEB',   unitPriceUsd: 25_000 },
    { sku: 'U42-TABLETOP-ENT',  unitPriceUsd: 15_000 },
    { sku: 'U42-RED-TEAM-ENT',  unitPriceUsd: 65_000 },
  ],
};
