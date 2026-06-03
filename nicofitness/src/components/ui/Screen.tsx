import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * Contenedor base con fondo oscuro y safe area.
 */
export function Screen({
  children,
  className = '',
  contentClassName = 'flex-1 px-md',
  edges = ['top', 'bottom'],
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-background ${className}`}>
      <View className={contentClassName}>{children}</View>
    </SafeAreaView>
  );
}
