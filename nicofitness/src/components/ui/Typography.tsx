import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { fontFamily } from '@/constants/typography';

type Variant = 'title' | 'subtitle' | 'body' | 'caption' | 'label';

const variantClasses: Record<Variant, string> = {
  title: 'text-3xl text-foreground',
  subtitle: 'text-xl text-foreground',
  body: 'text-base text-muted',
  caption: 'text-sm text-subtle',
  label: 'text-xs uppercase tracking-wider text-primary',
};

const variantFontFamily: Record<Variant, string> = {
  title: fontFamily.bold,
  subtitle: fontFamily.semibold,
  body: fontFamily.regular,
  caption: fontFamily.regular,
  label: fontFamily.medium,
};

interface TypographyProps extends TextProps {
  variant?: Variant;
  className?: string;
}

export function Typography({
  variant = 'body',
  className = '',
  ...props
}: TypographyProps) {
  return (
    <Text
      className={`${variantClasses[variant]} ${className}`}
      style={{ fontFamily: variantFontFamily[variant] }}
      {...props}
    />
  );
}
