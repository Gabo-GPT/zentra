import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useHaptics } from '@/hooks/useHaptics';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function OnboardingFrequencyScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const trainingDaysPerWeek = useOnboardingStore((s) => s.trainingDaysPerWeek);
  const setTrainingDaysPerWeek = useOnboardingStore((s) => s.setTrainingDaysPerWeek);
  const [days, setDays] = useState(trainingDaysPerWeek);

  const handleContinue = async () => {
    setTrainingDaysPerWeek(days);
    await haptics.button();
    router.push('/onboarding/schedule' as Href);
  };

  return (
    <OnboardingShell
      step={7}
      title="¿Con qué frecuencia quieres entrenar?"
      subtitle="Te sugeriremos un plan acorde a tu disponibilidad semanal."
      hero={<Typography className="text-6xl">📅</Typography>}
      onContinue={handleContinue}>
      <View className="items-center py-xl">
        <Typography
          variant="title"
          style={{ fontFamily: fontFamily.bold, fontSize: 56, color: colors.primary }}>
          {days}x
        </Typography>
        <Typography variant="body" className="text-center">
          por semana
        </Typography>
      </View>
      <View className="flex-row justify-between gap-sm px-sm">
        {[2, 3, 4, 5, 6].map((n) => (
          <Pressable
            key={n}
            onPress={async () => {
              await haptics.light();
              setDays(n);
            }}
            className={`flex-1 items-center rounded-card border py-md ${
              days === n ? 'border-primary bg-primary/15' : 'border-border bg-surface'
            }`}>
            <Typography
              variant="subtitle"
              className={`text-center ${days === n ? 'text-primary' : ''}`}>
              {n}
            </Typography>
          </Pressable>
        ))}
      </View>
      <Typography variant="caption" className="mt-lg text-center">
        Toca un número para elegir cuántos días entrenarás cada semana.
      </Typography>
    </OnboardingShell>
  );
}
