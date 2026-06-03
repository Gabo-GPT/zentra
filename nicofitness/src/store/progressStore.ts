import { create } from 'zustand';

import type { FitnessPlan } from '@/types/fitnessPlan';

export type CaptureStep = 'front' | 'back';
export type ProgressFlowStatus =
  | 'idle'
  | 'capturing'
  | 'uploading'
  | 'analyzing'
  | 'success'
  | 'error';

interface CapturedPhoto {
  localUri: string;
  downloadUrl: string | null;
}

interface ProgressState {
  captureStep: CaptureStep;
  status: ProgressFlowStatus;
  frontPhoto: CapturedPhoto | null;
  backPhoto: CapturedPhoto | null;
  fitnessPlan: FitnessPlan | null;
  statusMessage: string | null;
  errorMessage: string | null;
  setCaptureStep: (step: CaptureStep) => void;
  setStatus: (status: ProgressFlowStatus, message?: string | null) => void;
  setFrontPhoto: (photo: CapturedPhoto) => void;
  setBackPhoto: (photo: CapturedPhoto) => void;
  setFitnessPlan: (plan: FitnessPlan) => void;
  setError: (message: string) => void;
  resetSession: () => void;
}

const initialState = {
  captureStep: 'front' as CaptureStep,
  status: 'idle' as ProgressFlowStatus,
  frontPhoto: null,
  backPhoto: null,
  fitnessPlan: null,
  statusMessage: null,
  errorMessage: null,
};

/**
 * Estado de la sesión de captura (fotos locales/URLs y plan generado).
 */
export const useProgressStore = create<ProgressState>((set) => ({
  ...initialState,
  setCaptureStep: (step) => set({ captureStep: step }),
  setStatus: (status, message = null) =>
    set({ status, statusMessage: message, errorMessage: null }),
  setFrontPhoto: (photo) => set({ frontPhoto: photo, captureStep: 'back' }),
  setBackPhoto: (photo) => set({ backPhoto: photo }),
  setFitnessPlan: (plan) => set({ fitnessPlan: plan, status: 'success' }),
  setError: (message) => set({ status: 'error', errorMessage: message }),
  resetSession: () => set(initialState),
}));
