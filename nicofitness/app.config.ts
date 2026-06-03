import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'NICOFITNESS',
  slug: 'nicofitness',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  scheme: 'nicofitness',
  userInterfaceStyle: 'dark',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.nicofitness.app',
    infoPlist: {
      NSCameraUsageDescription:
        'NICOFITNESS usa la cámara para capturar tu progreso físico y generar tu plan personalizado.',
      NSPhotoLibraryUsageDescription:
        'NICOFITNESS necesita acceso a tus fotos para guardar y analizar tu progreso.',
    },
  },
  android: {
    package: 'com.nicofitness.app',
    adaptiveIcon: {
      backgroundColor: '#0A0A0F',
      foregroundImage: './src/assets/images/android-icon-foreground.png',
      backgroundImage: './src/assets/images/android-icon-background.png',
      monochromeImage: './src/assets/images/android-icon-monochrome.png',
    },
    permissions: ['CAMERA', 'READ_MEDIA_IMAGES', 'INTERNET'],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#0A0A0F',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission:
          'Permite a NICOFITNESS usar la cámara para registrar tu progreso corporal.',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId:
        process.env.EXPO_PUBLIC_EAS_PROJECT_ID ?? '810ce369-f822-48c1-a408-05173d15a6c0',
    },
  },
};

export default config;
