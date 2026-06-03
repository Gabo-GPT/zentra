import { useRouter, type Href } from 'expo-router';

import { OnboardingOptionCard } from '@/components/onboarding/OnboardingOptionCard';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { EXPERIENCE_OPTIONS } from '@/constants/onboarding';
import { useHaptics } from '@/hooks/useHaptics';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function OnboardingExperienceScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const experience = useOnboardingStore((s) => s.experience);
  const setExperience = useOnboardingStore((s) => s.setExperience);

  const handleContinue = async () => {
    if (!experience) return;
    await haptics.button();
    router.push('/onboarding/body-capture' as Href);
  };

  return (
    <OnboardingShell
      step={5}
      title="¿Cuál es tu experiencia?"
      subtitle="Adaptamos la dificultad de tus entrenamientos a tu nivel actual."
      onContinue={handleContinue}
      continueDisabled={!experience}>
      {EXPERIENCE_OPTIONS.map((opt) => (
        <OnboardingOptionCard
          key={opt.id}
          title={opt.title}
          description={opt.description}
          bars={opt.bars}
          selected={experience === opt.id}
          onPress={async () => {
            await haptics.light();
            setExperience(opt.id);
          }}
        />
      ))}
    </OnboardingShell>
  );
}
