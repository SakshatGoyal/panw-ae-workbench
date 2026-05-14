// Sales Plays — generated from data-models/mock-data-csv/sales-plays.csv
// Do not hand-edit — regenerate via: node data-models/gen-mock-data.mjs

import type { SalesPlay } from '../types';

export const SALES_PLAYS: SalesPlay[] = [
  {
    id: "play-fw-refresh",
    name: "FW Refresh and VM-Series Migration",
    familyId: "fw-cdss",
    description: "Refresh end-of-life PA-Series chassis and migrate workloads to VM-Series in public cloud.",
  },
  {
    id: "play-fw-cdss-attach",
    name: "CDSS Subscription Attach",
    familyId: "fw-cdss",
    description: "Attach Threat Prevention WildFire URL Filtering and DNS Security to active PA-Series subscriptions.",
  },
  {
    id: "play-fw-data-lake",
    name: "Strata Logging and Data Lake",
    familyId: "fw-cdss",
    description: "Replace third-party log forwarding with Strata Logging Service and Cortex Data Lake for unified visibility.",
  },
  {
    id: "play-fw-trade-up",
    name: "PA-Series Hardware Trade-Up",
    familyId: "fw-cdss",
    description: "Trade up undersized appliances at branches to current PA-460 or PA-1410 chassis.",
  },
  {
    id: "play-sase-prisma-access",
    name: "Prisma Access Land",
    familyId: "sase",
    description: "First-time Prisma Access landing replacing legacy VPN concentrators with cloud-delivered SASE.",
  },
  {
    id: "play-sase-sd-wan-modernize",
    name: "SD-WAN Modernization",
    familyId: "sase",
    description: "Replace MPLS and legacy SD-WAN with Prisma SD-WAN for branch-to-cloud paths.",
  },
  {
    id: "play-sase-ztna-replace",
    name: "ZTNA Incumbent Displacement",
    familyId: "sase",
    description: "Displace incumbent ZTNA vendors with Prisma Access ZTNA 2.0 for hybrid workforce.",
  },
  {
    id: "play-sase-mobile-users",
    name: "Remote Workforce SASE",
    familyId: "sase",
    description: "Cloud-delivered secure access for remote and contractor populations.",
  },
  {
    id: "play-sase-branch-consolidate",
    name: "Branch SASE Consolidation",
    familyId: "sase",
    description: "Collapse branch firewall MPLS and proxy stacks onto a single SASE fabric.",
  },
  {
    id: "play-cc-xdr-land",
    name: "Cortex XDR Land",
    familyId: "cortex-cloud",
    description: "First-time XDR landing replacing legacy endpoint or EDR with Cortex XDR Pro.",
  },
  {
    id: "play-cc-xsoar-soar",
    name: "XSOAR SOAR Modernization",
    familyId: "cortex-cloud",
    description: "Replace homegrown or legacy SOAR with Cortex XSOAR playbooks and managed integrations.",
  },
  {
    id: "play-cc-land-expand",
    name: "Cortex Cloud Land and Expand",
    familyId: "cortex-cloud",
    description: "Land Cortex Cloud across XDR XSOAR and Xpanse with cross-sell expansion path.",
  },
  {
    id: "play-cc-xsiam-pitch",
    name: "XSIAM Next-Gen SIEM",
    familyId: "cortex-cloud",
    description: "Pitch XSIAM as a next-generation SIEM replacing Splunk or QRadar with AI-driven detection.",
  },
  {
    id: "play-cc-xpanse-asm",
    name: "Xpanse Attack Surface Management",
    familyId: "cortex-cloud",
    description: "Continuous external attack surface monitoring and remediation via Xpanse Expander.",
  },
  {
    id: "play-cc-qradar-migrate",
    name: "QRadar to XSIAM Migration",
    familyId: "cortex-cloud",
    description: "Decommission IBM QRadar and migrate use cases to XSIAM with assisted detection conversion.",
  },
  {
    id: "play-u42-reactive-retainer",
    name: "Unit 42 IR Retainer",
    familyId: "unit-42",
    description: "Pre-negotiated incident response retainer with Unit 42 for reactive engagements.",
  },
  {
    id: "play-u42-proactive-assess",
    name: "Unit 42 Proactive Assessment",
    familyId: "unit-42",
    description: "Proactive readiness assessment tabletop and breach simulation engagement by Unit 42.",
  },
];
