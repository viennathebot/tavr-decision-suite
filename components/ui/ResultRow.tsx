import { View, Text } from "react-native";
import { Colors } from "../../constants/theme";

interface ResultRowProps {
  label: string;
  value: string | number | undefined;
  unit?: string;
  severity?: "normal" | "warning" | "danger" | "info";
  hint?: string;
}

const severityColors = {
  normal: Colors.success,
  warning: Colors.warning,
  danger: Colors.danger,
  info: Colors.accent,
};

export function ResultRow({ label, value, unit, severity, hint }: ResultRowProps) {
  const color = severity ? severityColors[severity] : Colors.primary;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.cardBorder,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "500" }}>
          {label}
        </Text>
        {hint && (
          <Text style={{ color: Colors.muted, fontSize: 10, marginTop: 1 }}>
            {hint}
          </Text>
        )}
      </View>
      <Text
        style={{
          color: value !== undefined ? color : Colors.muted,
          fontSize: 15,
          fontFamily: "DMMono_400Regular",
          fontWeight: "600",
        }}
      >
        {value !== undefined ? `${typeof value === "number" ? value.toFixed(2) : value}` : "—"}
        {value !== undefined && unit ? ` ${unit}` : ""}
      </Text>
    </View>
  );
}
