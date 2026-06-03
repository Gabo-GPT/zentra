import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { LayoutAnimation, Platform, Pressable, UIManager, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { PlanSkeleton } from '@/components/PlanSkeleton';
import { cardShadowStyle } from '@/components/plan/cardStyles';
import { Typography } from '@/components/ui/Typography';
import type { FitnessPlan } from '@/types/fitnessPlan';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const STAGGER_MS = 90;

export interface PlanDisplayProps {
  /** Plan generado por el Coach IA. */
  fitnessPlan?: FitnessPlan | null;
  /** Muestra skeleton con pulso mientras la IA procesa. */
  isLoading?: boolean;
}

interface AccordionSectionProps {
  title: string;
  subtitle: string;
  icon: string;
  defaultOpen?: boolean;
  delayIndex: number;
  children: ReactNode;
}

function AccordionSection({
  title,
  subtitle,
  icon,
  defaultOpen = true,
  delayIndex,
  children,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <Animated.View
      entering={FadeInUp.delay(delayIndex * STAGGER_MS)
        .duration(480)
        .springify()
        .damping(18)}
      className="overflow-hidden rounded-card border border-border bg-surface"
      style={cardShadowStyle}>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="flex-row items-center justify-between px-lg py-md active:opacity-80">
        <View className="flex-1 flex-row items-center gap-sm">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-elevated">
            <Typography className="text-lg text-primary">{icon}</Typography>
          </View>
          <View className="flex-1">
            <Typography variant="subtitle" className="text-base text-foreground">
              {title}
            </Typography>
            <Typography variant="caption">{subtitle}</Typography>
          </View>
        </View>
        <Typography className="font-sans-semibold text-primary">
          {isOpen ? '−' : '+'}
        </Typography>
      </Pressable>
      {isOpen ? <View className="border-t border-border px-lg pb-lg pt-sm">{children}</View> : null}
    </Animated.View>
  );
}

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

function ChecklistItem({ label, checked, onToggle }: ChecklistItemProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-start gap-sm py-sm active:opacity-80">
      <View
        className={`mt-0.5 h-6 w-6 items-center justify-center rounded-md border-2 ${
          checked ? 'border-success bg-success/20' : 'border-border bg-surface-elevated'
        }`}>
        {checked ? (
          <Typography className="text-sm font-sans-bold text-success">✓</Typography>
        ) : null}
      </View>
      <Typography
        variant="body"
        className={`flex-1 leading-6 ${checked ? 'text-subtle line-through' : 'text-foreground'}`}>
        {label}
      </Typography>
    </Pressable>
  );
}

/**
 * Visualiza el plan de fitness del Coach IA: estimación de grasa, análisis, dieta y rutina.
 * Incluye animaciones de entrada y estado skeleton durante la carga.
 */
export function PlanDisplay({ fitnessPlan, isLoading = false }: PlanDisplayProps) {
  const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setCompletedExercises({});
  }, [fitnessPlan?.fatPercentageEstimate, fitnessPlan?.trainingPlan?.length]);

  if (isLoading) {
    return <PlanSkeleton />;
  }

  if (!fitnessPlan) {
    return null;
  }

  const toggleExercise = (index: number) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const totalExercises = fitnessPlan.trainingPlan.length;

  return (
    <View className="gap-md pb-xl">
      {/* Header — estimación de grasa */}
      <Animated.View
        entering={FadeInUp.duration(520).springify().damping(20)}
        className="overflow-hidden rounded-card border border-border bg-surface px-lg py-xl"
        style={cardShadowStyle}>
        <Typography variant="label">Estimación visual de grasa</Typography>
        <Typography className="mt-sm font-sans-bold text-5xl leading-tight text-primary">
          {fitnessPlan.fatPercentageEstimate}
        </Typography>
        <Typography variant="caption" className="mt-xs">
          Estimación orientativa basada en fotos. No sustituye evaluación médica.
        </Typography>
        <View className="mt-lg rounded-card border border-border bg-surface-elevated p-md">
          <Typography variant="subtitle" className="mb-sm text-sm text-foreground">
            Análisis del coach
          </Typography>
          <Typography variant="body" className="leading-6 text-muted">
            {fitnessPlan.analysis}
          </Typography>
        </View>
      </Animated.View>

      {/* Dieta */}
      <AccordionSection
        title="Dieta diaria"
        subtitle={`${fitnessPlan.diet.length} comidas / pautas`}
        icon="🥗"
        defaultOpen
        delayIndex={1}>
        <View className="gap-xs">
          {fitnessPlan.diet.map((meal, index) => (
            <View key={`diet-${index}`} className="flex-row gap-sm py-xs">
              <View className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
              <Typography variant="body" className="flex-1 leading-6 text-foreground">
                {meal}
              </Typography>
            </View>
          ))}
        </View>
      </AccordionSection>

      {/* Entrenamiento — checklist */}
      <AccordionSection
        title="Plan de entrenamiento"
        subtitle={
          totalExercises > 0
            ? `${completedCount}/${totalExercises} completados`
            : 'Sin ejercicios'
        }
        icon="💪"
        defaultOpen
        delayIndex={2}>
        {totalExercises === 0 ? (
          <Typography variant="body">No hay ejercicios en este plan.</Typography>
        ) : (
          <View>
            <View className="mb-sm h-1.5 overflow-hidden rounded-pill bg-surface-elevated">
              <View
                className="h-full rounded-pill bg-primary"
                style={{
                  width: `${totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0}%`,
                }}
              />
            </View>
            {fitnessPlan.trainingPlan.map((exercise, index) => (
              <ChecklistItem
                key={`exercise-${index}`}
                label={exercise}
                checked={Boolean(completedExercises[index])}
                onToggle={() => toggleExercise(index)}
              />
            ))}
          </View>
        )}
      </AccordionSection>
    </View>
  );
}
