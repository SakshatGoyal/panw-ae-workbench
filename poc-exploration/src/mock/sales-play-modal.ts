/**
 * Sales Play Modal — fixture
 *
 * One (account × play) detail dialog's worth of data: the play
 * identifiers, the linked contacts, the candidate opportunities, and a
 * single primary marker. Mirrors the spec in
 * `data-models/sales-play-modal-reference.md`.
 */

// ── 7-status enum (mirrors sales-play-reference.md) ───────────────────

export const SalesPlayStatuses = [
  'not touched',
  'pitched',
  'deferred',
  'declined',
  'pursuing',
  'closed won',
  'closed lost',
] as const;

export type SalesPlayStatus = (typeof SalesPlayStatuses)[number];

// ── Contact ───────────────────────────────────────────────────────────

export interface PlayContact {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export const CONTACTS: PlayContact[] = [
  {
    id: 'c-tom',
    name: 'Tom Sturridge',
    title: 'VP, Security Engineering',
    phone: '(415) 555-0102',
    email: 'tom.sturridge@example.com',
  },
  {
    id: 'c-alice',
    name: 'Alice Johnson',
    title: 'Cybersecurity Analyst',
    phone: '(202) 555-0173',
    email: 'alice.johnson@example.com',
  },
  {
    id: 'c-bob',
    name: 'Bob Smith',
    title: 'Compliance Officer',
    phone: '(303) 555-0198',
    email: 'bob.smith@example.com',
  },
  {
    id: 'c-cath',
    name: 'Catherine Lee',
    title: 'Security Architect',
    phone: '(415) 555-0124',
    email: 'catherine.lee@example.com',
  },
  {
    id: 'c-dave',
    name: 'David Brown',
    title: 'Incident Response Specialist',
    phone: '(512) 555-0167',
    email: 'david.brown@example.com',
  },
  {
    id: 'c-eva',
    name: 'Eva White',
    title: 'Risk Management Consultant',
    phone: '(718) 555-0145',
    email: 'eva.white@example.com',
  },
];

// ── Opportunity ───────────────────────────────────────────────────────

export interface PlayOpportunity {
  id: string;
  name: string;        // full display name (Account – Family – Play)
  stage: string;       // SFDC stage string
  amount: number;      // USD
  closeDate: string;   // ISO yyyy-mm-dd
}

export const OPPORTUNITIES: PlayOpportunity[] = [
  {
    id: 'op-aurora',
    name: 'Aurora Enterprises – Firewall – Compliance Hardening',
    stage: '1 - Qualify',
    amount: 5_678_901,
    closeDate: '2027-07-30',
  },
  {
    id: 'op-beacon-corp',
    name: 'Beacon Corp – Unit 42 – SOC Modernization',
    stage: '1 - Qualify',
    amount: 4_567_890,
    closeDate: '2027-06-20',
  },
  {
    id: 'op-beacon-sol',
    name: 'Beacon Solutions – Cortex & Cloud – Secure Access Revamp',
    stage: '1 - Qualify',
    amount: 3_456_789,
    closeDate: '2027-08-10',
  },
  {
    id: 'op-blue-horizon',
    name: 'Blue Horizon – Firewall – Edge Protection Program',
    stage: '1 - Qualify',
    amount: 2_345_678,
    closeDate: '2027-09-25',
  },
  {
    id: 'op-bluesun',
    name: 'BlueSun Corp – Firewall – Edge Protection Program',
    stage: '1 - Qualify',
    amount: 1_567_890,
    closeDate: '2027-05-15',
  },
];

// ── Play header + initial state ───────────────────────────────────────

export interface PlayHeader {
  family: string;
  name: string;
  accountName: string;
}

export const PLAY_HEADER: PlayHeader = {
  family: 'Unit 42',
  name: 'SOC Modernization Takeout',
  accountName: 'Beacon Corp',
};

/** Initial edit state — what the modal opens with. */
export interface SalesPlayEdits {
  status: SalesPlayStatus;
  contactIds: string[];
  opportunityIds: string[];
  primaryOpportunityId: string | null;
  note: string;
  methodology: string;
}

export const INITIAL_EDITS: SalesPlayEdits = {
  status: 'pitched',
  contactIds: ['c-tom'],
  opportunityIds: ['op-beacon-corp', 'op-beacon-sol', 'op-blue-horizon'],
  primaryOpportunityId: 'op-beacon-sol',
  note: '',
  methodology: '',
};

// ── Helpers ───────────────────────────────────────────────────────────

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCloseDate(iso: string): string {
  // Aug 10 2027 — matches the Figma column format.
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
