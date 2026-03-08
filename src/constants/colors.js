/**
 * App color palette – aligned with web design system where applicable.
 * Use via theme or directly for one-off styling.
 */
const tintLight = '#B8860B'; // dark goldenrod – premium feel
const tintDark = '#D4AF37'; // gold

/** Web design system palette (--primary-color-a etc.) */
export const DesignColors = {
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

export default Colors;
