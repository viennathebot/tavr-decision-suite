import { View, Text } from "react-native";
import { Colors } from "../../constants/theme";

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
}

export function Badge({
  label,
  color = Colors.accent,
  textColor = Colors.white,
}: BadgeProps) {
  return (
    <View
      style={{
        backgroundColor: color + "20",
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: color + "40",
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: textColor, fontSize: 11, fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}
