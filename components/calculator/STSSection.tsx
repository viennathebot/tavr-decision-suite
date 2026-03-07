import { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";
import { Card } from "../ui/Card";
import { NumericInput } from "../ui/NumericInput";
import { SegmentedControl } from "../ui/SegmentedControl";
import { useCalculatorStore } from "../../store/calculatorStore";
import { calculateSTSPROM } from "../../lib/sts-prom";
import { Colors } from "../../constants/theme";

const riskColors: Record<string, string> = {
  low: Colors.success,
  intermediate: Colors.warning,
  high: Colors.danger,
  extreme: Colors.danger,
};

export function STSSection() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const echo = useCalculatorStore((s) => s.echo);
  const sts = useCalculatorStore((s) => s.sts);
  const setSTS = useCalculatorStore((s) => s.setSTS);
  const clearSTS = useCalculatorStore((s) => s.clearSTS);

  const stsResult = useMemo(() => {
    return calculateSTSPROM({
      age: demographics.age,
      sex: demographics.sex,
      heightCm: demographics.heightCm,
      weightKg: demographics.weightKg,
      creatinine: sts.creatinine,
      diabetes: sts.diabetes,
      nyhaClass: demographics.nyhaClass,
      priorCardiacSurgery: sts.priorCardiacSurgery,
      lvef: echo.lvef,
      urgency: sts.urgency,
      endocarditis: sts.endocarditis,
      chronicLungDisease: sts.chronicLungDisease,
      peripheralVascularDisease: sts.peripheralVascularDisease,
      cerebrovascularDisease: sts.cerebrovascularDisease,
      preoperativeDialysis: sts.preoperativeDialysis,
    });
  }, [demographics, echo.lvef, sts]);

  const color = riskColors[stsResult.category] ?? Colors.muted;

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
          STS-PROM Risk Estimate
        </Text>
        <Pressable
          onPress={clearSTS}
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

      <Text style={{ color: Colors.muted, fontSize: 11, marginBottom: 12, lineHeight: 16 }}>
        Uses age, sex, height, weight, NYHA, and LVEF from above sections. Enter additional risk factors below.
      </Text>

      <NumericInput
        label="Creatinine"
        value={sts.creatinine}
        onValueChange={(v) => setSTS("creatinine", v)}
        unit="mg/dL"
        hint="0.5-15"
        min={0.1}
        max={20}
        placeholder="e.g. 1.1"
      />

      <SegmentedControl
        label="Diabetes"
        options={[
          { value: "none" as const, label: "None" },
          { value: "diet" as const, label: "Diet" },
          { value: "oral" as const, label: "Oral" },
          { value: "insulin" as const, label: "Insulin" },
        ]}
        selected={sts.diabetes}
        onSelect={(v) => setSTS("diabetes", v)}
      />

      <SegmentedControl
        label="Prior Cardiac Surgery"
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        selected={
          sts.priorCardiacSurgery === true
            ? "yes"
            : sts.priorCardiacSurgery === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setSTS("priorCardiacSurgery", v === "yes")}
      />

      <SegmentedControl
        label="Urgency"
        options={[
          { value: "elective" as const, label: "Elective" },
          { value: "urgent" as const, label: "Urgent" },
          { value: "emergent" as const, label: "Emergent" },
        ]}
        selected={sts.urgency}
        onSelect={(v) => setSTS("urgency", v)}
      />

      <SegmentedControl
        label="Chronic Lung Disease"
        options={[
          { value: "none" as const, label: "None" },
          { value: "mild" as const, label: "Mild" },
          { value: "moderate" as const, label: "Mod" },
          { value: "severe" as const, label: "Severe" },
        ]}
        selected={sts.chronicLungDisease}
        onSelect={(v) => setSTS("chronicLungDisease", v)}
      />

      <SegmentedControl
        label="Peripheral Vascular Disease"
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        selected={
          sts.peripheralVascularDisease === true
            ? "yes"
            : sts.peripheralVascularDisease === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setSTS("peripheralVascularDisease", v === "yes")}
      />

      <SegmentedControl
        label="Cerebrovascular Disease"
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        selected={
          sts.cerebrovascularDisease === true
            ? "yes"
            : sts.cerebrovascularDisease === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setSTS("cerebrovascularDisease", v === "yes")}
      />

      <SegmentedControl
        label="Preoperative Dialysis"
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        selected={
          sts.preoperativeDialysis === true
            ? "yes"
            : sts.preoperativeDialysis === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setSTS("preoperativeDialysis", v === "yes")}
      />

      <SegmentedControl
        label="Active Endocarditis"
        options={[
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        selected={
          sts.endocarditis === true
            ? "yes"
            : sts.endocarditis === false
            ? "no"
            : undefined
        }
        onSelect={(v) => setSTS("endocarditis", v === "yes")}
      />

      {/* ── STS Result ─────────────────────────────────────────── */}
      <View
        style={{
          marginTop: 16,
          backgroundColor: color + "10",
          borderRadius: 10,
          padding: 14,
          borderWidth: 1,
          borderColor: color + "30",
        }}
      >
        <Text
          style={{
            color: Colors.muted,
            fontSize: 10,
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Estimated 30-Day Mortality
        </Text>

        {stsResult.sufficient ? (
          <>
            <View style={{ flexDirection: "row", alignItems: "baseline", marginBottom: 6 }}>
              <Text
                style={{
                  color: color,
                  fontSize: 32,
                  fontWeight: "800",
                  fontFamily: "DMMono_500Medium",
                }}
              >
                {stsResult.mortality.toFixed(1)}
              </Text>
              <Text
                style={{
                  color: color,
                  fontSize: 16,
                  fontWeight: "600",
                  marginLeft: 2,
                }}
              >
                %
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: color,
                }}
              />
              <Text style={{ color: color, fontSize: 14, fontWeight: "700" }}>
                {stsResult.categoryLabel}
              </Text>
            </View>

            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {stsResult.interpretation}
            </Text>

            {/* Risk bar */}
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  height: 6,
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: Colors.inputBg,
                }}
              >
                <View style={{ flex: 3, backgroundColor: Colors.success }} />
                <View style={{ flex: 5, backgroundColor: Colors.warning }} />
                <View style={{ flex: 7, backgroundColor: Colors.danger }} />
                <View style={{ flex: 5, backgroundColor: Colors.danger + "80" }} />
              </View>
              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <Text style={{ flex: 3, color: Colors.muted, fontSize: 9 }}>{"<3%"}</Text>
                <Text style={{ flex: 5, color: Colors.muted, fontSize: 9 }}>3-8%</Text>
                <Text style={{ flex: 7, color: Colors.muted, fontSize: 9 }}>8-15%</Text>
                <Text style={{ flex: 5, color: Colors.muted, fontSize: 9, textAlign: "right" }}>{">15%"}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={{ color: Colors.muted, fontSize: 13, fontStyle: "italic" }}>
            {stsResult.interpretation}
          </Text>
        )}

        <Text
          style={{
            color: Colors.muted,
            fontSize: 9,
            fontStyle: "italic",
            marginTop: 8,
          }}
        >
          Simplified STS-PROM estimate. Use sts.org for official calculation.
        </Text>
      </View>
    </Card>
  );
}
