/**
 * App text component – single place for font family and sizes.
 * Use across the app for consistent typography.
 * Import: import { AppText } from '@/components/AppText';
 *
 * @example
 * <AppText variant="lg" weight="semiBold">Title</AppText>
 * <AppText variant="base" weight="regular">Body</AppText>
 */
import { theme } from '@/constants/index';
import React from 'react';
import { Text } from 'react-native';

export function AppText({
  variant = 'base',
  weight = 'regular',
  style,
  children,
  ...rest
}) {

  return (
    <Text
      style={[
        {
          fontFamily: theme?.typography?.fontFamily?.[weight],
          fontSize: theme?.typography?.fontSize?.[variant],
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
