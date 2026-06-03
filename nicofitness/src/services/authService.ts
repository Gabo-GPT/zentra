import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';

import { getFirebaseAuth } from '@/services/firebase';

export interface AuthCredentials {
  email: string;
  password: string;
}

const FIREBASE_AUTH_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'Este correo ya está registrado. Inicia sesión.',
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/operation-not-allowed':
    'Activa Email/Password en Firebase Console → Authentication → Sign-in method.',
  'auth/configuration-not-found':
    'Authentication no está configurado en Firebase. Entra a Console → Authentication → Comenzar → activa Correo/Contraseña.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con este correo.',
  'auth/wrong-password': 'Contraseña incorrecta.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet.',
};

/**
 * Convierte errores de Firebase Auth en mensajes legibles para la UI.
 */
export function mapAuthError(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String((error as { code: string }).code);
    if (FIREBASE_AUTH_MESSAGES[code]) {
      return FIREBASE_AUTH_MESSAGES[code];
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'No se pudo completar la autenticación. Inténtalo de nuevo.';
}

/**
 * Registra un usuario con correo y contraseña.
 */
export async function signUpWithEmail({ email, password }: AuthCredentials): Promise<User> {
  const auth = getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  return credential.user;
}

/**
 * Inicia sesión con correo y contraseña.
 */
export async function signInWithEmail({ email, password }: AuthCredentials): Promise<User> {
  const auth = getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );
  return credential.user;
}

/**
 * Cierra la sesión actual.
 */
export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  await firebaseSignOut(auth);
}
