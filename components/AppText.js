/**
 * App text component – single place for font family and sizes.
 * Use across the app for consistent typography.
 * Import: import { AppText } from '@/components/AppText';
 *
 * @example
 * <AppText variant="lg" weight="semiBold">Title</AppText>
 * <AppText variant="base" weight="regular">Body</AppText>
 */
import { fontFamily, text } from '@/constants/theme';
import React from 'react';
import { Text } from 'react-native';

const VARIANTS = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'];
const WEIGHTS = ['regular', 'semiBold'];

export function AppText({
  variant = 'base',
  weight = 'regular',
  style,
  children,
  ...rest
}) {
  const fontKey = weight === 'semiBold' ? 'semiBold' : 'regular';
  const textStyle = text[variant] ?? text.base;

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
