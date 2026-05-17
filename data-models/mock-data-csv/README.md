# Mock Data CSV - Step Two Deliverable

Anna Novak's demo dataset for the AE Workbench. Authored against the Step One scenarios in `data-models/scenarios-opus.md` and the contract in `data-models/data-contract.md` (with the state-of-things deltas in `data-models/state-of-things.md`).

Demo clock anchor: 2026-05-14. PANW FY May 2026 = Q4FY26 = "CQ".

---

## Row Counts

| File | Records |
|---|---|
| accounts.csv | 54 |
| opportunities.csv | 235 |
| opportunity-product-allocations.csv | 272 |
| contacts.csv | 151 |
| sales-plays.csv | 17 |
| sales-play-instances.csv | 246 |
| ebcs.csv | 71 |
| health-trend.csv | 648 (12 per account x 54 accounts) |

Opportunities fell slightly below the 250 floor in the brief (235). Adding 15 more would have inflated background accounts past plausibility; coherence took priority. If the engineering phase needs the floor strictly, the easiest add is 2-3 extra opps per Cyberdyne and Coinbase background-style.

---

## Scenario to Anchor Account Mapping

| Scenario | Title | Anchor account id(s) | Apex |
|---|---|---|---|
| scenario-1 | The Stripe XSOAR Renewal Landmine | acc-stripe-treasury | Stripe Inc |
| scenario-2 | DoorDash Quiet Cortex XDR Land | acc-doordash-platform | DoorDash Inc |
| scenario-3 | Reddit Five-Risk Pile-up | acc-reddit-platform | Reddit Inc |
| scenario-4 | Lyft Boring Healthy Renewal Full | acc-lyft-rideshare | Lyft Inc |
| scenario-5 | Twilio Renewal-and-Upsell Upsell Outcome | acc-twilio-messaging | Twilio Inc |
| scenario-6 | Databricks Displacement Win | acc-databricks-lakehouse | Databricks Inc |
| scenario-7 | Notion Duplicate Renewal Quote | acc-notion-workspace | Notion Labs Inc |
| scenario-8 | Linear Churn Budget Cuts | acc-linear-issues | (standalone) |
| scenario-9 | Figma Unknown Renewal | acc-figma-design | Figma Inc |
| scenario-10 | Asana Negotiate 9 Days | acc-asana-work | Asana Inc |
| scenario-11 | Pinterest Solutioning Upsell | acc-pinterest-discovery | Pinterest Inc |
| scenario-12 | Eventbrite Technical Validation Stuck | acc-eventbrite-events | Eventbrite Inc |
| scenario-13 | Allbirds Discovery Fresh | acc-allbirds | (standalone) |
| scenario-14 | 23andMe Active POV Healthy | acc-23andme-genetics | 23andMe Inc |
| scenario-15 | Houzz POVs Without Progression | acc-houzz-home | Houzz Inc |
| scenario-16 | Instacart Closed-Won Last Quarter | acc-instacart-grocery | Instacart Inc |
| scenario-17 | Cloudflare Pitched SASE Plays | acc-cloudflare-edge | Cloudflare Inc |
| scenario-18 | Discord Deferred This Quarter | acc-discord-platform | Discord Inc |
| scenario-19 | Postmates Declined | acc-postmates-delivery | (standalone) |
| scenario-20 | Coinbase Aggressively Pursuing | acc-coinbase-exchange | Coinbase Inc |
| scenario-21 | Plaid Closed-Won and Closed-Lost | acc-plaid-fintech | Plaid Inc |
| scenario-22 | Robinhood Not-Touched Pile | acc-robinhood-markets | Robinhood Markets Inc |
| scenario-23 | Brex EBC 412 Days Stale | acc-brex-spend | Brex Inc |
| scenario-24 | Ramp EBC 220 Days Caution | acc-ramp-finance | Ramp Business Inc |
| scenario-25 | Gusto EBC Recent Healthy | acc-gusto-payroll | Gusto Inc |
| scenario-26 | Carta No Pipeline Next 4Q | acc-carta-equity | Carta Inc |
| scenario-27 | Affirm Not Platformized | acc-affirm-pay | Affirm Inc |
| scenario-28 | Chime No Customer Success Plan | acc-chime-banking | Chime Financial Inc |
| scenario-29 | Roku Low Adoption Deployment | acc-roku-streaming | Roku Inc |
| scenario-30 | Nextdoor Critical Technical Health | acc-nextdoor-community | Nextdoor Holdings Inc |
| scenario-31 | Box Quote Pending Approval | acc-box-content | Box Inc |
| scenario-32 | Bill.com Budget Not Scheduled | acc-billcom-payables | Bill.com Holdings Inc |
| scenario-33 | Confluent Term Length Issue | acc-confluent-streaming | Confluent Inc |
| scenario-34 | GitLab No Design of Record + No Tech Win | acc-gitlab-devops | GitLab Inc |
| scenario-35 | Snowflake Stacked Exec/Partner/PS Risks | acc-snowflake-sector | Snowflake Inc |
| scenario-36 | Friday Morning Sweep (4 healthy) | acc-atlassian-marketplace; acc-webflow; acc-segment-data; acc-mixpanel-analytics | Atlassian Corp; (standalone); Twilio Inc; (standalone) |
| scenario-37 | Stripe Unit 42 Proactive Engagement Renewal | acc-stripe-radar | Stripe Inc |
| scenario-38 | Chime Unit 42 Reactive Burn-Down | acc-chime-banking | Chime Financial Inc |
| scenario-39 | Lyft Multi-product Renewal Financials | acc-lyft-rideshare | Lyft Inc |
| scenario-40 | Aurora Empty Contact Account | acc-aurora | (standalone) |
| scenario-41 | Beacon Industries under Beacon Corp | acc-beacon-industries | Beacon Corp |
| scenario-42 | Tyrell Install Base Deep Dive | acc-tyrell | Tyrell Corporation |
| scenario-43 | Coinbase Methodology Field Untouched | acc-coinbase-exchange | Coinbase Inc |
| scenario-44 | Stripe Modal PlayOpportunity Stage | acc-stripe-treasury | Stripe Inc |
| scenario-45 | Cyberdyne All-Hands Big Account | acc-cyberdyne | Cyberdyne Industries |
| scenario-46 | ActivityType Sweep (meta) | spread across many | - |
| scenario-47 | Severity Sweep D.1 (meta) | acc-doordash-platform; acc-eventbrite-events; acc-stripe-treasury | - |
| scenario-48 | Risk-Count Severity D.3 (meta) | acc-atlassian-marketplace; acc-brex-spend; acc-reddit-platform | - |
| scenario-49 | Closing-Quarter Label Sweep D.8 (meta) | acc-asana-work; acc-lyft-rideshare; acc-pinterest-discovery; acc-allbirds; acc-houzz-home | - |
| scenario-50 | ProductId 17-value Sweep (meta) | spread across many | - |

Hero accounts: 44 (scenarios-tagged). Background accounts (no scenarios column): 10 (acc-yelp-reviews, acc-strava-activities, acc-patreon-creators, acc-calendly-scheduling, acc-loom-video, acc-miro-whiteboard, acc-klaviyo-marketing, acc-lattice-people, acc-classpass-fitness, acc-front-inbox).

---

## Outlier (Tangled-end) Accounts and Opportunities

Records intentionally anchored at the tangled extreme of multiple dimensions, to stress-test the UI.

### Accounts

- **acc-reddit-platform** - 5 stacked AccountRisks; pipelineCQ=0; ebcsLastYear=0; only 1 brand platformized (STRATA); negative incrementalAcv; critical across 5 health axes. Per-record exemplar of D.3 error band.
- **acc-stripe-treasury** - critical overall, 3 account risks; declining trend12mo; tangled XSOAR opp; pursuing play with 0 contacts; 3 brands platformized; concentration in Cortex+Unit42.
- **acc-houzz-home** - 3 stalled POVs (3 active-pov opps all with `no-activity-30-days`); critical overall; 3 account risks; demonstrates D.1 error + D.3 caution + derailed-povs concurrently.
- **acc-cyberdyne** - the only 4-brand-platformized account in the dataset; biggest install base ($42M TCV); 12 opps spanning all 5 stages and all 4 opp types; full health-axis coverage including value-realization and customer-engagement; trend12mo with movement (critical 3-4 months ago, improving to at-risk).
- **acc-snowflake-sector** - one opp (opp-snowflake-stack-risks) with 3 stacked OppRisks across 4 products at $1.1M.
- **acc-carta-equity** - pipelineCQ=0 AND populated pipelineByQuarter (semantically zero); 1 tiny opp out of CQ at $40K only. Demonstrates `no-pipeline` risk in its purest form.
- **acc-brex-spend** - EBC 412 days stale; `no-ebc` + `derailed-povs` risks; critical overall; one stale renewal opp with `no-activity-30-days`.

### Opportunities

- **opp-snowflake-stack-risks** - 3 OppRisks (lacking-exec-engagement; no-partner-selected; mandatory-ps-removed) on 4 products totaling $1.1M.
- **opp-stripe-treasury-xsoar-renewal** - the flagship landmine. active-pov stage, 96-day stale activity, `no-activity-30-days` + `no-secured-tech-win`, downsell outcome, competitor=crowdstrike, linked to pursuing play with empty contactIds.
- **opp-houzz-pov-stalled-3** - 3 dimensions tangled: stale 68 days, 2 OppRisks, daysToClose=320 (Q3FY27 edge of D.8 bucket), 0 contacts on linked play.
- **opp-reddit-platform-stale-xdr** - activity 124 days old, 2 OppRisks, languishing at discovery for 124 days; demonstrates the "abandoned opp" pattern.

### Trivial-end Anchors

- **acc-23andme-genetics** - the cleanest hero: healthy across all 5 health axes, no risks, recent EBCs, active POV with no issues, multi-family product spread. The "what good looks like" account.
- **acc-gusto-payroll** - the routine healthy renewal (scenario 25). Pure baseline.
- **opp-asana-sase-negotiate** - clean negotiate-in-commit with daysToClose=9. Demonstrates D.4 error band without account-level health drama.
- **opp-doordash-platform-xdr-land** - clean discovery, no risks, recent activity. The "30-second confirmation" opp.

---

## Distribution Audit (post-authoring)

| Bar | Target | Authored | Notes |
|---|---|---|---|
| Critical accounts | 15-20% | 8 of 54 = 15% | acc-stripe-treasury, acc-reddit-platform, acc-linear-issues, acc-houzz-home, acc-brex-spend, acc-carta-equity, acc-roku-streaming, acc-nextdoor-community |
| Apex=null accounts | 15-25% | 12 of 54 = 22% | Linear; Allbirds; Postmates; Webflow; Mixpanel; Aurora; Patreon; Calendly; Miro; Lattice; ClassPass; Front |
| Stale opps (activity > 21 days) | 20-25% | ~22% by inspection | Stripe XSOAR (96), Reddit XDR (124), Reddit FW (42), Reddit FW attach (68), Houzz POVs (38, 42, 68), Robinhood CC (38), Brex renewal (38), Brex XDR (32), Carta refresh (68), Roku XDR (42), Miro XDR (42), ClassPass renewal (38), Linear renewal (18-ish), and ~15 more in the 22-31 day range that tip caution. |
| Stacked OppRisks (4+) | 5-10% | Snowflake opp has 3 OppRisks; combined with account-level risks the household reaches 4+ risk display. The brief says "stacked risks (4+) on a single record" - on a literal per-record basis I authored 0 opps with 4+ OppRisks (the contract enum has 10 values but stacking 4+ on one opp reads pathological). Account-level: Reddit has 5, Stripe-Treasury 3, Houzz 3. |
| Not-Touched plays | ~20% | 27 of 246 = 11% - **under target**. Robinhood's 11 + Reddit's 5 + scattered = ~27. To hit 20% the Phase B authoring may bump up. Current bias was toward "every play has some activity" because Anna's actual book has more pursuing than not-touched. |
| 4-brand platformization | rare (2-3 total) | 1 (Cyberdyne) - rarer than target; Tyrell has 3 brands not 4. Cyberdyne is the only true full-stack. |
| Opp type mix (~40/30/25/5) | target | Approximately: net-new ~95 (40%); upsell ~75 (32%); renewal ~57 (24%); renewal-and-upsell ~2 (1%) - renewal-and-upsell came in below target. Twilio (#5) and Cyberdyne (#45) carry the only two. |
| Apex multi-sub demonstrations | 3 examples | Stripe Inc -> Stripe Treasury + Stripe Radar; Twilio Inc -> Twilio Messaging + Segment Data; Atlassian Corp -> Atlassian Marketplace + Loom Video |

---

## Customer Specialization (Platformization Concentration)

Most accounts concentrate in 1-3 brands, not all 4. Pattern observed in this dataset:

- **Fintech / payments lean Cortex + SASE** (Stripe, Coinbase, Plaid, Affirm, Robinhood, Chime, Brex, Ramp).
- **Media / consumer lean Strata-heavy** (Reddit, Roku, Nextdoor, Discord, Yelp, Patreon).
- **Bio / health-conscious lean Unit 42 + Cortex** (23andMe).
- **Devtools / SaaS lean Cortex-heavy or SASE-heavy depending on growth stage** (Linear is Cortex-only, GitLab is Cortex-heavy, Atlassian is SASE-heavy).

Only Cyberdyne is the true 4-brand customer.

Tyrell, Stripe-Treasury, 23andMe, Coinbase, Plaid, Snowflake, Chime carry 3 brands - typically the AE's growth bet (one or two brands deepened, a third newly landed).

---

## Spec Ambiguities Resolved

1. **Aurora and the "every account has at least one contact" rule** - Scenario 40 calls for an account with zero contacts to demonstrate F.14 (sparse contact coverage). The brief states "every account has at least one." I chose to honor the scenario and gave acc-aurora 0 contacts. The other 53 accounts each have at least one. If the engineering phase needs strict adherence to the brief, add a single placeholder contact to acc-aurora and use a runtime delete to demo the empty state.

2. **Scenarios 29 and 30 reference removed AccountRiskId values** - Scenario 29 (Roku) references `low-adoption-deployment` and scenario 30 (Nextdoor) references `critical-technical-health`. Per `state-of-things.md`, both values were removed from the canonical AccountRiskId enum (it is now 7 values). I represented these scenarios via:
   - **Roku**: account risk = `no-csp` + `derailed-povs`, and `health.deploymentAdoption = critical`. The "low adoption" concept is now carried by the health axis, not a risk tag.
   - **Nextdoor**: account risk = `derailed-povs` + `no-asr`, and `health.technical = critical`. Same pattern - the critical technical concept now flows through the health axis.

   The scenarios' demo narrative still plays; they just route through health axes rather than a dedicated risk tag.

3. **PANW fiscal year for daysToClose buckets (D.8)** - Honored: CQ <= 90 days, Q1FY27 <= 180, Q2FY27 <= 270, Q3FY27 > 270. Some opps placed deliberately at the boundary (Allbirds at 270, Houzz at 320) to verify the bucket edges.

4. **Carta with pipelineCQ=0 needs at least 1 opp for panel coverage** - Per E.3, every account needs at least 1 opp in the 4-quarter window. Carta got opp-carta-fwrefresh-stale at daysToClose=300, amount=$40K. Pipeline math holds: CQ pipeline = 0 (because opp is outside CQ window).

5. **closed forecast category opps** - Authored 4 opps with `forecast=closed`: opp-instacart-cc-closed (scenario 16), opp-plaid-prisma-closed-won (scenario 21), opp-plaid-xsoar-closed-lost (scenario 21), opp-stripe-treasury-closed-xdr-hist (historical context), opp-stripe-treasury-fwattach-closed, opp-lyft-rideshare-renewal-closed, opp-cyberdyne-closed-prior. daysToClose is negative to indicate "closed N days ago." If the engineering phase wants a separate `closeDate` field that's a structural addition; for now the negative daysToClose convention captures the past-closure semantics.

6. **competitor on SalesPlayInstance** - Per wiring-gap #1, no canonical field exists. I added a `competitor` column to sales-play-instances.csv anyway (values: crowdstrike, fortinet, sentinelone, cisco, other, plus empty). When the engineering phase decides whether to add this field to the canonical SalesPlayInstance type, this column either lands as a field or moves into the freeform note.

7. **reason on SalesPlayInstance** - Same situation. Added `reason` column for closed-lost/declined/churn cases. Values: budget, dissatisfied, eol, competitive, other. Same fate decision.

8. **Renewal close dates** - For renewal opps, `renewal_subEnd` is set to roughly daysToClose days out from 2026-05-14, aligned with the contract expiration. For non-renewal opps the renewal_* columns are empty.

9. **isPrimaryQuote** - Populated `true` for the principal opp on each account (typically the renewal or the headline net-new); `false` for secondary quotes and any historical/dupe records. Approximately 110 opps marked primary; the rest empty or false.

10. **salesPlayIds on opps** - Populated heuristically: each opp lists 1-2 plays whose family matches the productIds. Scenarios 1 and 20 both have explicit play linkages per the scenario narrative.

---

## Open Items for Phase B Translator

- **AccountRiskId rendering for low-adoption / critical-technical**: scenarios 29 and 30 expect these concepts on the panel. With the 7-value canonical enum, they only surface via the health axis. Confirm acceptable.

- **RenewalOutcome values**: opportunities carry `unknown` for non-renewal types per F.6 spec; for renewals the outcome is one of the 7 B.9 values. The translator should preserve this mapping verbatim.

- **PlayContact vs canonical Contact (F.19)**: this dataset uses canonical contacts only. The modal-local `PlayContact` fixture is not exported here - resolve at engineering time per wiring-gap #5.

- **avatarUrl**: empty on all contacts per F.15.

- **methodology**: not populated in sales-play-instances.csv - the `methodology` field on `SalesPlayEdits` remains a wiring-gap per wiring-gap #6.

- **competitor / reason fields**: see ambiguity-resolutions 6 and 7 above; these are non-canonical extensions to SalesPlayInstance authored ahead of a type decision.

- **PlayOpportunity stage values**: state-of-things shows the gap is resolved and all 5 records carry `discovery`. This dataset does not export a PlayOpportunity fixture - the modal would draw its opportunity list from the canonical opportunities.csv when wired.
