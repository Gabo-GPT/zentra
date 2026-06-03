# Corregir `auth/configuration-not-found`

Este error **no es un bug de la app**. Firebase indica que **Authentication no está inicializado** en el proyecto.

## Checklist (hazlo en este orden)

### 1. Activar Authentication (obligatorio)

1. [Firebase Console](https://console.firebase.google.com/project/nicofitness-e4bf6/authentication)
2. Si aparece **Comenzar** / **Get started** → pulsa ahí.
3. Pestaña **Sign-in method** / **Método de acceso**.
4. **Correo/Contraseña** → **Habilitar** (interruptor superior) → **Guardar**.
5. Debe verse **Habilitado** en verde.

### 2. Activar API en Google Cloud

1. [Identity Toolkit API](https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=nicofitness-e4bf6)
2. Pulsa **Habilitar** / **Enable**.

### 3. Verificar que la app usa el proyecto correcto

En la pantalla de login, abajo debe decir:

`Proyecto: nicofitness-e4bf6`

Si dice `(no cargado)`:

```powershell
cd E:\zentra\nicofitness
npx expo start -c
```

### 4. Probar de nuevo

- Recarga Expo Go (**Reload**).
- **Registrarme** con correo + contraseña (mín. 6 caracteres).
- En [Authentication → Users](https://console.firebase.google.com/project/nicofitness-e4bf6/authentication/users) debe aparecer el usuario.

## Enlace directo a tu proyecto

- Authentication: https://console.firebase.google.com/project/nicofitness-e4bf6/authentication/providers
