import { colors, radii, shadows, typography } from "./tokens";

/**
 * Shared Tailwind preset consumed by both the Next.js web app and the
 * NativeWind-driven Expo mobile app. Keeps both surfaces visually identical.
 */
const preset = {
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        cyan: colors.cyan,
        ink: colors.ink,
        slate: { DEFAULT: colors.slate },
        mist: colors.mist,
        cloud: colors.cloud,
        brand: {
          DEFAULT: colors.cyan[500],
          fg: colors.navy[800],
        },
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
      },
      fontFamily: {
        sans: typography.fontFamily.sans.split(","),
        mono: typography.fontFamily.mono.split(","),
      },
      borderRadius: {
        sm: `${radii.sm}px`,
        md: `${radii.md}px`,
        lg: `${radii.lg}px`,
        xl: `${radii.xl}px`,
        pill: `${radii.pill}px`,
      },
      boxShadow: {
        soft: shadows.sm,
        card: shadows.md,
        elevated: shadows.lg,
        glow: shadows.glow,
      },
      backgroundImage: {
        "brand-hero": "linear-gradient(135deg, #00B5E2 0%, #162F50 100%)",
        "brand-card": "linear-gradient(180deg, rgba(0,181,226,0.06) 0%, rgba(0,181,226,0) 100%)",
        "brand-glow": "radial-gradient(60% 60% at 50% 0%, rgba(0,181,226,0.15) 0%, rgba(0,181,226,0) 100%)",
      },
    },
  },
  plugins: [],
};

export default preset;
