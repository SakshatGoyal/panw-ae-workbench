// Sales Play records — starter set covering the families confirmed in Figma.
// Names match the Sales Play matrix and the rail accordion screenshots.

import type { SalesPlay } from '../types';

export const SALES_PLAYS: SalesPlay[] = [
  // FW & CDSS family
  { id: 'sp-hardware-refresh',      name: 'Hardware Refresh',      familyId: 'fw-cdss' },
  { id: 'sp-fortinet-displacement', name: 'Fortinet Displacement', familyId: 'fw-cdss' },
  { id: 'sp-swfw-acceleration',     name: 'SWFW Acceleration',     familyId: 'fw-cdss' },

  // SASE family
  { id: 'sp-gp-to-prisma-access',   name: 'GP to Prisma Access',         familyId: 'sase' },
  { id: 'sp-pab-existing-pa',       name: 'PAB Existing PA Upgrade',     familyId: 'sase' },
  { id: 'sp-pab-standalone',        name: 'PAB Standalone',              familyId: 'sase' },
  { id: 'sp-upsell-sd-wan',         name: 'Upsell SD-WAN Customers',     familyId: 'sase' },
  { id: 'sp-pab-for-partners',      name: 'PAB for Partners',            familyId: 'sase' },

  // Cortex Cloud family
  { id: 'sp-xsiam-splunk-takeout',  name: 'XSIAM Splunk Takeout',        familyId: 'cortex-cloud' },
  { id: 'sp-dr-acceleration',       name: 'DR Acceleration',             familyId: 'cortex-cloud' },
  { id: 'sp-cortex-cloud-land',     name: 'Cortex Cloud Land & Expand',  familyId: 'cortex-cloud' },
  { id: 'sp-radar-to-cortex',       name: 'Radar to Cortex Upgrade',     familyId: 'cortex-cloud' },
  { id: 'sp-cortex-edr-siem',       name: 'Cortex (EDR, SIEM)',          familyId: 'cortex-cloud' },
  { id: 'sp-xdr-acceleration',      name: 'XDR Acceleration',            familyId: 'cortex-cloud' },

  // Unit 42 family
  { id: 'sp-unit-42',               name: 'Unit 42',                     familyId: 'unit-42' },
  { id: 'sp-unit-42-no-cost',       name: 'Unit 42 No Cost Retainer',    familyId: 'unit-42' },
];
