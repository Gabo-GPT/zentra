import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Indica si las variables de Firebase están presentes en `.env`.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.appId,
  );
}

/**
 * Obtiene (o inicializa) la instancia de Firebase App.
 */
export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase no está configurado. Completa las variables EXPO_PUBLIC_FIREBASE_* en .env',
    );
  }

  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }

  return getApp();
}

/**
 * Instancia de Firebase Storage lista para subir fotos de progreso.
 */
export function getFirebaseStorage(): FirebaseStorage {
  return getStorage(getFirebaseApp());
}

let authInstance: Auth | null = null;

/**
 * Firebase Auth. Usa `getAuth` (estable en Expo Go).
 * La sesión puede persistir según la plataforma; evitamos `initializeAuth` + RN bundle
 * que provocaba crashes en algunos dispositivos.
 */
export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured()) {
    throw new Error(
      'Firebase no está configurado. Completa las variables EXPO_PUBLIC_FIREBASE_* en .env',
    );
  }

  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }

  return authInstance;
}
