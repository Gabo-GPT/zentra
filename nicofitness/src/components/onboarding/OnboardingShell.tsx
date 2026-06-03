import { useRouter, type Href } from 'expo-router';
import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NicofitnessLogo } from '@/components/brand/NicofitnessLogo';
import { Typography } from '@/components/ui/Typography';
import { ONBOARDING_TOTAL_STEPS } from '@/constants/onboarding';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useHaptics } from '@/hooks/useHaptics';

interface OnboardingShellProps extends PropsWithChildren {
  step: number;
  title?: string;
  subtitle?: string;
  hero?: ReactNode;
  /** Contenido visual debajo del subtítulo (p. ej. foto de NICO). */
  media?: ReactNode;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  showBack?: boolean;
  scrollable?: boolean;
}

export function OnboardingShell({
  step,
  title,
  subtitle,
  hero,
  media,
  children,
  onContinue,
  continueLabel = 'Continuar',
  continueDisabled = false,
  showBack = true,
  scrollable = true,
}: OnboardingShellProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const progress = Math.min(step / ONBOARDING_TOTAL_STEPS, 1);

  const handleBack = async () => {
    await haptics.light();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/onboarding/welcome' as Href);
    }
  };

  const content = (
    <>
      {hero ? <View className="items-center py-md">{hero}</View> : null}
      {title ? (
        <Typography variant="title" className="text-center text-2xl">
          {title}
        </Typography>
      ) : null}
      {subtitle ? (
        <Typography variant="body" className="mt-sm text-center leading-6 text-muted">
          {subtitle}
        </Typography>
      ) : null}
      {media ? <View className="mt-xl items-center">{media}</View> : null}
      {children ? <View className="mt-lg flex-1">{children}</View> : null}
    </>
  );

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-md pt-sm">
        <View className="h-1 overflow-hidden rounded-full bg-surface-elevated">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </View>
        <View className="mt-md flex-row items-center justify-between">
          {showBack ? (
            <Pressable
              onPress={handleBack}
              hitSlop={12}
              accessibilityLabel="Volver"
              className="h-10 w-10 items-center justify-center active:opacity-70">
              <Typography style={{ fontSize: 28, color: colors.foreground, lineHeight: 32 }}>
                ‹
              </Typography>
            </Pressable>
          ) : (
            <View className="h-10 w-10" />
          )}
          <NicofitnessLogo size="sm" />
          <View className="h-10 w-10" />
        </View>
      </View>

      {scrollable ? (
        <ScrollView
          className="flex-1 px-md"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 24, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        <View className="flex-1 px-md">{content}</View>
      )}

      {onContinue ? (
        <View
          className="border-t border-border px-md pt-md"
          style={{ paddingBottom: insets.bottom + 12 }}>
          <Pressable
            onPress={onContinue}
            disabled={continueDisabled}
            className={`items-center rounded-card bg-primary py-md active:opacity-85 ${continueDisabled ? 'opacity-50' : ''}`}>
            <Typography
              style={{ fontFamily: fontFamily.semibold, color: colors.background }}
              className="text-base">
              {continueLabel}
            </Typography>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
