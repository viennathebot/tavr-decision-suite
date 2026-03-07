import { View, Text } from "react-native";
import { CollapsibleSection } from "../ui/CollapsibleSection";
import { NumericInput } from "../ui/NumericInput";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Colors } from "../../constants/theme";

export function DobutamineSection() {
  const dobutamine = useCalculatorStore((s) => s.dobutamine);
  const setDobutamine = useCalculatorStore((s) => s.setDobutamine);
  const restStrokeVolume = useCalculatorStore((s) => s.echo.strokeVolume);

  const stressSV = dobutamine.stressStrokeVolume;
  const hasFlowReserve =
    stressSV !== undefined && restStrokeVolume !== undefined;

  const flowReservePositive = hasFlowReserve
    ? stressSV >= restStrokeVolume * 1.2
    : undefined;

  return (
    <CollapsibleSection title="Dobutamine Stress Echo (DSE)" badge="Optional">
      <NumericInput
        label="Stress LVEF"
        value={dobutamine.stressLVEF}
        onValueChange={(v) => setDobutamine("stressLVEF", v)}
        unit="%"
        hint="Expected increase >=5%"
        min={5}
        max={90}
        placeholder="e.g. 55"
      />

      <NumericInput
        label="Stress Mean Gradient"
        value={dobutamine.stressMeanGradient}
        onValueChange={(v) => setDobutamine("stressMeanGradient", v)}
        unit="mmHg"
        hint="True severe: >=40 mmHg at peak stress"
        min={0}
        max={120}
        placeholder="e.g. 48"
      />

      <NumericInput
        label="Stress AVA"
        value={dobutamine.stressAVA}
        onValueChange={(v) => setDobutamine("stressAVA", v)}
        unit="cm\u00B2"
        hint="True severe: remains <1.0 cm\u00B2"
        min={0}
        max={4}
        placeholder="e.g. 0.85"
      />

      <NumericInput
        label="Stress Stroke Volume"
        value={dobutamine.stressStrokeVolume}
        onValueChange={(v) => setDobutamine("stressStrokeVolume", v)}
        unit="mL"
        hint="Flow reserve: >=20% increase"
        min={10}
        max={250}
        placeholder="e.g. 90"
      />

      {/* Flow Reserve auto-calculation */}
      <View
        style={{
          marginTop: 12,
          padding: 12,
          backgroundColor: Colors.inputBg,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.cardBorder,
        }}
      >
        <Text
          style={{
            color: Colors.muted,
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 6,
          }}
        >
          Flow Reserve (auto-calculated)
        </Text>

        {!hasFlowReserve ? (
          <Text style={{ color: Colors.muted, fontSize: 13, fontStyle: "italic" }}>
            Enter rest Stroke Volume (Echo section) and Stress Stroke Volume
            above to calculate flow reserve.
          </Text>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: flowReservePositive
                  ? Colors.success
                  : Colors.danger,
              }}
            />
            <Text
              style={{
                color: flowReservePositive ? Colors.success : Colors.danger,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              {flowReservePositive ? "Positive" : "Negative"}
            </Text>
            <Text style={{ color: Colors.muted, fontSize: 12 }}>
              (Stress SV {stressSV} mL / Rest SV {restStrokeVolume} mL ={" "}
              {((stressSV! / restStrokeVolume!) * 100).toFixed(0)}%)
            </Text>
          </View>
        )}

        {hasFlowReserve && !flowReservePositive && (
          <Text
            style={{
              color: Colors.warning,
              fontSize: 11,
              marginTop: 6,
              lineHeight: 16,
            }}
          >
            Negative flow reserve ({"<"}20% increase in SV) indicates limited
            contractile reserve. Prognosis is worse regardless of AS severity.
          </Text>
        )}
      </View>
    </CollapsibleSection>
  );
}
