# Trigger Scenarios — AE Personal-Performance Prompts

Canonical references: T-01 through T-10.

---

## T-01: Quota Tracking

**Prompt**: Am I really on track to hit quota, or am I just carrying enough pipeline to feel okay?

**Response**:

Assuming you want a believable coverage read, not the nominal one:

Your nominal coverage looks healthy at 3.1x of remaining quota, but evidence-backed coverage is closer to 1.4x — three Best Case deals worth $720K combined have weak or missing evidence (no EB engagement, vague next steps, or close dates that have moved twice).

In scope: forecast data in Clari, opportunity evidence in Salesforce, activity engagement in people.ai. Out of scope: deals outside your owned portfolio, and any side comp arrangements.

Suggested next: open evidence-gap view for those three Best Case deals.

**Trace Steps** — Comparative analysis

1. Pulled current-quarter quota gap: $1.2M remaining against $2.0M target [1]
2. Quantified nominal coverage: closed won + commit + best case = $3.7M, or 3.1x gap [2]
3. Identified 3 Best Case deals worth $720K combined as candidates for evidence audit [3]
4. Found no evidence of Economic Buyer engagement on 2 of 3 in last 21 days [4]
5. Cross-referenced next-step and close-date history: vague next steps on all, close dates moved twice on two [5]
6. Discounted $720K from nominal coverage on weak-evidence basis
7. Assessed evidence-backed coverage at 1.4x — meaningfully below the nominal 3.1x

**Sources**:

[1] Clari · Forecast / Rollup — 11:59pm PT
[2] Clari · Forecast categories — 11:59pm PT
[3] Salesforce · Opportunities filtered to current-quarter close, Best Case — 11:42am PT
[4] people.ai · Contact engagement — 11:59pm PT
[5] Salesforce · Activity Timeline + Stage History — 1:24pm PT

---

## T-02: Slip Risk

**Prompt**: Which opportunities in my forecast are most likely to slip, and what evidence is missing?

**Response**:

Assuming you're preparing for the Wednesday forecast call:

Three deals show the highest slip risk: [opportunity_name_1] ($340K, no Champion-confirmed business case post-POC), [opportunity_name_2] ($480K, EB never on a call, close date moved twice), and [opportunity_name_3] ($210K, security review stuck without packet for 18 days). All three sit in Commit or Best Case but lack one or more core evidence signals.

In scope: forecast categories, opportunity evidence, activity history, call recordings. Out of scope: customer-internal politics or deals not in your forecast.

Suggested next: open the three deals in side-by-side evidence view.

**Trace Steps** — Comparative analysis

1. Pulled current-quarter forecast: 14 deals in Commit and Best Case [1]
2. Prioritized by close date proximity to quarter-end — 8 deals within last 21 days of quarter
3. Cross-referenced MEDDPICC fields and next-step recency across the 8 [2]
4. Identified 3 deals with weak or missing Champion-confirmed business case [3,4]
5. Found no evidence of Economic Buyer participation on [opportunity_name_2] in last 30 days [5]
6. Traced close-date movement pattern: [opportunity_name_2] moved twice; [opportunity_name_3] stuck at security stage 18 days [6]
7. Concluded [opportunity_name_1], [opportunity_name_2], [opportunity_name_3] as highest slip risk, ranked by evidence-gap severity

**Sources**:

[1] Clari · Forecast categories — 11:59pm PT
[2] Salesforce · MEDDPICC + Activity Timeline — 10:15am PT
[3] Salesforce · Notes — 12:38pm PT
[4] Gong · Call transcripts — 11:59pm PT
[5] people.ai · Meeting attendance — 11:59pm PT
[6] Salesforce · Stage History — 3:01pm PT

---

## T-03: Pipeline Thinness

**Prompt**: Where is my pipeline thin?

**Response**:

Stage 2 ("Validation") for next quarter is your thinnest area — 4 deals against your trailing 4-quarter baseline of 9, giving 1.1x coverage against your historical conversion rate.

**Trace Steps** — Triangulation

1. Pulled open pipeline by close-period and stage [1]
2. Measured Stage 2 count for next quarter: 4 deals [1]
3. Benchmarked against your trailing 4-quarter average of 9 Stage 2 deals at this point in cycle [2]
4. Cross-referenced creation pace from outbound sequences and meeting bookings [3]
5. Calculated coverage ratio at 1.1x against typical conversion rate
6. Concluded Stage 2 next-quarter coverage is the thinnest dimension

**Sources**:

[1] Tableau · Pipeline dashboard — 11:59pm PT
[2] Tableau · Historical pipeline view — 11:59pm PT
[3] Salesforce · Activity Timeline (outbound sequences + meeting bookings) — 9:38am PT

---

## T-04: Time Misallocation

**Prompt**: What am I spending time on that is unlikely to pay off?

**Response**:

[account_name] is your lowest-yield active account — 6 hours of meetings over the last 14 days against a $42K opportunity with no Economic Buyer, no business case, and a "responsive technical contact" as the only engagement signal.

**Trace Steps** — Comparative analysis

1. Pulled calendar meeting log: last 14 days, grouped by account [1]
2. Quantified meeting hours per account, ranked descending [1]
3. Cross-referenced meeting hours against opportunity value [2]
4. Identified [account_name] at 6 hours against $42K — high time, low value
5. Verified absence of Economic Buyer on [account_name]: contact set is technical-only [3]
6. Confirmed engagement is technical curiosity, not buying signal — no business case in notes, no quantified pain [4,5]
7. Assessed [account_name] as the highest time-to-yield mismatch in your portfolio

**Sources**:

[1] Salesforce · Activity Timeline (calendar sync) — 9:47am PT
[2] Salesforce · Opportunity ARR — 11:02am PT
[3] Salesforce · Contact Roles — 12:15pm PT
[4] Salesforce · Notes — 1:33pm PT
[5] Gong · Call transcripts — 11:59pm PT

---

## T-05: Three Deals To Focus On

**Prompt**: Which three deals deserve my best hours this week, and why?

**Response**:

Assuming you mean deals where your direct involvement can change the outcome this week, not just the biggest by size:

[opportunity_name_1] ($210K) — security packet not yet supplied; an hour from you unblocks an 18-day stall. [opportunity_name_2] ($380K renewal + expansion potential) — CISO mentioned SOC consolidation 11 days ago, expansion conversation hasn't been opened. [opportunity_name_3] ($650K) — POC ended successfully but no EB introduction has happened in 45 days.

In scope: open opportunities, milestone events, activity engagement. Out of scope: anything outside your forecast or this week's calendar.

Suggested next: draft Champion outreach for [opportunity_name_3] EB introduction.

**Trace Steps** — Triangulation

1. Pulled all open opportunities with movable milestones this week [1,2]
2. Identified [opportunity_name_1] at 18-day security-review stall — packet not yet supplied [3]
3. Surfaced [opportunity_name_2] CISO comment on "SOC consolidation" 11 days ago in last meeting [4]
4. Found no evidence of EB introduction on [opportunity_name_3] since POC close on March 28 [5]
5. Discounted three larger deals where outcome is gated on customer-side timing, not AE action
6. Concluded [opportunity_name_1], [opportunity_name_2], [opportunity_name_3] as highest-leverage focus — each has a single AE-controllable next step

**Sources**:

[1] Clari · Forecast — 11:59pm PT
[2] Salesforce · Open Opportunities — 2:14pm PT
[3] Salesforce · Activity Timeline + Files — 2:48pm PT
[4] Gong · Call transcripts, topic search — 11:59pm PT
[5] people.ai · Engagement post-POC — 11:59pm PT

---

## T-06: Single-Threaded Deals

**Prompt**: Where am I single-threaded, and who should I multi-thread into next?

**Response**:

4 of your 12 active deals are single-threaded — [opportunity_name] is highest-risk (only contact is the Director-level technical lead, EB field empty), with CFO Margaret Chen as the strongest multi-thread candidate based on her seniority and presence on adjacent deals in your portfolio.

**Trace Steps** — Deductive synthesis

1. Pulled contact roles across 12 active opportunities [1]
2. Verified actual engagement on each contact: 4 deals have only one engaged contact [1,2]
3. Compared engaged-contact roles to ideal power-map (Champion, EB, technical, procurement)
4. Detected [opportunity_name] as highest-urgency: technical-lead-only, no EB engagement in 14 days [1,2]
5. Located Margaret Chen (CFO) in [opportunity_name]'s account hierarchy as adjacent senior contact [3]
6. Concluded [opportunity_name] most at-risk with Margaret Chen as next multi-thread target

**Sources**:

[1] Salesforce · Contact Roles — 11:02am PT
[2] people.ai · Activity — 11:59pm PT
[3] Salesforce · Account contacts — 12:15pm PT

---

## T-07: Stage Where Deals Stall

**Prompt**: What stage do my deals most often get stuck in, and what usually causes it?

**Response**:

Assuming you want a longitudinal pattern, not a single-deal answer:

Your deals most often stall between Technical Validation and Business Case stages — 7 of your 11 closed-lost deals over the past 3 quarters got stuck there, typically because no quantified business case was confirmed by the Economic Buyer before procurement engaged.

In scope: 3 quarters of your closed and open deal history. Out of scope: deals owned by peers or pre-territory transfer.

Suggested next: draft a business case template for Stage 3 to 4 conversion.

**Trace Steps** — Iterative synthesis

1. Detected that 7 of 11 closed-lost deals over 3 quarters stalled between Technical Validation and Business Case [1]
2. Measured average stage duration: Technical Validation to Business Case held 38 days, longest of any gap [1]
3. Surfaced closed-lost notes and Gong call summaries for the 7 stalled deals [2]
4. Discounted procurement-blame hypothesis: no procurement engagement in 5 of 7 cases
5. Found no evidence of EB-confirmed business case in any of the 7 [2,3]
6. Concluded the failure mode is technical validation substituting for business case

**Sources**:

[1] Salesforce · Stage History + Closed Lost — 10:28am PT
[2] Gong · Call transcripts — 11:59pm PT
[3] Salesforce · Notes — 1:11pm PT

---

## T-08: Where I Win Most Often

**Prompt**: Where do I win most often, and am I spending enough time there?

**Response**:

Assuming you want both a win-pattern read and a time-allocation check:

You win most often when the pain is tied to consolidation or SOC operations efficiency at director-or-above buyer level — 9 of your 13 closed-won deals over 4 quarters fit this pattern. Your current pipeline is light on it: only 4 of 17 active opportunities have either of those use cases as the primary pain.

In scope: 4 quarters of your closed deal history and current pipeline. Out of scope: peer or team-level benchmarks.

Suggested next: filter new prospecting on consolidation and SOC efficiency use cases.

**Trace Steps** — Iterative synthesis

1. Pulled closed-won deals across trailing 4 quarters: 13 deals [1]
2. Detected an apparent product-family pattern in ARR view [2]
3. Reconciled by switching to deal-count view — pattern collapsed as 2-deal outlier [2]
4. Identified consolidation and SOC efficiency as recurring use cases in 9 of 13 wins [3,4]
5. Verified buyer-level pattern: director-or-above in all 9 [5]
6. Measured current pipeline fit: only 4 of 17 active opportunities match [6]
7. Concluded win pattern is use-case-plus-persona with current pipeline under-weighted

**Sources**:

[1] Salesforce · Closed Won — 9:33am PT
[2] Tableau · Win-loss dashboard — 11:59pm PT
[3] Gong · Topic search — 11:59pm PT
[4] Salesforce · Notes — 2:50pm PT
[5] Salesforce · Contact Roles — 4:07pm PT
[6] Salesforce · Active Opportunities — 4:18pm PT

---

## T-09: Emotional Attachment vs. Data

**Prompt**: What deals am I emotionally attached to that the data says I should de-risk?

**Response**:

I can't measure your attachment directly — but [opportunity_name] shows the strongest mismatch between how you've described it and what the evidence supports: Best Case at $480K, last 3 note entries describe Champion enthusiasm, but the EB has never been on a call, close date moved twice, and the last "next step" was "customer to discuss internally" 11 days ago.

**Trace Steps** — Comparative analysis

1. Pulled forecast deals where recent notes use positive framing without concrete next steps [1]
2. Identified [opportunity_name] as the deal with the longest internal narrative in last 14 days [2]
3. Surfaced last 3 note entries: Champion-enthusiasm framing, no concrete commitments [1]
4. Found no evidence of Economic Buyer participation on any call to date [3]
5. Traced close-date movement: 2 pushes in 60 days [4]
6. Located most recent "next step" entry: "customer to discuss internally," 11 days old [5]
7. Concluded [opportunity_name] shows the highest story-vs-evidence gap in your portfolio — naming it without claiming to read your state of mind

**Sources**:

[1] Salesforce · Notes (pattern match on positive framing) — 11:18am PT
[2] Salesforce · Activity Timeline — 11:33am PT
[3] people.ai · Meeting attendance — 11:59pm PT
[4] Salesforce · Stage History — 12:04pm PT
[5] Salesforce · Next Step field — 12:15pm PT

---

## T-10: What I'm Avoiding

**Prompt**: What am I avoiding that will hurt my number later?

**Response**:

Prospecting and partner follow-up — you've blocked 12 hours for outbound in the last 14 days but logged only 2 hours of actual outbound activity, and two channel contacts who sourced wins for you earlier this year have had no follow-up in 47 and 62 days.

**Trace Steps** — Triangulation

1. Pulled calendar entries tagged for prospecting over last 14 days: 12 hours blocked [1]
2. Measured actual outbound activity logged: 2 hours [2]
3. Compared blocked vs. executed: 10-hour gap
4. Surfaced partner-sourced closed-won deals from last 12 months: 3 deals, 2 distinct channel contacts [3]
5. Found no evidence of follow-up activity to those 2 channel contacts in 47 and 62 days respectively [4]
6. Verified absence of expansion mapping on 4 accounts with no executive touch in 60+ days [5,4]
7. Concluded prospecting and partner follow-up are the two avoidance patterns most likely to create future pipeline gap

**Sources**:

[1] Salesforce · Activity Timeline (calendar sync) — 10:55am PT
[2] Outreach · Activity log — 11:59pm PT
[3] Salesforce · Partner-influenced Closed Won — 12:42pm PT
[4] people.ai · Activity — 11:59pm PT
[5] Salesforce · Account Notes — 3:30pm PT