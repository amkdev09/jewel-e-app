import { Platform } from 'react-native';
import { Colors } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';

export { Colors } from '@/src/constants/colors';
export { SPACING } from '@/src/constants/spacing';

export const theme = {
  colors: Colors.light,
  spacing: SPACING,
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 9999,
  },
  fonts: Platform.select({
    ios: {
      sans: 'system-ui',
      serif: 'Georgia',
      mono: 'Menlo',
    },
    android: {
      sans: 'Roboto',
      serif: 'serif',
      mono: 'monospace',
    },
    default: {
      sans: 'System',
      serif: 'serif',
      mono: 'monospace',
    },
  }),
};

export function getTheme(isDark) {
  return {
    ...theme,
    colors: isDark ? Colors.dark : Colors.light,
  };
}

export default theme;
