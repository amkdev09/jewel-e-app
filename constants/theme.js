import { Platform } from 'react-native';

export const appColors = {
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

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  "2xl": 24,
  "3xl": 28,
  "4xl": 36,
};

export const iconSizes = {
  xs: 12,
  sm: 16,
  base: 18,
  lg: 20,
  xl: 22,
  '2xl': 26,
  '3xl': 30,
  '4xl': 34,
};

export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
};

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
