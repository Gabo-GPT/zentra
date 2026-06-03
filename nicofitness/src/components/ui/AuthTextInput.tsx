import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';

interface AuthTextInputProps extends TextInputProps {
  label: string;
}

/**
 * Campo de texto estilizado para pantallas de autenticación (dark mode).
 */
export function AuthTextInput({ label, className = '', ...props }: AuthTextInputProps) {
  return (
    <View className="gap-xs">
      <Typography variant="caption" className="text-subtle">
        {label}
      </Typography>
      <TextInput
        placeholderTextColor={colors.subtle}
        className={`rounded-card border border-border bg-surface-elevated px-md py-md text-base text-foreground ${className}`}
        style={{ fontFamily: fontFamily.regular }}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
}
