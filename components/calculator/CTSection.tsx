import { View, Text } from "react-native";
import { CollapsibleSection } from "../ui/CollapsibleSection";
import { NumericInput } from "../ui/NumericInput";
import { SegmentedControl } from "../ui/SegmentedControl";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Colors } from "../../constants/theme";

export function CTSection() {
  const ct = useCalculatorStore((s) => s.ct);
  const setCT = useCalculatorStore((s) => s.setCT);

  return (
    <CollapsibleSection title="CT / Multimodality Parameters">
      <NumericInput
        label="AV Calcium Score"
        value={ct.calciumScore}
        onValueChange={(v) => setCT("calciumScore", v)}
        unit="AU"
        hint="Severe: M >=2000, F >=1200"
        min={0}
        max={20000}
        placeholder="e.g. 2500"
      />

      <NumericInput
        label="CT Annulus Diameter"
        value={ct.annulusDiameter}
        onValueChange={(v) => setCT("annulusDiameter", v)}
        unit="mm"
        hint="Typical: 20-30 mm"
        min={10}
        max={50}
        placeholder="e.g. 25"
      />

      <NumericInput
        label="CT Annulus Area"
        value={ct.annulusArea}
        onValueChange={(v) => setCT("annulusArea", v)}
        unit="mm\u00B2"
        hint="Typical: 300-700 mm\u00B2"
        min={100}
        max={1200}
        placeholder="e.g. 480"
      />

      <NumericInput
        label="CT Annulus Perimeter"
        value={ct.annulusPerimeter}
        onValueChange={(v) => setCT("annulusPerimeter", v)}
        unit="mm"
        hint="Typical: 65-95 mm"
        min={30}
        max={150}
        placeholder="e.g. 78"
      />

      <NumericInput
        label="CT LVOT Diameter"
        value={ct.lvotDiameterCT}
        onValueChange={(v) => setCT("lvotDiameterCT", v)}
        unit="mm"
        hint="Typical: 18-28 mm"
        min={10}
        max={45}
        placeholder="e.g. 22"
      />

      <SegmentedControl
        label="Bicuspid Type"
        options={[
          { value: "none" as const, label: "None" },
          { value: "type0" as const, label: "Type 0" },
          { value: "type1" as const, label: "Type 1" },
          { value: "type2" as const, label: "Type 2" },
        ]}
        selected={ct.bicuspidType}
        onSelect={(v) => setCT("bicuspidType", v)}
      />

      <SegmentedControl
        label="Leaflet Calcification"
        options={[
          { value: "none" as const, label: "None" },
          { value: "mild" as const, label: "Mild" },
          { value: "moderate" as const, label: "Moderate" },
          { value: "severe" as const, label: "Severe" },
        ]}
        selected={ct.leafletCalcification}
        onSelect={(v) => setCT("leafletCalcification", v)}
      />

      <SegmentedControl
        label="LVOT Calcification"
        options={[
          { value: "none" as const, label: "None" },
          { value: "mild" as const, label: "Mild" },
          { value: "moderate" as const, label: "Moderate" },
          { value: "severe" as const, label: "Severe" },
        ]}
        selected={ct.lvotCalcification}
        onSelect={(v) => setCT("lvotCalcification", v)}
      />
    </CollapsibleSection>
  );
}
