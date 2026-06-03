import { Linking, Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';

interface CameraPermissionViewProps {
  onRequestPermission: () => void;
  canAskAgain: boolean;
}

/**
 * UI cuando el usuario no ha concedido permiso de cámara.
 */
export function CameraPermissionView({
  onRequestPermission,
  canAskAgain,
}: CameraPermissionViewProps) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-xl">
      <Typography variant="label">Progreso</Typography>
      <Typography variant="title" className="mt-md text-center">
        Necesitamos acceso a la cámara
      </Typography>
      <Typography variant="body" className="mt-md text-center leading-6">
        Para comparar tu evolución con precisión, las fotos deben tomarse con la cámara de la app y
        las guías de alineación.
      </Typography>

      {canAskAgain ? (
        <Pressable
          onPress={onRequestPermission}
          className="mt-xl rounded-card bg-primary px-xl py-md active:opacity-80">
          <Typography variant="subtitle" className="text-center text-background">
            Permitir cámara
          </Typography>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => Linking.openSettings()}
          className="mt-xl rounded-card border border-primary px-xl py-md active:opacity-80">
          <Typography variant="subtitle" className="text-center text-primary">
            Abrir ajustes del sistema
          </Typography>
        </Pressable>
      )}
    </View>
  );
}
