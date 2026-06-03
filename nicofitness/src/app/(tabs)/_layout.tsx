import { Tabs } from 'expo-router';
import { useCallback } from 'react';
import { Platform, Text, type ColorValue } from 'react-native';

import { TabBrandHeader } from '@/components/brand/TabBrandHeader';
import { colors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useHaptics } from '@/hooks/useHaptics';

export default function TabLayout() {
  const { tab } = useHaptics();

  const onTabPress = useCallback(() => {
    tab();
  }, [tab]);

  return (
    <Tabs
      screenListeners={{
        tabPress: onTabPress,
      }}
      screenOptions={{
        headerShown: true,
        header: () => <TabBrandHeader />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
          height: 64,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtle,
        tabBarLabelStyle: {
          fontFamily: fontFamily.medium,
          fontSize: 11,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabIcon glyph="⌂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'NICO',
          tabBarIcon: ({ color }) => <TabIcon glyph="✦" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabIcon glyph="◎" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ glyph, color }: { glyph: string; color: ColorValue }) {
  return (
    <Text style={{ color, fontSize: 20, lineHeight: 24, fontFamily: fontFamily.semibold }}>
      {glyph}
    </Text>
  );
}
