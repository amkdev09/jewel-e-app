/**
 * Design tokens – re-exported from single theme (constants/theme.js).
 * Prefer: import { spacing, text, fontFamily } from '@/constants/theme';
 */
import {
  spacing,
  SPACING,
  fontFamily,
  fontWeight,
  text,
  tracking,
  radius,
  container,
  easing,
  transition,
  designColors,
  Colors,
} from '@/constants/theme';

export {
  spacing,
  SPACING,
  fontFamily,
  fontWeight,
  text,
  tracking,
  radius,
  container,
  easing,
  transition,
  Colors,
};
export { designColors as colors };

export default {
  spacing,
  fontFamily,
  fontWeight,
  text,
  tracking,
  radius,
  container,
  easing,
  transition,
  colors: designColors,
};
