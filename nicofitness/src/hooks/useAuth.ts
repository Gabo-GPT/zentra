import { useMemo } from 'react';

import { signInWithEmail, signOut, signUpWithEmail } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

/**
 * Hook de autenticación: usuario actual, UID y acciones de sesión.
 * La persistencia la gestiona Firebase Auth + AsyncStorage en `getFirebaseAuth`.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  return useMemo(
    () => ({
      user,
      uid: user?.uid ?? null,
      email: user?.email ?? null,
      isAuthenticated: Boolean(user),
      isLoading: isInitializing,
      signInWithEmail,
      signUpWithEmail,
      signOut,
    }),
    [user, isInitializing],
  );
}
