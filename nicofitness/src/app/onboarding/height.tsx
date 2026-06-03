import { useRouter, type Href } from 'expo-router';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { UnitToggle } from '@/components/onboarding/UnitToggle';
import { ValueRuler } from '@/components/onboarding/ValueRuler';
import { useHaptics } from '@/hooks/useHaptics';
import { useOnboardingStore } from '@/store/onboardingStore';
import type { HeightUnit } from '@/types/onboarding';

function cmToFtDisplay(cm: number): string {
  const totalIn = cm / 2.54;
  const ft = Math.floor(totalIn / 12);
  const inches = Math.round(totalIn % 12);
  return `${ft}'${inches}"`;
}

export default function OnboardingHeightScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const heightCm = useOnboardingStore((s) => s.heightCm);
  const heightUnit = useOnboardingStore((s) => s.heightUnit);
  const setHeight = useOnboardingStore((s) => s.setHeight);

  const handleContinue = async () => {
    await haptics.button();
    router.push('/onboarding/weight' as Href);
  };

  return (
    <OnboardingShell
      step={3}
      scrollable={false}
      title="¿Cuál es tu altura?"
      subtitle="Desliza la regla para seleccionar tu estatura."
      onContinue={handleContinue}>
      <UnitToggle<HeightUnit>
        options={['cm', 'ft']}
        value={heightUnit}
        onChange={(unit) => setHeight(heightCm, unit)}
      />
      <ValueRuler
        min={140}
        max={220}
        value={heightCm}
        onChange={(cm) => setHeight(cm, heightUnit)}
        formatLabel={(v) => (heightUnit === 'cm' ? `${v} cm` : cmToFtDisplay(v))}
      />
    </OnboardingShell>
  );
}
