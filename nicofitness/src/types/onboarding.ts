export type Gender = 'male' | 'female';

export type ExperienceLevel = 'novice' | 'beginner' | 'intermediate' | 'advanced';

export type PlanTier = 'basic' | 'intermediate' | 'advanced';

export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lb';

export interface DayReminder {
  enabled: boolean;
  hour: number;
  minute: number;
}

export interface OnboardingProfile {
  gender: Gender | null;
  heightCm: number;
  heightUnit: HeightUnit;
  weightKg: number;
  weightUnit: WeightUnit;
  experience: ExperienceLevel | null;
  trainingDaysPerWeek: number;
  reminders: Record<string, DayReminder>;
  selectedPlan: PlanTier | null;
}
