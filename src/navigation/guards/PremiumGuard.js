import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/auth.store';

/**
 * Protects premium-only routes.
 * Redirect to upgrade or home if not premium.
 */
export function PremiumGuard({ children, redirectTo = '/(tabs)/home' }) {
  const router = useRouter();
  const isPremium = useAuthStore((s) => s.isPremium);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
      return;
    }
    if (!isPremium) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isPremium, redirectTo, router]);

  if (!isPremium) {
    return null;
  }

  return children;
}

export default PremiumGuard;
