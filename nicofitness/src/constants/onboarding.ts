import type { ExperienceLevel, PlanTier } from '@/types/onboarding';

export const ONBOARDING_TOTAL_STEPS = 10;

export const EXPERIENCE_OPTIONS: {
  id: ExperienceLevel;
  title: string;
  description: string;
  bars: number;
}[] = [
  { id: 'novice', title: 'Totalmente novato', description: 'Nunca he hecho ejercicio antes', bars: 1 },
  {
    id: 'beginner',
    title: 'Principiante',
    description: 'He hecho ejercicio antes pero no seriamente',
    bars: 2,
  },
  { id: 'intermediate', title: 'Intermedio', description: 'He hecho ejercicio con regularidad', bars: 3 },
  { id: 'advanced', title: 'Avanzado', description: 'Llevo años haciendo ejercicio', bars: 4 },
];

export const PLAN_TIERS: {
  id: PlanTier;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 'Gratis',
    features: ['Plan de entrenamiento semanal', 'Dieta general', 'Seguimiento básico'],
  },
  {
    id: 'intermediate',
    name: 'Intermedio',
    price: '$9.99/mes',
    features: ['Todo lo Básico', 'Coach IA personalizado', 'Recordatorios inteligentes'],
    highlighted: true,
  },
  {
    id: 'advanced',
    name: 'Avanzado',
    price: '$19.99/mes',
    features: ['Todo lo Intermedio', 'Análisis de progreso con fotos', 'Soporte prioritario'],
  },
];

export const WEEK_DAYS: { key: string; label: string; emoji: string }[] = [
  { key: 'sun', label: 'Domingo', emoji: '🏆' },
  { key: 'mon', label: 'Lunes', emoji: '🌅' },
  { key: 'tue', label: 'Martes', emoji: '🔥' },
  { key: 'wed', label: 'Miércoles', emoji: '🚀' },
  { key: 'thu', label: 'Jueves', emoji: '💥' },
  { key: 'fri', label: 'Viernes', emoji: '⚡' },
  { key: 'sat', label: 'Sábado', emoji: '💪' },
];

export const DEFAULT_REMINDER_TIME = { hour: 9, minute: 0 };
