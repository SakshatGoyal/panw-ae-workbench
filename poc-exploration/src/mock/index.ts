// Public API for the mock data layer. Stories should import from here
// (`@/mock` or relative `../mock`), not from internal files.

export * from './types';
export * from './taxonomies';
export * from './derivations';
export * from './helpers';

export { ACCOUNTS } from './data/accounts';
export { OPPORTUNITIES } from './data/opportunities';
export { CONTACTS } from './data/contacts';
export { SALES_PLAYS } from './data/sales-plays';
export { SALES_PLAY_INSTANCES } from './data/sales-play-instances';
