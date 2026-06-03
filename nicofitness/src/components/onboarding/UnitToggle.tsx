import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui/Typography';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';

interface UnitToggleProps<T extends string> {
  options: [T, T];
  value: T;
  onChange: (value: T) => void;
}

export function UnitToggle<T extends string>({ options, value, onChange }: UnitToggleProps<T>) {
  return (
    <View className="flex-row self-center rounded-full border border-border bg-surface-elevated p-1">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            className={`rounded-full px-lg py-sm ${active ? 'bg-primary' : ''}`}>
            <Typography
              style={{
                fontFamily: fontFamily.semibold,
                color: active ? colors.background : colors.muted,
              }}
              className="text-sm uppercase">
              {opt}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
