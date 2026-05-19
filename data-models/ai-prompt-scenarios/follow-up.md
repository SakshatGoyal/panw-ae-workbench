# Follow-up Scenarios — Manager Deal/Account Prompts

Canonical references: F-01 through F-07.

---

## F-01: Commit Deal Real Path To Close

**Prompt**: Is the [opportunity_name] Commit deal actually ready to close this quarter?

**Response**:

Assuming you're evaluating Commit categorization vs. Best Case:

[opportunity_name] is missing paper-process evidence — no procurement, legal, or signer contact in the set, and the quote has been untouched for 14 days — which makes it Best Case, not Commit.

In scope: contact roles, opportunity activity, quote status. Out of scope: the customer's internal procurement queue.

Suggested next: confirm signer, procurement owner, and dated customer step with the rep.

**Trace Steps** — Comparative analysis

1. Identified contact set: architect, director, SE roles (9 contacts) [1]
2. Found no evidence of procurement, legal, or signer contacts in the same set [1]
3. Measured quote inactivity at 14 days since generation, no customer-side response [2]
4. Confirmed technical engagement is active: 6 SE meetings in 30 days [3]
5. Ruled out partner-driven paper path: partner attached, no joint activity in 21 days [4,3]
6. Assessed as Best Case — paper-process signature missing for Commit

**Sources**:

[1] Salesforce · Contact Roles — 2:14pm PT
[2] Salesforce · Quote + Activity Timeline — 3:21pm PT
[3] people.ai · Engagement — 11:59pm PT
[4] Salesforce · Partner fields — 1:47pm PT

---

## F-02: Whitespace vs. Wishful Cross-Sell

**Prompt**: Is there a real Prisma Cloud play at [account_name]?

**Response**:

Yes — installed-base gap, three recent meeting mentions of cloud security, and an engaged cloud security director — but not pipeline until the rep confirms a named pain owner and next meeting.

**Trace Steps** — Triangulation

1. Verified no Prisma Cloud entitlement in [account_name]'s product footprint [1]
2. Cross-referenced Salesforce assets: no current or trial subscription [2]
3. Located 3 recent meeting mentions of "cloud workload visibility" and "AWS posture" [3]
4. Identified Eric Chen, Director of Cloud Security, as engaged contact (4 meetings in 90 days) [4]
5. Located closed-lost cloud opportunity from 2022, noted as "paused project" not technical loss [5]
6. Concluded whitespace conditions met — gap + pain + reachable owner — pending rep qualification

**Sources**:

[1] Tableau · Account dashboard — 11:59pm PT
[2] Salesforce · Assets / Entitlements — 4:02pm PT
[3] people.ai · Meeting topics, last 60 days — 11:59pm PT
[4] people.ai · Contacts — 11:59pm PT
[5] Salesforce · Closed Lost — 11:15am PT

---

## F-03: Security Review Clarity

**Prompt**: Has security review cleared for the [opportunity_name] deal?

**Response**:

No — InfoSec marked "product security approved" but vendor risk shows 3 open items as of Tuesday, with SOC2 and pen test summary not yet acknowledged by the customer's vendor risk owner.

**Trace Steps** — Comparative analysis

1. Surfaced "security approved" note from rep, dated April 28 [1]
2. Surfaced "vendor risk pending — 3 items open" entry, dated May 14 [2]
3. Reconciled the two: product security approval, not vendor risk approval — different processes
4. Verified SOC2 attachment uploaded May 6, no acknowledgment email from customer's vendor risk team [3]
5. Identified Alex Reyes as named vendor risk owner on customer side [4]
6. Concluded security review is not cleared — vendor risk path open with 3 items pending

**Sources**:

[1] Salesforce · Opportunity Notes — 9:38am PT
[2] Salesforce · Activity Timeline — 2:55pm PT
[3] Salesforce · Files + Activity Timeline — 12:08pm PT
[4] Salesforce · Contact Roles — 3:42pm PT

---

## F-04: Rep Forecast Pattern

**Prompt**: Why are Maria's deals slipping so much this quarter?

**Response**:

Assuming you're deciding between coaching and a forecast haircut:

Maria's 4 slipped deals show real customer engagement in people.ai (10 senior-buyer meetings in 30 days), but Salesforce next-step fields and close-date discipline are weak — suggesting hygiene gaps, not over-forecasting.

In scope: Maria's portfolio across Clari, Salesforce, and people.ai. Out of scope: 1:1 conversations or prior coaching history.

Suggested next: pull Maria's full pipeline view for a hygiene-focused 1:1.

**Trace Steps** — Iterative synthesis

1. Pulled Maria's slipped deals: 4 opportunities moved out of quarter since April 1 [1]
2. Measured average next-step age across her 12 active opportunities at 23 days [2]
3. Compared against team median next-step age of 9 days [3]
4. Identified 10 senior-buyer meetings on her portfolio in last 30 days [4]
5. Located detailed customer-pain notes inside Activity entries on 3 of 4 slipped deals [5]
6. Discounted weak-inspection hypothesis — engagement data and customer notes both present
7. Concluded the issue is hygiene, not inspection — coaching, not forecast haircut

**Sources**:

[1] Clari · Rep rollup → Slipped — 11:59pm PT
[2] Salesforce · Reports → Opportunities by owner (next-step age) — 9:21am PT
[3] Salesforce · Reports → Team median benchmarks — 11:48am PT
[4] people.ai · Rep activity — 11:59pm PT
[5] Salesforce · Activity Timeline (free-text notes) — 1:33pm PT

---

## F-05: POC Follow-Through

**Prompt**: Walk me through why the [opportunity_name] POC didn't convert.

**Response**:

Assuming you want a diagnosis to guide next steps:

The [opportunity_name] POC ended at technical validation — SEs confirmed the product worked, but no meetings with the Economic Buyer or any VP+ contact have occurred in the 45 days since POC close. The deal stalled because the POC didn't convert into a business motion.

In scope: POC artifacts, post-POC engagement, Contact Roles. Out of scope: customer-internal politics or budget status.

Suggested next: request a Champion-sponsored business review with the Economic Buyer.

**Trace Steps** — Deductive synthesis

1. Located POC close-out date as March 28, with positive SE scorecard [1]
2. Confirmed technical validation: all 5 success criteria marked met by SE [2]
3. Pulled post-POC meeting list: 2 meetings in 45 days, both with technical team [3]
4. Found no evidence of Economic Buyer engagement post-POC — zero meetings with VP+ on customer side [3]
5. Cross-referenced Contact Roles: Economic Buyer field unpopulated; Champion is Director-level technical lead [4]
6. Inferred POC ended at technical validation — no conversion to buying motion

**Sources**:

[1] Salesforce · Opportunity → POC notes — 10:12am PT
[2] Salesforce · SE updates — 2:48pm PT
[3] people.ai · Engagement, post March 28 — 11:59pm PT
[4] Salesforce · Contact Roles — 4:11pm PT

---

## F-06: Partner Real Or Attached

**Prompt**: Is Optiv actually driving anything on the [opportunity_name] deal?

**Response**:

No — Optiv is attached to the opportunity but has no joint customer meetings in 28 days and no partner-owned next steps in the close plan.

**Trace Steps** — Comparative analysis

1. Located Optiv as registered partner on [opportunity_name] [1]
2. Identified 1 internal-only call between Optiv rep and PANW rep in last 30 days [2]
3. Found no evidence of joint customer meetings (customer + Optiv + PANW) in 28 days [2]
4. Pulled close plan and rep notes: no partner-owned action items or procurement role [3]
5. Confirmed partner attribution on opp registration but not on procurement, paper, or customer relationship [4]
6. Concluded partner is attached, not executing — credit on paper, no motion in deal

**Sources**:

[1] Salesforce · Partner fields — 11:33am PT
[2] people.ai · Partner domain filter — 11:59pm PT
[3] Clari · Opp inspection → Close plan — 11:59pm PT
[4] Salesforce · Partner Account + Opp Team — 3:55pm PT

---

## F-07: Renewal Classification

**Prompt**: How does the [opportunity_name] renewal look?

**Response**:

Assuming you're checking before quarter-end forecast:

The [opportunity_name] renewal looks clean with hidden expansion upside — usage is healthy at 87% on licensed seats, support is quiet (2 routine cases in 90 days), and recent CISO meetings mention SOC consolidation, which surfaces an XSIAM angle not yet in the opp set.

In scope: usage data in Tableau, support cases in Salesforce, engagement in people.ai. Out of scope: budget allocation for the consolidation initiative.

Suggested next: open a discovery conversation with the rep on the SOC consolidation thread.

**Trace Steps** — Triangulation

1. Measured usage at 87% of licensed seats over last 90 days — healthy adoption [1]
2. Pulled support case history: 2 cases in 90 days, both Severity 3, resolved within SLA [2]
3. Confirmed no escalations or risk flags in renewal opp [3]
4. Identified 2 meetings with CISO Dana Park in last 45 days, both referencing "SOC consolidation" and "vendor rationalization" [4]
5. Cross-referenced existing opportunity set: no XSIAM or open consolidation opp on the account [5]
6. Concluded clean renewal with surfaced expansion vector — SOC consolidation is a reachable angle

**Sources**:

[1] Tableau · Account dashboard → product usage — 11:59pm PT
[2] Salesforce · Cases — 9:50am PT
[3] Clari · Renewal opp inspection — 11:59pm PT
[4] people.ai · Engagement + topic search — 11:59pm PT
[5] Salesforce · Related Opportunities — 11:14am PT