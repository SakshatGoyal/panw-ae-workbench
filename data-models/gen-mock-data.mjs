#!/usr/bin/env node
/**
 * gen-mock-data.mjs
 * Reads CSVs from data-models/mock-data-csv/ and writes TS data files
 * into poc-exploration/src/mock/data/.
 *
 * Run from repo root: node data-models/gen-mock-data.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const CSV_DIR = new URL('./mock-data-csv/', import.meta.url).pathname;
const OUT_DIR = new URL('../poc-exploration/src/mock/data/', import.meta.url).pathname;

// ─── CSV parser ──────────────────────────────────────────────────────────────

function parseCSV(filename) {
  const text = readFileSync(resolve(CSV_DIR, filename), 'utf8').trim();
  const lines = text.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map((line, idx) => {
    const values = line.split(',');
    if (values.length !== headers.length) {
      console.warn(`  WARNING: ${filename} row ${idx + 2} has ${values.length} fields, expected ${headers.length}`);
    }
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? '').trim()]));
  });
}

// ─── TS value serializer ──────────────────────────────────────────────────────

function str(s) { return JSON.stringify(s); }

function strArr(s) {
  if (!s) return '[]';
  const parts = s.split(';').map(p => p.trim()).filter(Boolean);
  return parts.length === 0 ? '[]' : `[${parts.map(p => str(p)).join(', ')}]`;
}

function num(s) { return Number(s); }

function optNum(s) { return s !== '' ? Number(s) : null; }

function optStr(s) { return s !== '' ? s : null; }

function bool(s) {
  if (s === 'true') return true;
  if (s === 'false') return false;
  return null;
}

// ─── Build health-trend lookup ────────────────────────────────────────────────

const healthTrendRows = parseCSV('health-trend.csv');
/** @type {Map<string, number[]>} accountId → 12-element array */
const healthTrendMap = new Map();
for (const row of healthTrendRows) {
  const arr = healthTrendMap.get(row.accountId) ?? new Array(12).fill(0);
  arr[Number(row.monthOffset)] = Number(row.healthValue);
  healthTrendMap.set(row.accountId, arr);
}

// ─── Build product-allocations lookup ────────────────────────────────────────

const paRows = parseCSV('opportunity-product-allocations.csv');
/** @type {Map<string, Array<{productId: string, amountUsd: number}>>} */
const paMap = new Map();
for (const row of paRows) {
  const arr = paMap.get(row.opportunityId) ?? [];
  arr.push({ productId: row.productId, amountUsd: Number(row.amountUsd) });
  paMap.set(row.opportunityId, arr);
}

// ─── UNIT 1a: accounts.ts ─────────────────────────────────────────────────────

console.log('Generating accounts.ts...');
const accountRows = parseCSV('accounts.csv');

const accountsBody = accountRows.map(r => {
  const healthTrend = healthTrendMap.get(r.id) ?? null;

  const healthFields = [
    `overall: ${str(r.health_overall)}`,
    `technical: ${str(r.health_technical)}`,
    `deploymentAdoption: ${str(r.health_deploymentAdoption)}`,
    r.health_valueRealization ? `valueRealization: ${str(r.health_valueRealization)}` : null,
    r.health_customerEngagement ? `customerEngagement: ${str(r.health_customerEngagement)}` : null,
    healthTrend ? `trend12mo: [${healthTrend.join(', ')}]` : null,
  ].filter(Boolean).join(', ');

  const hasInstallBase =
    r.installBase_tcv !== '' ||
    r.installBase_incrementalAcv !== '' ||
    r.installBase_margin !== '' ||
    r.installBase_rpo !== '';

  const installBase = hasInstallBase
    ? `{ tcv: ${num(r.installBase_tcv)}, incrementalAcv: ${num(r.installBase_incrementalAcv)}, margin: ${num(r.installBase_margin)}, rpo: ${num(r.installBase_rpo)} }`
    : null;

  const lines = [
    `    id: ${str(r.id)}`,
    `    name: ${str(r.name)}`,
    r.apex ? `    apex: ${str(r.apex)}` : `    apex: null`,
    `    lifetimeValue: ${num(r.lifetimeValue)}`,
    r.valueLast3Years !== '' ? `    valueLast3Years: ${num(r.valueLast3Years)}` : null,
    `    pipelineCQ: ${num(r.pipelineCQ)}`,
    `    activePOVs: ${num(r.activePOVs)}`,
    `    ebcsLastYear: ${num(r.ebcsLastYear)}`,
    `    health: { ${healthFields} }`,
    `    riskIds: ${strArr(r.riskIds)}`,
    `    platformizations: ${strArr(r.platformizations)}`,
    r.region !== '' ? `    region: ${str(r.region)}` : null,
    installBase ? `    installBase: ${installBase}` : null,
    `    scenarios: ${strArr(r.scenarios)}`,
  ].filter(Boolean).join(',\n');

  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'accounts.ts'),
  `// Accounts — generated from data-models/mock-data-csv/accounts.csv\n` +
  `// Health trend data merged from health-trend.csv.\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `import type { Account } from '../types';\n\n` +
  `export const ACCOUNTS: Account[] = [\n${accountsBody},\n];\n`
);
console.log(`  ✓ ${accountRows.length} accounts`);

// ─── UNIT 1b: opportunities.ts ────────────────────────────────────────────────

console.log('Generating opportunities.ts...');
const oppRows = parseCSV('opportunities.csv');

const oppsBody = oppRows.map(r => {
  const allocations = paMap.get(r.id) ?? null;
  const allocStr = allocations
    ? `[${allocations.map(a => `{ productId: ${str(a.productId)}, amountUsd: ${a.amountUsd} }`).join(', ')}]`
    : null;

  const hasRenewal = r.renewal_subEnd !== '';
  const isPrimaryBool = bool(r.isPrimaryQuote);

  const lastActivity = [
    `type: ${str(r.lastActivity_type)}`,
    `daysAgo: ${num(r.lastActivity_daysAgo)}`,
    r.lastActivity_description !== '' ? `description: ${str(r.lastActivity_description)}` : null,
  ].filter(Boolean).join(', ');

  const lines = [
    `    id: ${str(r.id)}`,
    `    accountId: ${str(r.accountId)}`,
    `    name: ${str(r.name)}`,
    `    quoteId: ${str(r.quoteId)}`,
    isPrimaryBool !== null ? `    isPrimaryQuote: ${isPrimaryBool}` : null,
    `    type: ${str(r.type)}`,
    `    amount: ${num(r.amount)}`,
    `    daysToClose: ${num(r.daysToClose)}`,
    `    forecastCategory: ${str(r.forecastCategory)}`,
    `    stageId: ${str(r.stageId)}`,
    `    productIds: ${strArr(r.productIds)}`,
    allocStr ? `    productAllocations: ${allocStr}` : null,
    `    riskIds: ${strArr(r.riskIds)}`,
    `    lastActivity: { ${lastActivity} }`,
    r.daysInStage !== '' ? `    daysInStage: ${num(r.daysInStage)}` : null,
    r.daysInForecast !== '' ? `    daysInForecast: ${num(r.daysInForecast)}` : null,
    r.renewalOutcome !== '' ? `    renewalOutcome: ${str(r.renewalOutcome)}` : null,
    hasRenewal ? `    renewal: { subEnd: ${str(r.renewal_subEnd)}, renewableTcvUsd: ${num(r.renewal_renewableTcvUsd)}, arrUsd: ${num(r.renewal_arrUsd)} }` : null,
    r.salesPlayIds !== '' ? `    salesPlayIds: ${strArr(r.salesPlayIds)}` : null,
    `    scenarios: ${strArr(r.scenarios)}`,
  ].filter(Boolean).join(',\n');

  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'opportunities.ts'),
  `// Opportunities — generated from data-models/mock-data-csv/opportunities.csv\n` +
  `// Product allocations merged from opportunity-product-allocations.csv.\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `import type { Opportunity } from '../types';\n\n` +
  `export const OPPORTUNITIES: Opportunity[] = [\n${oppsBody},\n];\n`
);
console.log(`  ✓ ${oppRows.length} opportunities (${paRows.length} product allocation rows merged)`);

// ─── UNIT 1c: contacts.ts ─────────────────────────────────────────────────────

console.log('Generating contacts.ts...');
const contactRows = parseCSV('contacts.csv');

const contactsBody = contactRows.map(r => {
  const lines = [
    `    id: ${str(r.id)}`,
    `    accountId: ${str(r.accountId)}`,
    `    name: ${str(r.name)}`,
    `    title: ${str(r.title)}`,
    `    phone: ${str(r.phone)}`,
    `    email: ${str(r.email)}`,
    r.avatarUrl !== '' ? `    avatarUrl: ${str(r.avatarUrl)}` : null,
  ].filter(Boolean).join(',\n');
  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'contacts.ts'),
  `// Contacts — generated from data-models/mock-data-csv/contacts.csv\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `import type { Contact } from '../types';\n\n` +
  `export const CONTACTS: Contact[] = [\n${contactsBody},\n];\n`
);
console.log(`  ✓ ${contactRows.length} contacts`);

// ─── UNIT 1d: sales-plays.ts ──────────────────────────────────────────────────

console.log('Generating sales-plays.ts...');
const spRows = parseCSV('sales-plays.csv');

const spBody = spRows.map(r => {
  const lines = [
    `    id: ${str(r.id)}`,
    `    name: ${str(r.name)}`,
    `    familyId: ${str(r.familyId)}`,
    r.description !== '' ? `    description: ${str(r.description)}` : null,
  ].filter(Boolean).join(',\n');
  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'sales-plays.ts'),
  `// Sales Plays — generated from data-models/mock-data-csv/sales-plays.csv\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `import type { SalesPlay } from '../types';\n\n` +
  `export const SALES_PLAYS: SalesPlay[] = [\n${spBody},\n];\n`
);
console.log(`  ✓ ${spRows.length} sales plays`);

// ─── UNIT 1e: sales-play-instances.ts ────────────────────────────────────────

console.log('Generating sales-play-instances.ts...');
const spiRows = parseCSV('sales-play-instances.csv');

// Non-canonical columns dropped: instanceId, contactIds, opportunityIds,
// primaryOpportunityId, note, competitor, reason.
// FLAG: competitor and reason have semantic value (see translation-report.md).

const spiBody = spiRows.map(r => {
  const lines = [
    `    accountId: ${str(r.accountId)}`,
    `    playId: ${str(r.playId)}`,
    `    status: ${str(r.status)}`,
    `    amountUsd: ${num(r.amountUsd)}`,
  ].join(',\n');
  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'sales-play-instances.ts'),
  `// Sales Play Instances — generated from data-models/mock-data-csv/sales-play-instances.csv\n` +
  `// Non-canonical columns dropped: instanceId, contactIds, opportunityIds,\n` +
  `// primaryOpportunityId, note, competitor, reason.\n` +
  `// See translation-report.md for flagged items.\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `import type { SalesPlayInstance } from '../types';\n\n` +
  `export const SALES_PLAY_INSTANCES: SalesPlayInstance[] = [\n${spiBody},\n];\n`
);
console.log(`  ✓ ${spiRows.length} sales play instances`);

// ─── UNIT 1f: ebcs.ts ────────────────────────────────────────────────────────

console.log('Generating ebcs.ts...');
const ebcRows = parseCSV('ebcs.csv');

// FLAG: No EBC type in canonical types.ts. Using local interface here.
// The Account type has ebcsLastYear: number but no full EBC entity.

const ebcBody = ebcRows.map(r => {
  const attendees = r.panwAttendees ? r.panwAttendees.split(';').map(s => s.trim()).filter(Boolean) : [];
  const lines = [
    `    id: ${str(r.ebcId)}`,
    `    accountId: ${str(r.accountId)}`,
    `    date: ${str(r.date)}`,
    `    topic: ${str(r.topic)}`,
    `    panwAttendees: [${attendees.map(a => str(a)).join(', ')}]`,
  ].join(',\n');
  return `  {\n${lines},\n  }`;
}).join(',\n');

writeFileSync(
  resolve(OUT_DIR, 'ebcs.ts'),
  `// EBCs — generated from data-models/mock-data-csv/ebcs.csv\n` +
  `// FLAG: EBC is not a type in canonical types.ts. Using a local interface.\n` +
  `// Add EBC to types.ts and update this import when the type is canonical.\n` +
  `// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs\n\n` +
  `export interface EBC {\n` +
  `  id: string;\n` +
  `  accountId: string;\n` +
  `  date: string;\n` +
  `  topic: string;\n` +
  `  panwAttendees: string[];\n` +
  `}\n\n` +
  `export const EBCS: EBC[] = [\n${ebcBody},\n];\n`
);
console.log(`  ✓ ${ebcRows.length} EBCs`);

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('\nDone. Files written to poc-exploration/src/mock/data/');
console.log('\nFLAGS FOR TRANSLATION REPORT:');
console.log('  1. EBC entity has no canonical type in types.ts — local EBC interface used in ebcs.ts');
console.log('  2. SalesPlayInstance: 7 non-canonical columns dropped: instanceId, contactIds,');
console.log('     opportunityIds, primaryOpportunityId, note, competitor, reason');
console.log('     competitor and reason have demo value (landmine/displacement narratives).');
console.log('  3. Account.pipelineByQuarter: field exists in types but no CSV column — not populated.');
console.log('  4. healthTrend: embedded in accounts.ts as health.trend12mo (not a separate export).');
console.log('  5. productAllocations: embedded in opportunities.ts (not a separate export).');
console.log('  6. avatarUrl: empty on all contacts per spec ambiguity #7 in README.');
