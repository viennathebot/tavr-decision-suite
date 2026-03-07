export const Colors = {
  background: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1F2937",
  accent: "#C9A84C",
  accentDark: "#A8893D",
  success: "#00C9A7",
  warning: "#F59E0B",
  danger: "#EF4444",
  primary: "#E2E8F0",
  muted: "#64748B",
  white: "#FFFFFF",
  black: "#000000",
  inputBg: "#1A2332",
  inputBorder: "#374151",
} as const;

export const Severity = {
  severe: Colors.danger,
  moderate: Colors.warning,
  mild: Colors.success,
  normal: Colors.accent,
  indeterminate: Colors.muted,
} as const;

export const FontWeights = {
  header: "800" as const,
  label: "600" as const,
  body: "400" as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;
