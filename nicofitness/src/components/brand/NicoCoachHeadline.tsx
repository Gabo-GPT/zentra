import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';

interface NicoCoachHeadlineProps {
  /** Tamaño del bloque principal (pantalla de bienvenida vs. pestañas). */
  size?: 'lg' | 'md';
}

/** Titular de marca: NICO como coach de fitness. */
export function NicoCoachHeadline({ size = 'lg' }: NicoCoachHeadlineProps) {
  const isLarge = size === 'lg';
  const lineSize = isLarge ? 28 : 22;
  const nicoSize = isLarge ? 18 : 14;

  return (
    <View className="items-center gap-1 px-sm">
      <Typography
        style={{
          fontFamily: fontFamily.bold,
          fontSize: nicoSize,
          letterSpacing: 4,
          color: colors.primary,
        }}
        className="uppercase">
        NICO
      </Typography>
      <Typography
        style={{
          fontFamily: fontFamily.bold,
          fontSize: lineSize,
          lineHeight: lineSize * 1.15,
          color: colors.foreground,
          textAlign: 'center',
        }}>
        Tu coach de fitness
      </Typography>
    </View>
  );
}
