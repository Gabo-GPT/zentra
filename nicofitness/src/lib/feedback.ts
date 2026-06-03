import { showErrorToast, showSuccessToast } from '@/lib/toast';

type HapticsApi = {
  error: () => Promise<void>;
  success: () => Promise<void>;
};

/**
 * Error con vibración + toast no intrusivo (Firebase, Gemini, red).
 */
export async function notifyError(
  haptics: HapticsApi,
  title: string,
  message?: string,
) {
  await haptics.error();
  showErrorToast(title, message);
}

/**
 * Éxito con vibración + toast breve.
 */
export async function notifySuccess(
  haptics: HapticsApi,
  title: string,
  message?: string,
) {
  await haptics.success();
  showSuccessToast(title, message);
}
