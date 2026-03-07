import { View, Text, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";
import { Card } from "../ui/Card";
import { NumericInput } from "../ui/NumericInput";
import { SegmentedControl } from "../ui/SegmentedControl";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Colors } from "../../constants/theme";

export function DemographicsSection() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const setDemographic = useCalculatorStore((s) => s.setDemographic);
  const clearDemographics = useCalculatorStore((s) => s.clearDemographics);

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          Demographics
        </Text>
        <Pressable
          onPress={clearDemographics}
          hitSlop={8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
            backgroundColor: Colors.danger + "15",
          }}
        >
          <Trash2 size={14} color={Colors.danger} />
          <Text style={{ color: Colors.danger, fontSize: 12, fontWeight: "600" }}>
            Clear
          </Text>
        </Pressable>
      </View>

      <NumericInput
        label="Age"
        value={demographics.age}
        onValueChange={(v) => setDemographic("age", v)}
        unit="years"
        hint="18-120"
        min={18}
        max={120}
        placeholder="e.g. 78"
      />

      <SegmentedControl
        label="Sex"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        selected={demographics.sex}
        onSelect={(v) => setDemographic("sex", v)}
      />

      <NumericInput
        label="Height"
        value={demographics.heightCm}
        onValueChange={(v) => setDemographic("heightCm", v)}
        unit="cm"
        hint="100-250"
        min={100}
        max={250}
        placeholder="e.g. 170"
      />

      <NumericInput
        label="Weight"
        value={demographics.weightKg}
        onValueChange={(v) => setDemographic("weightKg", v)}
        unit="kg"
        hint="30-300"
        min={30}
        max={300}
        placeholder="e.g. 75"
      />

      <SegmentedControl
        label="Symptomatic"
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        selected={
          demographics.symptomatic === true
            ? "yes"
            : demographics.symptomatic === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setDemographic("symptomatic", v === "yes")}
      />

      <SegmentedControl
        label="NYHA Class"
        options={[
          { value: "I" as const, label: "I" },
          { value: "II" as const, label: "II" },
          { value: "III" as const, label: "III" },
          { value: "IV" as const, label: "IV" },
        ]}
        selected={demographics.nyhaClass}
        onSelect={(v) => setDemographic("nyhaClass", v)}
      />
    </Card>
  );
}
