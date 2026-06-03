import { Text, View } from 'react-native';
import Toast, { type BaseToastProps } from 'react-native-toast-message';

import { colors } from '@/constants/theme';

function ToastCardView({
  accentColor,
  title,
  message,
}: {
  accentColor: string;
  title: string;
  message?: string;
}) {
  return (
    <View
      style={{
        width: '92%',
        alignSelf: 'center',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceElevated,
        overflow: 'hidden',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
      }}>
      <View style={{ width: 4, backgroundColor: accentColor }} />
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 14 }}>
        <Text
          style={{
            fontFamily: 'Inter_600SemiBold',
            fontSize: 15,
            color: colors.foreground,
          }}>
          {title}
        </Text>
        {message ? (
          <Text
            style={{
              fontFamily: 'Inter_400Regular',
              fontSize: 13,
              color: colors.muted,
              marginTop: 4,
              lineHeight: 18,
            }}>
            {message}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export const toastConfig = {
  error: (props: BaseToastProps) => (
    <ToastCardView
      accentColor={colors.danger}
      title={props.text1 ?? 'Error'}
      message={props.text2}
    />
  ),
  success: (props: BaseToastProps) => (
    <ToastCardView
      accentColor={colors.success}
      title={props.text1 ?? 'Listo'}
      message={props.text2}
    />
  ),
  info: (props: BaseToastProps) => (
    <ToastCardView
      accentColor={colors.primary}
      title={props.text1 ?? 'NICOFITNESS'}
      message={props.text2}
    />
  ),
};

export function showErrorToast(title: string, message?: string) {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 4200,
    topOffset: 56,
  });
}

export function showSuccessToast(title: string, message?: string) {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3200,
    topOffset: 56,
  });
}

export function showInfoToast(title: string, message?: string) {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    topOffset: 56,
  });
}
