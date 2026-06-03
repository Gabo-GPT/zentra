/**
 * Tokens de diseño NICOFITNESS (Dark Mode).
 * Usar en lógica JS; en UI preferir clases NativeWind (`bg-background`, `text-foreground`, etc.).
 */
export const colors = {
  background: '#0A0A0F',
  surface: '#14141F',
  surfaceElevated: '#1C1C28',
  border: '#27272F',
  primary: '#22D3EE',
  primaryMuted: '#0891B2',
  accent: '#F97316',
  accentMuted: '#EA580C',
  success: '#22C55E',
  warning: '#EAB308',
  danger: '#EF4444',
  foreground: '#F4F4F5',
  muted: '#A1A1AA',
  subtle: '#71717A',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const radii = {
  card: 16,
  pill: 9999,
} as const;

export type ThemeColors = typeof colors;
