import { Colors } from '@/src/constants/colors';
import * as tokens from '@/src/theme/tokens';

export { Colors } from '@/src/constants/colors';
export { SPACING } from '@/src/constants/spacing';
export {
  spacing,
  fontFamily,
  fontWeight,
  text,
  tracking,
  radius,
  container,
  easing,
  transition,
} from '@/src/theme/tokens';
export { default as themeTokens } from '@/src/theme/tokens';

/** Theme object – design tokens + app colors. Use for consistent styling with web app. */
export const theme = {
  colors: {
    ...Colors.light,
    /** Web design system palette */
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    black: tokens.colors.black,
    white: tokens.colors.white,
    pink: tokens.colors.pink,
  },
  spacing: tokens.spacing,
  borderRadius: tokens.radius,
  fontFamily: tokens.fontFamily,
  fontWeight: tokens.fontWeight,
  text: tokens.text,
  tracking: tokens.tracking,
  container: tokens.container,
  easing: tokens.easing,
  transition: tokens.transition,
};

export function getTheme(isDark) {
  return {
    ...theme,
    colors: {
      ...(isDark ? Colors.dark : Colors.light),
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      black: tokens.colors.black,
      white: tokens.colors.white,
      pink: tokens.colors.pink,
    },
  };
}

export default theme;
