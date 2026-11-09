import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p });

export const CalendarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base(p)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M7 14h2M11 14h2M15 14h2M7 17h2M11 17h2" /></svg>
);
export const ClockIcon = (p: P) => (<svg viewBox="0 0 24 24" {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const PinIcon = (p: P) => (<svg viewBox="0 0 24 24" {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const MenuIcon = (p: P) => (<svg viewBox="0 0 24 24" {...base(p)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
export const CloseIcon = (p: P) => (<svg viewBox="0 0 24 24" {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const BackIcon = (p: P) => (<svg viewBox="0 0 24 24" {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const MusicIcon = ({ on, ...p }: P & { on?: boolean }) => (
  <svg viewBox="0 0 24 24" {...base(p)}><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" />{!on && <path d="M3 3l18 18" />}</svg>
);
export const MotionIcon = ({ reduced, ...p }: P & { reduced?: boolean }) => (
  <svg viewBox="0 0 24 24" {...base(p)}><path d="M4 12c2-4 4-4 6 0s4 4 6 0 3-3 4-2" />{reduced && <path d="M3 3l18 18" />}</svg>
);

/* ---- Filled gold card icons ---- */
const fill = (p: P) => ({ width: 40, height: 40, fill: 'currentColor', 'aria-hidden': true, ...p });

export const DiyaGlyph = (p: P) => (
  <svg viewBox="0 0 48 40" {...fill(p)}>
    <path d="M24 2c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
    <path d="M3 20c7 3 35 3 42 0-1 9-9 16-21 16S4 29 3 20z" />
    <path d="M14 38h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const CoupleGlyph = (p: P) => (
  <svg viewBox="0 0 48 40" {...fill(p)}>
    <circle cx="15" cy="9" r="5.5" /><path d="M15 6c-4 0-7 3-7 8 0 3 1 6 0 9l3-1c0-2 1-5 4-5s4 3 4 5l3 1c-1-3 0-6 0-9 0-5-3-8-7-8z" opacity=".55" />
    <path d="M5 38c0-9 4-15 10-15s10 6 10 15z" />
    <circle cx="33" cy="10" r="5.5" /><path d="M23 38c0-9 4-15 10-15s10 6 10 15z" />
  </svg>
);
export const CowGlyph = (p: P) => (
  <svg viewBox="0 0 56 40" {...fill(p)}>
    <path d="M8 8l-4-5 6 3zM16 8l4-5-6 3z" />
    <path d="M5 9c2-2 11-2 13 0l2 4h18c6 0 10 3 11 8l2 4-2 1-1-3v12h-4l-1-8c-3 1-11 1-16 0l-1 8h-4l-1-10c-2-1-4-3-4-6l-3-1c-3 0-6-2-7-4l1-3c1-1 0-1-3-1z" />
    <path d="M52 22c2 2 2 6 0 8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);
export const InviteGlyph = (p: P) => (
  <svg viewBox="0 0 40 40" {...fill(p)}>
    <path fillRule="evenodd" d="M6 8h28a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3zm-0 8v19h28V16z" />
    <rect x="10" y="3" width="4" height="9" rx="2" /><rect x="26" y="3" width="4" height="9" rx="2" />
    <path d="M20 19l1.8 3.8 4.2.5-3.1 2.9.8 4.1-3.7-2-3.7 2 .8-4.1-3.1-2.9 4.2-.5z" />
  </svg>
);
export const WishesGlyph = (p: P) => (
  <svg viewBox="0 0 40 40" {...fill(p)}>
    <path d="M4 10a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10z" fill="none" stroke="currentColor" strokeWidth="2.4" />
    <path d="M4 11l16 11 16-11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 20l1.2 2.8 3 .4-2.2 2.1.5 3-2.5-1.4-2.5 1.4.5-3-2.2-2.1 3-.4z" />
  </svg>
);
export const GuestsGlyph = (p: P) => (
  <svg viewBox="0 0 48 32" {...fill(p)}>
    <circle cx="15" cy="8" r="6" /><path d="M3 30c0-8 5-13 12-13s12 5 12 13z" />
    <circle cx="33" cy="8" r="6" /><path d="M21 30c0-8 5-13 12-13s12 5 12 13z" />
  </svg>
);
export const PaletteGlyph = (p: P) => (
  <svg viewBox="0 0 40 40" {...fill(p)}>
    <path fillRule="evenodd" d="M20 3C10 3 3 10 3 19c0 9 7 16 15 16 3 0 4-2 3-4-1-3 1-5 4-5h4c5 0 8-3 8-8C37 9 29 3 20 3zM11 20a3 3 0 1 0 0-.01zM15 12a3 3 0 1 0 0-.01zM24 10a3 3 0 1 0 0-.01zM30 17a3 3 0 1 0 0-.01z" />
  </svg>
);
export const ImageGlyph = (p: P) => (
  <svg viewBox="0 0 40 40" {...fill(p)}>
    <path fillRule="evenodd" d="M5 6h30a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm2 4v18l9-9 6 6 4-4 7 7V10z" />
    <circle cx="27" cy="15" r="3" />
  </svg>
);
export const GiftGlyph = (p: P) => (
  <svg viewBox="0 0 40 40" {...fill(p)}>
    <path d="M5 14h30v7H5zM7 23h12v14H7zM21 23h12v14H21z" />
    <path d="M20 14c-3-6-11-9-11-3 0 3 6 3 11 3zm0 0c3-6 11-9 11-3 0 3-6 3-11 3z" />
  </svg>
);
export const LotusLogo = (p: P) => (
  <svg viewBox="0 0 120 80" fill="none" aria-hidden="true" {...p}>
    <defs>
      <linearGradient id="lotusLogo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff1c1" /><stop offset=".5" stopColor="#e9bd5b" /><stop offset="1" stopColor="#a8761f" />
      </linearGradient>
    </defs>
    <g stroke="url(#lotusLogo)" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M60 6c10 12 12 28 0 46C48 34 50 18 60 6z" fill="url(#lotusLogo)" fillOpacity=".25" />
      <path d="M60 52C58 32 70 18 88 14c2 18-8 34-28 38zM60 52C62 32 50 18 32 14c-2 18 8 34 28 38z" />
      <path d="M60 54c8-14 26-22 46-20-6 14-24 22-46 20zM60 54c-8-14-26-22-46-20 6 14 24 22 46 20z" />
      <path d="M18 62c20 8 64 8 84 0M30 70c14 5 46 5 60 0" />
    </g>
  </svg>
);
export const OmGlyph = (p: P) => (
  <span aria-label="Om" role="img" className={(p as { className?: string }).className}>ॐ</span>
);
