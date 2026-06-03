import { useRouter, type Href } from 'expo-router';

import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { ReminderBellHero, ReminderDayRow } from '@/components/onboarding/ReminderDayRow';
import { WEEK_DAYS } from '@/constants/onboarding';
import { useHaptics } from '@/hooks/useHaptics';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function OnboardingScheduleScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const reminders = useOnboardingStore((s) => s.reminders);
  const setReminder = useOnboardingStore((s) => s.setReminder);

  const handleContinue = async () => {
    await haptics.button();
    router.push('/onboarding/diet' as Href);
  };

  return (
    <OnboardingShell
      step={8}
      title="Activa tus recordatorios inteligentes"
      subtitle="Elige los días y la hora en que quieres que te recordemos entrenar."
      hero={<ReminderBellHero />}
      onContinue={handleContinue}>
      {WEEK_DAYS.map((day) => (
        <ReminderDayRow
          key={day.key}
          emoji={day.emoji}
          label={day.label}
          reminder={reminders[day.key]}
          onChange={(patch) => setReminder(day.key, patch)}
        />
      ))}
    </OnboardingShell>
  );
}
