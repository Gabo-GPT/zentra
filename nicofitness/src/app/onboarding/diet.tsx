import { useRouter, type Href } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { PlanDisplay } from '@/components/PlanDisplay';
import { Typography } from '@/components/ui/Typography';
import { useHaptics } from '@/hooks/useHaptics';
import { useProgressStore } from '@/store/progressStore';

export default function OnboardingDietScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const fitnessPlan = useProgressStore((s) => s.fitnessPlan);
  const status = useProgressStore((s) => s.status);

  const handleContinue = async () => {
    await haptics.button();
    router.push('/onboarding/plan' as Href);
  };

  const isLoading = status === 'analyzing' && !fitnessPlan;

  return (
    <OnboardingShell
      step={9}
      title="Tu plan de alimentación"
      subtitle="Generado por IA según tus fotos y perfil."
      onContinue={handleContinue}
      continueDisabled={isLoading}
      continueLabel={isLoading ? 'Generando plan...' : 'Continuar'}>
      <ScrollView showsVerticalScrollIndicator={false} className="-mx-md px-md">
        {fitnessPlan ? (
          <PlanDisplay fitnessPlan={fitnessPlan} />
        ) : (
          <View className="gap-md rounded-card border border-border bg-surface p-lg">
            <Typography variant="body" className="text-center">
              {isLoading
                ? 'Estamos finalizando tu análisis...'
                : 'Completa las fotos corporales para ver tu dieta personalizada.'}
            </Typography>
            <PlanDisplay isLoading={isLoading} />
          </View>
        )}
      </ScrollView>
    </OnboardingShell>
  );
}
