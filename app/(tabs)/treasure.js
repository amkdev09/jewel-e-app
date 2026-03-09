import { AppText } from '@/components/AppText';
import { ScreenLayout } from '@/src/layouts/ScreenLayout';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TreasureScreen() {
  return (
    <ScreenLayout>
      <AppText variant="2xl" weight="semiBold" style={styles.title}>Treasure Chest</AppText>
      <AppText variant="lg" weight="regular" style={styles.subtitle}>
        Exclusive collections and limited editions.
      </AppText>
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
