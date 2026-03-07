import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VIVCalculator } from "../../components/viv/VIVCalculator";
import { VIVOutcomeData } from "../../components/viv/VIVOutcomeData";
import { Disclaimer } from "../../components/ui/Disclaimer";
import { Colors } from "../../constants/theme";

export default function ValveInValveScreen() {
  const [tab, setTab] = useState<"calculator" | "outcomes">("calculator");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text
          style={{
            color: Colors.primary,
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Valve-in-Valve
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.inputBg,
            borderRadius: 8,
            padding: 2,
          }}
        >
          {(["calculator", "outcomes"] as const).map((v) => (
            <Pressable
              key={v}
              onPress={() => setTab(v)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 6,
                backgroundColor: tab === v ? Colors.accent : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: tab === v ? Colors.white : Colors.muted,
                  fontSize: 13,
                  fontWeight: tab === v ? "600" : "400",
                }}
              >
                {v === "calculator" ? "VIV Planner" : "Outcome Data"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {tab === "calculator" ? <VIVCalculator /> : <VIVOutcomeData />}
        <Disclaimer />
      </ScrollView>
    </SafeAreaView>
  );
}
