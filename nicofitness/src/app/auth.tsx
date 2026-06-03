import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cardShadowStyle } from '@/components/plan/cardStyles';
import { AuthTextInput } from '@/components/ui/AuthTextInput';
import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useAuth } from '@/hooks/useAuth';
import { useHaptics } from '@/hooks/useHaptics';
import { notifyError, notifySuccess } from '@/lib/feedback';
import { mapAuthError } from '@/services/authService';
import { isFirebaseConfigured } from '@/services/firebase';

const FIREBASE_PROJECT_ID = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '(no cargado)';

type AuthMode = 'login' | 'register';

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const haptics = useHaptics();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'login';
  const firebaseReady = isFirebaseConfigured();

  const handleSubmit = async () => {
    if (!firebaseReady) {
      await notifyError(
        haptics,
        'Firebase no configurado',
        'Añade las claves EXPO_PUBLIC_FIREBASE_* en tu archivo .env',
      );
      return;
    }

    if (!email.trim() || !password) {
      await notifyError(haptics, 'Campos incompletos', 'Introduce correo y contraseña.');
      return;
    }

    if (password.length < 6) {
      await notifyError(
        haptics,
        'Contraseña débil',
        'La contraseña debe tener al menos 6 caracteres.',
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await haptics.button();

      if (isLogin) {
        await signInWithEmail({ email, password });
        await notifySuccess(haptics, '¡Bienvenido!', 'Sesión iniciada correctamente.');
      } else {
        await signUpWithEmail({ email, password });
        await notifySuccess(haptics, 'Cuenta creada', 'Tu perfil NICOFITNESS está listo.');
      }
    } catch (error) {
      await notifyError(haptics, isLogin ? 'Error al iniciar sesión' : 'Error al registrarse', mapAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = async () => {
    await haptics.light();
    setMode((current) => (current === 'login' ? 'register' : 'login'));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(420).springify().damping(20)}>
          <Typography variant="label">NICOFITNESS</Typography>
          <Typography variant="title" className="mt-sm">
            {isLogin ? 'Inicia sesión' : 'Crea tu cuenta'}
          </Typography>
          <Typography variant="body" className="mt-sm leading-6">
            {isLogin
              ? 'Accede para guardar tu progreso y recibir planes personalizados con IA.'
              : 'Regístrate para comparar tu evolución semana a semana con precisión.'}
          </Typography>

          <View
            className="mt-xl gap-md rounded-card border border-border bg-surface p-lg"
            style={cardShadowStyle}>
            <AuthTextInput
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              placeholder="tu@email.com"
            />
            <AuthTextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType={isLogin ? 'password' : 'newPassword'}
              autoComplete={isLogin ? 'password' : 'password-new'}
              placeholder="Mínimo 6 caracteres"
            />

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`mt-sm items-center rounded-card bg-primary py-md active:opacity-85 ${isSubmitting ? 'opacity-60' : ''}`}>
              {isSubmitting ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Typography
                  style={{ fontFamily: fontFamily.semibold, color: colors.background }}
                  className="text-base">
                  {isLogin ? 'Entrar' : 'Registrarme'}
                </Typography>
              )}
            </Pressable>
          </View>

          <Pressable onPress={toggleMode} className="mt-lg items-center active:opacity-70">
            <Typography variant="body" className="text-primary">
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </Typography>
          </Pressable>

          {!firebaseReady ? (
            <View className="mt-lg rounded-card border border-warning/40 bg-warning/10 p-md">
              <Typography variant="caption" className="text-center leading-5 text-warning">
                Configura Firebase en `.env` y activa Email/Password en Firebase Console →
                Authentication → Sign-in method.
              </Typography>
            </View>
          ) : (
            <View className="mt-lg gap-sm rounded-card border border-border bg-surface-elevated p-md">
              <Typography variant="caption" className="text-center leading-5 text-subtle">
                Si ves «configuration-not-found»: Firebase Console → Authentication →
                Comenzar → Correo/Contraseña → Habilitar → Guardar.
              </Typography>
              <Typography variant="caption" className="text-center text-subtle">
                Proyecto: {FIREBASE_PROJECT_ID}
              </Typography>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
