import { View, Text } from "react-native";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react-native";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

// ── Types ─────────────────────────────────────────────────────

interface RiskFlag {
  flag: string;
  level: "high" | "intermediate" | "low";
  description: string;
  citation: string;
}

interface VIVRiskFlagsProps {
  riskFlags: RiskFlag[];
}

// ── Level styling config ──────────────────────────────────────

const LEVEL_CONFIG = {
  high: {
    color: Colors.danger,
    label: "HIGH RISK",
    icon: AlertTriangle,
  },
  intermediate: {
    color: Colors.warning,
    label: "INTERMEDIATE",
    icon: AlertCircle,
  },
  low: {
    color: Colors.success,
    label: "LOW RISK",
    icon: CheckCircle2,
  },
} as const;

const LEVEL_ORDER: Record<string, number> = {
  high: 0,
  intermediate: 1,
  low: 2,
};

// ── Component ─────────────────────────────────────────────────

export function VIVRiskFlags({ riskFlags }: VIVRiskFlagsProps) {
  // Sort: high first, then intermediate, then low
  const sorted = [...riskFlags].sort(
    (a, b) => (LEVEL_ORDER[a.level] ?? 3) - (LEVEL_ORDER[b.level] ?? 3)
  );

  return (
    <View style={{ gap: Spacing.sm }}>
      {sorted.map((rf, idx) => {
        const config = LEVEL_CONFIG[rf.level];
        const IconComponent = config.icon;

        return (
          <View
            key={`${rf.flag}-${idx}`}
            style={{
              backgroundColor: Colors.card,
              borderRadius: BorderRadius.md,
              borderWidth: 1,
              borderColor: Colors.cardBorder,
              borderLeftWidth: 4,
              borderLeftColor: config.color,
              padding: Spacing.lg,
            }}
          >
            {/* Header row with flag name and badge */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: Spacing.sm,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: Spacing.sm,
                  flex: 1,
                }}
              >
                <IconComponent size={16} color={config.color} />
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 14,
                    fontWeight: "700",
                    flex: 1,
                  }}
                >
                  {rf.flag}
                </Text>
              </View>
              <Badge label={config.label} color={config.color} />
            </View>

            {/* Description */}
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
                marginBottom: Spacing.sm,
              }}
            >
              {rf.description}
            </Text>

            {/* Citation */}
            <Text
              style={{
                color: Colors.muted,
                fontSize: 11,
                fontStyle: "italic",
                lineHeight: 16,
              }}
            >
              {rf.citation}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
