import { View } from 'react-native';

import { NicofitnessLogo } from '@/components/brand/NicofitnessLogo';
import { colors } from '@/constants/theme';

/** Cabecera de marca compartida en las pestañas principales. */
export function TabBrandHeader() {
  return (
    <View
      className="items-center justify-center border-b border-border py-3"
      style={{ backgroundColor: colors.background }}>
      <NicofitnessLogo size="sm" />
    </View>
  );
}
