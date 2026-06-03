import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { UnitToggle } from '@/components/onboarding/UnitToggle';
import { ValueRuler } from '@/components/onboarding/ValueRuler';
import { Typography } from '@/components/ui/Typography';
import { useHaptics } from '@/hooks/useHaptics';
import { calculateBmi, getBmiCategory, useOnboardingStore } from '@/store/onboardingStore';
import type { WeightUnit } from '@/types/onboarding';

function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462);
}

export default function OnboardingWeightScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const weightKg = useOnboardingStore((s) => s.weightKg);
  const weightUnit = useOnboardingStore((s) => s.weightUnit);
  const heightCm = useOnboardingStore((s) => s.heightCm);
  const setWeight = useOnboardingStore((s) => s.setWeight);

  const bmi = calculateBmi(weightKg, heightCm);
  const bmiInfo = getBmiCategory(bmi);

  const handleContinue = async () => {
    await haptics.button();
    router.push('/onboarding/experience' as Href);
  };

  return (
    <OnboardingShell
      step={4}
      scrollable={false}
      title="¿Cuál es tu peso?"
      subtitle="Tu IMC nos ayuda a calibrar intensidad y calorías."
      onContinue={handleContinue}>
      <UnitToggle<WeightUnit>
        options={['kg', 'lb']}
        value={weightUnit}
        onChange={(unit) => setWeight(weightKg, unit)}
      />
      <ValueRuler
        min={40}
        max={160}
        value={weightKg}
        onChange={(kg) => setWeight(kg, weightUnit)}
        formatLabel={(v) => (weightUnit === 'kg' ? `${v} kg` : `${kgToLb(v)} lb`)}
      />
      <View className="mt-xl items-center rounded-card border border-border bg-surface px-lg py-md">
        <Typography variant="caption">Tu IMC</Typography>
        <Typography variant="title" className="text-4xl">
          {bmi}
        </Typography>
        <Typography variant="subtitle" style={{ color: bmiInfo.color }}>
          {bmiInfo.label}
        </Typography>
      </View>
    </OnboardingShell>
  );
}
