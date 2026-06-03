import { Platform, type ViewStyle } from 'react-native';

/** Sombra suave coherente con tarjetas en modo oscuro (iOS + Android). */
export const cardShadowStyle: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  android: {
    elevation: 8,
  },
  default: {},
}) as ViewStyle;
