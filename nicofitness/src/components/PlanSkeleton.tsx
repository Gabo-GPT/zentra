import { useEffect, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cardShadowStyle } from '@/components/plan/cardStyles';
import { ShimmerOverlay } from '@/components/ui/ShimmerOverlay';

function PulseBlock({ className = '' }: { className?: string }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: 1100 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className={`rounded-card bg-surface-elevated ${className}`}
    />
  );
}

function SkeletonCard({ children }: { children: ReactNode }) {
  return (
    <View
      className="overflow-hidden rounded-card border border-border bg-surface p-lg"
      style={cardShadowStyle}>
      {children}
      <ShimmerOverlay />
    </View>
  );
}

/**
 * Placeholder premium con pulso + gradiente deslizante mientras el Coach IA procesa.
 */
export function PlanSkeleton() {
  return (
    <View className="gap-md" accessibilityLabel="Cargando plan de fitness">
      <SkeletonCard>
        <PulseBlock className="h-3 w-24" />
        <PulseBlock className="mt-md h-12 w-40" />
        <PulseBlock className="mt-md h-4 w-full" />
        <PulseBlock className="mt-sm h-4 w-[92%]" />
        <PulseBlock className="mt-sm h-4 w-[80%]" />
      </SkeletonCard>

      <SkeletonCard>
        <PulseBlock className="h-5 w-32" />
        <PulseBlock className="mt-md h-4 w-full" />
        <PulseBlock className="mt-sm h-4 w-full" />
        <PulseBlock className="mt-sm h-4 w-[85%]" />
      </SkeletonCard>

      <SkeletonCard>
        <PulseBlock className="h-5 w-44" />
        <PulseBlock className="mt-md h-4 w-full" />
        <PulseBlock className="mt-sm h-4 w-full" />
        <PulseBlock className="mt-sm h-4 w-[78%]" />
        <PulseBlock className="mt-sm h-4 w-full" />
      </SkeletonCard>
    </View>
  );
}
