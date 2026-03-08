/**
 * Spacing scale – aligned with web app (--spacing: .25rem).
 * Re-exported from design tokens for a single source of truth.
 */
import { spacing as tokensSpacing } from '@/src/theme/tokens';

export const SPACING = {
  ...tokensSpacing,
  // Keep legacy keys if any code expects exact same object shape
  xxs: tokensSpacing.xxs,
  xs: tokensSpacing.xs,
  sm: tokensSpacing.sm,
  md: tokensSpacing.md,
  base: tokensSpacing.base,
  lg: tokensSpacing.lg,
  xl: tokensSpacing.xl,
  xxl: tokensSpacing.xxl,
  xxxl: tokensSpacing.xxxl,
};

export default SPACING;
