import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StepByStep } from "../../components/algorithm/StepByStep";
import { AlgorithmFlowchart } from "../../components/algorithm/AlgorithmFlowchart";
import { Colors } from "../../constants/theme";

export default function AlgorithmScreen() {
  const [view, setView] = useState<"steps" | "flowchart">("steps");

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
          Decision Algorithm
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.inputBg,
            borderRadius: 8,
            padding: 2,
          }}
        >
          {(["steps", "flowchart"] as const).map((v) => (
            <Pressable
              key={v}
              onPress={() => setView(v)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 6,
                backgroundColor: view === v ? Colors.accent : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: view === v ? Colors.white : Colors.muted,
                  fontSize: 13,
                  fontWeight: view === v ? "600" : "400",
                }}
              >
                {v === "steps" ? "Step-by-Step" : "Flowchart"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {view === "steps" ? <StepByStep /> : <AlgorithmFlowchart />}
    </SafeAreaView>
  );
}
