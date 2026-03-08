import { fontFamily, text } from '@/src/theme/tokens';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * Text component using design system tokens (Inter / Noto Sans Devanagari).
 * Use variant for size scale, weight for font family.
 *
 * @example
 * <AppText variant="lg" weight="semiBold">Hello</AppText>
 * <AppText variant="base" style={{ color: '#333' }}>Body copy</AppText>
 */
export function AppText({
  variant = 'base',
  weight = 'regular',
  style,
  children,
  ...rest
}) {
  const fontKey = weight === 'semiBold' ? 'semiBold' : 'regular';
  const textStyle = text[variant] || text.base;

  return (
    <Text
      style={[
        {
          fontFamily: fontFamily[fontKey],
          ...textStyle,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

export default AppText;
