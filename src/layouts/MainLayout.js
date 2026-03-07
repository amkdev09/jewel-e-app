import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function MainLayout({
  children,
  loading = false,
  header = null,
  edges = ['top'],
  style,
}) {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={edges}>
      {header}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#B8860B" />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainLayout;
