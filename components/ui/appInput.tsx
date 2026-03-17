import AppText from '@/components/ui/appText';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

interface AppInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const AppInput = ({
  label = 'Enter Email',
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  ...rest
} : AppInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [animated, isFocused, value]);

  const handlePress = () => {
    if (inputRef.current) {
      (inputRef.current as any).focus();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    transform: [
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -22],
        }),
      },
    ],
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: error ? '#F97373' : isFocused ? '#000' : '#6B7280',
  };

  const borderColor = error ? '#F97373' : isFocused ? '#000' : '#D1D5DB';

  return (
    <View style={[containerStyle, { flex: 1 }]}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={[styles.container, { borderColor }]}>
          {!!label && <Animated.Text style={labelStyle as any}>{label}</Animated.Text>}
          <TextInput
            ref={inputRef}
            value={value}
            style={[styles.input, inputStyle, { flex: 1 }]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangeText}
            placeholderTextColor="#9CA3AF"
            {...rest}
          />
        </View>
      </TouchableWithoutFeedback>
      {!!error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
};

export default memo(AppInput);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 14,
    padding: 0,
    margin: 0,
    color: '#111827',
  },
  inputError: {
    borderColor: '#F97373',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#F97373',
  },
});
