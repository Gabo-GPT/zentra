import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { Typography } from '@/components/ui/Typography';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'No encontrado' }} />
      <View className="flex-1 items-center justify-center bg-background px-md">
        <Typography variant="title">Pantalla no existe</Typography>
        <Link href="/" className="mt-md">
          <Typography variant="body" className="text-primary">
            Volver al inicio
          </Typography>
        </Link>
      </View>
    </>
  );
}
