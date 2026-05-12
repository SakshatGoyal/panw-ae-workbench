# Mock Data Spec — Scale and reference

Row counts to aim for, distribution intent, and verbatim reference lists.

---

## Scale targets

| Entity                | Target rows         | Notes |
|-----------------------|---------------------|-------|
| Account               | 50                  | |
| Opportunity           | 100                 | ~2 per account average; some accounts 0, some 5+ |
| SalesPlay (catalog)   | 12–16               | Fixed catalog |
| SalesPlayInstance     | ~300–500            | Sparse: only where play applies to account |
| Contact               | 150–250             | 2–5 per account |
| EBC                   | ~75                 | 0–3 per account; some accounts have zero (drives EBC-severity `error`) |
| InstallBaseRecord     | 150–300             | 1–8 per account depending on product footprint |
| HealthTrendPoint      | 600                 | Exactly 12 per account |
| ForecastHistoryPoint  | 7 (per scope)       | One per quarter in the sparkline window; only `scopeKey = all` for POC v1 |

### Distribution intent

The fixture should span the severity buckets across every dimension. Roughly:

- **Account health**: ~50% `healthy`, ~30% `at-risk`, ~20% `critical`.
- **Opportunity stage**: distributed across all 5 stages, with ~10% closed (mix of won-implied and lost-implied) included for Plan Summary's `closed` aggregate.
- **Renewal outcomes**: most renewals `unknown` (in-flight), some `full`, a few `upsell` / `downsell` / `churn` / `displacement` to exercise the editor.
- **Last-activity `daysAgo`**: distributed across `ok` / `caution` / `error` buckets.
- **EBC presence**: most accounts have at least one recent EBC; a deliberate minority have none (drives `error` severity).
- **Risk counts**: a mix that exercises both the count thresholds (1 vs 2-3 vs 4+) and the variety of risk IDs.

---

## Account name registry

Use fictional companies. The historical seed CSV used names like: Tyrell Corporation, Clarity Holdings, Atlas Bank, Acme, Aperture Science, Atlantic Energy, Beacon Corp, Cyberdyne, Hooli. Maintain that flavor — recognizable fictional, never real PANW customers.

Author 50 distinct names. Variety across industries (financial services, healthcare, retail, energy, tech, manufacturing, government, education).

---

## Churn reasons (closed taxonomy)

When `renewalOutcome = churn`, the `churnReason` field is one of:

- `budget-cut`
- `competitor-displaced`
- `product-fit-mismatch`
- `org-change-mna`
- `consolidation-vendor-rationalization`

If you need to add a reason for a scenario, surface it in `05-open-items.md` rather than inventing a new value silently.

---

## Competitor reference list

When `renewalOutcome = displacement`, the `displacementCompetitor` field is one of:

- `CrowdStrike`
- `Microsoft Defender`
- `Fortinet`
- `Cisco`
- `Zscaler`
- `Cloudflare`
- `SentinelOne`
- `Splunk`
- `Wiz`
- `In-house build`

Same list is referenced by the `competitor-active`-style account-risk popover (where the popover names a competitor).
