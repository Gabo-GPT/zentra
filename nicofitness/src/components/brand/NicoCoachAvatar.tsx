import { Image, View } from 'react-native';

import { colors } from '@/constants/theme';

const nicoCoachSource = require('@/assets/images/nico-coach.png');

interface NicoCoachAvatarProps {
  size?: number;
}

/** Retrato circular de NICO, coach de fitness con IA. */
export function NicoCoachAvatar({ size = 220 }: NicoCoachAvatarProps) {
  return (
    <View
      className="overflow-hidden rounded-full border-2 border-primary/40"
      style={{
        width: size,
        height: size,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
      }}>
      <Image
        source={nicoCoachSource}
        resizeMode="cover"
        accessibilityLabel="NICO, tu coach de fitness"
        style={{ width: size, height: size }}
      />
    </View>
  );
}
