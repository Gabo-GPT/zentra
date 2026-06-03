# Generar APK de NICOFITNESS (para mostrar al cliente)

La forma más rápida **sin instalar Android Studio** es **EAS Build** (compila en la nube de Expo y te da un enlace para descargar el `.apk`).

## Requisitos

- Cuenta gratis en [expo.dev](https://expo.dev/signup)
- Internet estable (la build tarda ~15–25 minutos la primera vez)

## Pasos (PowerShell)

### 1. Ir al proyecto

```powershell
cd E:\zentra\nicofitness
```

### 2. Iniciar sesión en Expo

```powershell
npx eas-cli login
```

Introduce email y contraseña de tu cuenta Expo.

### 3. Vincular el proyecto (solo la primera vez)

```powershell
npx eas-cli init
```

- Elige crear o vincular el proyecto **nicofitness**
- Copia el **Project ID** que te muestre y pégalo en `.env`:

```env
EXPO_PUBLIC_EAS_PROJECT_ID=tu-project-id-aqui
```

### 4. Subir variables de entorno (Firebase + Gemini)

Sin esto, la app instalada no conectará con Firebase ni la IA.

Sustituye los valores por los de tu archivo `.env`:

```powershell
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_API_KEY --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_PROJECT_ID --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_FIREBASE_APP_ID --value "TU_VALOR" --visibility plaintext
npx eas-cli env:create --environment preview --name EXPO_PUBLIC_GEMINI_API_KEY --value "TU_VALOR" --visibility secret
```

### 5. Generar el APK

```powershell
npm run build:apk
```

(o directamente: `npx eas-cli build -p android --profile preview`)

- Responde las preguntas si las hay (keystore: deja que **Expo genere** la clave la primera vez)
- Al terminar verás una **URL** en la terminal y en [expo.dev](https://expo.dev) → tu proyecto → **Builds**

### 6. Instalar en el móvil del cliente

1. Abre la URL del build en el teléfono Android
2. Descarga el `.apk`
3. Permite **instalar apps de orígenes desconocidos** si Android lo pide
4. Instala y abre **NICOFITNESS**

## Alternativa rápida para la reunión (sin APK)

Si no da tiempo la build en la nube:

1. `npx expo start` en el PC
2. Mismo Wi‑Fi que el móvil
3. **Expo Go** + escanear QR

Así muestras la app igual, pero necesitas tu PC encendido con Metro.

## Problemas frecuentes

| Problema | Solución |
|----------|----------|
| `Not logged in` | `npx eas-cli login` |
| Firebase no funciona en el APK | Revisa paso 4 (variables en EAS) y vuelve a hacer build |
| La cámara no abre | En el móvil, Ajustes → Apps → NICOFITNESS → Permisos → Cámara |
| Build falla por iconos | Comprueba que existan los PNG en `src/assets/images/` |

## Builds siguientes

Cada cambio importante:

```powershell
npm run build:apk
```

Nueva URL de descarga en expo.dev.
