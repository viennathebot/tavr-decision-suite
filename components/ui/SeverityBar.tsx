import { View, Text } from "react-native";
import { Colors } from "../../constants/theme";

interface SeverityBarProps {
  label: string;
  value: number;
  max: number;
  thresholds: { value: number; color: string; label: string }[];
  unit?: string;
}

export function SeverityBar({ label, value, max, thresholds, unit }: SeverityBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  let barColor: string = Colors.muted;
  let severityLabel = "";
  for (const t of thresholds) {
    if (value >= t.value) {
      barColor = t.color;
      severityLabel = t.label;
    }
  }

  return (
    <View style={{ marginVertical: 6 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
        <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "600" }}>
          {label}
        </Text>
        <Text style={{ color: barColor, fontSize: 13, fontFamily: "DMMono_400Regular" }}>
          {value.toFixed(2)} {unit ?? ""} {severityLabel ? `(${severityLabel})` : ""}
        </Text>
      </View>
      <View
        style={{
          height: 6,
          backgroundColor: Colors.inputBg,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: barColor,
            borderRadius: 3,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
        {thresholds.map((t, i) => (
          <Text key={i} style={{ color: Colors.muted, fontSize: 9 }}>
            {t.label}: {t.value}
          </Text>
        ))}
      </View>
    </View>
  );
}
