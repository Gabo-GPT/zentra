import { onAuthStateChanged } from 'firebase/auth';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { getFirebaseAuth, isFirebaseConfigured } from '@/services/firebase';
import { useAuthStore } from '@/store/authStore';

/**
 * Escucha el estado de autenticación de Firebase y mantiene la sesión.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setUser(null);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
        },
        (error) => {
          console.warn('[AuthProvider] onAuthStateChanged error:', error);
          setUser(null);
        },
      );

      return unsubscribe;
    } catch (error) {
      console.warn('[AuthProvider] Firebase Auth init failed:', error);
      setUser(null);
    }
  }, [setUser]);

  return children;
}
