import { SPACING } from '@/src/constants/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Reusable screen wrapper: consistent padding and background.
 */
export function ScreenLayout({
  children,
  padding = SPACING.base,
  noPadding,
  style,
  ...rest
}) {
  const insets = useSafeAreaInsets();
  const paddingHorizontal = noPadding ? 0 : padding;
  const paddingBottom = Math.max(insets.bottom, padding);

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal,
          paddingBottom,
          paddingTop: noPadding ? 0 : padding,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ScreenLayout;
