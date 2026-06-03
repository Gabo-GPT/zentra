import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import type { CameraView } from 'expo-camera';

import { useHaptics } from '@/hooks/useHaptics';
import { notifyError, notifySuccess } from '@/lib/feedback';
import { generateFitnessPlan } from '@/services/aiService';
import { uploadProgressPhoto } from '@/services/storageService';
import { useProgressStore } from '@/store/progressStore';
import type { CaptureStep } from '@/store/progressStore';

interface UseProgressCaptureOptions {
  userId: string | null;
  /** Si es false, no navega al tab Coach tras el análisis (p. ej. onboarding). */
  autoNavigateToCoach?: boolean;
  /** Se ejecuta cuando el plan de IA está listo. */
  onPlanReady?: () => void;
}

/**
 * Orquesta captura, subida a Firebase y análisis automático con Gemini.
 */
export function useProgressCapture({
  userId,
  autoNavigateToCoach = true,
  onPlanReady,
}: UseProgressCaptureOptions) {
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const haptics = useHaptics();

  const captureStep = useProgressStore((s) => s.captureStep);
  const status = useProgressStore((s) => s.status);
  const frontPhoto = useProgressStore((s) => s.frontPhoto);
  const setStatus = useProgressStore((s) => s.setStatus);
  const setFrontPhoto = useProgressStore((s) => s.setFrontPhoto);
  const setBackPhoto = useProgressStore((s) => s.setBackPhoto);
  const setFitnessPlan = useProgressStore((s) => s.setFitnessPlan);
  const setError = useProgressStore((s) => s.setError);

  const isBusy = status === 'uploading' || status === 'analyzing' || status === 'capturing';

  const reportError = useCallback(
    async (title: string, detail?: string) => {
      setError(title);
      await notifyError(haptics, title, detail);
    },
    [haptics, setError],
  );

  const runAiAnalysis = useCallback(
    async (frontUri: string, backUri: string) => {
      setStatus('analyzing', 'Analizando con IA...');
      const result = await generateFitnessPlan(frontUri, backUri);

      if (result.success) {
        setFitnessPlan(result.data);
        setStatus('success', 'Plan generado');
        await notifySuccess(haptics, '¡Plan listo!', 'NICO generó tu dieta y rutina personalizadas.');
        if (onPlanReady) {
          onPlanReady();
        } else if (autoNavigateToCoach) {
          router.push('/(tabs)/coach');
        }
        return;
      }

      await reportError(result.error.message, result.error.details);
    },
    [autoNavigateToCoach, haptics, onPlanReady, reportError, router, setFitnessPlan, setStatus],
  );

  const capturePhoto = useCallback(async () => {
    if (!userId || isBusy) return;

    const camera = cameraRef.current;
    if (!camera) return;

    try {
      setStatus('capturing');
      await haptics.button();

      const photo = await camera.takePictureAsync({
        quality: 0.9,
      });

      if (!photo?.uri) {
        await reportError('No se pudo capturar la foto', 'Intenta de nuevo con mejor iluminación.');
        return;
      }

      const pose: CaptureStep = captureStep;
      setStatus(
        'uploading',
        pose === 'front' ? 'Guardando foto frontal...' : 'Guardando foto trasera...',
      );

      const upload = await uploadProgressPhoto(userId, pose, photo.uri);
      const captured = {
        localUri: upload.localUri,
        downloadUrl: upload.downloadUrl,
      };

      if (pose === 'front') {
        setFrontPhoto(captured);
        setStatus('idle', 'Ahora captura la vista de espalda');
        await haptics.light();
        return;
      }

      setBackPhoto(captured);

      if (!frontPhoto?.localUri) {
        await reportError(
          'Falta la foto frontal',
          'Captura primero la vista frontal antes de la espalda.',
        );
        return;
      }

      await runAiAnalysis(frontPhoto.localUri, captured.localUri);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al procesar la foto. Inténtalo de nuevo.';
      const isFirebase =
        message.toLowerCase().includes('firebase') || message.toLowerCase().includes('storage');
      await reportError(
        isFirebase ? 'Error al subir a Firebase' : 'Error en la captura',
        message,
      );
    }
  }, [
    captureStep,
    frontPhoto?.localUri,
    haptics,
    isBusy,
    reportError,
    runAiAnalysis,
    setBackPhoto,
    setFrontPhoto,
    setStatus,
    userId,
  ]);

  return {
    cameraRef,
    capturePhoto,
    isBusy,
    captureStep,
    status,
    frontPhoto,
  };
}
