import {
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_600SemiBold,
} from '@expo-google-fonts/noto-sans-devanagari';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';
import { useFonts } from '@expo-google-fonts/inter/useFonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="wishlist" options={{ headerShown: false }} />
      <Stack.Screen name="bag" options={{ headerShown: false }} />
      <Stack.Screen name="latest-designs" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_600SemiBold,
    GreatVibes_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </View>
  );
}
