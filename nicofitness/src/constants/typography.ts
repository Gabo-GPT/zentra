/**
 * Familias Inter cargadas vía @expo-google-fonts/inter en el root layout.
 */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const defaultTextStyle = {
  fontFamily: fontFamily.regular,
} as const;
