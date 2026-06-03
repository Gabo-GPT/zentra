import { useFocusEffect } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { useCallback, useState } from 'react';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

interface TabScreenTransitionProps extends PropsWithChildren {
  /** Retraso escalonado al entrar (ms). */
  delay?: number;
}

/**
 * Transición suave fade + slide al enfocar una pestaña.
 */
export function TabScreenTransition({ children, delay = 0 }: TabScreenTransitionProps) {
  const [focusKey, setFocusKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocusKey((k) => k + 1);
    }, []),
  );

  return (
    <Animated.View
      key={focusKey}
      entering={FadeInDown.delay(delay).duration(340).springify().damping(22)}
      exiting={FadeOut.duration(180)}
      style={{ flex: 1 }}>
      {children}
    </Animated.View>
  );
}
