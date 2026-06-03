import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';

import { NicoCoachAvatar } from '@/components/brand/NicoCoachAvatar';
import { NicoCoachHeadline } from '@/components/brand/NicoCoachHeadline';
import { OnboardingShell } from '@/components/onboarding/OnboardingShell';
import { useHaptics } from '@/hooks/useHaptics';

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const haptics = useHaptics();

  const handleContinue = async () => {
    await haptics.button();
    router.push('/onboarding/gender' as Href);
  };

  return (
    <OnboardingShell
      step={1}
      showBack={false}
      subtitle="NICO analiza tu cuerpo, arma tu rutina y tu dieta, y te recuerda cuándo entrenar. En pocos minutos quedas listo."
      hero={
        <View className="items-center pt-sm">
          <NicoCoachHeadline size="lg" />
        </View>
      }
      media={<NicoCoachAvatar size={240} />}
      onContinue={handleContinue}
      continueLabel="¡Empecemos!"
    />
  );
}
