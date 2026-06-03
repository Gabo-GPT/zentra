export { apiRequest, ApiError } from './apiClient';
export { generateFitnessPlan } from './aiService';
export {
  getFirebaseApp,
  getFirebaseAuth,
  getFirebaseStorage,
  isFirebaseConfigured,
} from './firebase';
export {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  mapAuthError,
} from './authService';
export type { AuthCredentials } from './authService';
export { resizeProgressPhoto, uploadProgressPhoto } from './storageService';
export type { ProgressPose, UploadProgressPhotoResult } from './storageService';
export type {
  FitnessPlan,
  GenerateFitnessPlanResult,
  AiServiceError,
  AiServiceErrorCode,
} from '@/types/fitnessPlan';