#!/usr/bin/env python3
"""Verification suite for the mock dataset. Exits 0 if all checks pass."""
import csv, os, sys, re
from datetime import date
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
TODAY = date(2026, 5, 12)


def load(name):
    with open(os.path.join(HERE, name)) as f:
        return list(csv.DictReader(f))


accounts = load("accounts.csv")
opps     = load("opportunities.csv")
plays    = load("sales-plays.csv")
sp_inst  = load("sales-play-instances.csv")
contacts = load("contacts.csv")
ebcs     = load("ebcs.csv")
ib       = load("install-base.csv")
trend    = load("health-trend.csv")
fh       = load("forecast-history.csv")

errors = []
warnings = []

# Expected sentence-case enum values
SC_HEALTH    = {"Healthy", "At-risk", "Critical"}
SC_RENEWAL_T = {"Renewal", "Renewal-and-upsell"}
SC_FC_CLOSED = "Closed"
SC_FC_PIPELINE = "Pipeline"
SC_FC_BEST   = "Best-case"
SC_FC_COMMIT = "Commit"
SC_STATUSES  = {"Not-touched","Pitched","Interested","Open-pipeline","Closed-won","Deferred","Closed-lost"}
SC_STAGES = {"Discovery":1, "Solutioning":2, "Technical-validation":3, "Active-POV":4, "Negotiate":5}


def check(cond, msg):
    if not cond:
        errors.append(msg)


# 1. Row counts
check(len(accounts) == 50, f"accounts row count: {len(accounts)} != 50")
check(95 <= len(opps) <= 105, f"opportunities row count out of band: {len(opps)}")
check(len(plays) == 14, f"sales-plays row count: {len(plays)} != 14")
check(300 <= len(sp_inst) <= 500, f"sales-play-instances out of band: {len(sp_inst)}")
check(150 <= len(contacts) <= 250, f"contacts out of band: {len(contacts)}")
check(50 <= len(ebcs) <= 120, f"ebcs out of band: {len(ebcs)}")
check(150 <= len(ib) <= 300, f"install-base out of band: {len(ib)}")
check(len(trend) == 600, f"health-trend row count: {len(trend)} != 600")
check(len(fh) == 7, f"forecast-history row count: {len(fh)} != 7")

# 2. FK integrity
acct_ids = {a["id"] for a in accounts}
opp_ids  = {o["id"] for o in opps}
play_ids = {p["id"] for p in plays}

for o in opps:
    check(o["accountId"] in acct_ids, f"opp {o['id']} has unknown accountId {o['accountId']}")
for c in contacts:
    check(c["accountId"] in acct_ids, f"contact {c['id']} bad accountId")
for e in ebcs:
    check(e["accountId"] in acct_ids, f"ebc {e['id']} bad accountId")
for r in ib:
    check(r["accountId"] in acct_ids, f"install-base bad accountId {r['accountId']}")
for r in trend:
    check(r["accountId"] in acct_ids, f"trend bad accountId {r['accountId']}")
for r in sp_inst:
    check(r["accountId"] in acct_ids, f"sp-instance bad accountId {r['accountId']}")
    check(r["playId"] in play_ids,     f"sp-instance bad playId {r['playId']}")
    if r["primaryOppId"]:
        check(r["primaryOppId"] in opp_ids, f"sp-instance bad primaryOppId {r['primaryOppId']}")
    if r["linkedOppIds"]:
        for lo in r["linkedOppIds"].split(";"):
            check(lo in opp_ids, f"sp-instance bad linkedOppId {lo}")

# 3. Sum invariants
for o in opps:
    pa = o["productAllocations"]
    if not pa:
        errors.append(f"opp {o['id']} empty productAllocations")
        continue
    total = 0
    for part in pa.split(";"):
        if ":" not in part:
            errors.append(f"opp {o['id']} bad allocation part {part!r}")
            continue
        p, amt = part.split(":")
        total += int(amt)
    check(total == int(o["amount"]),
          f"opp {o['id']} productAllocations sum {total} != amount {o['amount']}")

# Q4FY26 reconcile
q4_window_start = date(2026,5,1)
q4_window_end   = date(2026,7,31)
q4_buckets = defaultdict(int)
for o in opps:
    cd = date.fromisoformat(o["closeDate"])
    if q4_window_start <= cd <= q4_window_end:
        q4_buckets[o["forecastCategory"]] += int(o["amount"])
fh_q4 = next((r for r in fh if r["quarter"] == "Q4FY26"), None)
check(fh_q4 is not None, "Q4FY26 row missing from forecast-history")
if fh_q4:
    for fc, key in [("Pipeline","pipeline"),("Best-case","bestCase"),("Commit","commit"),("Closed","closed")]:
        check(int(fh_q4[key]) == q4_buckets[fc],
              f"Q4FY26 {fc} mismatch: fh={fh_q4[key]} opps={q4_buckets[fc]}")

# 4. Health invariant
rank = {"Healthy":0, "At-risk":1, "Critical":2}
inv = {v:k for k,v in rank.items()}
for a in accounts:
    expect = inv[max(rank[a["technicalHealth"]], rank[a["adoptionHealth"]])]
    check(a["overallHealth"] == expect,
          f"account {a['id']}: overallHealth {a['overallHealth']} != max({a['technicalHealth']},{a['adoptionHealth']})={expect}")

# 5. Health-trend cardinality
trend_by_acct = defaultdict(list)
for r in trend:
    trend_by_acct[r["accountId"]].append(int(r["monthOffset"]))
for aid in acct_ids:
    months = sorted(trend_by_acct[aid])
    check(months == list(range(-11, 1)),
          f"account {aid}: health-trend months {months} != [-11..0]")

# 6. Renewal-window
window_start = date(2026,5,12)
window_end   = date(2027,4,30)
renewal_accts = set()
for o in opps:
    if o["type"] in SC_RENEWAL_T:
        cd = date.fromisoformat(o["closeDate"])
        if window_start <= cd <= window_end:
            renewal_accts.add(o["accountId"])
cold_account = "acc-williamssonoma"
for a in accounts:
    if a["id"] == cold_account:
        continue
    check(a["id"] in renewal_accts,
          f"account {a['id']} missing renewal in CQ-Q3FY27 (renewal-window invariant)")

# 7. Conditional fields
for o in opps:
    if o["type"] not in SC_RENEWAL_T:
        check(o["renewalOutcome"] == "",
              f"opp {o['id']} non-renewal but renewalOutcome={o['renewalOutcome']!r}")
        check(o["churnReason"] == "" and o["displacementCompetitor"] == "",
              f"opp {o['id']} non-renewal but has churnReason/competitor")
    else:
        if o["renewalOutcome"] == "Churn":
            check(o["churnReason"] != "", f"opp {o['id']} outcome=Churn but no churnReason")
        else:
            check(o["churnReason"] == "", f"opp {o['id']} non-churn but churnReason={o['churnReason']!r}")
        if o["renewalOutcome"] == "Displacement":
            check(o["displacementCompetitor"] != "", f"opp {o['id']} outcome=Displacement but no competitor")
        else:
            check(o["displacementCompetitor"] == "", f"opp {o['id']} non-displacement but competitor={o['displacementCompetitor']!r}")

# 8. Stage <-> forecast coherence
for o in opps:
    if o["forecastCategory"] == SC_FC_CLOSED:
        continue
    sr = SC_STAGES[o["stage"]]
    fc = o["forecastCategory"]
    scen = o["scenarios"]
    if sr == 1 and fc == SC_FC_COMMIT and "Outlier" not in scen:
        errors.append(f"opp {o['id']} Stage 1 in Commit (not outlier-tagged)")
    if sr == 5 and fc == SC_FC_PIPELINE and "Outlier" not in scen:
        warnings.append(f"opp {o['id']} Stage 5 in Pipeline (allowed via Pinterest-style churn signals)")

# 9. Formatting: no em/en dashes or smart quotes
dash_pat = re.compile(r"[–—‘’“”]")
import glob
for path in glob.glob(os.path.join(HERE, "*.csv")):
    with open(path) as f:
        for i, line in enumerate(f, 1):
            if dash_pat.search(line):
                errors.append(f"{os.path.basename(path)}:{i} contains em/en dash or smart quote")
                break

# 10. Outlier coverage
expected_outliers = [
    "Outlier-over-attain", "Outlier-catastrophic-miss", "Outlier-neglected",
    "Outlier-stalled-opp", "Outlier-velocity-deal", "Outlier-cold-account",
    "Outlier-displacement", "Outlier-churn", "Outlier-multi-risk-critical",
    "Outlier-one-product-critical", "Outlier-sparse-pipeline", "Outlier-full-coverage",
]
seen_outliers = set()
for path in glob.glob(os.path.join(HERE, "*.csv")):
    with open(path) as f:
        text = f.read()
    for tag in expected_outliers:
        if tag in text:
            seen_outliers.add(tag)
for tag in expected_outliers:
    check(tag in seen_outliers, f"outlier tag {tag} not found in any CSV")

# Status coverage for sales play instances
seen_statuses = {r["status"] for r in sp_inst}
missing = SC_STATUSES - seen_statuses
check(not missing, f"sales-play-instances missing statuses: {missing}")

# Closed-won must point to closed opps
closed_opp_ids = {o["id"] for o in opps if o["forecastCategory"] == SC_FC_CLOSED}
for r in sp_inst:
    if r["status"] == "Closed-won":
        check(r["primaryOppId"] in closed_opp_ids,
              f"sp-instance ({r['accountId']},{r['playId']}) status=Closed-won but primaryOppId {r['primaryOppId']} not closed")

# 11. Sentence-case sweep: enum-column cells should not be all-lowercase.
SCALAR_ENUM_COLS = {"segment","region","overallHealth","technicalHealth","adoptionHealth",
                    "lastActivityType","renewalOutcome","churnReason","type","stage",
                    "forecastCategory","familyId","status","role","value","scopeKey",
                    "productId"}
LIST_ENUM_COLS = {"riskIds","scenarios","targetProducts"}

def _bad_case(v):
    """A cell counts as 'all-lowercase enum-shape' if it's nonempty, has no
    uppercase chars, and contains no spaces (free text usually has caps or spaces)."""
    return v and v == v.lower() and " " not in v and v not in ("true","false")

datasets = {
    "accounts.csv": accounts, "opportunities.csv": opps, "sales-plays.csv": plays,
    "sales-play-instances.csv": sp_inst, "contacts.csv": contacts, "ebcs.csv": ebcs,
    "install-base.csv": ib, "health-trend.csv": trend, "forecast-history.csv": fh,
}
for fname, rows in datasets.items():
    for i, row in enumerate(rows, 2):  # +1 for header, +1 to be 1-indexed
        for col, val in row.items():
            if col in SCALAR_ENUM_COLS and _bad_case(val):
                errors.append(f"{fname}:{i} col={col} value={val!r} is lowercase (expected sentence case)")
            if col in LIST_ENUM_COLS and val:
                for token in val.split(";"):
                    if _bad_case(token):
                        errors.append(f"{fname}:{i} col={col} token={token!r} is lowercase")
                        break
            if col == "productAllocations" and val:
                for part in val.split(";"):
                    if ":" in part:
                        pid = part.split(":",1)[0]
                        if _bad_case(pid):
                            errors.append(f"{fname}:{i} col={col} productId={pid!r} is lowercase")
                            break

print(f"\nErrors: {len(errors)}")
for e in errors[:30]:
    print("  E:", e)
if len(errors) > 30:
    print(f"  ... and {len(errors)-30} more")
print(f"\nWarnings: {len(warnings)}")
for w in warnings[:10]:
    print("  W:", w)

sys.exit(1 if errors else 0)
