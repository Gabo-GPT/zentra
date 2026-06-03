import { Pressable, View } from 'react-native';

import { NicoCoachHeadline } from '@/components/brand/NicoCoachHeadline';
import { Screen } from '@/components/ui/Screen';
import { TabScreenTransition } from '@/components/ui/TabScreenTransition';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/hooks/useAuth';
import { useHaptics } from '@/hooks/useHaptics';
import { notifyError } from '@/lib/feedback';
import { mapAuthError } from '@/services/authService';
import { useProgressStore } from '@/store/progressStore';

export default function HomeScreen() {
  const { email, signOut } = useAuth();
  const haptics = useHaptics();
  const resetProgress = useProgressStore((s) => s.resetSession);

  const handleSignOut = async () => {
    try {
      await haptics.light();
      await signOut();
      resetProgress();
    } catch (error) {
      await notifyError(haptics, 'No se pudo cerrar sesión', mapAuthError(error));
    }
  };

  return (
    <TabScreenTransition>
      <Screen>
        <View className="mt-md gap-md">
          <NicoCoachHeadline size="md" />
          {email ? (
            <Typography variant="caption" className="text-center">
              Sesión: {email}
            </Typography>
          ) : null}
          <Typography variant="body" className="text-center leading-6">
            NICO adapta cada sesión a tu progreso. Captura tus fotos, recibe tu plan y entrena con
            recordatorios inteligentes.
          </Typography>
          <View className="mt-lg rounded-card border border-border bg-surface p-lg">
            <Typography variant="subtitle" className="text-foreground">
              Próximo paso
            </Typography>
            <Typography variant="body" className="mt-sm">
              Ve a la pestaña Progreso para registrar tu primera captura corporal.
            </Typography>
          </View>
          <Pressable
            onPress={handleSignOut}
            className="mt-md items-center rounded-card border border-border py-md active:opacity-80">
            <Typography variant="subtitle" className="text-sm text-muted">
              Cerrar sesión
            </Typography>
          </Pressable>
        </View>
      </Screen>
    </TabScreenTransition>
  );
}
