import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';

export default function TreasureScreen() {
  return (
    <ScreenLayout>
      <Text style={styles.title}>Treasure Chest</Text>
      <Text style={styles.subtitle}>
        Exclusive collections and limited editions.
      </Text>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5c5c5c',
  },
});
