import { useAuth } from '@/hooks/useAuth';

/**
 * @deprecated Usa `useAuth().uid` directamente.
 * Mantenido por compatibilidad: devuelve el UID de Firebase Auth.
 */
export function useUserId() {
  const { uid, isLoading } = useAuth();
  return {
    userId: uid,
    isReady: !isLoading,
    resetUserId: async () => uid,
  };
}
