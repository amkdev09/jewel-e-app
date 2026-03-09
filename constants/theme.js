/**
 * Single source of truth for app theme and design tokens.
 * Use this file for colors, spacing, typography (font family & sizes), and radii.
 * Import: import { Colors, SPACING, fontFamily, text } from '@/constants/theme';
 */

import { Platform } from 'react-native';

// ─── Colors (light/dark mode) ─────────────────────────────────────────────
const tintLight = '#B8860B';
const tintDark = '#D4AF37';

export const Colors = {
  light: {
    text: '#1a1a1a',
    textSecondary: '#5c5c5c',
    background: '#ffffff',
    backgroundSecondary: '#f8f8f8',
    tint: tintLight,
    icon: '#5c5c5c',
    tabIconDefault: '#9ca3af',
    tabIconSelected: tintLight,
    border: '#e5e7eb',
    primary: '#B8860B',
    primaryDark: '#8B6914',
    success: '#059669',
    error: '#dc2626',
    warning: '#d97706',
  },
  dark: {
    text: '#f5f5f5',
    textSecondary: '#a3a3a3',
    background: '#0f0f0f',
    backgroundSecondary: '#1a1a1a',
    tint: tintDark,
    icon: '#a3a3a3',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintDark,
    border: '#2d2d2d',
    primary: '#D4AF37',
    primaryDark: '#B8860B',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
  },
};

/** Design system palette (primary, secondary, etc.) */
export const designColors = {
  primary: {
    a: 'rgb(79, 50, 103)',
    b: 'rgb(136, 99, 251)',
    c: 'rgb(135, 118, 157)',
    d: 'rgb(246, 243, 249)',
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

// ─── Spacing (base 4pt) ───────────────────────────────────────────────────
const BASE_SPACING = 4;

export const spacing = {
  unit: BASE_SPACING,
  xxs: BASE_SPACING * 0.5,
  xs: BASE_SPACING,
  sm: BASE_SPACING * 2,
  md: BASE_SPACING * 3,
  base: BASE_SPACING * 4,
  lg: BASE_SPACING * 5,
  xl: BASE_SPACING * 6,
  xxl: BASE_SPACING * 8,
  xxxl: BASE_SPACING * 10,
};

/** Alias for backward compatibility */
export const SPACING = spacing;

// ─── Typography (font family & text scale) ─────────────────────────────────
export const fontFamily = {
  regular: 'Inter_400Regular',
  semiBold: 'Inter_600SemiBold',
  body: 'Inter_400Regular',
  bodySemiBold: 'Inter_600SemiBold',
};

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/** Type scale – use with AppText variant (xs, sm, base, lg, xl, 2xl, 3xl, 4xl) */
export const text = {
  xs: { fontSize: 10, lineHeight: Math.round(10 * 1.33) },
  sm: { fontSize: 12, lineHeight: Math.round(12 * 1.43) },
  base: { fontSize: 14, lineHeight: Math.round(14 * 1.5) },
  lg: { fontSize: 16, lineHeight: Math.round(16 * 1.56) },
  xl: { fontSize: 20, lineHeight: 28 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 36 },
  '4xl': { fontSize: 36, lineHeight: 40 },
};

// ─── Radius ───────────────────────────────────────────────────────────────
export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
};

// ─── Optional (container, tracking, easing) ────────────────────────────────
export const container = {
  '3xs': 256,
  xs: 320,
  md: 448,
  '2xl': 672,
  '4xl': 896,
};

export const tracking = {
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
};

export const easing = {
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
};

export const transition = {
  duration: 150,
  timing: [0.4, 0, 0.2, 1],
};

/** Platform font names (for non–AppText usage) */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
