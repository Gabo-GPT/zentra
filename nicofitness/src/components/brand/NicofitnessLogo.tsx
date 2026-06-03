import { Image, type ImageStyle, type StyleProp } from 'react-native';

const logoSource = require('@/assets/images/nicofitness-logo.png');

export type NicofitnessLogoSize = 'sm' | 'md' | 'lg';

const logoHeights: Record<NicofitnessLogoSize, number> = {
  sm: 40,
  md: 56,
  lg: 88,
};

/** Relación aproximada del arte (monograma + wordmark). */
const LOGO_ASPECT = 1.15;

interface NicofitnessLogoProps {
  size?: NicofitnessLogoSize;
  style?: StyleProp<ImageStyle>;
}

export function NicofitnessLogo({ size = 'md', style }: NicofitnessLogoProps) {
  const height = logoHeights[size];
  const width = height * LOGO_ASPECT;

  return (
    <Image
      source={logoSource}
      resizeMode="contain"
      accessibilityLabel="NICOFITNESS"
      style={[{ height, width }, style]}
    />
  );
}
