import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { Typography } from '@/components/ui/Typography';
import { cardShadowStyle } from '@/components/plan/cardStyles';
import { PLAN_TIERS } from '@/constants/onboarding';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useHaptics } from '@/hooks/useHaptics';
import { useAppStore } from '@/store/appStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import type { PlanTier } from '@/types/onboarding';

export default function OnboardingPlanScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const selectedPlan = useOnboardingStore((s) => s.selectedPlan);
  const setSelectedPlan = useOnboardingStore((s) => s.setSelectedPlan);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const setOnboarded = useAppStore((s) => s.setOnboarded);

  const handleFinish = async () => {
    if (!selectedPlan) return;
    await haptics.success();
    completeOnboarding();
    setOnboarded(true);
    router.replace('/(tabs)');
  };

  const select = async (tier: PlanTier) => {
    await haptics.light();
    setSelectedPlan(tier);
  };

  return (
    <OnboardingShell
      step={10}
      title="Elige tu plan"
      subtitle="Puedes cambiar de plan más adelante desde ajustes."
      onContinue={handleFinish}
      continueLabel="Comenzar entrenamiento"
      continueDisabled={!selectedPlan}>
      {PLAN_TIERS.map((tier) => {
        const selected = selectedPlan === tier.id;
        return (
          <Pressable
            key={tier.id}
            onPress={() => select(tier.id)}
            className={`mb-md rounded-card border px-lg py-md active:opacity-90 ${
              selected
                ? 'border-primary bg-primary/10'
                : tier.highlighted
                  ? 'border-primary/50 bg-surface'
                  : 'border-border bg-surface'
            }`}
            style={cardShadowStyle}>
            {tier.highlighted ? (
              <View className="mb-sm self-start rounded-full bg-primary px-sm py-xs">
                <Typography
                  style={{ fontFamily: fontFamily.medium, color: colors.background, fontSize: 11 }}>
                  Recomendado
                </Typography>
              </View>
            ) : null}
            <View className="flex-row items-center justify-between">
              <Typography variant="subtitle" className="text-lg">
                {tier.name}
              </Typography>
              <Typography variant="subtitle" className="text-primary">
                {tier.price}
              </Typography>
            </View>
            {tier.features.map((f) => (
              <Typography key={f} variant="caption" className="mt-xs leading-5">
                · {f}
              </Typography>
            ))}
          </Pressable>
        );
      })}
    </OnboardingShell>
  );
}
