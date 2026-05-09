// Contact records — small starter set. Expand as Contact-picker mockups need.

import type { Contact } from '../types';

export const CONTACTS: Contact[] = [
  { id: 'con-1', accountId: 'acc-acme',          name: 'Alice Johnson',  title: 'Cybersecurity Analyst',       phone: '(202) 555-0173', email: 'alice.johnson@acme.com' },
  { id: 'con-2', accountId: 'acc-acme',          name: 'Bob Smith',      title: 'Compliance Officer',          phone: '(303) 555-0198', email: 'bob.smith@acme.com' },
  { id: 'con-3', accountId: 'acc-prime-dynamics',name: 'Catherine Lee',  title: 'Security Architect',          phone: '(415) 555-0124', email: 'catherine.lee@primedynamics.com' },
  { id: 'con-4', accountId: 'acc-prime-dynamics',name: 'David Brown',    title: 'Incident Response Specialist',phone: '(512) 555-0167', email: 'david.brown@primedynamics.com' },
  { id: 'con-5', accountId: 'acc-cyberdyne',     name: 'Eva White',      title: 'Risk Management Consultant',  phone: '(718) 555-0145', email: 'eva.white@cyberdyne.com' },
  { id: 'con-6', accountId: 'acc-tyrell',        name: 'Tom Sturridge',  title: 'CISO',                        phone: '(206) 555-0119', email: 'tom.sturridge@tyrell.com' },
  { id: 'con-7', accountId: 'acc-hooli',         name: 'Priya Raman',    title: 'VP Security Operations',      phone: '(650) 555-0188', email: 'priya.raman@hooli.com' },
  { id: 'con-8', accountId: 'acc-frontier',      name: 'Marcus Chen',    title: 'Director of Infrastructure',  phone: '(617) 555-0142', email: 'marcus.chen@frontierlabs.com' },
];
