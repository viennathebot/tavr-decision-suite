import { View, Text } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { Colors } from "../../constants/theme";

export function Disclaimer() {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: Colors.warning + "10",
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.warning + "30",
        marginVertical: 8,
        gap: 10,
      }}
    >
      <AlertTriangle size={16} color={Colors.warning} style={{ marginTop: 2 }} />
      <Text style={{ color: Colors.muted, fontSize: 11, flex: 1, lineHeight: 16 }}>
        For educational and case planning use only. Not a substitute for clinical
        judgment or Heart Team discussion. All sizing data must be verified
        against current manufacturer IFU.
      </Text>
    </View>
  );
}
