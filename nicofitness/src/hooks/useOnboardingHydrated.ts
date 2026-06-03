import { useEffect, useState } from 'react';

import { useOnboardingStore } from '@/store/onboardingStore';

/** Espera a que AsyncStorage restaure el estado de onboarding. */
export function useOnboardingHydrated(): boolean {
  const [hydrated, setHydrated] = useState(() => useOnboardingStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useOnboardingStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useOnboardingStore.persist.hasHydrated());
    return unsub;
  }, []);

  return hydrated;
}
