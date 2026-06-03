import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { getFirebaseStorage, isFirebaseConfigured } from '@/services/firebase';

export type ProgressPose = 'front' | 'back';

const MAX_UPLOAD_WIDTH = 800;

export interface UploadProgressPhotoResult {
  localUri: string;
  downloadUrl: string | null;
  storagePath: string | null;
}

/**
 * Redimensiona una foto a un ancho máximo (800 px) para optimizar subida y análisis IA.
 */
export async function resizeProgressPhoto(uri: string): Promise<string> {
  const result = await manipulateAsync(
    uri,
    [{ resize: { width: MAX_UPLOAD_WIDTH } }],
    {
      compress: 0.85,
      format: SaveFormat.JPEG,
    },
  );
  return result.uri;
}

/**
 * Sube una foto de progreso a `users/{userId}/progress/{timestamp}_{pose}.jpg`.
 * `userId` debe ser el UID de Firebase Auth del usuario autenticado.
 * Si Firebase no está configurado, devuelve solo la URI local optimizada.
 */
export async function uploadProgressPhoto(
  userId: string,
  pose: ProgressPose,
  sourceUri: string,
): Promise<UploadProgressPhotoResult> {
  const localUri = await resizeProgressPhoto(sourceUri);

  if (!isFirebaseConfigured()) {
    return {
      localUri,
      downloadUrl: null,
      storagePath: null,
    };
  }

  const timestamp = Date.now();
  const storagePath = `users/${userId}/progress/${timestamp}_${pose}.jpg`;
  const storageRef = ref(getFirebaseStorage(), storagePath);

  const response = await fetch(localUri);
  if (!response.ok) {
    throw new Error('No se pudo leer la imagen para subir a Firebase.');
  }

  const blob = await response.blob();
  await uploadBytes(storageRef, blob, {
    contentType: 'image/jpeg',
    customMetadata: {
      pose,
      uploadedAt: new Date(timestamp).toISOString(),
    },
  });

  const downloadUrl = await getDownloadURL(storageRef);

  return {
    localUri,
    downloadUrl,
    storagePath,
  };
}
