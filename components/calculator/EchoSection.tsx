import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { NumericInput } from "../ui/NumericInput";
import { Tooltip } from "../ui/Tooltip";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Colors } from "../../constants/theme";

export function EchoSection() {
  const echo = useCalculatorStore((s) => s.echo);
  const setEcho = useCalculatorStore((s) => s.setEcho);

  return (
    <Card>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 16,
          fontWeight: "700",
          marginBottom: 12,
        }}
      >
        Echocardiographic Parameters
      </Text>

      <NumericInput
        label="LVEF"
        value={echo.lvef}
        onValueChange={(v) => setEcho("lvef", v)}
        unit="%"
        hint="Normal: 55-70%"
        min={5}
        max={90}
        warningMin={50}
        warningMessage="Reduced LVEF — consider low-flow AS phenotype"
        placeholder="e.g. 60"
      />

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <View style={{ flex: 1 }}>
          <NumericInput
            label="LVOT Diameter"
            value={echo.lvotDiameter}
            onValueChange={(v) => setEcho("lvotDiameter", v)}
            unit="cm"
            hint="Normal: 1.8-2.2 cm"
            min={1.0}
            max={4.0}
            warningMin={1.5}
            warningMax={3.2}
            warningMessage="Unusual LVOT diameter — recheck measurement"
            placeholder="e.g. 2.0"
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Tooltip
            title="LVOT Diameter Measurement"
            content="1mm measurement error = ~5% AVA error. Measure in parasternal long axis at the inner edge of the septal endocardium to the anterior mitral leaflet, in mid-systole. Use zoom mode for accuracy."
            citation="Zoghbi WA et al. JASE 2009;22:1-23."
          />
        </View>
      </View>

      <NumericInput
        label="LVOT TVI"
        value={echo.lvotTVI}
        onValueChange={(v) => setEcho("lvotTVI", v)}
        unit="cm"
        hint="Normal: 18-25 cm"
        min={5}
        max={50}
        warningMin={15}
        warningMessage="Low LVOT TVI — consider low-flow state"
        placeholder="e.g. 22"
      />

      <NumericInput
        label="AoV TVI"
        value={echo.aovTVI}
        onValueChange={(v) => setEcho("aovTVI", v)}
        unit="cm"
        hint="Severe: >80 cm"
        min={10}
        max={200}
        placeholder="e.g. 95"
      />

      <NumericInput
        label="Mean Gradient"
        value={echo.meanGradient}
        onValueChange={(v) => setEcho("meanGradient", v)}
        unit="mmHg"
        hint="Severe: >=40 mmHg"
        min={0}
        max={120}
        placeholder="e.g. 45"
      />

      <NumericInput
        label="Peak Gradient"
        value={echo.peakGradient}
        onValueChange={(v) => setEcho("peakGradient", v)}
        unit="mmHg"
        hint="Severe: >=64 mmHg"
        min={0}
        max={200}
        placeholder="e.g. 80"
      />

      <NumericInput
        label="Vmax"
        value={echo.vmax}
        onValueChange={(v) => setEcho("vmax", v)}
        unit="m/s"
        hint="Severe: >=4.0 m/s"
        min={0}
        max={8}
        placeholder="e.g. 4.2"
      />

      <NumericInput
        label="Stroke Volume"
        value={echo.strokeVolume}
        onValueChange={(v) => setEcho("strokeVolume", v)}
        unit="mL"
        hint="Normal: 60-100 mL"
        min={10}
        max={200}
        placeholder="e.g. 75"
      />

      <NumericInput
        label="LV Ejection Time"
        value={echo.lvEjectionTime}
        onValueChange={(v) => setEcho("lvEjectionTime", v)}
        unit="ms"
        hint="Normal: 280-350 ms"
        min={100}
        max={500}
        placeholder="e.g. 310"
      />

      <NumericInput
        label="Systolic BP"
        value={echo.systolicBP}
        onValueChange={(v) => setEcho("systolicBP", v)}
        unit="mmHg"
        hint="At time of echo"
        min={60}
        max={260}
        warningMax={140}
        warningMessage="Elevated BP may affect gradient measurement"
        placeholder="e.g. 130"
      />

      <NumericInput
        label="Diastolic BP"
        value={echo.diastolicBP}
        onValueChange={(v) => setEcho("diastolicBP", v)}
        unit="mmHg"
        hint="At time of echo"
        min={30}
        max={160}
        placeholder="e.g. 70"
      />
    </Card>
  );
}
