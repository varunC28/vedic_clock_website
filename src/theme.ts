/**
 * Shared palette + typography tokens — ported from React Native / Flutter
 * 
 * Removed 'glass' stylesheet to ensure purely web-based styling via Tailwind.
 */

export const colors = {
  bgDeep: '#0D1B2A',
  bgDeeper: '#060D18',
  bgLift: '#16283C',
  bgLiftHi: '#1E324A',
  ink: '#E6E4D8',
  inkMuted: '#8A9BA8',
  accent: '#D4691E',
  highlight: '#E8B94B',
  highlightSoft: '#FFE3A8',
  shubha: '#4A9D6F',
  ashubha: '#C04848',
  pinstripe: 'rgba(232, 185, 75, 0.4)',
  glassSurface: 'rgba(22, 40, 60, 0.4)',
  glassSurfaceHi: 'rgba(30, 50, 74, 0.6)',
  glassBorder: 'rgba(232, 185, 75, 0.15)',
  glassBorderHi: 'rgba(232, 185, 75, 0.3)',
  giltLight: '#D9B065',
  giltDeep: '#8A6A2E',
  bindu: '#FFE3A8',
} as const;

export const hindiMonths = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर',
];

export function gregorianHi(d: Date): string {
  return `${d.getDate()} ${hindiMonths[d.getMonth()]} ${d.getFullYear()}`;
}
