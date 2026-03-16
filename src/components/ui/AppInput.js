import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';

const AppInput = ({ label, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    transform: [
      {
        translateY: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [14, -8],
        }),
      },
    ],
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: isFocused ? '#2563EB' : '#6B7280',
  };

  return (
    <TouchableWithoutFeedback>
      <View style={[styles.container, { borderColor: isFocused ? '#2563EB' : '#E5E7EB' }]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>

        <TextInput
          value={value}
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          {...rest}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(AppInput);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginVertical: 8,
  },

  input: {
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
});
