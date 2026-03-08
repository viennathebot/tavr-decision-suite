"use client";

import { useCalculatorStore } from "@/store/calculatorStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

export function CTSection() {
  const ct = useCalculatorStore((s) => s.ct);
  const setCT = useCalculatorStore((s) => s.setCT);

  return (
    <CollapsibleSection title="CT Parameters" defaultOpen={false}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="Calcium Score"
          value={ct.calciumScore}
          onChange={(v) => setCT("calciumScore", v)}
          unit="AU"
          placeholder="2000"
          min={0}
          step={1}
        />

        <NumericInput
          label="Annulus Diameter"
          value={ct.annulusDiameter}
          onChange={(v) => setCT("annulusDiameter", v)}
          unit="mm"
          placeholder="24"
          min={0}
          max={50}
          step={0.1}
        />

        <NumericInput
          label="Annulus Area"
          value={ct.annulusArea}
          onChange={(v) => setCT("annulusArea", v)}
          unit="mm\u00B2"
          placeholder="450"
          min={0}
          max={1200}
          step={1}
        />

        <NumericInput
          label="Annulus Perimeter"
          value={ct.annulusPerimeter}
          onChange={(v) => setCT("annulusPerimeter", v)}
          unit="mm"
          placeholder="75"
          min={0}
          max={150}
          step={0.1}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
        <SegmentedControl
          label="Bicuspid Type"
          options={[
            { label: "None", value: "none" as const },
            { label: "Type 0", value: "type0" as const },
            { label: "Type 1", value: "type1" as const },
            { label: "Type 2", value: "type2" as const },
          ]}
          value={ct.bicuspidType}
          onChange={(v) => setCT("bicuspidType", v)}
        />

        <SegmentedControl
          label="Leaflet Calcification"
          options={[
            { label: "None", value: "none" as const },
            { label: "Mild", value: "mild" as const },
            { label: "Mod", value: "moderate" as const },
            { label: "Severe", value: "severe" as const },
          ]}
          value={ct.leafletCalcification}
          onChange={(v) => setCT("leafletCalcification", v)}
        />

        <SegmentedControl
          label="LVOT Calcification"
          options={[
            { label: "None", value: "none" as const },
            { label: "Mild", value: "mild" as const },
            { label: "Mod", value: "moderate" as const },
            { label: "Severe", value: "severe" as const },
          ]}
          value={ct.lvotCalcification}
          onChange={(v) => setCT("lvotCalcification", v)}
        />
      </div>
    </CollapsibleSection>
  );
}
