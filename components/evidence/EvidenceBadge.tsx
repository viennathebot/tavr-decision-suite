import { View, Text } from "react-native";
import { Colors } from "../../constants/theme";

interface EvidenceBadgeProps {
  level: "A" | "B" | "C";
}

const levelColors = {
  A: Colors.success,
  B: Colors.accent,
  C: Colors.muted,
};

const levelLabels = {
  A: "Level A — RCT/Meta-analysis",
  B: "Level B — Observational",
  C: "Level C — Expert Consensus",
};

export function EvidenceBadge({ level }: EvidenceBadgeProps) {
  const color = levelColors[level];
  return (
    <View
      style={{
        backgroundColor: color + "20",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: color + "40",
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color, fontSize: 10, fontWeight: "600" }}>
        {levelLabels[level]}
      </Text>
    </View>
  );
}
