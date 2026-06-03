import { useState } from 'react';
import { Modal, Pressable, Switch, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import type { DayReminder } from '@/types/onboarding';

function formatTimeSpanish(hour: number, minute: number): string {
  const period = hour >= 12 ? 'p. m.' : 'a. m.';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const m = minute.toString().padStart(2, '0');
  return `${h12.toString().padStart(2, '0')}:${m} ${period}`;
}

interface ReminderDayRowProps {
  emoji: string;
  label: string;
  reminder: DayReminder;
  onChange: (patch: Partial<DayReminder>) => void;
}

export function ReminderDayRow({ emoji, label, reminder, onChange }: ReminderDayRowProps) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <View
        className={`mb-sm flex-row items-center gap-sm rounded-card border px-md py-sm ${
          reminder.enabled ? 'border-primary bg-surface' : 'border-border bg-surface/60'
        }`}>
        <Typography className="text-xl">{emoji}</Typography>
        <Typography variant="subtitle" className="flex-1 text-base">
          {label}
        </Typography>
        <Pressable
          onPress={() => reminder.enabled && setShowTimePicker(true)}
          disabled={!reminder.enabled}
          className="active:opacity-70">
          <Typography
            style={{ fontFamily: fontFamily.medium, color: colors.primary, textDecorationLine: 'underline' }}
            className="text-sm">
            {formatTimeSpanish(reminder.hour, reminder.minute)}
          </Typography>
        </Pressable>
        <Switch
          value={reminder.enabled}
          onValueChange={(enabled) => onChange({ enabled })}
          trackColor={{ false: colors.border, true: colors.primaryMuted }}
          thumbColor={reminder.enabled ? colors.primary : colors.subtle}
        />
      </View>

      <Modal visible={showTimePicker} transparent animationType="fade">
        <Pressable
          className="flex-1 justify-end bg-black/60"
          onPress={() => setShowTimePicker(false)}>
          <Pressable onPress={(e) => e.stopPropagation()} className="rounded-t-2xl bg-surface p-lg">
            <Typography variant="subtitle" className="mb-md text-center">
              Hora del recordatorio
            </Typography>
            <View className="flex-row flex-wrap justify-center gap-sm">
              {[6, 7, 8, 9, 10, 11, 12, 17, 18, 19, 20].map((h) => (
                <Pressable
                  key={h}
                  onPress={() => {
                    onChange({ hour: h, minute: 0 });
                    setShowTimePicker(false);
                  }}
                  className={`rounded-card border px-md py-sm ${
                    reminder.hour === h ? 'border-primary bg-primary/15' : 'border-border'
                  }`}>
                  <Typography className={reminder.hour === h ? 'text-primary' : ''}>
                    {formatTimeSpanish(h, 0)}
                  </Typography>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={() => setShowTimePicker(false)} className="mt-lg items-center py-sm">
              <Typography className="text-primary">Cerrar</Typography>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export function ReminderBellHero() {
  return (
    <View className="items-center gap-md">
      <Typography className="text-7xl">🧍</Typography>
      <Typography className="text-4xl text-primary">🔔</Typography>
    </View>
  );
}
