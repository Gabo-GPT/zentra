import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SHIMMER_WIDTH_RATIO = 0.55;

/**
 * Gradiente animado estilo Instagram/Facebook sobre tarjetas skeleton.
 */
export function ShimmerOverlay() {
  const { width } = useWindowDimensions();
  const shimmerWidth = width * SHIMMER_WIDTH_RATIO;
  const translateX = useSharedValue(-shimmerWidth);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width + shimmerWidth, {
        duration: 1600,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, [shimmerWidth, translateX, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, animatedStyle]}
      accessibilityElementsHidden>
      <LinearGradient
        colors={[
          'transparent',
          'rgba(34, 211, 238, 0.08)',
          'rgba(34, 211, 238, 0.28)',
          'rgba(249, 115, 22, 0.12)',
          'transparent',
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ width: shimmerWidth, flex: 1 }}
      />
    </Animated.View>
  );
}
