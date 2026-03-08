/**
 * Design tokens – aligned with web app CSS variables.
 * Use these across the mobile app for consistency with the web design system.
 */

// Base unit: 0.25rem = 4pt
const BASE_SPACING = 4;

export const spacing = {
  /** 0.25rem = 4 */
  unit: BASE_SPACING,
  xxs: BASE_SPACING * 0.5,   // 2
  xs: BASE_SPACING,          // 4
  sm: BASE_SPACING * 2,      // 8
  md: BASE_SPACING * 3,      // 12
  base: BASE_SPACING * 4,    // 16
  lg: BASE_SPACING * 5,      // 20
  xl: BASE_SPACING * 6,      // 24
  xxl: BASE_SPACING * 8,     // 32
  xxxl: BASE_SPACING * 10,   // 40
};

/** Container max widths (in dp) – 1rem = 16 */
export const container = {
  '3xs': 16 * 16,   // 256
  xs: 20 * 16,      // 320
  md: 28 * 16,      // 448
  '2xl': 42 * 16,   // 672
  '4xl': 56 * 16,   // 896
};

/** Font families – loaded via expo-font; names match native font postscript names */
export const fontFamily = {
  regular: 'Inter_400Regular',
  semiBold: 'Inter_600SemiBold',
  /** Devanagari fallback for Hindi etc. */
  devanagariRegular: 'NotoSansDevanagari_400Regular',
  devanagariSemiBold: 'NotoSansDevanagari_600SemiBold',
  /** Combined for Text components: Inter first, then Noto Sans Devanagari */
  body: 'Inter_400Regular',
  bodySemiBold: 'Inter_600SemiBold',
};

/** Font weights */
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/** Type scale – sizes and line heights (base 16px → rem * 16) */
export const text = {
  xs: { fontSize: 10, lineHeight: Math.round(10 * 1.33) },        // .625rem
  sm: { fontSize: 12, lineHeight: Math.round(12 * 1.43) },      // .785rem
  base: { fontSize: 14, lineHeight: Math.round(14 * 1.5) },     // .875rem
  lg: { fontSize: 16, lineHeight: Math.round(16 * 1.56) },     // 1rem
  xl: { fontSize: 20, lineHeight: 28 },                          // 1.25rem
  '2xl': { fontSize: 24, lineHeight: 32 },                       // 1.5rem
  '3xl': { fontSize: 30, lineHeight: 36 },                      // 1.875rem
  '4xl': { fontSize: 36, lineHeight: 40 },                      // 2.25rem
};

/** Letter spacing */
export const tracking = {
  wide: 0.4,    // .025em * 16
  wider: 0.8,   // .05em * 16
  widest: 1.6,  // .1em * 16
};

/** Border radius */
export const radius = {
  sm: 4,    // .25rem
  md: 6,    // .375rem
  lg: 8,    // .5rem
  xl: 12,   // .75rem
  '2xl': 16,  // 1rem
  '3xl': 24,  // 1.5rem
  '4xl': 32,  // 2rem
};

/** Primary & secondary palette from web */
export const colors = {
  primary: {
    a: 'rgb(79, 50, 103)',   // #4f3267
    b: 'rgb(136, 99, 251)',  // #8863fb
    c: 'rgb(135, 118, 157)', // #87769d
    d: 'rgb(246, 243, 249)', // #f6f3f9
  },
  secondary: {
    d: 'rgb(192, 172, 157)',
    e: 'rgb(224, 213, 200)',
    f: 'rgb(240, 230, 218)',
    g: 'rgb(248, 242, 234)',
    h: 'rgb(252, 248, 242)',
    i: 'rgb(255, 255, 255)',
  },
  black: '#000',
  white: '#fff',
  pink: '#DE57E5',
};

/** Easing / animation (for reanimated or Animated) */
export const easing = {
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
};

export const transition = {
  duration: 150,
  timing: [0.4, 0, 0.2, 1],
};

export default {
  spacing,
  container,
  fontFamily,
  fontWeight,
  text,
  tracking,
  radius,
  colors,
  easing,
  transition,
};
