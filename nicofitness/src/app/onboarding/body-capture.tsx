import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter, type Href } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { BodyPoseOverlay } from '@/components/progress/BodyPoseOverlay';
import { CameraPermissionView } from '@/components/progress/CameraPermissionView';
import { PlanSkeleton } from '@/components/PlanSkeleton';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/hooks/useAuth';
import { useProgressCapture } from '@/hooks/useProgressCapture';
import { useProgressStore } from '@/store/progressStore';

export default function OnboardingBodyCaptureScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const { uid, isLoading: isAuthLoading } = useAuth();

  const status = useProgressStore((s) => s.status);
  const statusMessage = useProgressStore((s) => s.statusMessage);
  const errorMessage = useProgressStore((s) => s.errorMessage);
  const captureStep = useProgressStore((s) => s.captureStep);
  const resetSession = useProgressStore((s) => s.resetSession);

  useEffect(() => {
    resetSession();
  }, [resetSession]);

  const onPlanReady = useCallback(() => {
    router.replace('/onboarding/frequency' as Href);
  }, [router]);

  const { cameraRef, capturePhoto, isBusy } = useProgressCapture({
    userId: uid,
    autoNavigateToCoach: false,
    onPlanReady,
  });

  const handleRequestPermission = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#22D3EE" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <OnboardingShell
        step={6}
        title="Fotos de tu cuerpo"
        subtitle="Necesitamos permiso de cámara para analizar tu composición con IA."
        onContinue={handleRequestPermission}
        continueLabel="Permitir cámara"
        scrollable={false}>
        <CameraPermissionView
          onRequestPermission={handleRequestPermission}
          canAskAgain={permission.canAskAgain}
        />
      </OnboardingShell>
    );
  }

  const isAnalyzing = status === 'analyzing';
  const stepLabel = captureStep === 'front' ? 'Vista frontal' : 'Vista de espalda';

  return (
    <View className="flex-1 bg-background">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" mirror={false} />
      <BodyPoseOverlay pose={captureStep} />

      <View className="absolute left-0 right-0 px-md" style={{ top: insets.top + 8 }}>
        <View className="rounded-card border border-border/80 bg-background/85 px-md py-sm">
          <Typography variant="label">Onboarding · Paso 6</Typography>
          <Typography variant="subtitle">{stepLabel}</Typography>
          <Typography variant="caption" className="mt-xs">
            Alinea tu cuerpo con las guías. Buena iluminación y ropa ajustada.
          </Typography>
        </View>
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 px-md"
        style={{ paddingBottom: insets.bottom + 16 }}>
        {errorMessage ? (
          <View className="mb-md rounded-card border border-danger/40 bg-danger/10 px-md py-sm">
            <Typography variant="body" className="text-center text-danger">
              {errorMessage}
            </Typography>
            <Pressable onPress={resetSession} className="mt-sm items-center">
              <Typography className="text-primary">Reiniciar captura</Typography>
            </Pressable>
          </View>
        ) : null}

        <Pressable
          onPress={capturePhoto}
          disabled={isBusy || isAuthLoading || !uid}
          className={`items-center ${isBusy ? 'opacity-50' : ''}`}>
          <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-background/90">
            <View className="h-14 w-14 rounded-full bg-primary" />
          </View>
          <Typography variant="caption" className="mt-sm text-center text-foreground">
            {isBusy ? 'Procesando...' : 'Capturar'}
          </Typography>
        </Pressable>
      </View>

      {isAnalyzing ? (
        <View className="absolute inset-0 bg-background/95 px-md">
          <View style={{ paddingTop: insets.top + 64 }} className="gap-md">
            <Typography variant="title" className="text-center">
              Analizando con IA...
            </Typography>
            <Typography variant="body" className="text-center">
              {statusMessage ?? 'Generando tu dieta y rutina personalizadas'}
            </Typography>
            <PlanSkeleton />
          </View>
        </View>
      ) : null}

      {status === 'uploading' ? (
        <View className="absolute inset-0 items-center justify-center bg-background/60">
          <ActivityIndicator size="large" color="#22D3EE" />
          <Typography className="mt-md text-foreground">{statusMessage}</Typography>
        </View>
      ) : null}
    </View>
  );
}
