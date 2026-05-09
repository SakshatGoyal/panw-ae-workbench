# Mock Data Architecture — POC / Mockup Layer

**Goal.** A single, reliable, type-safe source of plausible domain data that any composition or story in `poc-exploration` can pull from. Not a database. Not for production. Optimized for: setting up new mockups in minutes, swapping enum values without breaking, encoding *conditions* (severity ladders, badge logic) once, and supporting *scenarios* for demos.

**Non-goals.** Persistence. Auth. Real APIs. Mutability across renders. RBAC. Anything that requires a runtime.

---

## Architectural decisions

### 1. Plain TypeScript, no runtime
Everything lives in TS modules under `poc-exploration/src/mock/`. Stories import directly. Storybook hot-reloads. No fixture loader, no JSON, no faker-at-runtime, no MSW.

**Why.** You want speed and type-safety. JSON loses you both. Runtime libraries add startup time. Faker generates noise; we want curated data.

### 2. Three-tier separation: Taxonomies / Records / Derivations
- **Taxonomies** = closed enums and the assets attached to them (icons, brand colors, parent relationships). The schema's vocabulary.
- **Records** = the actual rows. Accounts, opportunities, contacts, sales plays. Reference taxonomies by ID, never by string.
- **Derivations** = pure functions that compute conditional/derived state from records (severity, bands, badges, rollups).

**Why this matters.** Stop colocating "is this row red?" with the row itself. Severity changes when thresholds change; the row data shouldn't. Same row → different severity in different views = a derivation.

### 3. Conditions are functions, not stored fields
> "If last activity within 7 days = ok; 7–21 = caution; >21 = error."

This becomes:
```ts
lastActivitySeverity(daysAgo: number): 'ok' | 'caution' | 'error'
```
Not a stored `severity` field on the row. Why:
- Single source of truth for the rule. Change once, reflects everywhere.
- Same row supports multiple severity views (e.g. you could have `lastActivitySeverityStrict` with tighter thresholds for an exec dashboard).
- Stays accurate as `daysAgo` is computed relative to "today" in the story.

### 4. Foreign keys, not denormalized strings
Every reference between records uses an ID, never a label. `opportunity.accountId = 'acc-acme'`, not `opportunity.account = 'Acme'`. Lookup helpers (`accountById`, `productById`) handle resolution. Why: rename Acme once, every component updates.

### 5. Tag → asset mapping via a single registry
Every product, family, status, risk has a single registry entry that carries:
- Display name
- Icon (DS icon name string, no JSX in data)
- Brand color (hex or token name)
- Parent taxonomy reference

Components ask the registry, not the row.

```ts
productFamilyOf('prisma-access') 
// → { id: 'sase', name: 'SASE', brand: 'Prisma', iconName: 'prisma', brandColor: '#00C0E8', salesPlayFamilyId: 'sase' }
```

### 6. Scenarios as tags, not data forks
Each record carries `scenarios: string[]`. To render a demo scenario, filter rows by tag. Don't fork the dataset.

```ts
opportunities.filter(o => o.scenarios.includes('scenario-2'))
```

This is the same pattern the original CSVs used (Scenario 1 / Scenario 2 / Scenario 3 columns marking which steps each row participates in). It worked then; keep it.

### 7. Two parallel product taxonomies, kept distinct
- **Product taxonomy** (5 families: Firewall, CDSS, SASE, Cortex & Cloud, Unit 42) — what something *is*.
- **Sales Play Family taxonomy** (4 GTM groupings: FW & CDSS, SASE, Cortex Cloud, Unit 42) — what *motion* it belongs to.
- **Brand/Platformization taxonomy** (4: STRATA, PRISMA, CORTEX, UNIT42) — marketing rollup; matches your CSV's `Platformizations` column.

Three rollups, three IDs, three lookup helpers. Don't try to merge them.

---

## File structure

```
poc-exploration/src/mock/
├── types.ts                  # TS interfaces + closed-enum types for the whole model
├── taxonomies.ts             # All enums + their metadata (icons, colors, parents)
├── derivations.ts            # Pure functions: severity, bands, formatting, rollups
├── data/
│   ├── accounts.ts           # Account records (ported from CSV)
│   ├── opportunities.ts      # Opportunity records (ported from TSV)
│   ├── contacts.ts           # Contact records (small starter)
│   ├── sales-plays.ts        # Sales play records (small starter)
│   └── products.ts           # SKU-level products for Customer Estate detail (deferred)
├── helpers.ts                # accountById, opportunitiesByAccount, productFamilyOf, etc.
└── index.ts                  # One-stop barrel; this is the public API
```

**Stories import only from `@/mock`** (the barrel). Internal layout can change without breaking stories.

---

## Schema (canonical types)

The full type definitions live in `mock/types.ts`. Highlights:

```ts
// Closed enums — match the SME-confirmed values
export type OpportunityType = 'net-new' | 'upsell' | 'renewal' | 'renewal-and-upsell';
export type ForecastCategory = 'pipeline' | 'best-case' | 'commit' | 'closed';
export type StageId = 'discovery' | 'solutioning' | 'technical-validation' | 'active-pov' | 'negotiate';
export type HealthStatus = 'healthy' | 'at-risk' | 'critical';
export type RenewalOutcome = 'unknown' | 'full-renewal-upsell' | 'downsell' | 'churn' | 'displacement-hw-refresh' | 'duplicate';
export type SalesPlayStatus = 'not-touched' | 'pitched' | 'interested' | 'open-pipeline' | 'closed-won' | 'deferred' | 'closed-lost';
export type Severity = 'ok' | 'caution' | 'error';

export interface Account {
  id: string;
  name: string;
  lifetimeValue: number;
  pipelineCQ: number;
  pipelineByQuarter?: Record<string, number>;  // 'Q2FY26': 100108
  activePOVs: number;
  ebcsLastYear: number;
  health: { overall: HealthStatus; technical: HealthStatus; deploymentAdoption: HealthStatus; valueRealization?: HealthStatus; customerEngagement?: HealthStatus };
  riskIds: AccountRiskId[];           // FK to AccountRiskCategory taxonomy
  platformizations: BrandId[];        // FK to brand taxonomy
  region?: string;
  scenarios: string[];
}

export interface Opportunity {
  id: string;
  accountId: string;
  name: string;
  quoteId: string;
  isPrimaryQuote?: boolean;
  type: OpportunityType;
  amount: number;
  daysToClose: number;
  forecastCategory: ForecastCategory;
  stageId: StageId;
  productIds: ProductId[];            // FK to products taxonomy (leaves)
  riskIds: OppRiskId[];               // FK to OppRiskCategory taxonomy
  lastActivity: { type: ActivityType; daysAgo: number };
  salesPlayIds?: string[];
  scenarios: string[];
}
```

---

## Conditions / derivations — the "if X then Y" rules

All in `mock/derivations.ts`. Single function per rule. Thresholds exported as a const so they can be tweaked from one place.

```ts
export const THRESHOLDS = {
  lastActivity:  { caution: 7,  error: 21 },   // days ago
  daysToClose:   { caution: 14, error: 7 },    // days remaining (smaller = worse)
  riskCount:     { caution: 1,  error: 4 },    // # of risk flags
};

export const lastActivitySeverity = (daysAgo: number): Severity =>
  daysAgo <= THRESHOLDS.lastActivity.caution ? 'ok' :
  daysAgo <= THRESHOLDS.lastActivity.error    ? 'caution' : 'error';

export const dealSizeBand = (amount: number) =>
  amount < 100_000   ? 'small'  :
  amount < 500_000   ? 'medium' :
  amount < 1_000_000 ? 'large'  : 'mega';

export const formatCurrency = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export const relativeTimeLabel = (daysAgo: number) =>
  daysAgo === 0       ? 'today' :
  daysAgo === 1       ? '1 day ago' :
  daysAgo < 30        ? `${daysAgo} days ago` :
  daysAgo < 60        ? '1 month ago' :
                        `${Math.floor(daysAgo / 30)} months ago`;
```

**Pattern.** Every conditional rule:
1. Takes raw values (not records — keep functions composable).
2. Returns a small typed result (`Severity`, `'small' | 'medium' | …`, formatted string).
3. Pulls thresholds from the `THRESHOLDS` const.
4. Has no side effects.

---

## Tag → icon mapping pattern

```ts
export const PRODUCT_FAMILIES: Record<ProductFamilyId, ProductFamilyMeta> = {
  'firewall':       { name: 'Firewall',       brand: 'STRATA',  iconName: 'strata-firewall',  brandColor: '#FA582D' },
  'cdss':           { name: 'CDSS',           brand: 'STRATA',  iconName: 'strata-cdss',      brandColor: '#FA582D' },
  'sase':           { name: 'SASE',           brand: 'PRISMA',  iconName: 'prisma',           brandColor: '#00C0E8' },
  'cortex-cloud':   { name: 'Cortex & Cloud', brand: 'CORTEX',  iconName: 'cortex',           brandColor: '#00CC66' },
  'unit-42':        { name: 'Unit 42',        brand: 'UNIT42',  iconName: 'unit-42',          brandColor: '#FFCB06' },
};

// Helper a component uses:
export const productFamilyOf = (productId: ProductId): ProductFamilyMeta => {
  const product = PRODUCTS[productId];
  return PRODUCT_FAMILIES[product.familyId];
};
```

A component renders a product tag like:
```tsx
const fam = productFamilyOf('prisma-access');
<Tag icon={DS_ICONS[fam.iconName]} color={fam.brandColor}>{product.name}</Tag>
```

The "all Prisma products use the Prisma icon" rule is encoded *once*, in the family record. Add a new product → it inherits automatically. Move it to a different family → its icon changes. No row-level coupling.

---

## How a story consumes the data

```ts
import { OPPORTUNITIES, accountById, lastActivitySeverity, productFamilyOf, formatCurrency } from '@/mock';

export const Default = {
  render: () => (
    <Table>
      {OPPORTUNITIES
        .filter(o => o.scenarios.includes('default'))
        .map(o => {
          const account = accountById(o.accountId);
          const sev = lastActivitySeverity(o.lastActivity.daysAgo);
          return <Row key={o.id} opp={o} account={account} severity={sev} />;
        })}
    </Table>
  )
};
```

Three lookups, one severity calc, render. No data transformation in the component.

---

## How to extend

**Add a product:** add a row to `PRODUCTS` in `taxonomies.ts`. Done — every component that uses products picks it up.

**Add an account:** append to `data/accounts.ts`. If it should appear in a specific demo scenario, tag it with `scenarios: ['scenario-X']`.

**Add a risk flag:** add to `OPP_RISKS` or `ACCOUNT_RISKS` registry. The emoji-label convention from your original CSV is preserved (`{ id: 'no-design-of-record', emoji: '⚠️', label: 'No design-of-record' }`).

**Change a severity threshold:** edit `THRESHOLDS` in `derivations.ts`. One file, all components reflect.

**Add a new conditional rule:** add a function to `derivations.ts`. Keep it pure. Export a typed result.

**Add a scenario:** filter rows by tag — `o.scenarios.includes('your-scenario')`. No data forking.

---

## What ships now vs. later

**Now (this commit):**
- All taxonomies (product, family, brand, sales play, stage, forecast category, opportunity type, health, renewal outcome, opp risk, account risk, activity type)
- Core derivations (severity, bands, formatting, relative time)
- 15 accounts ported from your existing CSV
- 15 opportunities ported from your existing TSV
- 5 contacts (one starter set)
- Helpers + barrel

**Defer:**
- Customer Estate SKU-level rows (only needed when that page is mocked)
- Renewal records (only needed for the Renewal Snapshot mockup)
- Full 50/100 row port — easy to expand row-by-row when more density is needed
- Faker-style randomization for stress tests

---

## Acceptance — when this is "done enough"

A new mockup story should be writable in under 5 minutes with:
- One import from `@/mock`
- Zero hardcoded strings for product names, stages, risks, or account names
- Zero stored severity/band fields on records
- One filter to scope the row set (by scenario or attribute)

If a story still hardcodes "Acme", "Stage 5 – Negotiate", or "$1.2M", the mock layer is leaking.
