import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text, TextInput, View } from 'react-native';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import '../../global.css';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { colors } from '@/constants/theme';
import { defaultTextStyle } from '@/constants/typography';
import { AppProviders } from '@/providers/AppProviders';
import { AuthProvider } from '@/providers/AuthProvider';
import { toastConfig } from '@/lib/toast';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.foreground,
    border: colors.border,
    notification: colors.accent,
  },
};

function applyGlobalTypography() {
  const textDefaults = (Text as unknown as { defaultProps?: { style?: object } }).defaultProps ?? {};
  (Text as unknown as { defaultProps: { style?: object } }).defaultProps = {
    ...textDefaults,
    style: [defaultTextStyle, textDefaults.style],
  };

  const inputDefaults =
    (TextInput as unknown as { defaultProps?: { style?: object } }).defaultProps ?? {};
  (TextInput as unknown as { defaultProps: { style?: object } }).defaultProps = {
    ...inputDefaults,
    style: [defaultTextStyle, inputDefaults.style],
  };
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      applyGlobalTypography();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View className="flex-1 bg-background" />;
  }

  return (
    <AppProviders>
      <AuthProvider>
        <ThemeProvider value={navigationTheme}>
          <StatusBar style="light" />
          <AuthGuard>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.surface },
                headerTintColor: colors.foreground,
                contentStyle: { backgroundColor: colors.background },
                animation: 'fade',
                animationDuration: 280,
                gestureEnabled: true,
              }}>
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </AuthGuard>
          <Toast config={toastConfig} />
        </ThemeProvider>
      </AuthProvider>
    </AppProviders>
  );
}
