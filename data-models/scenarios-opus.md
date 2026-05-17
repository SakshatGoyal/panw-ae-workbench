# AE Workbench — Scenarios (Anna Novak)

> Author: Anna Novak, Mid-Market AE, PANW, Bay Area. 270 accounts. Step One deliverable — scenarios + coverage. No CSV yet.
>
> Voice: first person. These are arcs through the tool, not snapshots. Most of my week is the boring ones — quick confirmations, renewal previews, a five-minute account scan. The dramatic ones (Stripe-class) are once or twice a week.

---

## 1. The Stripe XSOAR Renewal Landmine

Monday morning. I see **Stripe** has flipped to Critical overall — last week it was At-Risk. I open the panel. Three risks stacked. Cortex XSOAR is the one Critical axis on adoption; technical is still Healthy. The active POV on XSOAR hasn't moved in 96 days. The renewal closes this quarter. I open the renewal opp, see the linked sales play "Cortex Cloud Land & Expand" is Pursuing but has no contact attached. I open the modal, add the VP Security I pitched last month as the executive sponsor, attach the renewal opp as the primary, and mark the renewal outcome as **Downsell** with a note about competitive pressure from CrowdStrike.

**Anchor**: Stripe.
**Data**: overall=critical, technical=healthy, adoption=critical, value-realization=at-risk; trend12mo declining (healthy→critical over 6 months); active-pov opp on cortex-xsoar with lastActivity.daysAgo=96; renewal opp closing in 60 days; Cortex Cloud Land & Expand play in `pursuing` status, 0 contacts; 2 other healthy Stripe opps (a net-new SASE, a closed-won XDR upsell).
**Contract coverage**: B.8 critical, B.13 `no-activity-30-days` + `no-secured-tech-win`, B.5 active-pov, B.6 renewal, B.9 downsell, B.11 pursuing, D.1 error, D.5 family/section rollup, D.11 color, F.3, F.4, F.6, F.11, F.17 (competitor=crowdstrike).
**UI**: panel header, Account Health section, Opportunities (XSOAR expanded), Sales Plays (Cortex Cloud family), Sales Play Modal (contact add + primary opp + note + status), Renewal Outcome editor.

---

## 2. DoorDash — Quiet Cortex XDR Land

Tuesday. Scan-by-opportunity view. **DoorDash** has a brand-new net-new opp on Cortex XDR, discovery stage, $180k, days-to-close 220. Forecast pipeline. Nothing's wrong — I confirm last activity (`poc-scoping-session`, 4 days ago, "Initial scoping with SecOps Director"), close the panel. 90 seconds of work. This is most of my week.

**Anchor**: DoorDash.
**Data**: account healthy across all axes; one net-new opp, stage=discovery, forecast=pipeline, daysToClose=220, productIds=[cortex-xdr], riskIds=[no-risks], lastActivity.type=poc-scoping-session daysAgo=4 description "Initial scoping with SecOps Director".
**Contract coverage**: B.5 discovery, B.6 net-new, B.7 pipeline, B.8 healthy, B.13 no-risks, B.16 poc-scoping-session, D.1 neutral, D.4 ok, D.8 Q1FY27, F.8.
**UI**: opp-table row, panel summary (no drama).

---

## 3. Reddit — The Five-Risk Pile-up

Reddit went red two weeks ago and I've been avoiding it. Today I open the panel. Account-level riskIds: **no-pipeline-cq-next-4q, no-ebcs-last-year, not-platformized, povs-without-progression, no-or-stale-asr**. Risk count = 5 (D.3 error). Health overall=critical, every axis red or yellow. Only one Brand platformized (STRATA — they have firewalls and that's it). I close the panel and put it on my Friday list — this needs an EBC pitch, not a 30-second look.

**Anchor**: Reddit.
**Data**: 5 account risks; platformizations=['STRATA'] only; overall=critical, technical=at-risk, adoption=critical, value-realization=critical, customer-engagement=critical; pipelineCQ=0; ebcsLastYear=0; trend12mo flat-critical.
**Contract coverage**: B.1 STRATA, B.8 critical (all axes), B.14 5 distinct account risks, D.3 error (count≥4), D.6 zero pipeline, F.10 (no pipelineByQuarter), F.13.
**UI**: acc-table risk popover, panel header risk strip, Account Health expanded, Install Base section.

---

## 4. Lyft — Boring Healthy Renewal, Full

The renewal on **Lyft** just hit commit. $420k, full renewal, all line items confirmed. Stage=negotiate, daysToClose=18 (D.4 caution). I set Renewal Outcome to **Full**, write "MSA signed, awaiting countersig" in the note, and move on.

**Anchor**: Lyft.
**Data**: renewal opp, stage=negotiate, forecast=commit, daysToClose=18, amount=420000, productIds=[pa-series, pa-series-support, prisma-access], renewal.subEnd in 18 days, outcome=full; account healthy overall.
**Contract coverage**: B.5 negotiate, B.6 renewal, B.7 commit, B.9 full, D.4 caution, D.10 olive (commit), F.6, F.7.
**UI**: panel renewal editor, opp-table renewal popover.

---

## 5. Twilio — Renewal-and-Upsell, Upsell Outcome

**Twilio** is up for renewal AND we added VM-Series for their new APAC region. Type=`renewal-and-upsell`. Forecast=best-case. I confirm the upsell side is real (PO referenced), mark outcome=**Upsell** ($310k base renewal + $140k upsell = $450k amount).

**Anchor**: Twilio.
**Data**: opp.type=renewal-and-upsell, amount=450000, forecast=best-case, stage=technical-validation, daysToClose=72, productIds=[vm-series, pa-series-support], outcome=upsell, renewal.renewableTcvUsd=310000, renewal.arrUsd=140000.
**Contract coverage**: B.5 technical-validation, B.6 renewal-and-upsell, B.7 best-case, B.9 upsell, D.10 teal, F.6, F.7.
**UI**: panel renewal editor (handles both renewal types), opp-table.

---

## 6. Databricks — Displacement Win Over CrowdStrike

**Databricks** has been our XDR POV target for 8 months. CrowdStrike is the incumbent. POV converted; they're moving. I mark the renewal outcome as **Displacement**, competitor=crowdstrike. This is the trophy this quarter. ARR replacing $890k of CrowdStrike spend.

**Anchor**: Databricks.
**Data**: opp type=renewal (in our system as a competitive-displacement-styled renewal), outcome=displacement, productIds=[cortex-xdr, xsiam, fw-data-lake]; account technical=healthy, adoption=at-risk (still ramping). lastActivity.type=executive-briefing daysAgo=2 "Closing-call follow-up with CISO".
**Contract coverage**: B.9 displacement, B.16 executive-briefing, B.17 ok (recent activity), F.17 competitor=crowdstrike, F.9 multi-product allocation.
**UI**: panel renewal editor (displacement flow + competitor dropdown), Products hover popover with allocation.

---

## 7. Notion — Duplicate Renewal Quote

SE pinged me — there's a duplicate renewal quote on **Notion** that someone in deal desk opened. I open the dupe opp and mark outcome=**Duplicate** so it doesn't double-count in pipeline.

**Anchor**: Notion.
**Data**: two renewal opps on Notion. The primary (`isPrimaryQuote=true`) is in commit; the dupe is forecast=pipeline, outcome=duplicate.
**Contract coverage**: B.9 duplicate, isPrimaryQuote field, F.6.
**UI**: panel renewal editor; opportunity tile shows two quote IDs.

---

## 8. Linear — Churn, Budget Cuts

**Linear** told us their security budget got cut 40%. The XSOAR renewal isn't happening. I mark outcome=**Churn**, reason=**budget**, no competitor. Note: "Q3 budget freeze; revisit FY27 H1." Sad but clean.

**Anchor**: Linear.
**Data**: renewal opp, outcome=churn, churnReason=budget, no competitor; account adoption=at-risk, value-realization=critical; risk=`no-customer-success-plan`.
**Contract coverage**: B.9 churn, F.17 churnReason=budget, B.14 no-customer-success-plan.
**UI**: panel renewal editor (churn flow with reason dropdown, competitor optional).

---

## 9. Figma — Unknown Renewal, 6 Months Out

The **Figma** renewal closes in Q2FY27. Too early to know the outcome. Status quo: outcome=**Unknown**, forecast=pipeline. I'm just confirming the opp exists and the close date is right.

**Anchor**: Figma.
**Data**: renewal opp, outcome=unknown, daysToClose=170 (D.8 → Q1FY27), forecast=pipeline, stage=discovery.
**Contract coverage**: B.9 unknown, D.8 Q1FY27, B.7 pipeline.
**UI**: opp-table renewal popover shows "Unknown" tag (grey).

---

## 10. Asana — Negotiate, Closing in 9 Days

**Asana** net-new SASE deal, $640k, stage=negotiate, daysToClose=9. That's D.4 **error** territory. I check the opp, see last activity was `contract-review` 1 day ago. Procurement is moving. Forecast=commit. I leave a note in the play modal: "Contract on legal's desk."

**Anchor**: Asana.
**Data**: net-new opp, stage=negotiate, forecast=commit, daysToClose=9, productIds=[prisma-access, prisma-sd-wan], lastActivity.type=contract-review daysAgo=1 description "Legal redline returned to procurement".
**Contract coverage**: B.5 negotiate, B.6 net-new, B.7 commit, B.16 contract-review, D.4 error, D.1 neutral, F.8.
**UI**: opp-table (red days-to-close pill), panel Opp tile, modal note edit.

---

## 11. Pinterest — Solutioning Upsell

**Pinterest** is at solutioning on a Cortex Cloud upsell. ASR was completed last week. SE just sent the architecture diagram. Forecast=best-case. Days to close 95. Mundane progress.

**Anchor**: Pinterest.
**Data**: upsell opp, stage=solutioning, forecast=best-case, daysToClose=95, productIds=[cortex-cloud-leaf, xpanse], lastActivity.type=architecture-review daysAgo=6.
**Contract coverage**: B.5 solutioning, B.6 upsell, B.7 best-case, B.16 architecture-review, D.8 Q1FY27.
**UI**: opp-table, panel.

---

## 12. Eventbrite — Technical Validation Stuck

**Eventbrite** opp has been at technical-validation for 47 days. SE keeps getting bounced between IT and SecOps. OppRisk: `no-secured-tech-win`. Stage chip + daysInStage=47 in the panel. I email the champion.

**Anchor**: Eventbrite.
**Data**: net-new opp, stage=technical-validation, daysInStage=47, daysInForecast=47, riskIds=[no-secured-tech-win], lastActivity.type=technical-deep-dive daysAgo=14 (D.1 caution).
**Contract coverage**: B.5 technical-validation, B.13 no-secured-tech-win, B.16 technical-deep-dive, D.1 caution, F.5.
**UI**: panel Opportunity Snapshot with daysInStage rendered.

---

## 13. Allbirds — Discovery, Fresh

Cold-ish: **Allbirds** finally engaged after my 4th email. Discovery opp, $90k pipeline guess on Prisma Access. lastActivity=customer-engagement daysAgo=2. Just confirming the opp is in SFDC right.

**Anchor**: Allbirds.
**Data**: net-new opp, stage=discovery, forecast=pipeline, daysToClose=270 (D.8 Q2FY27 cusp), productIds=[prisma-access], lastActivity.type=customer-engagement daysAgo=2 description "First call with new CIO".
**Contract coverage**: B.5 discovery, B.16 customer-engagement, D.8 Q2FY27.
**UI**: opp-table row, no panel needed.

---

## 14. 23andMe — Active POV, Healthy, No Risks

**23andMe** has a beautiful active-pov on XSIAM. POV passed criteria 1 of 3. No risks (`no-risks` sentinel). Health all green. I screenshot the panel for the QBR deck.

**Anchor**: 23andMe.
**Data**: net-new opp, stage=active-pov, forecast=best-case, productIds=[xsiam, qradar], riskIds=[no-risks], lastActivity.type=deployment-health-check daysAgo=3; account healthy across all 5 axes.
**Contract coverage**: B.5 active-pov, B.13 no-risks, B.16 deployment-health-check, B.8 healthy (all 5 axes incl. value-realization + customer-engagement), D.3 ok.
**UI**: panel Account Health expanded view (all 5 axes green).

---

## 15. Houzz — POVs Without Progression

**Houzz** has THREE POVs running and none of them have closed criteria in 60+ days. Account risk: `povs-without-progression` (canonical) / `derailed-povs` (acc-table). I'm flagging this for my SE manager. Two of the POVs are still active-pov stage, lastActivity 35+ days.

**Anchor**: Houzz.
**Data**: 3 active-pov opps, two with lastActivity.daysAgo > 30 (D.1 error), one with daysAgo=22 (caution). Account risk `povs-without-progression`. activePOVs=3.
**Contract coverage**: B.14 povs-without-progression, B.15 derailed-povs, B.5 active-pov, D.1 error + caution, F.13.
**UI**: acc-table risk popover, panel active-POV count.

---

## 16. Instacart — Closed-Won Last Quarter

**Instacart** Cortex Cloud expansion closed last quarter — forecast=**closed**, $1.2M. I scan-by-opp filtered to closed to write my year-to-date attainment. This forecast value rarely shows up but it's real.

**Anchor**: Instacart.
**Data**: upsell opp, forecast=closed, stage=negotiate (post-close legacy), amount=1200000, productIds=[cortex-cloud-leaf, xpanse, fw-data-lake].
**Contract coverage**: B.7 closed (the value that "appears in canonical type but never in mock"), D.7 per-product allocation across 3 products.
**UI**: opp-table with closed filter chip; panel Products hover popover.

---

## 17. Cloudflare — Pitched SASE Plays

I pitched Cloudflare on three SASE plays last week. All three are in `pitched` status with $0 allocated (early). Cortex Cloud family has nothing — they're not in market for that yet.

**Anchor**: Cloudflare.
**Data**: 3 SalesPlayInstance records in `pitched` status across SASE family; Cortex Cloud family entirely empty for this account.
**Contract coverage**: B.11 pitched, B.4 sase family, D.5 (Not-Touched rollup is zero in this case — no tag), F.3.
**UI**: panel Sales Play SASE family expanded showing 3 pitched plays.

---

## 18. Discord — Deferred This Quarter

**Discord** said "not this quarter" on the FW/CDSS upgrade. Two plays in `deferred` status. I leave a note: "Revisit Q1FY27 post-budget."

**Anchor**: Discord.
**Data**: 2 SalesPlayInstance in `deferred`, FW/CDSS family.
**Contract coverage**: B.11 deferred, B.4 fw-cdss family, F.3, F.16 (play description).
**UI**: panel Sales Play family rendering, modal status tab=deferred.

---

## 19. Postmates — Declined

**Postmates** flat-out declined the XSOAR play — they already standardized on Splunk Phantom. Mark it `declined` so it stops showing in my pursue list.

**Anchor**: Postmates.
**Data**: 1 SalesPlayInstance, Cortex Cloud family, status=declined; account note refers to Splunk Phantom (free-text in modal note).
**Contract coverage**: B.11 declined, F.16, F.17 competitor (other) — note field captures non-enum competitor.
**UI**: modal note field, status tab=declined.

---

## 20. Coinbase — Aggressively Pursuing Cortex Cloud

**Coinbase** is hot for Cortex Cloud — full posse engagement. Four plays in the Cortex Cloud family are all in `pursuing`, total $2.1M attached. I keep the panel open most of the day on this one.

**Anchor**: Coinbase.
**Data**: 4 SalesPlayInstance pursuing, Cortex Cloud family; net-new opp at active-pov stage tied to the headline play (Opportunity.salesPlayIds populated — F.11).
**Contract coverage**: B.11 pursuing, B.4 cortex-cloud, F.3, F.11 (link from opp → play).
**UI**: panel Sales Play family fully expanded, modal "Linked Opportunities" populated.

---

## 21. Plaid — Closed-Won and Closed-Lost Side by Side

Quarterly review for **Plaid**. Two plays from last quarter: one **closed-won** (Prisma Access expansion, $380k landed) and one **closed-lost** (XSOAR — lost to Tines). Both surfaces — the wins to brag, the losses to learn.

**Anchor**: Plaid.
**Data**: 1 SalesPlayInstance closed-won (SASE), 1 closed-lost (Cortex Cloud); related Opportunity for closed-won is forecast=closed.
**Contract coverage**: B.11 closed-won + closed-lost, B.7 closed (again), F.3.
**UI**: panel showing both terminal statuses; modal closed-lost reason in note.

---

## 22. Robinhood — The Not-Touched Pile

**Robinhood**: I haven't touched 11 plays. D.5 rollup at section level shows $4.6M of Not-Touched across all four families. Cortex Cloud family rolls up $2.1M; FW/CDSS $1.4M; SASE $1.1M; Unit 42 is empty so no Not-Touched tag on that family row. This is my "I owe this account a real conversation" tab.

**Anchor**: Robinhood.
**Data**: 11 SalesPlayInstance in `not-touched` distributed across 3 families; Unit 42 family has zero instances of any status; total ≈ $4.6M.
**Contract coverage**: B.11 not-touched, B.4 all 4 families (Unit 42 by absence), D.5 section + family rollups (Unit 42 tag omitted), F.3.
**UI**: panel Sales Play section header tag, per-family row tags, Unit 42 row showing NO rollup tag.

---

## 23. Brex — EBC 412 Days Stale

**Brex**: ebc.daysAgo=412, ebc severity=**danger** (D.2 >365). Risk: `no-ebcs-last-year`. They were a top-10 account last year — what happened. I trigger an EBC invite.

**Anchor**: Brex.
**Data**: ebc absent=false but daysAgo=412; AccountRiskId=`no-ebcs-last-year` (B.14) / `no-ebc` (B.15). ebcsLastYear=0.
**Contract coverage**: B.14 no-ebcs-last-year, B.15 no-ebc, D.2 danger, D.9 consistency check passes.
**UI**: acc-table EBC tag red, risk popover.

---

## 24. Ramp — EBC 220 Days, Caution

**Ramp**: ebc.daysAgo=220. D.2 caution (orange tag). No `no-ebc` risk yet — we have 145 days until danger. I schedule the next EBC for Q1FY27.

**Anchor**: Ramp.
**Data**: ebc daysAgo=220; no `no-ebc` risk.
**Contract coverage**: D.2 caution, D.9 consistency passes (no risk because not danger).
**UI**: acc-table EBC tag orange.

---

## 25. Gusto — EBC Recent, Healthy

**Gusto**: EBC was 38 days ago. Neutral tag. Nothing to do. Confirming during the morning sweep.

**Anchor**: Gusto.
**Data**: ebc daysAgo=38; account fully healthy.
**Contract coverage**: D.2 neutral, B.8 healthy, baseline mundane.
**UI**: acc-table EBC tag neutral.

---

## 26. Carta — No Pipeline Next 4Q

**Carta**: account risk `no-pipeline-cq-next-4q`. pipelineByQuarter is genuinely zero for CQ + next 3. D.6 quarter pipeline total = 0. The bar in acc-table is empty. Big problem. I owe my manager a plan.

**Anchor**: Carta.
**Data**: AccountRiskId=`no-pipeline-cq-next-4q` (B.14) / `no-pipeline` (B.15); pipelineByQuarter populated as `{CQ:0, Q1FY27:0, Q2FY27:0, Q3FY27:0}` (F.10 — finally populated for at least this account); pipelineCQ=0.
**Contract coverage**: B.14 no-pipeline-cq-next-4q, B.15 no-pipeline, D.6 total=0, F.10.
**UI**: acc-table pipeline bar empty state.

---

## 27. Affirm — Not Platformized

**Affirm**: platformizations=['STRATA'] only. Risk: `not-platformized`. We have firewalls; no SASE, no Cortex, no Unit 42. Goal this quarter: PRISMA pitch.

**Anchor**: Affirm.
**Data**: platformizations=['STRATA']; AccountRiskId includes `not-platformized`; install base TCV $1.8M concentrated in pa-series + pa-series-support.
**Contract coverage**: B.1 STRATA (alone), B.14 not-platformized, B.15 not-platformized, F.2.
**UI**: panel Install Base section, platformization tag row, risk strip.

---

## 28. Chime — No Customer Success Plan

**Chime**: account risk `no-customer-success-plan`. CSM hasn't onboarded them properly. Adoption=at-risk despite technical=healthy. I open the Cortex Cloud Land & Expand play, attach a note for the CSM team.

**Anchor**: Chime.
**Data**: AccountRiskId=`no-customer-success-plan`; technical=healthy, adoption=at-risk, value-realization=at-risk.
**Contract coverage**: B.14 no-customer-success-plan, B.8 mixed.
**UI**: panel risk strip, Account Health axes.

---

## 29. Roku — Low Adoption Deployment

**Roku**: account risk `low-adoption-deployment` (canonical B.14 only — does NOT appear in acc-table B.15 risk library, so acc-table renders no tag for this risk). adoption=critical. I have to manually note this in the panel; the table view doesn't surface it. Coverage gap I want to flag.

**Anchor**: Roku.
**Data**: AccountRiskId includes `low-adoption-deployment` (canonical-only); adoption=critical, deploymentAdoption=critical.
**Contract coverage**: B.14 low-adoption-deployment, B.8 critical (adoption axis), F.13 (silent miss in acc-table).
**UI**: panel renders, acc-table does NOT render — this is part of the demo story.

---

## 30. Nextdoor — Critical Technical Health

**Nextdoor**: account risk `critical-technical-health`. technical=critical. Same B.15 gap as Roku — not in acc-table risk library. SE called me; their PA-Series cluster is failing health checks.

**Anchor**: Nextdoor.
**Data**: AccountRiskId=`critical-technical-health`; technical=critical, overall=critical; lastActivity (most recent opp) type=deployment-health-check daysAgo=2.
**Contract coverage**: B.14 critical-technical-health, B.8 critical (technical axis), B.16 deployment-health-check, F.13.
**UI**: panel Technical Health axis red, acc-table silent miss.

---

## 31. Box — Quote Pending Approval

**Box** renewal opp blocked: `quotes-pending-approval`. Deal desk has it for 9 days. Stage=negotiate, daysToClose=22 (caution). I ping the desk via the modal note.

**Anchor**: Box.
**Data**: renewal opp, stage=negotiate, riskIds=[quotes-pending-approval], daysToClose=22, lastActivity.type=budget-alignment-meeting daysAgo=5 description "Procurement awaiting redline approval".
**Contract coverage**: B.13 quotes-pending-approval, B.5 negotiate, B.6 renewal, B.16 budget-alignment-meeting, D.4 caution.
**UI**: opp-table risk pill, panel Opportunity Snapshot.

---

## 32. Bill.com — Budget Not Scheduled

**Bill.com**: net-new opp, OppRisk=`budget-not-scheduled`. Discovery stage. Champion says budget request is in for Q2FY27. Hold and nurture.

**Anchor**: Bill.com.
**Data**: net-new opp, stage=discovery, riskIds=[budget-not-scheduled], daysToClose=200, lastActivity.type=executive-briefing daysAgo=11.
**Contract coverage**: B.13 budget-not-scheduled, B.5 discovery, B.16 executive-briefing, D.1 caution.
**UI**: opp-table risk pill.

---

## 33. Confluent — Term Length Issue

**Confluent**: customer wants 12-month term; PANW deal desk wants 36. OppRisk=`term-length-issue`. Solutioning stage. I escalate to my manager via the modal.

**Anchor**: Confluent.
**Data**: opp type=upsell, stage=solutioning, riskIds=[term-length-issue], lastActivity.type=partner-strategy-call daysAgo=9 description "Partner aligned on shorter-term price point".
**Contract coverage**: B.13 term-length-issue, B.16 partner-strategy-call, B.5 solutioning, B.6 upsell.
**UI**: opp-table, modal note edit.

---

## 34. GitLab — No Design of Record + No Tech Win

**GitLab** active-pov has TWO opp risks: `no-design-of-record` and `no-secured-tech-win`. SE wrote the architecture but the customer hasn't signed off. lastActivity.type=solution-workshop daysAgo=18 (caution).

**Anchor**: GitLab.
**Data**: net-new opp, stage=active-pov, riskIds=[no-design-of-record, no-secured-tech-win], lastActivity.type=solution-workshop daysAgo=18.
**Contract coverage**: B.13 no-design-of-record + no-secured-tech-win (two values in one row), B.16 solution-workshop, D.1 caution.
**UI**: opp-table risk pill (multi-risk), panel Risk section.

---

## 35. Snowflake — Stacked Exec/Partner/PS Risks

**Snowflake**: a beast of an opp with `lacking-exec-engagement`, `no-partner-selected`, `mandatory-ps-removed`. Three OppRisks. Champion-level deal with no exec air cover and no partner attach. I'm working all three in parallel.

**Anchor**: Snowflake.
**Data**: net-new opp, stage=technical-validation, riskIds=[lacking-exec-engagement, no-partner-selected, mandatory-ps-removed], amount=1100000, productIds=[xsiam, cortex-xdr, fw-data-lake, unit-42-reactive]; account has Unit 42 platformization.
**Contract coverage**: B.13 lacking-exec-engagement + no-partner-selected + mandatory-ps-removed (3 values), B.1 UNIT42 brand, B.3 unit-42-reactive product, D.7 per-product allocation across 4 products.
**UI**: opp-table multi-risk pill; panel Products popover (allocation rounded across 4 products).

---

## 36. The Friday Morning Sweep — 4 Healthy Accounts in 6 Minutes

Friday 8am. I scan acc-table for green-on-green: **Atlassian**, **Webflow**, **Segment**, **Mixpanel**. All green across overall/technical/adoption. trend12mo flat-healthy. EBCs within 90 days. Pipeline populated next 4 quarters. No risks. I close the tab.

**Anchor(s)**: Atlassian, Webflow, Segment, Mixpanel (4 background-ish accounts surfacing).
**Data**: each healthy across overall/technical/adoption; ebcsLastYear≥1; riskIds=[no-risks]-equivalent (empty array allowed if `no-risks` sentinel not used at account level — see B.14); trend12mo array all zeros.
**Contract coverage**: B.8 healthy across multiple accounts (volume check), D.6 pipeline non-zero, baseline rendering for acc-table without risk popovers.
**UI**: acc-table compact view, no drill-downs.

---

## 37. Unit 42 Proactive Engagement Renewal — Stripe IR Retainer

Back to **Stripe** (different opp from #1). The Unit 42 proactive retainer renews in 45 days. Renewal opp, type=renewal, productIds=[unit-42-proactive], outcome=full. lastActivity=renewal-prep-call daysAgo=6. Quietly healthy on this product line even while XSOAR is on fire — separate axes.

**Anchor**: Stripe (Unit 42 thread).
**Data**: renewal opp at Stripe, productIds=[unit-42-proactive], outcome=full, forecast=commit, daysToClose=45, lastActivity.type=renewal-prep-call daysAgo=6.
**Contract coverage**: B.3 unit-42-proactive, B.1 UNIT42 brand, B.16 renewal-prep-call, B.9 full, B.6 renewal.
**UI**: panel Opportunities section (multiple opps, mixed health), Unit 42 sales play family.

---

## 38. Unit 42 Reactive — Chime IR Burn-Down

**Chime** is burning down their Unit 42 reactive hours (IR retainer). One small upsell opp to top up. Healthy product use, regardless of CSP gap (#28). productIds=[unit-42-reactive].

**Anchor**: Chime (Unit 42 thread).
**Data**: upsell opp, amount=85000, productIds=[unit-42-reactive], stage=solutioning.
**Contract coverage**: B.3 unit-42-reactive, B.1 UNIT42 brand.
**UI**: panel Products hover.

---

## 39. SD-WAN Renewal at Lyft — Multi-product Renewal Financials

The **Lyft** renewal (#4) actually has two products under the same quote: pa-series-support AND prisma-sd-wan. The opp-table renewal popover shows `renewableTcvUsd`=$1.1M, `arrUsd`=$420k, `subEnd`=18 days out. Per-product allocation rendered.

**Anchor**: Lyft (extended from #4).
**Data**: renewal opp.productIds=[pa-series-support, prisma-sd-wan, pa-series]; renewal.subEnd, renewableTcvUsd=1100000, arrUsd=420000.
**Contract coverage**: B.3 pa-series-support + prisma-sd-wan + pa-series, F.7 renewal financials, F.9 product allocation.
**UI**: opp-table renewal popover; panel Products hover.

---

## 40. Empty Contact Account — Aurora

**Aurora** (mid-tier account, $1.2M LTV) has ZERO contacts in my system. I open the panel, see the Contacts section is empty. I open the sales play modal to attach a contact — the PlayContact dropdown shows the 6 modal-fixture contacts (none from Aurora). F.19 visible in the wild — the modal can't show me Aurora's actual contacts because they don't exist and the modal fixture is disconnected.

**Anchor**: Aurora.
**Data**: account exists, 0 canonical Contact records; account has 2 opps + 3 sales plays.
**Contract coverage**: F.14 sparse contact coverage, F.19 disconnected modal fixture, A.6 PlayContact, A.7 PlayOpportunity.
**UI**: panel Contacts section empty state; modal contact dropdown shows generic fixture contacts.

---

## 41. Apex Parent — Beacon under Beacon Corp

**Beacon Industries** (subsidiary) rolls up to **Beacon Corp** (parent). Panel header shows apex="Beacon Corp". Acc-table apex column populated. Versus standalone accounts where apex=null.

**Anchor**: Beacon Industries (subsidiary); also surfaces standalone accounts where apex=null.
**Data**: Account.apex="Beacon Corp" for the subsidiary; many other accounts have apex=null (standalone).
**Contract coverage**: F.1 apex field both populated and null forms.
**UI**: panel header apex text; acc-table apex column.

---

## 42. Install Base Dollars — Tyrell Deep Dive

**Tyrell** install base: TCV=$28.4M, Incremental ACV=+$1.2M (tone:success), Margin=14.1% (tone:success), RPO=$3.6M. I quote these in the QBR deck.

**Anchor**: Tyrell.
**Data**: installBase {tcv:28400000, incrementalAcv:1200000, margin:0.141, rpo:3600000}; all 5 health axes populated (Tyrell is one of the few with full health coverage per F.).
**Contract coverage**: F.2 install base, B.8 all 5 health axes including value-realization and customer-engagement.
**UI**: panel Install Base section, Account Health expanded with 5 axes.

---

## 43. The Modal — Methodology Field Untouched

Opening a sales play modal on **Coinbase** (#20). The methodology field exists in `SalesPlayEdits` but isn't surfaced. I notice it's blank. Note: this is dead state today — wiring gap.

**Anchor**: Coinbase.
**Data**: SalesPlayEdits.methodology="" on all instances.
**Contract coverage**: A.8 methodology field, F.16 description (sister gap).
**UI surfaces touched / gaps**: modal — methodology unsurfaced (see wiring-gaps).

---

## 44. PlayOpportunity Stage Mismatch — Visible Friction

In any modal flow (e.g., #1 Stripe), the "Linked Opportunities" panel shows stages like "1 - Qualify" because PlayOpportunity.stage is free text, not StageId. The canonical opp in the panel uses "Active POV" via the StageId enum. The two strings don't match for the same logical opp. I notice the inconsistency every time.

**Anchor**: Stripe (modal-canonical gap).
**Data**: PlayOpportunity records with `stage="3 - Technical Validation"` etc.; same opps elsewhere render via StageId.
**Contract coverage**: F.18 stage free-text vs StageId.
**UI**: modal Linked Opportunities list vs panel Opportunity Snapshot.

---

## 45. The Big Account — Cyberdyne All-Hands

**Cyberdyne** is my biggest. I open the panel: apex="Cyberdyne Industries" (parent), install base $42M TCV, all 4 brands platformized, 8 active opps, 3 in commit, one renewal closing CQ. Sales plays across all 4 families populated. trend12mo declining from healthy to at-risk (improvement trajectory recently — last 2 months upward). This is the canonical demo account already in fixtures; my scenarios just stress everything around it.

**Anchor**: Cyberdyne (the canonical demo account).
**Data**: full coverage — all 4 brand platformizations, 8 opps spanning all 5 stages and all 4 opp types, all 4 sales play families populated, trend12mo with movement, install base populated, health all 5 axes populated.
**Contract coverage**: B.1 all 4 brands, B.4 all 4 sales play families, B.5 all 5 stages (across 8 opps), B.6 all 4 opp types, D.12 4Q renewal invariant naturally satisfied, F.1, F.2, F.3, F.4, F.5, F.6.
**UI**: full panel showcase, every section populated.

---

## 46. ActivityType Sweep — One Per Opp Across the Book

A meta-coverage note rather than a true narrative: across opps in scenarios 1–45 I want each of the 11 ActivityType values used at least once: technical-deep-dive (Eventbrite #12), architecture-review (Pinterest #11), deployment-health-check (23andMe #14, Nextdoor #30), renewal-prep-call (Stripe-U42 #37), contract-review (Asana #10), partner-strategy-call (Confluent #33), budget-alignment-meeting (Box #31), poc-scoping-session (DoorDash #2), solution-workshop (GitLab #34), executive-briefing (Databricks #6, Bill.com #32), customer-engagement (Allbirds #13).

**Anchor**: meta.
**Data**: as listed.
**Contract coverage**: B.16 all 11 ActivityType values (verified in coverage matrix).
**UI**: opp-table activity sub-cell, acc-table activity sub-cell.

---

## 47. Severity Sweep — D.1 Three Bands

Three opps with deliberately staggered lastActivity.daysAgo to verify D.1 ladder renders all three bands in one screen:
- DoorDash (#2) daysAgo=4 → neutral
- Eventbrite (#12) daysAgo=14 → caution (orange triangle)
- Stripe XSOAR (#1) daysAgo=96 → error (red circle)

**Anchor**: meta verification.
**Data**: as listed.
**Contract coverage**: B.17 ok/caution/error, D.1 thresholds.
**UI**: opp-table sorted by activity.

---

## 48. Risk-Count Severity — D.3 Three Bands

Three accounts to verify D.3:
- Atlassian (#36) 0 risks → ok
- Brex (#23) 2 risks → caution
- Reddit (#3) 5 risks → error

**Anchor**: meta verification.
**Data**: as listed.
**Contract coverage**: D.3 thresholds, B.14 distribution.
**UI**: acc-table risk-count pill.

---

## 49. Closing-Quarter Label Sweep — D.8

Four opps with daysToClose set to land in each bucket:
- Asana (#10) daysToClose=9 → CQ
- Lyft (#4) daysToClose=18 → CQ
- Pinterest (#11) daysToClose=95 → Q1FY27
- Allbirds (#13) daysToClose=270 → Q2FY27 (edge of bucket)
- One more for Q3FY27: Figma at 290 (adjust #9 OR add Houzz POV with daysToClose=320).

**Anchor**: meta verification.
**Data**: I'll set the Houzz second POV (#15) to daysToClose=320 to land Q3FY27.
**Contract coverage**: D.8 all 4 quarter buckets.
**UI**: opp-table CQ pill, panel Opportunity Snapshot closing-quarter row.

---

## 50. ProductId Coverage — 17-Value Sweep

A meta-coverage note tying ProductId enum to scenarios:
- pa-series: Reddit (#3), Lyft (#4), Snowflake (#35), Affirm (#27)
- vm-series: Twilio (#5)
- pa-series-attached: Cyberdyne (#45) — assigned via Cyberdyne's broad coverage
- pa-series-support: Lyft (#4), Affirm (#27), Twilio (#5)
- fw-data-lake: Databricks (#6), Snowflake (#35), Instacart (#16)
- prisma-access: Allbirds (#13), Asana (#10), Plaid (#21), Affirm pitch (#27 future)
- prisma-sd-wan: Asana (#10), Lyft (#39)
- cortex-xdr: DoorDash (#2), Databricks (#6), Snowflake (#35)
- cortex-xsoar: Stripe (#1), Plaid (#21), Linear (#8), Postmates (#19)
- xpanse: Pinterest (#11), Instacart (#16)
- xsiam: Databricks (#6), 23andMe (#14), Snowflake (#35)
- qradar: 23andMe (#14)
- cortex-cloud-leaf: Pinterest (#11), Instacart (#16), Coinbase (#20)
- unit-42-reactive: Snowflake (#35), Chime (#38)
- unit-42-proactive: Stripe-U42 (#37)

**Anchor**: meta verification.
**Contract coverage**: B.3 all 17 ProductId values.

---
