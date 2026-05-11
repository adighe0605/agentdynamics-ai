/**
 * AgentDynamics design tokens.
 * Extracted from agentdynamics.ai: light-mode dominant, navy text on white,
 * cyan/blue accent, subtle gradients, generous whitespace.
 *
 * These are the single source of truth for both web (Tailwind) and mobile (NativeWind).
 */

export const colors = {
  // Brand
  navy: {
    50:  "#F2F5FA",
    100: "#E1E8F2",
    200: "#BFCCDE",
    300: "#94A8C5",
    400: "#6680A6",
    500: "#3F5E8A",
    600: "#26456C",
    700: "#162F50",
    800: "#0A1F3D",
    900: "#061428",
    950: "#030B1A",
  },
  cyan: {
    50:  "#E6F8FE",
    100: "#C6EFFC",
    200: "#8FDFF9",
    300: "#55CDF4",
    400: "#1AC8F0",
    500: "#00B5E2",
    600: "#0091B8",
    700: "#006E8C",
    800: "#004C61",
    900: "#002E3B",
  },
  // Neutrals
  ink: "#0F172A",
  slate: "#475569",
  mist: "#F1F5F9",
  cloud: "#F8FAFC",
  white: "#FFFFFF",
  // Semantic
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#00B5E2",
} as const;

export const gradients = {
  hero: "linear-gradient(135deg, #00B5E2 0%, #162F50 100%)",
  card: "linear-gradient(180deg, rgba(0,181,226,0.06) 0%, rgba(0,181,226,0) 100%)",
  glow: "radial-gradient(60% 60% at 50% 0%, rgba(0,181,226,0.15) 0%, rgba(0,181,226,0) 100%)",
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 64,
} as const;

export const shadows = {
  // Soft, brand-aligned. Tinted with navy rather than pure black.
  sm: "0 1px 2px rgba(10, 31, 61, 0.04), 0 1px 1px rgba(10, 31, 61, 0.02)",
  md: "0 4px 12px rgba(10, 31, 61, 0.06), 0 2px 4px rgba(10, 31, 61, 0.04)",
  lg: "0 12px 32px rgba(10, 31, 61, 0.10), 0 4px 8px rgba(10, 31, 61, 0.05)",
  glow: "0 0 0 4px rgba(0, 181, 226, 0.15)",
} as const;

export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.04em",
  },
} as const;

export const motion = {
  duration: {
    fast: 150,
    base: 220,
    slow: 360,
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    decel: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;

export type Tokens = {
  colors: typeof colors;
  gradients: typeof gradients;
  radii: typeof radii;
  spacing: typeof spacing;
  shadows: typeof shadows;
  typography: typeof typography;
  motion: typeof motion;
};

export const tokens: Tokens = {
  colors,
  gradients,
  radii,
  spacing,
  shadows,
  typography,
  motion,
};
