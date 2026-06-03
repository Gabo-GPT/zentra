import { useRouter, type Href } from 'expo-router';

import { OnboardingOptionCard } from '@/components/onboarding/OnboardingOptionCard';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { Typography } from '@/components/ui/Typography';
import { useHaptics } from '@/hooks/useHaptics';
import { useOnboardingStore } from '@/store/onboardingStore';
import type { Gender } from '@/types/onboarding';

export default function OnboardingGenderScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gender = useOnboardingStore((s) => s.gender);
  const setGender = useOnboardingStore((s) => s.setGender);

  const handleContinue = async () => {
    if (!gender) return;
    await haptics.button();
    router.push('/onboarding/height' as Href);
  };

  const select = async (value: Gender) => {
    await haptics.light();
    setGender(value);
  };

  return (
    <OnboardingShell
      step={2}
      title="¿Cuál es tu género?"
      subtitle="Usamos esta información para ajustar tus planes de entrenamiento y nutrición."
      onContinue={handleContinue}
      continueDisabled={!gender}>
      <OnboardingOptionCard
        title="Masculino"
        selected={gender === 'male'}
        onPress={() => select('male')}
        icon={<Typography className="text-2xl">♂️</Typography>}
      />
      <OnboardingOptionCard
        title="Femenino"
        selected={gender === 'female'}
        onPress={() => select('female')}
        icon={<Typography className="text-2xl">♀️</Typography>}
      />
    </OnboardingShell>
  );
}
