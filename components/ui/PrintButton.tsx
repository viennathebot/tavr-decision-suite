import { Pressable, Text, Alert } from "react-native";
import { Printer } from "lucide-react-native";
import * as Print from "expo-print";
import { Colors } from "../../constants/theme";

interface PrintButtonProps {
  generateHTML: () => string;
  label?: string;
}

export function PrintButton({ generateHTML, label = "Export PDF" }: PrintButtonProps) {
  const handlePrint = async () => {
    try {
      const html = generateHTML();
      await Print.printAsync({ html });
    } catch (e) {
      Alert.alert("Export Error", "Could not generate PDF. Please try again.");
    }
  };

  return (
    <Pressable
      onPress={handlePrint}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.accent + "20",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
      }}
    >
      <Printer size={16} color={Colors.accent} />
      <Text style={{ color: Colors.accent, fontSize: 13, fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
}
