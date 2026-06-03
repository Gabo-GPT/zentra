import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_REMINDER_TIME, WEEK_DAYS } from '@/constants/onboarding';
import type {
  DayReminder,
  ExperienceLevel,
  Gender,
  HeightUnit,
  OnboardingProfile,
  PlanTier,
  WeightUnit,
} from '@/types/onboarding';

const defaultReminders = (): Record<string, DayReminder> => {
  const map: Record<string, DayReminder> = {};
  for (const day of WEEK_DAYS) {
    map[day.key] = {
      enabled: ['sun', 'mon', 'wed', 'fri'].includes(day.key),
      ...DEFAULT_REMINDER_TIME,
    };
  }
  return map;
};

const defaultProfile: OnboardingProfile = {
  gender: null,
  heightCm: 178,
  heightUnit: 'cm',
  weightKg: 70,
  weightUnit: 'kg',
  experience: 'beginner',
  trainingDaysPerWeek: 4,
  reminders: defaultReminders(),
  selectedPlan: null,
};

interface OnboardingState extends OnboardingProfile {
  hasCompletedOnboarding: boolean;
  setGender: (gender: Gender) => void;
  setHeight: (cm: number, unit: HeightUnit) => void;
  setWeight: (kg: number, unit: WeightUnit) => void;
  setExperience: (level: ExperienceLevel) => void;
  setTrainingDaysPerWeek: (days: number) => void;
  setReminder: (dayKey: string, patch: Partial<DayReminder>) => void;
  setSelectedPlan: (plan: PlanTier) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...defaultProfile,
      hasCompletedOnboarding: false,
      setGender: (gender) => set({ gender }),
      setHeight: (heightCm, heightUnit) => set({ heightCm, heightUnit }),
      setWeight: (weightKg, weightUnit) => set({ weightKg, weightUnit }),
      setExperience: (experience) => set({ experience }),
      setTrainingDaysPerWeek: (trainingDaysPerWeek) => set({ trainingDaysPerWeek }),
      setReminder: (dayKey, patch) =>
        set((state) => ({
          reminders: {
            ...state.reminders,
            [dayKey]: { ...state.reminders[dayKey], ...patch },
          },
        })),
      setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () =>
        set({
          ...defaultProfile,
          reminders: defaultReminders(),
          hasCompletedOnboarding: false,
        }),
    }),
    {
      name: 'nicofitness-onboarding',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        gender: state.gender,
        heightCm: state.heightCm,
        heightUnit: state.heightUnit,
        weightKg: state.weightKg,
        weightUnit: state.weightUnit,
        experience: state.experience,
        trainingDaysPerWeek: state.trainingDaysPerWeek,
        reminders: state.reminders,
        selectedPlan: state.selectedPlan,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    },
  ),
);

/** Calcula IMC a partir del peso en kg y altura en cm. */
export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  if (heightM <= 0) return 0;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Bajo peso', color: '#3B82F6' };
  if (bmi < 25) return { label: 'Normal', color: '#22C55E' };
  if (bmi < 30) return { label: 'Sobrepeso', color: '#EAB308' };
  if (bmi < 35) return { label: 'Obeso', color: '#F97316' };
  return { label: 'Extremadamente obeso', color: '#EF4444' };
}
