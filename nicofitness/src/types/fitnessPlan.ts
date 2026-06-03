/**
 * Plan de fitness generado por el Coach IA (Gemini).
 */
export interface FitnessPlan {
  fatPercentageEstimate: string;
  analysis: string;
  diet: string[];
  trainingPlan: string[];
}

/** Códigos de error estables para lógica en UI (toasts, reintentos, etc.). */
export type AiServiceErrorCode =
  | 'MISSING_API_KEY'
  | 'INVALID_IMAGE'
  | 'API_ERROR'
  | 'CONTENT_BLOCKED'
  | 'PARSE_ERROR'
  | 'NETWORK_ERROR'
  | 'EMPTY_RESPONSE'
  | 'UNKNOWN';

export interface AiServiceError {
  code: AiServiceErrorCode;
  /** Mensaje legible para mostrar al usuario. */
  message: string;
  /** Detalle técnico opcional (logs / soporte). */
  details?: string;
}

export type GenerateFitnessPlanResult =
  | { success: true; data: FitnessPlan }
  | { success: false; error: AiServiceError };
