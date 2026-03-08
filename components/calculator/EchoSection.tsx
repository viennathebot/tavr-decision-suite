"use client";

import { useCalculatorStore } from "@/store/calculatorStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

export function EchoSection() {
  const echo = useCalculatorStore((s) => s.echo);
  const setEcho = useCalculatorStore((s) => s.setEcho);

  return (
    <CollapsibleSection title="Echocardiographic Parameters" defaultOpen={true}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="LVEF"
          value={echo.lvef}
          onChange={(v) => setEcho("lvef", v)}
          unit="%"
          placeholder="55"
          min={0}
          max={100}
          step={1}
        />

        <NumericInput
          label="LVOT Diameter"
          value={echo.lvotDiameter}
          onChange={(v) => setEcho("lvotDiameter", v)}
          unit="cm"
          placeholder="2.0"
          min={0}
          max={5}
          step={0.1}
        />

        <NumericInput
          label="LVOT TVI"
          value={echo.lvotTVI}
          onChange={(v) => setEcho("lvotTVI", v)}
          unit="cm"
          placeholder="20"
          min={0}
          max={50}
          step={0.1}
        />

        <NumericInput
          label="AoV TVI"
          value={echo.aovTVI}
          onChange={(v) => setEcho("aovTVI", v)}
          unit="cm"
          placeholder="80"
          min={0}
          max={300}
          step={0.1}
        />

        <NumericInput
          label="Mean Gradient"
          value={echo.meanGradient}
          onChange={(v) => setEcho("meanGradient", v)}
          unit="mmHg"
          placeholder="40"
          min={0}
          max={200}
          step={1}
        />

        <NumericInput
          label="Peak Gradient"
          value={echo.peakGradient}
          onChange={(v) => setEcho("peakGradient", v)}
          unit="mmHg"
          placeholder="64"
          min={0}
          max={300}
          step={1}
        />

        <NumericInput
          label="Vmax"
          value={echo.vmax}
          onChange={(v) => setEcho("vmax", v)}
          unit="m/s"
          placeholder="4.0"
          min={0}
          max={10}
          step={0.1}
        />

        <NumericInput
          label="Stroke Volume"
          value={echo.strokeVolume}
          onChange={(v) => setEcho("strokeVolume", v)}
          unit="mL"
          placeholder="70"
          min={0}
          max={200}
          step={1}
        />

        <NumericInput
          label="LV Ejection Time"
          value={echo.lvEjectionTime}
          onChange={(v) => setEcho("lvEjectionTime", v)}
          unit="ms"
          placeholder="300"
          min={0}
          max={600}
          step={1}
        />

        <NumericInput
          label="Systolic BP"
          value={echo.systolicBP}
          onChange={(v) => setEcho("systolicBP", v)}
          unit="mmHg"
          placeholder="120"
          min={0}
          max={300}
          step={1}
        />

        <NumericInput
          label="Diastolic BP"
          value={echo.diastolicBP}
          onChange={(v) => setEcho("diastolicBP", v)}
          unit="mmHg"
          placeholder="80"
          min={0}
          max={200}
          step={1}
        />
      </div>
    </CollapsibleSection>
  );
}
