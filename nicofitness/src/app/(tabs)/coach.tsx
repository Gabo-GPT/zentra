import { ScrollView, View } from 'react-native';

import { NicoCoachHeadline } from '@/components/brand/NicoCoachHeadline';
import { PlanDisplay } from '@/components/PlanDisplay';
import { Screen } from '@/components/ui/Screen';
import { TabScreenTransition } from '@/components/ui/TabScreenTransition';
import { Typography } from '@/components/ui/Typography';
import { useProgressStore } from '@/store/progressStore';

export default function CoachScreen() {
  const fitnessPlan = useProgressStore((s) => s.fitnessPlan);
  const status = useProgressStore((s) => s.status);

  return (
    <TabScreenTransition delay={40}>
    <Screen contentClassName="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-md pb-3xl"
        showsVerticalScrollIndicator={false}>
        <View className="mt-md items-center gap-sm">
          <NicoCoachHeadline size="md" />
          <Typography variant="body" className="text-center">
            Tu plan personalizado, generado por NICO según tu cuerpo y tus metas.
          </Typography>
        </View>
        <View className="mt-md">
          {fitnessPlan ? (
            <PlanDisplay fitnessPlan={fitnessPlan} />
          ) : status === 'analyzing' ? (
            <PlanDisplay isLoading />
          ) : (
            <Typography variant="body">
              Completa las dos fotos en Progreso y NICO creará tu rutina y dieta con IA.
            </Typography>
          )}
        </View>
      </ScrollView>
    </Screen>
    </TabScreenTransition>
  );
}
