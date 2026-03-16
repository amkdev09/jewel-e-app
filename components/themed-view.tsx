import { View, type ViewProps } from 'react-native';

import { APP_COLORS } from '@/constants/index';

export type ThemedViewProps = ViewProps & {
  backgroundColor?: string;
};

export function ThemedView({ style, backgroundColor: bgColor, ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: bgColor ?? APP_COLORS?.white }, style]} {...otherProps} />;
}
