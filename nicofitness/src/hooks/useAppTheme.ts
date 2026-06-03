import { colors, spacing, radii } from '@/constants/theme';

/**
 * Acceso tipado al sistema de diseño desde componentes sin NativeWind.
 */
export function useAppTheme() {
  return {
    colors,
    spacing,
    radii,
    isDark: true as const,
  };
}
