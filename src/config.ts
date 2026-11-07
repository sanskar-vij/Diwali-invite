/**
 * ✏️ EDIT ALL INVITATION DETAILS HERE.
 * Please verify every date, time, venue and name before publishing.
 */
export const INVITE = {
  familyName: 'The Sharma Family',
  studio: {
    name: 'Patrika Studio',
    tagline: 'Your Creative Partner for Bespoke Digital Invitations',
    url: 'https://patrikastudio.com/',
    displayUrl: 'patrikastudio.com',
  },
  /** Optional: host WhatsApp number in international format without "+" (e.g. "919876543210").
   *  Leave empty to let the guest choose a contact when sharing their RSVP. */
  rsvpWhatsApp: '',
  events: {
    diwali: {
      date: '08 November  2026',
      day: 'sunday ',
      
    },
    govardhan: {
      date: '9 November 2026',
      day: 'Monday',
      
    },
    bhaidooj: {
      date: '11 November 2026',
      day: 'Wednesday',
      
  },
};

export type EventInfo = (typeof INVITE.events)['diwali'];

export const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'diwali', label: 'Diwali' },
  { id: 'govardhan', label: 'Govardhan Puja' },
  { id: 'bhaidooj', label: 'Bhai Dooj' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'studio', label: 'Patrika Studio' },
] as const;

export type PageId = (typeof PAGES)[number]['id'];

/** Fireworks intensity per page (0 – 1). Devotional page kept calm. */
export const FIREWORK_INTENSITY: Record<PageId, number> = {
  home: 1,
  diwali: 0.75,
  bhaidooj: 0.3,
  govardhan: 0.08,
  rsvp: 0.9,
  studio: 0.35,
};
