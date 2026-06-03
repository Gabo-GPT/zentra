import { CameraView, useCameraPermissions } from 'expo-camera';
import { useCallback } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NicofitnessLogo } from '@/components/brand/NicofitnessLogo';
import { BodyPoseOverlay } from '@/components/progress/BodyPoseOverlay';
import { CameraPermissionView } from '@/components/progress/CameraPermissionView';
import { PlanSkeleton } from '@/components/PlanSkeleton';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/hooks/useAuth';
import { useProgressCapture } from '@/hooks/useProgressCapture';
import { useProgressStore } from '@/store/progressStore';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const { uid, isLoading: isAuthLoading } = useAuth();

  const status = useProgressStore((s) => s.status);
  const statusMessage = useProgressStore((s) => s.statusMessage);
  const errorMessage = useProgressStore((s) => s.errorMessage);
  const captureStep = useProgressStore((s) => s.captureStep);
  const resetSession = useProgressStore((s) => s.resetSession);

  const { cameraRef, capturePhoto, isBusy } = useProgressCapture({ userId: uid });

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
      <CameraPermissionView
        onRequestPermission={handleRequestPermission}
        canAskAgain={permission.canAskAgain}
      />
    );
  }

  const isAnalyzing = status === 'analyzing';
  const stepLabel = captureStep === 'front' ? 'Vista frontal' : 'Vista de espalda';
  const stepHint =
    captureStep === 'front'
      ? 'Alinea cabeza y hombros con las guías. Mantén 2 m de distancia.'
      : 'Gira de espaldas. Alinea hombros y columna con el centro.';

  return (
    <View className="flex-1 bg-background">
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mirror={false}
        responsiveOrientationWhenOrientationLocked
      />

      <BodyPoseOverlay pose={captureStep} />

      {/* Cabecera */}
      <View
        className="absolute left-0 right-0 items-center px-md"
        style={{ top: insets.top + 8 }}>
        <View className="mb-sm rounded-card border border-border/80 bg-background/85 px-md py-xs">
          <NicofitnessLogo size="sm" />
        </View>
        <View className="w-full rounded-card border border-border/80 bg-background/80 px-md py-sm">
          <Typography variant="label">Progreso · Paso {captureStep === 'front' ? '1' : '2'} de 2</Typography>
          <Typography variant="subtitle" className="text-foreground">
            {stepLabel}
          </Typography>
        </View>
      </View>

      {/* Controles inferiores */}
      <View
        className="absolute bottom-0 left-0 right-0 px-md"
        style={{ paddingBottom: insets.bottom + 16 }}>
        <Typography variant="caption" className="mb-md text-center text-foreground">
          {stepHint}
        </Typography>

        {errorMessage ? (
          <View className="mb-md rounded-card border border-danger/40 bg-danger/10 px-md py-sm">
            <Typography variant="body" className="text-center text-danger">
              {errorMessage}
            </Typography>
            <Pressable
              onPress={resetSession}
              className="mt-sm items-center active:opacity-70">
              <Typography variant="subtitle" className="text-sm text-primary">
                Reiniciar captura
              </Typography>
            </Pressable>
          </View>
        ) : null}

        <Pressable
          onPress={capturePhoto}
          disabled={isBusy || isAuthLoading || !uid}
          accessibilityLabel="Tomar foto de progreso"
          className={`items-center active:opacity-80 ${isBusy ? 'opacity-50' : ''}`}>
          <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-primary bg-background/90">
            <View className="h-14 w-14 rounded-full bg-primary" />
          </View>
          <Typography variant="caption" className="mt-sm text-center text-foreground">
            {isAuthLoading ? 'Preparando...' : isBusy ? 'Procesando...' : 'Capturar'}
          </Typography>
        </Pressable>
      </View>

      {/* Overlay análisis IA */}
      {isAnalyzing ? (
        <View className="absolute inset-0 bg-background/95 px-md pt-2xl">
          <View style={{ paddingTop: insets.top + 48 }} className="gap-md">
            <Typography variant="label" className="text-center">
              Coach IA
            </Typography>
            <Typography variant="title" className="text-center">
              Analizando con IA...
            </Typography>
            <Typography variant="body" className="text-center">
              {statusMessage ?? 'Generando tu dieta y rutina personalizada'}
            </Typography>
            <PlanSkeleton />
          </View>
        </View>
      ) : null}

      {status === 'uploading' ? (
        <View className="absolute inset-0 items-center justify-center bg-background/60">
          <ActivityIndicator size="large" color="#22D3EE" />
          <Typography variant="body" className="mt-md text-foreground">
            {statusMessage}
          </Typography>
        </View>
      ) : null}
    </View>
  );
}
