import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIResponseError,
  SchemaType,
  type InlineDataPart,
  type Part,
  type ResponseSchema,
} from '@google/generative-ai';

import type {
  AiServiceError,
  AiServiceErrorCode,
  FitnessPlan,
  GenerateFitnessPlanResult,
} from '@/types/fitnessPlan';

const GEMINI_MODEL = 'gemini-2.0-flash';
const REQUEST_TIMEOUT_MS = 90_000;

const TRAINER_SYSTEM_PROMPT = `Eres un entrenador personal y nutricionista deportivo certificado con más de 15 años de experiencia.
Analiza las dos fotografías corporales del usuario (vista frontal y vista de espalda).

Tu tarea:
1. Evaluar la estructura física visible (proporciones, postura, desarrollo muscular aparente).
2. Estimar un rango de porcentaje de grasa corporal (ej. "18-22%") basándote solo en lo observable. Indica que es una estimación visual, no un diagnóstico médico.
3. Redactar un análisis breve, motivador y profesional en español.
4. Proponer una dieta diaria detallada (desayuno, almuerzo, cena y snacks si aplica) adaptada al objetivo de recomposición corporal.
5. Diseñar un plan de entrenamiento semanal con ejercicios concretos (series/repeticiones o tiempo cuando aplique).

Reglas:
- Responde ÚNICAMENTE con JSON válido, sin markdown ni texto adicional.
- Los arrays "diet" y "trainingPlan" deben tener al menos 3 elementos cada uno.
- Usa español en todos los textos.
- No inventes condiciones médicas; recomienda consultar a un profesional de salud cuando sea pertinente.`;

const FITNESS_PLAN_JSON_SCHEMA: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    fatPercentageEstimate: {
      type: SchemaType.STRING,
      description: 'Rango estimado de grasa corporal, ej. "20-24%"',
    },
    analysis: {
      type: SchemaType.STRING,
      description: 'Análisis físico y recomendaciones generales',
    },
    diet: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Comidas y pautas nutricionales del día',
    },
    trainingPlan: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Ejercicios y rutina propuesta',
    },
  },
  required: ['fatPercentageEstimate', 'analysis', 'diet', 'trainingPlan'],
};

const USER_FRIENDLY_MESSAGES: Record<AiServiceErrorCode, string> = {
  MISSING_API_KEY:
    'Falta configurar la clave de Gemini. Añade EXPO_PUBLIC_GEMINI_API_KEY en tu archivo .env.',
  INVALID_IMAGE:
    'No pudimos procesar una de las fotos. Vuelve a capturarlas con buena luz y encuadre.',
  API_ERROR:
    'El servicio de IA no está disponible en este momento. Inténtalo de nuevo en unos minutos.',
  CONTENT_BLOCKED:
    'No pudimos analizar estas imágenes por políticas de seguridad. Usa fotos de progreso fitness estándar.',
  PARSE_ERROR:
    'Recibimos una respuesta inesperada del coach. Por favor, intenta de nuevo.',
  NETWORK_ERROR:
    'Sin conexión estable. Revisa tu internet e inténtalo otra vez.',
  EMPTY_RESPONSE: 'El coach no devolvió un plan. Intenta de nuevo.',
  UNKNOWN: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
};

/**
 * Convierte una URI de imagen en un {@link Part} multimodal (`inlineData`) para Gemini.
 *
 * Formatos admitidos:
 * - Data URI: `data:image/jpeg;base64,...`
 * - Cadena base64 pura (se asume JPEG)
 * - URI local: `file://` o `content://` (típico de expo-camera; se lee vía `fetch`)
 */
async function imageUriToGenerativePart(imageUri: string): Promise<InlineDataPart> {
  const trimmed = imageUri.trim();
  if (!trimmed) {
    throw createInternalError('INVALID_IMAGE', 'La URI de imagen está vacía.');
  }

  const dataUriMatch = trimmed.match(/^data:([^;]+);base64,(.+)$/i);
  if (dataUriMatch) {
    return {
      inlineData: {
        mimeType: dataUriMatch[1],
        data: dataUriMatch[2],
      },
    };
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return fetchRemoteImageAsPart(trimmed);
  }

  if (trimmed.startsWith('file://') || trimmed.startsWith('content://')) {
    return fetchLocalImageAsPart(trimmed);
  }

  if (/^[A-Za-z0-9+/=]+$/.test(trimmed) && trimmed.length > 64) {
    return {
      inlineData: {
        mimeType: 'image/jpeg',
        data: trimmed,
      },
    };
  }

  throw createInternalError(
    'INVALID_IMAGE',
    `Formato de imagen no soportado: ${trimmed.slice(0, 32)}...`,
  );
}

async function fetchLocalImageAsPart(uri: string): Promise<InlineDataPart> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw createInternalError('INVALID_IMAGE', `No se pudo leer la imagen local (${response.status}).`);
  }
  return blobToGenerativePart(await response.blob());
}

async function fetchRemoteImageAsPart(url: string): Promise<InlineDataPart> {
  const response = await fetch(url);
  if (!response.ok) {
    throw createInternalError('INVALID_IMAGE', `No se pudo descargar la imagen (${response.status}).`);
  }
  return blobToGenerativePart(await response.blob());
}

async function blobToGenerativePart(blob: Blob): Promise<InlineDataPart> {
  const base64 = await blobToBase64(blob);
  return {
    inlineData: {
      mimeType: blob.type || 'image/jpeg',
      data: base64,
    },
  };
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('FileReader no devolvió una cadena.'));
        return;
      }
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error('Error al leer la imagen.'));
    reader.readAsDataURL(blob);
  });
}

function createInternalError(code: AiServiceErrorCode, details: string): Error {
  const err = new Error(details);
  (err as Error & { code: AiServiceErrorCode }).code = code;
  return err;
}

function getApiKey(): string | undefined {
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY?.trim();
}

function buildError(code: AiServiceErrorCode, details?: string): AiServiceError {
  return {
    code,
    message: USER_FRIENDLY_MESSAGES[code],
    details,
  };
}

function fail(code: AiServiceErrorCode, details?: string): GenerateFitnessPlanResult {
  return { success: false, error: buildError(code, details) };
}

/**
 * Valida y normaliza el JSON devuelto por Gemini.
 */
function parseFitnessPlanPayload(raw: string): FitnessPlan {
  let parsed: unknown;
  try {
    const sanitized = raw
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '');
    parsed = JSON.parse(sanitized);
  } catch {
    throw createInternalError('PARSE_ERROR', 'JSON inválido en la respuesta del modelo.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw createInternalError('PARSE_ERROR', 'La respuesta no es un objeto JSON.');
  }

  const record = parsed as Record<string, unknown>;
  const fatPercentageEstimate = record.fatPercentageEstimate;
  const analysis = record.analysis;
  const diet = record.diet;
  const trainingPlan = record.trainingPlan;

  if (typeof fatPercentageEstimate !== 'string' || !fatPercentageEstimate.trim()) {
    throw createInternalError('PARSE_ERROR', 'fatPercentageEstimate ausente o inválido.');
  }
  if (typeof analysis !== 'string' || !analysis.trim()) {
    throw createInternalError('PARSE_ERROR', 'analysis ausente o inválido.');
  }
  if (!Array.isArray(diet) || diet.length === 0 || !diet.every((item) => typeof item === 'string')) {
    throw createInternalError('PARSE_ERROR', 'diet debe ser un array de strings no vacío.');
  }
  if (
    !Array.isArray(trainingPlan) ||
    trainingPlan.length === 0 ||
    !trainingPlan.every((item) => typeof item === 'string')
  ) {
    throw createInternalError('PARSE_ERROR', 'trainingPlan debe ser un array de strings no vacío.');
  }

  return {
    fatPercentageEstimate: fatPercentageEstimate.trim(),
    analysis: analysis.trim(),
    diet: diet.map((item) => String(item).trim()).filter(Boolean),
    trainingPlan: trainingPlan.map((item) => String(item).trim()).filter(Boolean),
  };
}

function mapCaughtError(error: unknown): GenerateFitnessPlanResult {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: AiServiceErrorCode }).code;
    if (code in USER_FRIENDLY_MESSAGES) {
      return fail(code, error instanceof Error ? error.message : undefined);
    }
  }

  if (error instanceof GoogleGenerativeAIFetchError) {
    const isNetwork =
      error.message.toLowerCase().includes('network') ||
      error.message.toLowerCase().includes('fetch') ||
      error.status === 0;
    return fail(
      isNetwork ? 'NETWORK_ERROR' : 'API_ERROR',
      `HTTP ${error.status ?? '?'}: ${error.message}`,
    );
  }

  if (error instanceof GoogleGenerativeAIResponseError) {
    return fail('CONTENT_BLOCKED', error.message);
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return fail('NETWORK_ERROR', 'Tiempo de espera agotado.');
    }
    return fail('UNKNOWN', error.message);
  }

  return fail('UNKNOWN');
}

/**
 * Genera un plan de fitness personalizado analizando fotos frontal y posterior con Gemini.
 *
 * @param photoFront - URI de la foto frontal. Admite:
 *   - Data URI base64 (`data:image/jpeg;base64,...`)
 *   - Cadena base64 pura
 *   - URI local de expo-camera (`file://`, `content://`)
 * @param photoBack - URI de la foto de espalda (mismos formatos que `photoFront`)
 * @returns Resultado discriminado: `{ success: true, data }` o `{ success: false, error }`
 *   con mensajes amigables listos para la UI.
 *
 * @example
 * ```ts
 * const result = await generateFitnessPlan(frontUri, backUri);
 * if (result.success) {
 *   console.log(result.data.trainingPlan);
 * } else {
 *   Alert.alert('Coach IA', result.error.message);
 * }
 * ```
 */
export async function generateFitnessPlan(
  photoFront: string,
  photoBack: string,
): Promise<GenerateFitnessPlanResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return fail('MISSING_API_KEY');
  }

  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const [frontPart, backPart] = await Promise.all([
      imageUriToGenerativePart(photoFront),
      imageUriToGenerativePart(photoBack),
    ]);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: TRAINER_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 4096,
        responseMimeType: 'application/json',
        responseSchema: FITNESS_PLAN_JSON_SCHEMA,
      },
    });

    const userParts: Part[] = [
      { text: 'Foto 1 — vista frontal del usuario:' },
      frontPart,
      { text: 'Foto 2 — vista de espalda del usuario:' },
      backPart,
      {
        text: 'Genera el plan en el JSON solicitado. Sé específico en dieta y entrenamiento.',
      },
    ];

    const result = await model.generateContent(
      { contents: [{ role: 'user', parts: userParts }] },
      { signal: abortController.signal },
    );

    const feedback = result.response.promptFeedback;
    if (feedback?.blockReason) {
      return fail('CONTENT_BLOCKED', feedback.blockReasonMessage ?? feedback.blockReason);
    }

    const text = result.response.text();
    if (!text?.trim()) {
      return fail('EMPTY_RESPONSE');
    }

    const plan = parseFitnessPlanPayload(text);
    return { success: true, data: plan };
  } catch (error) {
    return mapCaughtError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}

export type { FitnessPlan, GenerateFitnessPlanResult, AiServiceError } from '@/types/fitnessPlan';
