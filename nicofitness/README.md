# NICOFITNESS

App móvil de fitness (iOS / Android) con **Expo**, **TypeScript**, **Expo Router**, **NativeWind** y arquitectura modular.

## Estructura

```
nicofitness/
├── app.config.ts          # Config iOS / Android
├── global.css             # Tailwind / NativeWind
├── tailwind.config.js
├── metro.config.js
├── babel.config.js
└── src/
    ├── app/               # Rutas (Expo Router)
    ├── components/
    ├── constants/         # Tema y tokens
    ├── hooks/
    ├── providers/
    ├── services/
    ├── store/
    └── assets/
```

## Variables de entorno

Copia `.env.example` a `.env` y completa las claves.

## Autenticación (Firebase Auth)

> **Obligatorio:** En [Firebase Console](https://console.firebase.google.com/) abre tu proyecto → **Build** → **Authentication** → pestaña **Sign-in method** → activa el proveedor **Email/Password** (interruptor en *Enabled*). Sin ese paso, el registro y el login desde la app fallarán aunque el `.env` esté correcto.

1. Activa **Email/Password** en la consola (paso anterior).
2. Completa todas las variables `EXPO_PUBLIC_FIREBASE_*` en `.env` (copia desde *Project settings* → *Your apps*).
3. La sesión persiste en el dispositivo (AsyncStorage); no hace falta volver a loguearse en cada apertura.
4. Las fotos de progreso se guardan en `users/{firebaseUid}/progress/`.

## Scripts

| Comando        | Descripción        |
|----------------|--------------------|
| `npm start`    | Servidor Expo      |
| `npm run ios`  | Simulador iOS      |
| `npm run android` | Emulador Android |
