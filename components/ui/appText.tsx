/**
 * @example
 * <AppText variant="lg" weight="semiBold">Title</AppText>
 * <AppText variant="base" weight="regular">Body</AppText>
 */
import { theme } from '@/constants/index';
import React, { memo } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface AppTextProps {
  variant?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'regular' | 'semiBold';
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  rest?: any;
}

const AppText = ({ variant = 'base', weight = 'regular', style, children, ...rest }: AppTextProps) => {
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
};

export default memo(AppText);
