/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#14141F',
        'surface-elevated': '#1C1C28',
        border: '#27272F',
        primary: {
          DEFAULT: '#22D3EE',
          muted: '#0891B2',
        },
        accent: {
          DEFAULT: '#F97316',
          muted: '#EA580C',
        },
        success: '#22C55E',
        warning: '#EAB308',
        danger: '#EF4444',
        foreground: '#F4F4F5',
        muted: '#A1A1AA',
        subtle: '#71717A',
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        'sans-bold': ['Inter_700Bold'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
