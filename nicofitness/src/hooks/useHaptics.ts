import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { Platform } from 'react-native';

/**
 * Feedback háptico centralizado para una UX premium y consistente.
 */
export function useHaptics() {
  const run = useCallback(async (fn: () => Promise<void>) => {
    if (Platform.OS === 'web') return;
    try {
      await fn();
    } catch {
      // Simuladores o dispositivos sin motor háptico
    }
  }, []);

  const light = useCallback(
    () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
    [run],
  );

  const medium = useCallback(
    () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
    [run],
  );

  const heavy = useCallback(
    () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
    [run],
  );

  /** Navegación entre pestañas. */
  const tab = useCallback(() => light(), [light]);

  /** Botones principales (captura, CTA). */
  const button = useCallback(() => medium(), [medium]);

  /** Plan IA generado con éxito. */
  const success = useCallback(
    () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
    [run],
  );

  /** Errores de Firebase, Gemini o red. */
  const error = useCallback(
    () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
    [run],
  );

  const warning = useCallback(
    () => run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
    [run],
  );

  return {
    light,
    medium,
    heavy,
    tab,
    button,
    success,
    error,
    warning,
  };
}
