import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { cardShadowStyle } from '@/components/plan/cardStyles';
import { colors } from '@/constants/theme';

interface OnboardingOptionCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  bars?: number;
}

export function OnboardingOptionCard({
  title,
  description,
  selected = false,
  onPress,
  icon,
  bars,
}: OnboardingOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-sm flex-row items-center gap-md rounded-card border px-lg py-md active:opacity-90 ${
        selected ? 'border-primary bg-primary/10' : 'border-border bg-surface'
      }`}
      style={cardShadowStyle}>
      {icon ? <View>{icon}</View> : null}
      <View className="flex-1">
        <Typography variant="subtitle" className="text-base">
          {title}
        </Typography>
        {description ? (
          <Typography variant="caption" className="mt-xs leading-5">
            {description}
          </Typography>
        ) : null}
        {bars != null ? (
          <View className="mt-sm flex-row gap-xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <View
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{ backgroundColor: i < bars ? colors.primary : colors.border }}
              />
            ))}
          </View>
        ) : null}
      </View>
      <View
        className={`h-5 w-5 rounded-full border-2 ${selected ? 'border-primary bg-primary' : 'border-subtle'}`}
      />
    </Pressable>
  );
}
