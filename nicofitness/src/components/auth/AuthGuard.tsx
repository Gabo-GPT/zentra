import { useRouter, useSegments, type Href } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/hooks/useAuth';
import { useOnboardingHydrated } from '@/hooks/useOnboardingHydrated';
import { useOnboardingStore } from '@/store/onboardingStore';

/**
 * Redirige según sesión y si el usuario completó el onboarding.
 */
export function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();
  const hasCompletedOnboarding = useOnboardingStore((s) => s.hasCompletedOnboarding);
  const onboardingHydrated = useOnboardingHydrated();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !onboardingHydrated) return;

    const root = segments[0] as string | undefined;
    const inAuthScreen = root === 'auth';
    const inOnboarding = root === 'onboarding';

    if (!isAuthenticated && !inAuthScreen) {
      router.replace('/auth' as Href);
      return;
    }

    if (!isAuthenticated) return;

    if (!hasCompletedOnboarding && !inOnboarding) {
      router.replace('/onboarding/welcome' as Href);
      return;
    }

    if (hasCompletedOnboarding && (inAuthScreen || inOnboarding)) {
      router.replace('/(tabs)' as Href);
    }
  }, [
    hasCompletedOnboarding,
    isAuthenticated,
    isLoading,
    onboardingHydrated,
    router,
    segments,
  ]);

  if (isLoading || !onboardingHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#22D3EE" />
        <Typography variant="body" className="mt-md text-muted">
          Cargando sesión...
        </Typography>
      </View>
    );
  }

  return children;
}
