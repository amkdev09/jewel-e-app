import AppText from '@/components/ui/appText';
import { Feather } from '@expo/vector-icons';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

interface PasswordInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const PasswordInput = ({
  label = 'Enter Password',
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  ...rest
} : PasswordInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
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
    <TouchableWithoutFeedback onPress={handlePress}>
      <View>
        <View style={[styles.container, { borderColor }, containerStyle]}>
          {!!label && <Animated.Text style={labelStyle as any}>{label}</Animated.Text>}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            ref={inputRef}
            value={value}
            style={[styles.input, inputStyle, { flex: 1 }]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangeText}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            {...rest}
          />
          <TouchableOpacity style={{ paddingHorizontal: 8 }} onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#6B7280" />
          </TouchableOpacity>
          </View>
        </View>
        {!!error && <AppText style={styles.errorText}>{error}</AppText>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(PasswordInput);

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
