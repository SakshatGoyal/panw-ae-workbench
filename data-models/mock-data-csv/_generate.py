#!/usr/bin/env python3
"""
Generator for the Stage POC mock dataset.

Hand-authors the 50 accounts, 100 opportunities, 14 sales plays, and outlier
narratives; procedurally derives contacts, EBCs, install-base, sales-play
instances, health-trend, and forecast-history.

Run from repo root:
    python3 data-models/mock-data-csv/_generate.py

Outputs 9 CSVs + leaves README.md to be authored separately.
Deterministic via seed.
"""
import csv
import os
import random
from datetime import date, timedelta
from collections import defaultdict

random.seed(20260512)
TODAY = date(2026, 5, 12)
OUTDIR = os.path.dirname(os.path.abspath(__file__))


def days_ago(n: int) -> str:
    return (TODAY - timedelta(days=n)).isoformat()


def days_ahead(n: int) -> str:
    return (TODAY + timedelta(days=n)).isoformat()


# ---------------------------------------------------------------------------
# CANONICAL TAXONOMIES (verbatim from 01-taxonomies.md)
# ---------------------------------------------------------------------------
ACCOUNT_RISKS = [
    "no-pipeline-cq-next-4q", "no-ebcs-last-year", "not-platformized",
    "povs-without-progression", "no-or-stale-asr", "no-customer-success-plan",
    "low-adoption-deployment", "critical-technical-health",
]
OPP_RISKS = [
    "lacking-exec-engagement", "no-design-of-record", "no-secured-tech-win",
    "no-partner-selected", "mandatory-ps-removed", "quotes-pending-approval",
    "budget-not-scheduled", "term-length-issue", "no-activity-30-days",
]
ACTIVITY_TYPES = [
    "technical-deep-dive", "architecture-review", "deployment-health-check",
    "renewal-prep-call", "contract-review", "partner-strategy-call",
    "budget-alignment-meeting", "poc-scoping-session", "solution-workshop",
    "executive-briefing", "customer-engagement",
]
PRODUCTS = [
    "pa-series", "vm-series", "pa-series-attached", "pa-series-support", "fw-data-lake",
    "prisma-access", "prisma-sd-wan",
    "cortex-xdr", "cortex-xsoar", "xpanse", "xsiam", "qradar", "cortex-cloud-leaf",
    "unit-42-reactive", "unit-42-proactive",
]
COMPETITORS = [
    "CrowdStrike", "Microsoft Defender", "Fortinet", "Cisco", "Zscaler",
    "Cloudflare", "SentinelOne", "Splunk", "Wiz", "In-house build",
]
CHURN_REASONS = [
    "budget-cut", "competitor-displaced", "product-fit-mismatch",
    "org-change-mna", "consolidation-vendor-rationalization",
]


# ---------------------------------------------------------------------------
# SENTENCE-CASE TRANSFORM
# Internal literals stay lowercase (canonical taxonomy form); CSV output is
# sentence-cased per the project casing rule.
# Acronyms from the user's preserve list: POV, ASR, EBC, TCV, IACV, RPO, PA,
# VM, CN, XDR, XSIAM, XSOAR, CDSS, NGFW, EMEA, APAC, AE, QBR, ACV.
# Judgment extensions (documented in README):
#   POC, CQ, FW, MnA, PS, SD-WAN, SASE — uppercase where they appear.
# ---------------------------------------------------------------------------
SC = {
    # severity / health
    "ok": "Ok", "caution": "Caution", "error": "Error",
    "healthy": "Healthy", "at-risk": "At-risk", "critical": "Critical",
    # segment
    "strategic": "Strategic", "enterprise": "Enterprise", "mid-market": "Mid-market",
    # region
    "americas": "Americas", "emea": "EMEA", "apac": "APAC", "japan": "Japan",
    # stage
    "discovery": "Discovery", "solutioning": "Solutioning",
    "technical-validation": "Technical-validation",
    "active-pov": "Active-POV", "negotiate": "Negotiate",
    # forecast category
    "pipeline": "Pipeline", "best-case": "Best-case",
    "commit": "Commit", "closed": "Closed",
    # opp type
    "net-new": "Net-new", "upsell": "Upsell",
    "renewal": "Renewal", "renewal-and-upsell": "Renewal-and-upsell",
    # renewal outcome (note: 'upsell' shares mapping with opp-type)
    "unknown": "Unknown", "full": "Full", "downsell": "Downsell",
    "churn": "Churn", "displacement": "Displacement", "duplicate": "Duplicate",
    # sales play status
    "not-touched": "Not-touched", "pitched": "Pitched", "interested": "Interested",
    "open-pipeline": "Open-pipeline", "closed-won": "Closed-won",
    "deferred": "Deferred", "closed-lost": "Closed-lost",
    # account risks
    "no-pipeline-cq-next-4q": "No-pipeline-CQ-next-4Q",
    "no-ebcs-last-year": "No-EBCs-last-year",
    "not-platformized": "Not-platformized",
    "povs-without-progression": "POVs-without-progression",
    "no-or-stale-asr": "No-or-stale-ASR",
    "no-customer-success-plan": "No-customer-success-plan",
    "low-adoption-deployment": "Low-adoption-deployment",
    "critical-technical-health": "Critical-technical-health",
    # opp risks
    "lacking-exec-engagement": "Lacking-exec-engagement",
    "no-design-of-record": "No-design-of-record",
    "no-secured-tech-win": "No-secured-tech-win",
    "no-partner-selected": "No-partner-selected",
    "mandatory-ps-removed": "Mandatory-PS-removed",
    "quotes-pending-approval": "Quotes-pending-approval",
    "budget-not-scheduled": "Budget-not-scheduled",
    "term-length-issue": "Term-length-issue",
    "no-activity-30-days": "No-activity-30-days",
    # activity types
    "technical-deep-dive": "Technical-deep-dive",
    "architecture-review": "Architecture-review",
    "deployment-health-check": "Deployment-health-check",
    "renewal-prep-call": "Renewal-prep-call",
    "contract-review": "Contract-review",
    "partner-strategy-call": "Partner-strategy-call",
    "budget-alignment-meeting": "Budget-alignment-meeting",
    "poc-scoping-session": "POC-scoping-session",
    "solution-workshop": "Solution-workshop",
    "executive-briefing": "Executive-briefing",
    "customer-engagement": "Customer-engagement",
    # contact roles
    "champion": "Champion", "decision-maker": "Decision-maker",
    "economic-buyer": "Economic-buyer", "influencer": "Influencer",
    "blocker": "Blocker", "user": "User",
    # EBC types (executive-briefing already mapped above)
    "business-review": "Business-review", "roadmap-session": "Roadmap-session",
    # products
    "pa-series": "PA-series", "vm-series": "VM-series",
    "pa-series-attached": "PA-series-attached",
    "pa-series-support": "PA-series-support",
    "fw-data-lake": "FW-data-lake",
    "prisma-access": "Prisma-access",
    "prisma-sd-wan": "Prisma-SD-WAN",
    "cortex-xdr": "Cortex-XDR", "cortex-xsoar": "Cortex-XSOAR",
    "xpanse": "Xpanse", "xsiam": "XSIAM", "qradar": "QRadar",
    "cortex-cloud-leaf": "Cortex-cloud-leaf",
    "unit-42-reactive": "Unit-42-reactive",
    "unit-42-proactive": "Unit-42-proactive",
    # sales play family
    "fw-cdss": "FW-CDSS", "sase": "SASE",
    "cortex-cloud": "Cortex-cloud", "unit-42": "Unit-42",
    # churn reasons
    "budget-cut": "Budget-cut", "competitor-displaced": "Competitor-displaced",
    "product-fit-mismatch": "Product-fit-mismatch",
    "org-change-mna": "Org-change-MnA",
    "consolidation-vendor-rationalization": "Consolidation-vendor-rationalization",
    # scope key
    "all": "All",
    # scenarios
    "outlier-over-attain": "Outlier-over-attain",
    "outlier-catastrophic-miss": "Outlier-catastrophic-miss",
    "outlier-neglected": "Outlier-neglected",
    "outlier-stalled-opp": "Outlier-stalled-opp",
    "outlier-velocity-deal": "Outlier-velocity-deal",
    "outlier-cold-account": "Outlier-cold-account",
    "outlier-displacement": "Outlier-displacement",
    "outlier-churn": "Outlier-churn",
    "outlier-multi-risk-critical": "Outlier-multi-risk-critical",
    "outlier-one-product-critical": "Outlier-one-product-critical",
    "outlier-sparse-pipeline": "Outlier-sparse-pipeline",
    "outlier-full-coverage": "Outlier-full-coverage",
}


def sc(v):
    """Sentence-case an enum value. Empty/None pass through. Unknown values
    pass through unchanged (so free-text fields like contact names are safe)."""
    if v is None or v == "":
        return v
    return SC.get(v, v)


def sc_list(s, sep=";"):
    """Apply sc() to each token in a sep-joined string."""
    if not s:
        return s
    return sep.join(sc(t) for t in s.split(sep))


def sc_allocations(s):
    """productAllocations: 'pid1:amt1;pid2:amt2' -> sentence-case the pids."""
    if not s:
        return s
    out = []
    for part in s.split(";"):
        if ":" in part:
            pid, amt = part.split(":", 1)
            out.append(f"{sc(pid)}:{amt}")
        else:
            out.append(part)
    return ";".join(out)


# Columns that are scalar enums (apply sc to whole cell)
SCALAR_ENUM_COLS = {
    "segment", "region", "overallHealth", "technicalHealth", "adoptionHealth",
    "lastActivityType", "renewalOutcome", "churnReason",
    "type", "stage", "forecastCategory",
    "familyId", "status", "role", "value", "scopeKey",
    "productId",
}
# Columns that are ;-joined enum lists
LIST_ENUM_COLS = {"riskIds", "scenarios", "targetProducts"}
# Columns with special list-of-pairs format
ALLOC_COLS = {"productAllocations"}


# ---------------------------------------------------------------------------
# 1. SALES PLAY CATALOG (14 plays)
# ---------------------------------------------------------------------------
SALES_PLAYS = [
    ("play-ngfw-refresh",       "PA-Series NGFW Hardware Refresh",       "fw-cdss",     "pa-series;pa-series-attached",  "Refresh on-prem firewalls to current PA-Series; attach CDSS subscriptions."),
    ("play-vmseries-cloud",     "VM-Series Cloud Workload Protection",   "fw-cdss",     "vm-series",                      "Extend NGFW protection into AWS/Azure/GCP."),
    ("play-cdss-bundle-attach", "CDSS Bundle Attach",                    "fw-cdss",     "pa-series-attached;pa-series-support;fw-data-lake", "Attach full subscription stack to existing NGFW footprint."),
    ("play-prisma-access-gp",   "GlobalProtect to Prisma Access",        "sase",        "prisma-access",                  "Migrate legacy VPN to cloud-delivered SASE."),
    ("play-sdwan-takeout",      "Prisma SD-WAN Branch Takeout",          "sase",        "prisma-sd-wan",                  "Displace legacy SD-WAN (Cisco Viptela, Velocloud)."),
    ("play-sase-platform",      "Full SASE Platform Adoption",           "sase",        "prisma-access;prisma-sd-wan",    "Combined Prisma Access + SD-WAN platform pitch."),
    ("play-xsiam-splunk",       "XSIAM Splunk Takeout",                  "cortex-cloud","xsiam;qradar",                   "Displace Splunk SIEM with XSIAM."),
    ("play-xsiam-qradar",       "XSIAM QRadar Takeout",                  "cortex-cloud","xsiam;qradar",                   "Displace QRadar with XSIAM."),
    ("play-xdr-edr",            "Cortex XDR EDR Consolidation",          "cortex-cloud","cortex-xdr",                     "Replace CrowdStrike or SentinelOne with Cortex XDR."),
    ("play-cortex-cloud-cnapp", "Cortex Cloud CNAPP Adoption",           "cortex-cloud","cortex-cloud-leaf",              "CNAPP for cloud-native security posture."),
    ("play-xpanse-attack-surf", "Xpanse Attack Surface Management",      "cortex-cloud","xpanse",                         "Deploy Xpanse for external attack-surface monitoring."),
    ("play-xsoar-soc-modern",   "Cortex XSOAR SOC Modernization",        "cortex-cloud","cortex-xsoar",                   "Modernize SOC with XSOAR orchestration."),
    ("play-unit42-ir-retainer", "Unit 42 Incident Response Retainer",    "unit-42",     "unit-42-reactive",               "Sell IR retainer for incident readiness."),
    ("play-unit42-proactive",   "Unit 42 Proactive Services",            "unit-42",     "unit-42-proactive",              "Tabletop, threat assessment, advisory."),
]


# ---------------------------------------------------------------------------
# 2. ACCOUNTS (50)
#    Tuple shape:
#    (id, name, industry, segment, region, apexName,
#     ltv, last3y, attainmentPct, technicalHealth, adoptionHealth,
#     riskIds (list), lastActivityType, lastActivityDaysAgo, activePOVs, scenarios)
# ---------------------------------------------------------------------------
ACCOUNTS = [
    # ---- Strategic (12) ----
    ("acc-salesforce",       "Salesforce",              "Technology",        "strategic", "americas", "Salesforce Inc.",       125_000_000, 28_000_000,  92, "healthy",  "healthy",  [],                                                                        "executive-briefing",          4,  2, ["outlier-full-coverage"]),
    ("acc-googlecloud",      "Google Cloud",            "Technology",        "strategic", "americas", "Alphabet",              110_000_000, 25_000_000,  84, "healthy",  "at-risk",  ["povs-without-progression"],                                              "technical-deep-dive",         9,  3, []),
    ("acc-wellsfargobank",   "Wells Fargo Bank",        "Financial Services","strategic", "americas", "Wells Fargo & Company",  88_000_000, 20_000_000,  31, "critical", "critical", ["no-pipeline-cq-next-4q","no-ebcs-last-year","not-platformized","critical-technical-health","low-adoption-deployment"], "customer-engagement",        38,  1, ["outlier-multi-risk-critical"]),
    ("acc-adobe",            "Adobe",                   "Technology",        "strategic", "americas", "",                       70_000_000, 18_000_000,  78, "critical", "at-risk",  ["critical-technical-health","povs-without-progression"],                 "technical-deep-dive",         6,  1, ["outlier-one-product-critical"]),
    ("acc-nvidia",           "NVIDIA",                  "Technology",        "strategic", "americas", "",                      135_000_000, 30_000_000, 152, "healthy",  "healthy",  [],                                                                        "executive-briefing",          3,  0, ["outlier-over-attain"]),
    ("acc-cisco",            "Cisco",                   "Technology",        "strategic", "americas", "",                       60_000_000, 14_000_000,  70, "at-risk",  "healthy",  ["not-platformized"],                                                      "architecture-review",        12,  1, []),
    ("acc-oracle",           "Oracle",                  "Technology",        "strategic", "americas", "",                       55_000_000, 12_500_000,  62, "at-risk",  "at-risk",  ["povs-without-progression","no-or-stale-asr"],                            "technical-deep-dive",        18,  2, ["outlier-stalled-opp"]),
    ("acc-visa",             "Visa",                    "Financial Services","strategic", "americas", "",                       80_000_000, 19_000_000,  95, "healthy",  "healthy",  [],                                                                        "executive-briefing",          5,  1, []),
    ("acc-chevron",          "Chevron",                 "Energy",            "strategic", "americas", "",                       45_000_000, 11_000_000,  68, "healthy",  "at-risk",  ["no-customer-success-plan"],                                              "deployment-health-check",    11,  1, []),
    ("acc-kaiser",           "Kaiser Permanente",       "Healthcare",        "strategic", "americas", "",                       58_000_000, 13_500_000,  81, "healthy",  "healthy",  [],                                                                        "business-review-followup",    7,  0, []),  # last-act-type fixed below
    ("acc-stanfordhc",       "Stanford Health Care",    "Healthcare",        "strategic", "americas", "",                       28_000_000,  7_500_000,  74, "at-risk",  "healthy",  ["no-or-stale-asr"],                                                       "renewal-prep-call",          10,  1, []),
    ("acc-pge",              "PG&E",                    "Energy",            "strategic", "americas", "",                       42_000_000,  9_500_000,  10, "critical", "critical", ["no-pipeline-cq-next-4q","no-ebcs-last-year","povs-without-progression","critical-technical-health"], "customer-engagement",        45,  0, ["outlier-catastrophic-miss"]),

    # ---- Enterprise (28) ----
    ("acc-youtube",          "YouTube",                 "Media",             "enterprise","americas", "Alphabet",               14_000_000,  4_200_000,  77, "healthy",  "healthy",  [],                                                                        "solution-workshop",           6,  1, []),
    ("acc-waymo",            "Waymo",                   "Technology",        "enterprise","americas", "Alphabet",                4_500_000,  3_600_000,  64, "at-risk",  "at-risk",  ["povs-without-progression"],                                              "poc-scoping-session",        13,  1, []),
    ("acc-wfsecurities",     "Wells Fargo Securities",  "Financial Services","enterprise","americas", "Wells Fargo & Company",  11_000_000,  3_400_000,  72, "healthy",  "at-risk",  ["no-customer-success-plan"],                                              "renewal-prep-call",          15,  0, []),
    ("acc-slack",            "Slack",                   "Technology",        "enterprise","americas", "Salesforce Inc.",         9_500_000,  3_100_000,  88, "healthy",  "healthy",  [],                                                                        "technical-deep-dive",         4,  0, []),
    ("acc-tableau",          "Tableau",                 "Technology",        "enterprise","americas", "Salesforce Inc.",         7_800_000,  2_600_000,  66, "at-risk",  "healthy",  ["not-platformized"],                                                      "architecture-review",        14,  0, []),
    ("acc-mulesoft",         "MuleSoft",                "Technology",        "enterprise","americas", "Salesforce Inc.",         6_200_000,  2_300_000,  79, "healthy",  "healthy",  [],                                                                        "solution-workshop",           8,  0, []),
    ("acc-sutterhealth",     "Sutter Health",           "Healthcare",        "enterprise","americas", "Sutter Health System",   12_000_000,  3_900_000,  58, "at-risk",  "at-risk",  ["no-or-stale-asr","povs-without-progression"],                            "deployment-health-check",    19,  1, []),
    ("acc-intel",            "Intel",                   "Technology",        "enterprise","americas", "",                       22_000_000,  5_800_000,  71, "healthy",  "at-risk",  ["low-adoption-deployment"],                                               "technical-deep-dive",        11,  1, []),
    ("acc-netflix",          "Netflix",                 "Media",             "enterprise","americas", "",                       18_500_000,  5_200_000,  85, "healthy",  "healthy",  [],                                                                        "executive-briefing",          5,  0, []),
    ("acc-stripe",           "Stripe",                  "Financial Services","enterprise","americas", "",                       15_000_000,  4_800_000,  98, "healthy",  "healthy",  [],                                                                        "contract-review",             2,  1, ["outlier-velocity-deal"]),
    ("acc-pinterest",        "Pinterest",               "Media",             "enterprise","americas", "",                        8_500_000,  2_900_000,  41, "at-risk",  "critical", ["low-adoption-deployment","no-customer-success-plan","povs-without-progression"], "renewal-prep-call",          22,  0, ["outlier-churn"]),
    ("acc-servicenow",       "ServiceNow",              "Technology",        "enterprise","americas", "",                       19_000_000,  5_400_000,  82, "healthy",  "healthy",  [],                                                                        "solution-workshop",           7,  1, []),
    ("acc-workday",          "Workday",                 "Technology",        "enterprise","americas", "",                       16_500_000,  4_700_000,  76, "healthy",  "at-risk",  ["not-platformized"],                                                      "technical-deep-dive",         9,  0, []),
    ("acc-twilio",           "Twilio",                  "Technology",        "enterprise","americas", "",                       10_500_000,  3_300_000,  69, "at-risk",  "at-risk",  ["povs-without-progression"],                                              "poc-scoping-session",        16,  1, []),
    ("acc-doordash",         "DoorDash",                "Technology",        "enterprise","americas", "",                        9_200_000,  3_100_000,  73, "healthy",  "at-risk",  ["no-customer-success-plan"],                                              "deployment-health-check",    12,  0, []),
    ("acc-lyft",             "Lyft",                    "Technology",        "enterprise","americas", "",                        7_400_000,  2_500_000,  54, "at-risk",  "at-risk",  ["no-pipeline-cq-next-4q","povs-without-progression"],                     "customer-engagement",        24,  0, ["outlier-sparse-pipeline"]),
    ("acc-airbnb",           "Airbnb",                  "Technology",        "enterprise","americas", "",                       13_500_000,  4_100_000,  80, "healthy",  "healthy",  [],                                                                        "executive-briefing",          6,  1, []),
    ("acc-databricks",       "Databricks",              "Technology",        "enterprise","americas", "",                       11_800_000,  3_800_000,  86, "healthy",  "healthy",  [],                                                                        "technical-deep-dive",         4,  0, []),
    ("acc-snowflake",        "Snowflake",               "Technology",        "enterprise","americas", "",                       12_500_000,  4_000_000,  83, "healthy",  "healthy",  [],                                                                        "solution-workshop",           5,  0, []),
    ("acc-reddit",           "Reddit",                  "Media",             "enterprise","americas", "",                        6_800_000,  2_400_000,  47, "at-risk",  "critical", ["low-adoption-deployment","no-customer-success-plan"],                    "contract-review",            17,  0, ["outlier-displacement"]),
    ("acc-roblox",           "Roblox",                  "Media",             "enterprise","americas", "",                        7_900_000,  2_700_000,  74, "healthy",  "at-risk",  ["povs-without-progression"],                                              "architecture-review",        13,  1, []),
    ("acc-ebay",             "eBay",                    "Retail",            "enterprise","americas", "",                       14_200_000,  4_300_000,  78, "healthy",  "healthy",  [],                                                                        "solution-workshop",           8,  0, []),
    ("acc-schwab",           "Charles Schwab",          "Financial Services","enterprise","americas", "",                       21_500_000,  6_100_000,  87, "healthy",  "healthy",  [],                                                                        "executive-briefing",          7,  1, []),
    ("acc-genentech",        "Genentech",               "Biotech",           "enterprise","americas", "",                       17_000_000,  4_800_000,  72, "at-risk",  "healthy",  ["not-platformized"],                                                      "technical-deep-dive",        14,  0, []),
    ("acc-ucsfhealth",       "UCSF Health",             "Healthcare",        "enterprise","americas", "",                        9_800_000,  3_200_000,  68, "at-risk",  "at-risk",  ["no-or-stale-asr"],                                                       "deployment-health-check",    20,  1, []),
    ("acc-gilead",           "Gilead",                  "Biotech",           "enterprise","americas", "",                       13_200_000,  4_000_000,  77, "healthy",  "healthy",  [],                                                                        "solution-workshop",           6,  0, []),
    ("acc-ea",               "Electronic Arts",         "Gaming",            "enterprise","americas", "",                       10_800_000,  3_500_000,  65, "at-risk",  "at-risk",  ["povs-without-progression"],                                              "poc-scoping-session",        18,  1, []),
    ("acc-williamssonoma",   "Williams-Sonoma",         "Retail",            "enterprise","americas", "",                        8_100_000,  2_700_000,  34, "at-risk",  "critical", ["no-pipeline-cq-next-4q","no-ebcs-last-year","low-adoption-deployment"],  "customer-engagement",        58,  0, ["outlier-cold-account"]),

    # ---- Mid-market (10) ----
    ("acc-sutterbay",        "Sutter Bay Medical Foundation","Healthcare",   "mid-market","americas", "Sutter Health System",    2_200_000,    850_000,  69, "healthy",  "at-risk",  ["not-platformized"],                                                      "deployment-health-check",    15,  0, []),
    ("acc-pamf",             "Palo Alto Medical Foundation","Healthcare",    "mid-market","americas", "Sutter Health System",    1_400_000,    620_000,  74, "healthy",  "healthy",  [],                                                                        "solution-workshop",           9,  0, []),
    ("acc-gap",              "Gap Inc.",                "Retail",            "mid-market","americas", "",                        2_800_000,    980_000,  67, "at-risk",  "healthy",  ["no-or-stale-asr"],                                                       "technical-deep-dive",        12,  0, []),
    ("acc-levi",             "Levi Strauss",            "Retail",            "mid-market","americas", "",                        1_900_000,    760_000,  71, "healthy",  "at-risk",  ["povs-without-progression"],                                              "poc-scoping-session",        16,  1, []),
    ("acc-safeway",          "Safeway",                 "Retail",            "mid-market","americas", "",                        3_100_000,  1_100_000,  78, "healthy",  "healthy",  [],                                                                        "solution-workshop",           7,  0, []),
    ("acc-ross",             "Ross Stores",             "Retail",            "mid-market","americas", "",                        1_650_000,    580_000,  29, "critical", "critical", ["no-pipeline-cq-next-4q","no-ebcs-last-year","not-platformized","low-adoption-deployment","critical-technical-health"], "customer-engagement",        72,  0, ["outlier-neglected"]),
    ("acc-citysf",           "City of San Francisco",   "Public Sector",     "mid-market","americas", "",                        3_900_000,  1_400_000,  62, "at-risk",  "healthy",  ["no-customer-success-plan"],                                              "architecture-review",        17,  0, []),
    ("acc-stanforduniv",     "Stanford University",     "Education",         "mid-market","americas", "",                        2_400_000,    920_000,  79, "healthy",  "healthy",  [],                                                                        "executive-briefing",          8,  0, []),
    ("acc-ucb",              "UC Berkeley",             "Education",         "mid-market","americas", "",                        1_800_000,    710_000,  73, "healthy",  "at-risk",  ["no-or-stale-asr"],                                                       "deployment-health-check",    14,  0, []),
    ("acc-bart",             "BART",                    "Public Sector",     "mid-market","americas", "",                        2_050_000,    780_000,  66, "at-risk",  "at-risk",  ["povs-without-progression"],                                              "poc-scoping-session",        19,  0, []),
]
# Fix Kaiser last-activity-type (used a non-canonical placeholder above)
ACCOUNTS = [
    (r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10],
     r[11], "deployment-health-check" if r[0] == "acc-kaiser" else r[12], r[13], r[14], r[15])
    for r in ACCOUNTS
]
assert len(ACCOUNTS) == 50, f"Expected 50 accounts, got {len(ACCOUNTS)}"

ACCT_BY_ID = {r[0]: r for r in ACCOUNTS}


# ---------------------------------------------------------------------------
# Health rank
# ---------------------------------------------------------------------------
def hrank(h: str) -> int:
    return {"healthy": 0, "at-risk": 1, "critical": 2}[h]


def overall_health(tech: str, adopt: str) -> str:
    return ["healthy", "at-risk", "critical"][max(hrank(tech), hrank(adopt))]


# ---------------------------------------------------------------------------
# 3. OPPORTUNITIES (100)
#    Authored per-account. Each account except Williams-Sonoma gets >=1 renewal
#    in CQ..Q3FY27. Strategic accounts: 2-3 renewals. Enterprise/mid: 1 renewal.
# ---------------------------------------------------------------------------
#
# Opp tuple shape:
# (id, accountId, name, activeQuoteId, amount, type, stage, forecastCategory,
#  closeDate, daysInStage, daysInForecast, productAllocations,
#  riskIds, lastActivityType, lastActivityDaysAgo,
#  renewalOutcome, churnReason, displacementCompetitor, scenarios)

OPPORTUNITIES = []


def add_opp(*args):
    """args matches the tuple shape above (sans the trailing 'scenarios' which defaults [])."""
    if len(args) == 18:
        args = args + ([],)
    OPPORTUNITIES.append(args)


# Helper to validate productAllocations sum
def alloc(*pairs):
    # pairs are (productId, amount)
    s = "; ".join(f"{p}:{a}" for p, a in pairs).replace("; ", ";")
    return s, sum(a for _, a in pairs)


def AL(*pairs):
    s = ";".join(f"{p}:{a}" for p, a in pairs)
    total = sum(a for _, a in pairs)
    return s, total


# === Salesforce (strategic, full-coverage: pipeline in every quarter) ===
s, t = AL(("pa-series", 850_000), ("pa-series-attached", 250_000))
add_opp("opp-sf-001", "acc-salesforce", "Salesforce NGFW Refresh CQ", "Q-100101", t, "renewal", "negotiate", "commit", days_ahead(35), 22, 18, s, [], "contract-review", 5, "full", "", "")
s, t = AL(("prisma-access", 1_400_000),)
add_opp("opp-sf-002", "acc-salesforce", "Salesforce Prisma Access SASE Expansion", "Q-100102", t, "upsell", "active-pov", "best-case", days_ahead(72), 45, 30, s, ["no-design-of-record"], "technical-deep-dive", 6, "", "", "")
s, t = AL(("xsiam", 2_100_000), ("cortex-xdr", 400_000))
add_opp("opp-sf-003", "acc-salesforce", "Salesforce XSIAM Splunk Takeout", "Q-100103", t, "net-new", "technical-validation", "best-case", days_ahead(110), 38, 22, s, [], "solution-workshop", 8, "", "", "")
s, t = AL(("unit-42-reactive", 350_000),)
add_opp("opp-sf-004", "acc-salesforce", "Salesforce Unit 42 IR Retainer Renewal", "Q-100104", t, "renewal", "solutioning", "pipeline", days_ahead(200), 12, 10, s, [], "renewal-prep-call", 4, "unknown", "", "")
s, t = AL(("cortex-cloud-leaf", 980_000),)
add_opp("opp-sf-005", "acc-salesforce", "Salesforce Cortex Cloud CNAPP", "Q-100105", t, "net-new", "discovery", "pipeline", days_ahead(290), 18, 18, s, [], "poc-scoping-session", 11, "", "", "")

# === Google Cloud ===
s, t = AL(("pa-series", 1_200_000), ("pa-series-attached", 400_000))
add_opp("opp-gc-001", "acc-googlecloud", "Google Cloud PA-Series Refresh", "Q-100201", t, "renewal-and-upsell", "active-pov", "best-case", days_ahead(48), 55, 25, s, ["no-design-of-record"], "technical-deep-dive", 9, "upsell", "", "")
s, t = AL(("xsiam", 1_800_000),)
add_opp("opp-gc-002", "acc-googlecloud", "Google Cloud XSIAM SOC Modernization", "Q-100202", t, "net-new", "solutioning", "pipeline", days_ahead(180), 28, 28, s, ["no-secured-tech-win"], "solution-workshop", 12, "", "", "")
s, t = AL(("prisma-access", 700_000),)
add_opp("opp-gc-003", "acc-googlecloud", "Google Cloud SASE Pilot Expansion", "Q-100203", t, "upsell", "technical-validation", "best-case", days_ahead(95), 42, 18, s, [], "architecture-review", 7, "", "", "")

# === Wells Fargo Bank (multi-risk-critical) ===
s, t = AL(("pa-series", 2_400_000), ("pa-series-support", 600_000))
add_opp("opp-wf-001", "acc-wellsfargobank", "Wells Fargo NGFW Refresh (PA-5450)", "Q-100301", t, "renewal", "negotiate", "best-case", days_ahead(58), 88, 65, s, ["lacking-exec-engagement","no-secured-tech-win","budget-not-scheduled","term-length-issue"], "customer-engagement", 38, "unknown", "", "")
s, t = AL(("unit-42-reactive", 450_000),)
add_opp("opp-wf-002", "acc-wellsfargobank", "Wells Fargo Unit 42 IR Retainer Renewal", "Q-100302", t, "renewal", "solutioning", "pipeline", days_ahead(140), 60, 60, s, ["no-activity-30-days","budget-not-scheduled"], "renewal-prep-call", 42, "unknown", "", "")
s, t = AL(("prisma-access", 1_100_000),)
add_opp("opp-wf-003", "acc-wellsfargobank", "Wells Fargo Prisma Access Pilot", "Q-100303", t, "net-new", "discovery", "pipeline", days_ahead(310), 35, 35, s, ["lacking-exec-engagement","no-design-of-record","no-partner-selected"], "poc-scoping-session", 30, "", "", "")

# === Adobe (one-product-critical: XSOAR critical, others healthy) ===
s, t = AL(("cortex-xsoar", 480_000),)
add_opp("opp-adobe-001", "acc-adobe", "Adobe Cortex XSOAR SOC Modernization", "Q-100401", t, "renewal", "active-pov", "best-case", days_ahead(50), 62, 30, s, ["no-secured-tech-win","no-design-of-record"], "technical-deep-dive", 6, "downsell", "", "")
s, t = AL(("prisma-access", 1_300_000),)
add_opp("opp-adobe-002", "acc-adobe", "Adobe Prisma Access SASE Expansion", "Q-100402", t, "upsell", "negotiate", "commit", days_ahead(25), 32, 18, s, [], "contract-review", 4, "", "", "")
s, t = AL(("pa-series", 950_000),)
add_opp("opp-adobe-003", "acc-adobe", "Adobe NGFW Refresh", "Q-100403", t, "renewal", "solutioning", "pipeline", days_ahead(220), 25, 25, s, [], "renewal-prep-call", 9, "unknown", "", "")

# === NVIDIA (over-attain) ===
s, t = AL(("xsiam", 3_200_000), ("cortex-xdr", 800_000))
add_opp("opp-nv-001", "acc-nvidia", "NVIDIA XSIAM Platform Expansion", "Q-100501", t, "upsell", "negotiate", "commit", days_ahead(18), 28, 14, s, [], "contract-review", 3, "", "", "")
s, t = AL(("unit-42-proactive", 280_000),)
add_opp("opp-nv-002", "acc-nvidia", "NVIDIA Unit 42 Proactive Renewal", "Q-100502", t, "renewal", "negotiate", "commit", days_ahead(40), 22, 14, s, [], "renewal-prep-call", 5, "upsell", "", "")
s, t = AL(("pa-series", 1_800_000),)
add_opp("opp-nv-003", "acc-nvidia", "NVIDIA NGFW Refresh", "Q-100503", t, "renewal", "active-pov", "best-case", days_ahead(75), 50, 22, s, [], "technical-deep-dive", 4, "full", "", "")
s, t = AL(("prisma-access", 1_500_000),)
add_opp("opp-nv-004", "acc-nvidia", "NVIDIA Prisma Access Expansion", "Q-100504", t, "upsell", "technical-validation", "best-case", days_ahead(120), 45, 20, s, [], "architecture-review", 6, "", "", "")

# === Cisco ===
s, t = AL(("xsiam", 1_600_000),)
add_opp("opp-cisco-001", "acc-cisco", "Cisco XSIAM Splunk Takeout", "Q-100601", t, "net-new", "active-pov", "best-case", days_ahead(80), 58, 28, s, ["no-secured-tech-win"], "technical-deep-dive", 12, "", "", "")
s, t = AL(("unit-42-reactive", 320_000),)
add_opp("opp-cisco-002", "acc-cisco", "Cisco Unit 42 IR Retainer", "Q-100602", t, "renewal", "negotiate", "commit", days_ahead(28), 25, 18, s, [], "renewal-prep-call", 6, "full", "", "")
s, t = AL(("cortex-cloud-leaf", 680_000),)
add_opp("opp-cisco-003", "acc-cisco", "Cisco Cortex Cloud CNAPP", "Q-100603", t, "net-new", "solutioning", "pipeline", days_ahead(180), 32, 32, s, ["no-design-of-record"], "solution-workshop", 14, "", "", "")

# === Oracle (stalled opp) ===
s, t = AL(("xsiam", 1_400_000),)
add_opp("opp-oracle-001", "acc-oracle", "Oracle XSIAM QRadar Takeout", "Q-100701", t, "net-new", "technical-validation", "pipeline", days_ahead(95), 218, 95, s, ["lacking-exec-engagement","no-activity-30-days","no-secured-tech-win"], "poc-scoping-session", 35, "", "", "", ["outlier-stalled-opp"])
s, t = AL(("pa-series", 1_100_000), ("pa-series-attached", 300_000))
add_opp("opp-oracle-002", "acc-oracle", "Oracle NGFW Refresh", "Q-100702", t, "renewal", "negotiate", "best-case", days_ahead(55), 60, 28, s, ["term-length-issue"], "contract-review", 11, "unknown", "", "")
s, t = AL(("prisma-access", 820_000),)
add_opp("opp-oracle-003", "acc-oracle", "Oracle Prisma Access SASE Pilot", "Q-100703", t, "net-new", "discovery", "pipeline", days_ahead(260), 40, 40, s, [], "solution-workshop", 18, "", "", "")

# === Visa ===
s, t = AL(("pa-series", 1_400_000), ("pa-series-support", 350_000))
add_opp("opp-visa-001", "acc-visa", "Visa NGFW Hardware Refresh", "Q-100801", t, "renewal", "negotiate", "commit", days_ahead(22), 24, 16, s, [], "contract-review", 5, "full", "", "")
s, t = AL(("unit-42-proactive", 240_000),)
add_opp("opp-visa-002", "acc-visa", "Visa Unit 42 Proactive Renewal", "Q-100802", t, "renewal", "solutioning", "best-case", days_ahead(165), 30, 25, s, [], "renewal-prep-call", 7, "full", "", "")
s, t = AL(("xsiam", 1_900_000),)
add_opp("opp-visa-003", "acc-visa", "Visa XSIAM SOC Build", "Q-100803", t, "net-new", "active-pov", "best-case", days_ahead(110), 55, 28, s, [], "technical-deep-dive", 6, "", "", "")

# === Chevron ===
s, t = AL(("pa-series", 1_650_000),)
add_opp("opp-chev-001", "acc-chevron", "Chevron NGFW OT Edge Refresh", "Q-100901", t, "renewal", "active-pov", "best-case", days_ahead(68), 48, 24, s, ["no-design-of-record"], "deployment-health-check", 11, "upsell", "", "")
s, t = AL(("xpanse", 380_000),)
add_opp("opp-chev-002", "acc-chevron", "Chevron Xpanse ASM Pilot", "Q-100902", t, "net-new", "solutioning", "pipeline", days_ahead(155), 22, 22, s, [], "solution-workshop", 13, "", "", "")

# === Kaiser ===
s, t = AL(("prisma-access", 1_400_000),)
add_opp("opp-kp-001", "acc-kaiser", "Kaiser Prisma Access Clinical Network", "Q-101001", t, "renewal-and-upsell", "active-pov", "commit", days_ahead(38), 42, 20, s, [], "deployment-health-check", 7, "upsell", "", "")
s, t = AL(("cortex-xsoar", 520_000),)
add_opp("opp-kp-002", "acc-kaiser", "Kaiser XSOAR Renewal", "Q-101002", t, "renewal", "negotiate", "commit", days_ahead(15), 18, 12, s, [], "renewal-prep-call", 6, "full", "", "")
s, t = AL(("unit-42-reactive", 480_000),)
add_opp("opp-kp-003", "acc-kaiser", "Kaiser Unit 42 HIPAA IR Retainer", "Q-101003", t, "renewal", "solutioning", "best-case", days_ahead(140), 28, 22, s, [], "renewal-prep-call", 8, "full", "", "")

# === Stanford Health Care ===
s, t = AL(("unit-42-reactive", 320_000),)
add_opp("opp-shc-001", "acc-stanfordhc", "Stanford Health Care Unit 42 IR Retainer Renewal", "Q-101101", t, "renewal", "negotiate", "commit", days_ahead(32), 26, 18, s, [], "renewal-prep-call", 10, "full", "", "")
s, t = AL(("pa-series", 780_000),)
add_opp("opp-shc-002", "acc-stanfordhc", "Stanford Health Care NGFW Refresh", "Q-101102", t, "renewal", "solutioning", "best-case", days_ahead(125), 32, 22, s, ["no-or-stale-asr"], "technical-deep-dive", 12, "unknown", "", "")

# === PG&E (catastrophic-miss) ===
s, t = AL(("pa-series", 1_850_000),)
add_opp("opp-pge-001", "acc-pge", "PG&E NGFW OT Refresh", "Q-101201", t, "renewal", "technical-validation", "pipeline", days_ahead(180), 110, 75, s, ["lacking-exec-engagement","no-activity-30-days","budget-not-scheduled","no-secured-tech-win"], "customer-engagement", 45, "unknown", "", "")
s, t = AL(("xpanse", 280_000),)
add_opp("opp-pge-002", "acc-pge", "PG&E Xpanse ASM", "Q-101202", t, "net-new", "discovery", "pipeline", days_ahead(310), 65, 65, s, ["lacking-exec-engagement","no-partner-selected"], "poc-scoping-session", 55, "", "", "")

# === YouTube ===
s, t = AL(("xsiam", 920_000),)
add_opp("opp-yt-001", "acc-youtube", "YouTube XSIAM Pilot", "Q-101301", t, "net-new", "active-pov", "best-case", days_ahead(72), 48, 26, s, [], "solution-workshop", 6, "", "", "")
s, t = AL(("prisma-access", 540_000),)
add_opp("opp-yt-002", "acc-youtube", "YouTube SASE Renewal", "Q-101302", t, "renewal", "negotiate", "commit", days_ahead(42), 28, 18, s, [], "contract-review", 5, "full", "", "")

# === Waymo ===
s, t = AL(("cortex-xdr", 380_000),)
add_opp("opp-wm-001", "acc-waymo", "Waymo Cortex XDR Renewal", "Q-101401", t, "renewal", "solutioning", "best-case", days_ahead(95), 35, 25, s, ["no-design-of-record"], "poc-scoping-session", 13, "unknown", "", "")
s, t = AL(("pa-series", 520_000),)
add_opp("opp-wm-002", "acc-waymo", "Waymo NGFW Fleet Expansion", "Q-101402", t, "upsell", "discovery", "pipeline", days_ahead(220), 30, 30, s, [], "solution-workshop", 18, "", "", "")

# === Wells Fargo Securities ===
s, t = AL(("pa-series", 680_000),)
add_opp("opp-wfs-001", "acc-wfsecurities", "Wells Fargo Securities NGFW Refresh", "Q-101501", t, "renewal", "active-pov", "best-case", days_ahead(58), 40, 22, s, [], "renewal-prep-call", 15, "full", "", "")
s, t = AL(("unit-42-reactive", 220_000),)
add_opp("opp-wfs-002", "acc-wfsecurities", "Wells Fargo Securities Unit 42 IR Renewal", "Q-101502", t, "renewal", "solutioning", "pipeline", days_ahead(145), 28, 28, s, [], "renewal-prep-call", 18, "unknown", "", "")

# === Slack ===
s, t = AL(("prisma-access", 750_000),)
add_opp("opp-slack-001", "acc-slack", "Slack Prisma Access Renewal", "Q-101601", t, "renewal", "negotiate", "commit", days_ahead(30), 24, 16, s, [], "contract-review", 4, "full", "", "")
s, t = AL(("cortex-xdr", 320_000),)
add_opp("opp-slack-002", "acc-slack", "Slack XDR Endpoint Expansion", "Q-101602", t, "upsell", "active-pov", "best-case", days_ahead(80), 38, 22, s, [], "technical-deep-dive", 5, "", "", "")

# === Tableau ===
s, t = AL(("pa-series", 620_000),)
add_opp("opp-tab-001", "acc-tableau", "Tableau NGFW Refresh", "Q-101701", t, "renewal", "solutioning", "best-case", days_ahead(115), 38, 28, s, ["no-design-of-record"], "architecture-review", 14, "unknown", "", "")
s, t = AL(("xsiam", 880_000),)
add_opp("opp-tab-002", "acc-tableau", "Tableau XSIAM Pilot", "Q-101702", t, "net-new", "discovery", "pipeline", days_ahead(260), 22, 22, s, [], "poc-scoping-session", 16, "", "", "")

# === MuleSoft ===
s, t = AL(("cortex-cloud-leaf", 580_000),)
add_opp("opp-mule-001", "acc-mulesoft", "MuleSoft Cortex Cloud Renewal", "Q-101801", t, "renewal", "active-pov", "commit", days_ahead(45), 32, 18, s, [], "solution-workshop", 8, "full", "", "")

# === Sutter Health ===
s, t = AL(("pa-series", 880_000),)
add_opp("opp-sutter-001", "acc-sutterhealth", "Sutter Health NGFW Refresh", "Q-101901", t, "renewal", "technical-validation", "pipeline", days_ahead(150), 80, 50, s, ["no-design-of-record","no-secured-tech-win"], "deployment-health-check", 19, "unknown", "", "")
s, t = AL(("unit-42-reactive", 240_000),)
add_opp("opp-sutter-002", "acc-sutterhealth", "Sutter Health Unit 42 IR Retainer Renewal", "Q-101902", t, "renewal", "solutioning", "pipeline", days_ahead(190), 35, 35, s, [], "renewal-prep-call", 22, "unknown", "", "")

# === Intel ===
s, t = AL(("xsiam", 1_400_000),)
add_opp("opp-intel-001", "acc-intel", "Intel XSIAM Fab SOC Build", "Q-102001", t, "net-new", "active-pov", "best-case", days_ahead(85), 52, 26, s, [], "technical-deep-dive", 11, "", "", "")
s, t = AL(("pa-series", 1_200_000),)
add_opp("opp-intel-002", "acc-intel", "Intel NGFW Renewal", "Q-102002", t, "renewal", "negotiate", "commit", days_ahead(40), 28, 16, s, [], "contract-review", 7, "full", "", "")

# === Netflix ===
s, t = AL(("prisma-access", 1_100_000),)
add_opp("opp-nflx-001", "acc-netflix", "Netflix Prisma Access SASE Renewal", "Q-102101", t, "renewal", "negotiate", "commit", days_ahead(25), 22, 14, s, [], "contract-review", 5, "upsell", "", "")
s, t = AL(("xsiam", 1_350_000),)
add_opp("opp-nflx-002", "acc-netflix", "Netflix XSIAM SOC Modernization", "Q-102102", t, "net-new", "active-pov", "best-case", days_ahead(95), 50, 24, s, [], "solution-workshop", 7, "", "", "")

# === Stripe (velocity-deal: <7 days, $3M+) ===
s, t = AL(("xsiam", 2_200_000), ("cortex-xdr", 900_000))
add_opp("opp-stripe-001", "acc-stripe", "Stripe XSIAM + XDR Bundle", "Q-102201", t, "net-new", "negotiate", "commit", days_ahead(5), 6, 4, s, [], "contract-review", 2, "", "", "", ["outlier-velocity-deal"])
s, t = AL(("prisma-access", 680_000),)
add_opp("opp-stripe-002", "acc-stripe", "Stripe Prisma Access Renewal", "Q-102202", t, "renewal", "solutioning", "best-case", days_ahead(130), 25, 22, s, [], "renewal-prep-call", 8, "full", "", "")

# === Pinterest (churn) ===
s, t = AL(("cortex-xsoar", 420_000),)
add_opp("opp-pin-001", "acc-pinterest", "Pinterest XSOAR Renewal", "Q-102301", t, "renewal", "negotiate", "pipeline", days_ahead(38), 62, 55, s, ["lacking-exec-engagement","budget-not-scheduled"], "renewal-prep-call", 22, "churn", "budget-cut", "", ["outlier-churn"])
s, t = AL(("pa-series", 540_000),)
add_opp("opp-pin-002", "acc-pinterest", "Pinterest NGFW Refresh", "Q-102302", t, "renewal", "solutioning", "pipeline", days_ahead(160), 40, 40, s, ["no-activity-30-days"], "customer-engagement", 32, "unknown", "", "")

# === ServiceNow ===
s, t = AL(("prisma-access", 1_250_000),)
add_opp("opp-snow-001", "acc-servicenow", "ServiceNow Prisma Access Renewal", "Q-102401", t, "renewal-and-upsell", "active-pov", "best-case", days_ahead(62), 45, 22, s, [], "technical-deep-dive", 7, "upsell", "", "")
s, t = AL(("xsiam", 1_500_000),)
add_opp("opp-snow-002", "acc-servicenow", "ServiceNow XSIAM Pilot", "Q-102402", t, "net-new", "technical-validation", "best-case", days_ahead(100), 48, 24, s, [], "solution-workshop", 9, "", "", "")

# === Workday ===
s, t = AL(("pa-series", 720_000),)
add_opp("opp-wday-001", "acc-workday", "Workday NGFW Refresh", "Q-102501", t, "renewal", "active-pov", "best-case", days_ahead(50), 42, 22, s, ["no-design-of-record"], "technical-deep-dive", 9, "unknown", "", "")
s, t = AL(("cortex-cloud-leaf", 580_000),)
add_opp("opp-wday-002", "acc-workday", "Workday Cortex Cloud Pilot", "Q-102502", t, "net-new", "solutioning", "pipeline", days_ahead(170), 30, 30, s, [], "poc-scoping-session", 13, "", "", "")

# === Twilio ===
s, t = AL(("prisma-access", 880_000),)
add_opp("opp-twil-001", "acc-twilio", "Twilio Prisma Access Renewal", "Q-102601", t, "renewal", "solutioning", "best-case", days_ahead(110), 40, 28, s, ["no-design-of-record"], "renewal-prep-call", 16, "unknown", "", "")

# === DoorDash ===
s, t = AL(("xsiam", 950_000),)
add_opp("opp-dd-001", "acc-doordash", "DoorDash XSIAM Pilot", "Q-102701", t, "net-new", "active-pov", "best-case", days_ahead(78), 52, 26, s, [], "technical-deep-dive", 12, "", "", "")
s, t = AL(("pa-series", 480_000),)
add_opp("opp-dd-002", "acc-doordash", "DoorDash NGFW Refresh", "Q-102702", t, "renewal", "negotiate", "commit", days_ahead(35), 26, 16, s, [], "contract-review", 8, "full", "", "")

# === Lyft (sparse-pipeline: only CQ) ===
s, t = AL(("pa-series", 620_000),)
add_opp("opp-lyft-001", "acc-lyft", "Lyft NGFW Refresh", "Q-102801", t, "renewal", "negotiate", "best-case", days_ahead(40), 38, 22, s, ["lacking-exec-engagement","no-activity-30-days"], "customer-engagement", 24, "unknown", "", "", ["outlier-sparse-pipeline"])

# === Airbnb ===
s, t = AL(("prisma-access", 980_000),)
add_opp("opp-abnb-001", "acc-airbnb", "Airbnb Prisma Access Expansion", "Q-102901", t, "upsell", "active-pov", "commit", days_ahead(45), 32, 18, s, [], "technical-deep-dive", 6, "", "", "")
s, t = AL(("unit-42-proactive", 180_000),)
add_opp("opp-abnb-002", "acc-airbnb", "Airbnb Unit 42 Proactive Renewal", "Q-102902", t, "renewal", "solutioning", "best-case", days_ahead(140), 30, 22, s, [], "renewal-prep-call", 8, "full", "", "")

# === Databricks ===
s, t = AL(("xsiam", 1_450_000),)
add_opp("opp-dbx-001", "acc-databricks", "Databricks XSIAM Cloud SOC", "Q-103001", t, "net-new", "negotiate", "commit", days_ahead(20), 30, 14, s, [], "contract-review", 4, "", "", "")
s, t = AL(("pa-series", 580_000),)
add_opp("opp-dbx-002", "acc-databricks", "Databricks NGFW Renewal", "Q-103002", t, "renewal", "active-pov", "best-case", days_ahead(85), 42, 24, s, [], "technical-deep-dive", 6, "full", "", "")

# === Snowflake ===
s, t = AL(("cortex-cloud-leaf", 1_180_000),)
add_opp("opp-snow2-001", "acc-snowflake", "Snowflake Cortex Cloud CNAPP", "Q-103101", t, "net-new", "active-pov", "best-case", days_ahead(70), 48, 25, s, [], "technical-deep-dive", 5, "", "", "")
s, t = AL(("prisma-access", 520_000),)
add_opp("opp-snow2-002", "acc-snowflake", "Snowflake Prisma Access Renewal", "Q-103102", t, "renewal", "negotiate", "commit", days_ahead(28), 22, 14, s, [], "contract-review", 7, "full", "", "")

# === Reddit (displacement) ===
s, t = AL(("cortex-xdr", 380_000),)
add_opp("opp-reddit-001", "acc-reddit", "Reddit Cortex XDR Renewal", "Q-103201", t, "renewal", "negotiate", "closed", days_ahead(-22), 45, 35, s, ["lacking-exec-engagement","no-secured-tech-win","budget-not-scheduled"], "contract-review", 17, "displacement", "", "CrowdStrike", ["outlier-displacement"])
s, t = AL(("pa-series", 460_000),)
add_opp("opp-reddit-002", "acc-reddit", "Reddit NGFW Refresh", "Q-103202", t, "renewal", "solutioning", "best-case", days_ahead(120), 35, 25, s, [], "renewal-prep-call", 18, "unknown", "", "")

# === Roblox ===
s, t = AL(("prisma-access", 720_000),)
add_opp("opp-rblx-001", "acc-roblox", "Roblox Prisma Access Renewal", "Q-103301", t, "renewal-and-upsell", "active-pov", "best-case", days_ahead(60), 40, 22, s, ["no-design-of-record"], "architecture-review", 13, "upsell", "", "")

# === eBay ===
s, t = AL(("xsiam", 1_300_000),)
add_opp("opp-ebay-001", "acc-ebay", "eBay XSIAM SOC Modernization", "Q-103401", t, "net-new", "technical-validation", "best-case", days_ahead(95), 50, 24, s, [], "solution-workshop", 8, "", "", "")
s, t = AL(("pa-series", 680_000),)
add_opp("opp-ebay-002", "acc-ebay", "eBay NGFW Renewal", "Q-103402", t, "renewal", "negotiate", "commit", days_ahead(34), 28, 16, s, [], "contract-review", 6, "full", "", "")

# === Charles Schwab ===
s, t = AL(("pa-series", 1_400_000), ("pa-series-attached", 380_000))
add_opp("opp-sch-001", "acc-schwab", "Charles Schwab NGFW Refresh", "Q-103501", t, "renewal", "negotiate", "commit", days_ahead(38), 26, 18, s, [], "contract-review", 7, "full", "", "")
s, t = AL(("unit-42-proactive", 290_000),)
add_opp("opp-sch-002", "acc-schwab", "Charles Schwab Unit 42 Proactive", "Q-103502", t, "renewal", "solutioning", "best-case", days_ahead(150), 28, 22, s, [], "renewal-prep-call", 9, "full", "", "")

# === Genentech ===
s, t = AL(("pa-series", 920_000),)
add_opp("opp-gen-001", "acc-genentech", "Genentech NGFW Renewal", "Q-103601", t, "renewal", "active-pov", "best-case", days_ahead(72), 45, 24, s, ["no-design-of-record"], "technical-deep-dive", 14, "unknown", "", "")
s, t = AL(("cortex-cloud-leaf", 540_000),)
add_opp("opp-gen-002", "acc-genentech", "Genentech Cortex Cloud Compliance", "Q-103602", t, "net-new", "solutioning", "pipeline", days_ahead(190), 32, 32, s, [], "solution-workshop", 16, "", "", "")

# === UCSF Health ===
s, t = AL(("unit-42-reactive", 280_000),)
add_opp("opp-ucsf-001", "acc-ucsfhealth", "UCSF Health Unit 42 IR Retainer Renewal", "Q-103701", t, "renewal", "technical-validation", "pipeline", days_ahead(115), 65, 45, s, ["no-secured-tech-win"], "deployment-health-check", 20, "unknown", "", "")
s, t = AL(("pa-series", 420_000),)
add_opp("opp-ucsf-002", "acc-ucsfhealth", "UCSF Health NGFW Refresh", "Q-103702", t, "renewal", "solutioning", "best-case", days_ahead(170), 30, 25, s, [], "renewal-prep-call", 22, "unknown", "", "")

# === Gilead ===
s, t = AL(("cortex-cloud-leaf", 780_000),)
add_opp("opp-gil-001", "acc-gilead", "Gilead Cortex Cloud Compliance", "Q-103801", t, "net-new", "active-pov", "commit", days_ahead(42), 38, 18, s, [], "technical-deep-dive", 6, "", "", "")
s, t = AL(("pa-series", 580_000),)
add_opp("opp-gil-002", "acc-gilead", "Gilead NGFW Renewal", "Q-103802", t, "renewal", "negotiate", "commit", days_ahead(28), 24, 16, s, [], "contract-review", 5, "full", "", "")

# === Electronic Arts ===
s, t = AL(("pa-series", 720_000),)
add_opp("opp-ea-001", "acc-ea", "Electronic Arts NGFW Refresh", "Q-103901", t, "renewal", "active-pov", "best-case", days_ahead(65), 50, 24, s, ["no-design-of-record"], "poc-scoping-session", 18, "unknown", "", "")
s, t = AL(("cortex-xdr", 420_000),)
add_opp("opp-ea-002", "acc-ea", "Electronic Arts Cortex XDR Pilot", "Q-103902", t, "net-new", "solutioning", "pipeline", days_ahead(180), 35, 35, s, [], "solution-workshop", 20, "", "", "")

# === Williams-Sonoma (cold-account, zero opps) ===
# Intentionally NO opportunities — empty-state test case.

# === Sutter Bay Medical Foundation ===
s, t = AL(("pa-series", 220_000),)
add_opp("opp-sbmf-001", "acc-sutterbay", "Sutter Bay NGFW Renewal", "Q-104201", t, "renewal", "solutioning", "best-case", days_ahead(95), 32, 26, s, ["no-design-of-record"], "deployment-health-check", 15, "unknown", "", "")

# === Palo Alto Medical Foundation ===
s, t = AL(("prisma-access", 180_000),)
add_opp("opp-pamf-001", "acc-pamf", "PAMF Prisma Access Renewal", "Q-104301", t, "renewal", "active-pov", "best-case", days_ahead(70), 38, 22, s, [], "solution-workshop", 9, "full", "", "")

# === Gap Inc. ===
s, t = AL(("pa-series", 340_000),)
add_opp("opp-gap-001", "acc-gap", "Gap Inc. NGFW Renewal", "Q-104401", t, "renewal", "negotiate", "commit", days_ahead(30), 26, 16, s, [], "contract-review", 12, "full", "", "")

# === Levi Strauss ===
s, t = AL(("prisma-access", 250_000),)
add_opp("opp-levi-001", "acc-levi", "Levi Strauss SASE Pilot", "Q-104501", t, "renewal", "solutioning", "best-case", days_ahead(110), 30, 24, s, ["no-design-of-record"], "poc-scoping-session", 16, "unknown", "", "")

# === Safeway ===
s, t = AL(("pa-series", 380_000),)
add_opp("opp-saf-001", "acc-safeway", "Safeway NGFW Refresh", "Q-104601", t, "renewal", "active-pov", "best-case", days_ahead(58), 38, 22, s, [], "solution-workshop", 7, "full", "", "")
s, t = AL(("xpanse", 120_000),)
add_opp("opp-saf-002", "acc-safeway", "Safeway Xpanse ASM", "Q-104602", t, "net-new", "discovery", "pipeline", days_ahead(220), 25, 25, s, [], "poc-scoping-session", 14, "", "", "")

# === Ross Stores (neglected) ===
s, t = AL(("pa-series", 280_000),)
add_opp("opp-ross-001", "acc-ross", "Ross Stores NGFW Renewal", "Q-104701", t, "renewal", "discovery", "pipeline", days_ahead(95), 55, 55, s, ["lacking-exec-engagement","no-activity-30-days","budget-not-scheduled","no-secured-tech-win"], "customer-engagement", 72, "unknown", "", "", ["outlier-neglected"])

# === City of San Francisco ===
s, t = AL(("pa-series", 420_000),)
add_opp("opp-csf-001", "acc-citysf", "City of San Francisco NGFW Refresh", "Q-104801", t, "renewal", "solutioning", "best-case", days_ahead(125), 40, 30, s, ["no-design-of-record"], "architecture-review", 17, "unknown", "", "")

# === Stanford University ===
s, t = AL(("prisma-access", 220_000),)
add_opp("opp-su-001", "acc-stanforduniv", "Stanford University Prisma Access Renewal", "Q-104901", t, "renewal", "active-pov", "best-case", days_ahead(55), 36, 22, s, [], "solution-workshop", 8, "full", "", "")

# === UC Berkeley ===
s, t = AL(("pa-series", 180_000),)
add_opp("opp-ucb-001", "acc-ucb", "UC Berkeley NGFW Renewal", "Q-105001", t, "renewal", "negotiate", "commit", days_ahead(28), 24, 16, s, [], "deployment-health-check", 14, "full", "", "")

# === BART ===
s, t = AL(("pa-series", 280_000),)
add_opp("opp-bart-001", "acc-bart", "BART NGFW OT Renewal", "Q-105101", t, "renewal", "solutioning", "best-case", days_ahead(140), 32, 26, s, ["no-design-of-record"], "poc-scoping-session", 19, "unknown", "", "")

# Closed opps (5 total): 3 closed-won + 1 closed-lost + 1 closed-displacement (Reddit, already added)
# Salesforce closed-won
s, t = AL(("pa-series-attached", 180_000),)
add_opp("opp-sf-closed-001", "acc-salesforce", "Salesforce CDSS Bundle Q3FY26", "Q-099001", t, "upsell", "negotiate", "closed", days_ahead(-45), 28, 28, s, [], "contract-review", 30, "", "", "", ["closed-won"])
# NVIDIA closed-won
s, t = AL(("xsiam", 1_400_000),)
add_opp("opp-nv-closed-001", "acc-nvidia", "NVIDIA XSIAM Initial Deployment", "Q-099002", t, "net-new", "negotiate", "closed", days_ahead(-60), 35, 35, s, [], "contract-review", 45, "", "", "", ["closed-won"])
# Kaiser closed-won
s, t = AL(("pa-series", 620_000),)
add_opp("opp-kp-closed-001", "acc-kaiser", "Kaiser NGFW Refresh Q3FY26", "Q-099003", t, "renewal", "negotiate", "closed", days_ahead(-30), 22, 22, s, [], "contract-review", 28, "full", "", "", ["closed-won"])
# Twilio closed-lost
s, t = AL(("xsiam", 880_000),)
add_opp("opp-twil-closed-001", "acc-twilio", "Twilio XSIAM Pilot Q3FY26", "Q-099004", t, "net-new", "active-pov", "closed", days_ahead(-50), 90, 60, s, ["lacking-exec-engagement","no-secured-tech-win"], "customer-engagement", 55, "", "", "", ["closed-lost"])

# Sanity check counts
assert 95 <= len(OPPORTUNITIES) <= 105, f"Expected ~100 opportunities, got {len(OPPORTUNITIES)}"


# ---------------------------------------------------------------------------
# Helper to read opp tuple (variable length scenarios trailing)
# ---------------------------------------------------------------------------
def opp_fields(opp):
    # Normalize to 19-field tuple
    base = list(opp[:18])
    scenarios = opp[18] if len(opp) > 18 else []
    if isinstance(scenarios, str):
        scenarios = [scenarios] if scenarios else []
    elif scenarios is None:
        scenarios = []
    return base, scenarios


# ---------------------------------------------------------------------------
# 4. CONTACTS (~180 rows; 2-5 per account)
# ---------------------------------------------------------------------------
FIRST_NAMES = ["Jane","Marcus","Priya","Hiroshi","Elena","David","Aisha","Carlos","Sofia","Ravi",
               "Mei","Tom","Anika","Liam","Naomi","Diego","Yuki","Sara","Jake","Olivia",
               "Kenji","Amara","Noah","Lila","Ethan","Zara","Owen","Iris","Mateo","Hana"]
LAST_NAMES = ["Chen","Patel","Nguyen","Anderson","Kowalski","Tanaka","Ramirez","Johnson","Singh","Schmidt",
              "Garcia","O'Brien","Park","Khan","Russo","Brooks","Yamada","Cohen","Hayes","Bennett",
              "Liu","Foster","Reyes","Ng","Martin","Reed","Walsh","Iqbal","Cole","Dixon"]
TITLES_BY_ROLE = {
    "champion": ["Director of Security","Director of Cloud Security","Sr Manager, SecOps","Principal Security Architect"],
    "decision-maker": ["VP of Information Security","VP of Infrastructure","Head of Cybersecurity"],
    "economic-buyer": ["CISO","CIO","CFO","SVP Technology"],
    "influencer": ["Security Engineer","Cloud Security Engineer","Network Architect","DevSecOps Lead"],
    "blocker": ["VP of Networking","Director of Compliance"],
    "user": ["SOC Analyst","Security Operations Engineer","IT Manager"],
}

contacts_rows = []
contact_seq = 0
rng = random.Random(42)
for acct in ACCOUNTS:
    aid = acct[0]
    n_contacts = rng.randint(3, 5)
    if aid == "acc-williamssonoma":
        n_contacts = 2  # cold account: few contacts
    if aid == "acc-ross":
        n_contacts = 2  # neglected
    # Always 1 EB, 1 champion, 1 influencer + extras
    role_plan = ["economic-buyer","champion","influencer"]
    if n_contacts >= 4:
        role_plan.append("decision-maker")
    if n_contacts >= 5:
        role_plan.append("user")
    for role in role_plan[:n_contacts]:
        contact_seq += 1
        fn = rng.choice(FIRST_NAMES); ln = rng.choice(LAST_NAMES)
        title = rng.choice(TITLES_BY_ROLE[role])
        email_local = f"{fn.lower()}.{ln.lower().replace(chr(39),'')}".replace(" ","")
        domain_token = acct[1].lower().replace(" ","").replace(".","").replace("-","").replace("&","and").replace("'","")[:14]
        email = f"{email_local}@{domain_token}.com"
        phone = f"+1-415-555-{1000 + contact_seq:04d}"
        contacts_rows.append([f"c-{contact_seq:04d}", aid, f"{fn} {ln}", title, role, email, phone])


# ---------------------------------------------------------------------------
# 5. EBCS (~75 rows; 0-3 per account)
# ---------------------------------------------------------------------------
EBC_TYPES = ["executive-briefing","business-review","roadmap-session"]
EBC_TOPICS = {
    "executive-briefing": ["Platform vision and roadmap","Annual security strategy","Board-level threat briefing"],
    "business-review": ["Quarterly business review","Adoption health review","Renewal readiness review"],
    "roadmap-session": ["XSIAM roadmap deep-dive","Prisma Access feature roadmap","Cortex Cloud product workshop"],
}

ebcs_rows = []
ebc_seq = 0
ebc_count_by_account = {}
for acct in ACCOUNTS:
    aid = acct[0]
    tech = acct[9]; adopt = acct[10]
    overall = overall_health(tech, adopt)
    scenarios = acct[15]
    # Outliers and critical: zero or stale
    if "outlier-neglected" in scenarios or "outlier-cold-account" in scenarios or "outlier-catastrophic-miss" in scenarios:
        # Zero EBCs
        ebc_count_by_account[aid] = 0
        continue
    if "outlier-multi-risk-critical" in scenarios:
        # One very stale EBC (>365)
        ebc_seq += 1
        ebc_type = "executive-briefing"
        ebcs_rows.append([f"ebc-{ebc_seq:04d}", aid, days_ago(420), ebc_type,
                          rng.choice(EBC_TOPICS[ebc_type]),
                          "Marcus Chen (CISO);Priya Patel (VP Security)"])
        ebc_count_by_account[aid] = 0  # not within last year
        continue
    # Healthy: 2-3 recent EBCs
    if overall == "healthy":
        n = rng.randint(2, 3)
        recent_count = n  # all recent
        for i in range(n):
            ebc_seq += 1
            offset = rng.randint(15, 180) + i * 60
            ebc_type = rng.choice(EBC_TYPES)
            attendees_n = rng.randint(2, 3)
            attendee_pool = [r for r in contacts_rows if r[1] == aid]
            attendees = ";".join(f"{r[2]} ({sc(r[4])})" for r in rng.sample(attendee_pool, min(attendees_n, len(attendee_pool))))
            ebcs_rows.append([f"ebc-{ebc_seq:04d}", aid, days_ago(min(offset, 350)), ebc_type,
                              rng.choice(EBC_TOPICS[ebc_type]), attendees])
        ebc_count_by_account[aid] = recent_count
    elif overall == "at-risk":
        # 1-2 EBCs, some stale
        n = rng.randint(1, 2)
        recent = 0
        for i in range(n):
            ebc_seq += 1
            offset = rng.randint(200, 340) if i == 0 else rng.randint(60, 180)
            if offset <= 365:
                recent += 1
            ebc_type = rng.choice(EBC_TYPES)
            attendee_pool = [r for r in contacts_rows if r[1] == aid]
            attendees = ";".join(f"{r[2]} ({sc(r[4])})" for r in rng.sample(attendee_pool, min(2, len(attendee_pool))))
            ebcs_rows.append([f"ebc-{ebc_seq:04d}", aid, days_ago(offset), ebc_type,
                              rng.choice(EBC_TOPICS[ebc_type]), attendees])
        ebc_count_by_account[aid] = recent
    else:  # critical (non-outlier critical)
        # 1 stale EBC (>365) or zero
        if rng.random() < 0.5:
            ebc_count_by_account[aid] = 0
        else:
            ebc_seq += 1
            offset = rng.randint(400, 600)
            ebc_type = "executive-briefing"
            attendee_pool = [r for r in contacts_rows if r[1] == aid]
            attendees = ";".join(f"{r[2]} ({sc(r[4])})" for r in rng.sample(attendee_pool, min(2, len(attendee_pool))))
            ebcs_rows.append([f"ebc-{ebc_seq:04d}", aid, days_ago(offset), ebc_type,
                              rng.choice(EBC_TOPICS[ebc_type]), attendees])
            ebc_count_by_account[aid] = 0


# ---------------------------------------------------------------------------
# 6. INSTALL BASE (~200 rows; 1-8 per account)
# ---------------------------------------------------------------------------
def pick_products_for(acct):
    aid, name, industry, segment, region, apex, ltv, l3, att, tech, adopt, risks, lat, lad, povs, scen = acct
    # Base footprint by segment
    if segment == "strategic":
        n = rng.randint(5, 8)
    elif segment == "enterprise":
        n = rng.randint(3, 5)
    else:
        n = rng.randint(1, 3)
    products = rng.sample(PRODUCTS, n)
    # Ensure each account has at least one firewall product
    if not any(p in products for p in ("pa-series","vm-series")):
        products[0] = "pa-series"
    return products


def derive_health_per_product(account_tech, account_adopt, is_critical_anchor):
    """For each product, set per-product tech/adopt. is_critical_anchor=True means
    this product is THE one driving the account's critical state (one-product-problem)."""
    if is_critical_anchor:
        return "critical", "at-risk"
    if account_tech == "critical":
        # Most products at-risk, some healthy
        return rng.choice(["at-risk","at-risk","healthy"]), rng.choice(["at-risk","healthy"])
    if account_tech == "at-risk":
        return rng.choice(["healthy","at-risk"]), rng.choice(["healthy","at-risk"])
    return rng.choice(["healthy","healthy","at-risk"]), rng.choice(["healthy","healthy","at-risk"])


install_rows = []
for acct in ACCOUNTS:
    aid = acct[0]; segment = acct[3]; ltv = acct[6]; tech = acct[9]; adopt = acct[10]; scen = acct[15]
    prods = pick_products_for(acct)
    # Total TCV roughly correlated with ltv: tcv ~ 1.5-2.5x last3y; spread across products
    target_tcv = int(acct[7] * rng.uniform(1.4, 2.2))
    # Distribute across products with weights
    weights = [rng.uniform(0.5, 2.0) for _ in prods]
    wsum = sum(weights)
    one_product_critical_target = "cortex-xsoar" if aid == "acc-adobe" else None
    if one_product_critical_target and one_product_critical_target not in prods:
        prods[0] = one_product_critical_target
    for i, p in enumerate(prods):
        tcv = max(20_000, int(target_tcv * weights[i] / wsum))
        iacv = int(tcv * rng.uniform(-0.15, 0.30))
        margin = int(tcv * rng.uniform(0.30, 0.55))
        rpo = int(tcv * rng.uniform(0.40, 0.95))
        is_crit = (p == one_product_critical_target)
        pt, pa = derive_health_per_product(tech, adopt, is_crit)
        # Renewal date: spread across 4Q window mostly, some past, some future
        rd_offset = rng.randint(-180, 540)
        rd = days_ahead(rd_offset)
        install_rows.append([aid, p, tcv, iacv, margin, rpo, pt, pa, rd])


# ---------------------------------------------------------------------------
# 7. SALES PLAY INSTANCES (~350 rows)
# Status distribution covers all 7 canonical values.
# closed-won requires primaryOppId pointing to a forecastCategory=closed opp.
# ---------------------------------------------------------------------------
STATUSES = ["not-touched","pitched","interested","open-pipeline","closed-won","deferred","closed-lost"]

# Map of (acct -> closed-won opps) and closed-lost
closed_won_opps = [(o[0], o[1]) for o, _ in (opp_fields(x) for x in OPPORTUNITIES) for _ in [0] if False]
# Actually compute directly:
closed_won_opps_map = {}
closed_lost_opps_map = {}
all_open_opps_by_acct = defaultdict(list)
for opp in OPPORTUNITIES:
    base, scen = opp_fields(opp)
    oid = base[0]; aid = base[1]; fc = base[7]
    if fc == "closed":
        if "closed-won" in scen:
            closed_won_opps_map[aid] = oid
        elif "closed-lost" in scen:
            closed_lost_opps_map[aid] = oid
        elif "outlier-displacement" in scen:
            # treat as closed-lost-equivalent for play instance
            closed_lost_opps_map[aid] = oid
    else:
        all_open_opps_by_acct[aid].append(oid)

AE_NAMES = ["Casey Yamada","Devon Reyes","Morgan Cole","Riley Park","Jordan Iqbal","Quinn Foster"]

sp_rows = []
seen_pairs = set()

# For each account, choose which plays apply
for acct in ACCOUNTS:
    aid = acct[0]; segment = acct[3]; scen = acct[15]
    # Strategic: 8-12 plays applied; enterprise: 5-8; mid-market: 3-5
    if segment == "strategic":
        n = rng.randint(9, 12)
    elif segment == "enterprise":
        n = rng.randint(6, 8)
    else:
        n = rng.randint(3, 5)
    # Cold account: only 2 plays, both not-touched
    if "outlier-cold-account" in scen:
        n = 2
    plays_for_acct = rng.sample(SALES_PLAYS, n)
    open_opps = list(all_open_opps_by_acct.get(aid, []))

    has_closed_won = aid in closed_won_opps_map
    has_closed_lost = aid in closed_lost_opps_map
    used_closed_won = False
    used_closed_lost = False

    for play in plays_for_acct:
        pid = play[0]
        if (aid, pid) in seen_pairs:
            continue
        seen_pairs.add((aid, pid))
        # Decide status
        if "outlier-cold-account" in scen:
            status = "not-touched"
        elif "outlier-neglected" in scen:
            status = "not-touched"
        elif has_closed_won and not used_closed_won and rng.random() < 0.6:
            status = "closed-won"
            used_closed_won = True
        elif has_closed_lost and not used_closed_lost and rng.random() < 0.5:
            status = "closed-lost"
            used_closed_lost = True
        else:
            # Weighted random among remaining
            weights_map = {"not-touched": 18, "pitched": 14, "interested": 14, "open-pipeline": 22,
                           "deferred": 10, "closed-lost": 6, "closed-won": 4}
            # avoid closed-* if no anchor opp
            avail = list(weights_map.keys())
            if not has_closed_won:
                avail.remove("closed-won")
            if not has_closed_lost and "closed-lost" in avail:
                avail.remove("closed-lost")
            w = [weights_map[k] for k in avail]
            status = rng.choices(avail, weights=w, k=1)[0]
            if status == "closed-won":
                used_closed_won = True
            if status == "closed-lost":
                used_closed_lost = True

        # Estimated value depends on family and segment
        base_val = {"strategic": 800_000, "enterprise": 350_000, "mid-market": 120_000}[segment]
        est = int(base_val * rng.uniform(0.4, 1.8))

        # Link opps
        primary = ""
        linked = []
        if status == "closed-won":
            primary = closed_won_opps_map[aid]
        elif status == "closed-lost":
            primary = closed_lost_opps_map[aid]
        elif status == "open-pipeline" and open_opps:
            primary = open_opps[0]
            if len(open_opps) > 1 and rng.random() < 0.5:
                linked = [open_opps[1]]
        elif status in ("interested","pitched") and open_opps and rng.random() < 0.3:
            primary = open_opps[0]

        last_touch = days_ago(rng.randint(3, 90)) if status != "not-touched" else ""
        ae = rng.choice(AE_NAMES)
        sp_rows.append([aid, pid, status, est, primary, ";".join(linked), last_touch, ae])

# Verify status coverage
status_set = {r[2] for r in sp_rows}
for s in STATUSES:
    assert s in status_set, f"Status {s} missing from sales-play-instances"


# ---------------------------------------------------------------------------
# 8. HEALTH TREND (exactly 600 rows = 50 * 12)
# ---------------------------------------------------------------------------
trend_rows = []
for acct in ACCOUNTS:
    aid = acct[0]; tech = acct[9]; adopt = acct[10]
    current = overall_health(tech, adopt)
    # Build 12-month story
    if current == "healthy":
        # mostly healthy, maybe slight wobble
        seq = ["at-risk","healthy","healthy","at-risk","healthy","healthy","healthy","healthy","healthy","healthy","healthy","healthy"]
    elif current == "at-risk":
        # trending worse or steady at-risk
        if rng.random() < 0.5:
            seq = ["healthy","healthy","at-risk","at-risk","at-risk","at-risk","at-risk","at-risk","at-risk","at-risk","at-risk","at-risk"]
        else:
            seq = ["at-risk","at-risk","at-risk","healthy","at-risk","at-risk","at-risk","healthy","at-risk","at-risk","at-risk","at-risk"]
    else:
        # critical: declining trajectory
        seq = ["healthy","at-risk","at-risk","at-risk","critical","at-risk","critical","at-risk","critical","critical","critical","critical"]
    # seq indexed monthOffset -11..0
    for i in range(12):
        offset = -11 + i
        trend_rows.append([aid, offset, seq[i]])


# ---------------------------------------------------------------------------
# 9. FORECAST HISTORY (7 rows; scopeKey=all)
# ---------------------------------------------------------------------------
# CQ = Q4FY26. Compute Q4FY26 from opps with closeDate in CQ window (May-Jul 2026).
# Quarter windows (anchor TODAY=2026-05-12):
#   Q3FY26: Feb-Apr 2026 (closeDate in 2026-02-01..2026-04-30) — past
#   Q4FY26: May-Jul 2026 (2026-05-01..2026-07-31)              — CQ
#   Q1FY27: Aug-Oct 2026
#   Q2FY27: Nov 2026 - Jan 2027
#   Q3FY27: Feb-Apr 2027
quarter_windows = {
    "Q1FY26": (date(2025,8,1),  date(2025,10,31)),
    "Q2FY26": (date(2025,11,1), date(2026,1,31)),
    "Q3FY26": (date(2026,2,1),  date(2026,4,30)),
    "Q4FY26": (date(2026,5,1),  date(2026,7,31)),
    "Q1FY27": (date(2026,8,1),  date(2026,10,31)),
    "Q2FY27": (date(2026,11,1), date(2027,1,31)),
    "Q3FY27": (date(2027,2,1),  date(2027,4,30)),
}
SPARK_QUARTERS = ["Q1FY26","Q2FY26","Q3FY26","Q4FY26","Q1FY27","Q2FY27","Q3FY27"]

def quarter_of(d: date):
    for q,(s,e) in quarter_windows.items():
        if s <= d <= e:
            return q
    return None

# Aggregate opps into quarters by forecastCategory
qsums = defaultdict(lambda: defaultdict(int))
for opp in OPPORTUNITIES:
    base, scen = opp_fields(opp)
    _, _, _, _, amount, _, _, fc, cd, *_ = base
    cdate = date.fromisoformat(cd)
    q = quarter_of(cdate)
    if q is None:
        continue
    qsums[q][fc] += amount

# Plan per quarter (authored, plausible)
PLANS = {
    "Q1FY26": 80_000_000,
    "Q2FY26": 90_000_000,
    "Q3FY26": 95_000_000,
    "Q4FY26": 100_000_000,
    "Q1FY27": 105_000_000,
    "Q2FY27": 110_000_000,
    "Q3FY27": 115_000_000,
}

fh_rows = []
for q in SPARK_QUARTERS:
    pipeline_v = qsums[q].get("pipeline", 0)
    bestcase_v = qsums[q].get("best-case", 0)
    commit_v   = qsums[q].get("commit", 0)
    closed_v   = qsums[q].get("closed", 0)
    # For past quarters with little opp data, synthesize closed-bucket values
    if q in ("Q1FY26","Q2FY26"):
        closed_v = int(PLANS[q] * rng.uniform(0.78, 0.92))
        commit_v = 0; bestcase_v = 0; pipeline_v = 0
    elif q == "Q3FY26":
        # past quarter; bulk of value should be in closed
        closed_v = max(closed_v, int(PLANS[q] * 0.85))
        commit_v = 0; bestcase_v = 0; pipeline_v = 0
    # Total Forecast = (closed + commit + bestCase) + ~25-40% of pipeline
    total_in = closed_v + commit_v + bestcase_v
    judgment = int(pipeline_v * 0.30)
    total_forecast = total_in + judgment
    fh_rows.append([q, "all", PLANS[q], total_forecast, commit_v, bestcase_v, pipeline_v, closed_v])


# ---------------------------------------------------------------------------
# Derive Account final fields: cqPipeline, ebcsLastYear, overallHealth
# ---------------------------------------------------------------------------
cq_pipeline_by_acct = defaultdict(int)
for opp in OPPORTUNITIES:
    base, scen = opp_fields(opp)
    aid = base[1]; amount = base[4]; fc = base[7]; cd = base[8]
    cdate = date.fromisoformat(cd)
    q = quarter_of(cdate)
    if q == "Q4FY26" and fc != "closed":
        cq_pipeline_by_acct[aid] += amount


# ---------------------------------------------------------------------------
# WRITE CSV FILES
# ---------------------------------------------------------------------------
def write_csv(path, header, rows):
    """Write CSV with sentence-case transform on enum columns."""
    with open(os.path.join(OUTDIR, path), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        for r in rows:
            out = []
            for col, val in zip(header, r):
                if col in SCALAR_ENUM_COLS:
                    out.append(sc(val) if isinstance(val, str) else val)
                elif col in LIST_ENUM_COLS:
                    out.append(sc_list(val) if isinstance(val, str) else val)
                elif col in ALLOC_COLS:
                    out.append(sc_allocations(val) if isinstance(val, str) else val)
                else:
                    out.append(val)
            w.writerow(out)


# sales-plays.csv
write_csv("sales-plays.csv",
          ["id","name","familyId","targetProducts","description"],
          [list(r) for r in SALES_PLAYS])

# accounts.csv
acct_header = ["id","name","industry","segment","region","apexName",
               "lifetimeValue","last3YearsValue","cqPipeline","attainmentPct",
               "activePOVs","ebcsLastYear","overallHealth","technicalHealth",
               "adoptionHealth","lastActivityType","lastActivityDaysAgo",
               "riskIds","scenarios"]
acct_rows_out = []
for acct in ACCOUNTS:
    aid, name, industry, segment, region, apex, ltv, l3, att, tech, adopt, risks, lat, lad, povs, scen = acct
    cqp = cq_pipeline_by_acct.get(aid, 0)
    ebcs_y = ebc_count_by_account.get(aid, 0)
    overall = overall_health(tech, adopt)
    acct_rows_out.append([aid, name, industry, segment, region, apex,
                          ltv, l3, cqp, att, povs, ebcs_y, overall, tech, adopt,
                          lat, lad,
                          ";".join(risks), ";".join(scen)])
write_csv("accounts.csv", acct_header, acct_rows_out)

# opportunities.csv
opp_header = ["id","accountId","name","activeQuoteId","amount","type","stage",
              "forecastCategory","closeDate","daysInStage","daysInForecast",
              "productAllocations","riskIds","lastActivityType",
              "lastActivityDaysAgo","renewalOutcome","churnReason",
              "displacementCompetitor","scenarios"]
opp_rows_out = []
for opp in OPPORTUNITIES:
    base, scen = opp_fields(opp)
    (oid, aid, name, quote, amount, otype, stage, fc, cd, dis, dif,
     palloc, risks, latype, ladays, ro, cr, comp) = base
    risks_str = ";".join(risks) if isinstance(risks, list) else risks
    opp_rows_out.append([oid, aid, name, quote, amount, otype, stage, fc, cd,
                         dis, dif, palloc, risks_str, latype, ladays,
                         ro, cr, comp, ";".join(scen)])
write_csv("opportunities.csv", opp_header, opp_rows_out)

# contacts.csv
write_csv("contacts.csv",
          ["id","accountId","name","title","role","email","phone"],
          contacts_rows)

# ebcs.csv
write_csv("ebcs.csv",
          ["id","accountId","date","type","topic","attendees"],
          ebcs_rows)

# install-base.csv
write_csv("install-base.csv",
          ["accountId","productId","tcv","iacv","margin","rpo",
           "technicalHealth","adoptionHealth","renewalDate"],
          install_rows)

# sales-play-instances.csv
write_csv("sales-play-instances.csv",
          ["accountId","playId","status","estimatedValue","primaryOppId",
           "linkedOppIds","lastTouchDate","assignedAEName"],
          sp_rows)

# health-trend.csv
write_csv("health-trend.csv",
          ["accountId","monthOffset","value"],
          trend_rows)

# forecast-history.csv
write_csv("forecast-history.csv",
          ["quarter","scopeKey","plan","totalForecast","commit","bestCase","pipeline","closed"],
          fh_rows)


# ---------------------------------------------------------------------------
# SUMMARY (printed)
# ---------------------------------------------------------------------------
print(f"accounts.csv               {len(ACCOUNTS)}")
print(f"opportunities.csv          {len(OPPORTUNITIES)}")
print(f"sales-plays.csv            {len(SALES_PLAYS)}")
print(f"sales-play-instances.csv   {len(sp_rows)}")
print(f"contacts.csv               {len(contacts_rows)}")
print(f"ebcs.csv                   {len(ebcs_rows)}")
print(f"install-base.csv           {len(install_rows)}")
print(f"health-trend.csv           {len(trend_rows)}")
print(f"forecast-history.csv       {len(fh_rows)}")
