import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { NumericInput } from "../ui/NumericInput";
import { ResultRow } from "../ui/ResultRow";
import { SegmentedControl } from "../ui/SegmentedControl";
import { Colors } from "../../constants/theme";
import {
  annulusAreaFromDiameter,
  annulusDiameterFromArea,
  annulusPerimeterFromDiameter,
  annulusDiameterFromPerimeter,
  annulusAreaFromPerimeter,
  annulusPerimeterFromArea,
} from "../../lib/calculations";

type InputSource = "area" | "perimeter" | "diameter";

interface AnnulusCalculatorProps {
  onAreaChange?: (area: number | undefined) => void;
}

export function AnnulusCalculator({ onAreaChange }: AnnulusCalculatorProps) {
  const [source, setSource] = useState<InputSource>("area");
  const [inputValue, setInputValue] = useState<number | undefined>();
  const [area, setArea] = useState<number | undefined>();
  const [perimeter, setPerimeter] = useState<number | undefined>();
  const [diameter, setDiameter] = useState<number | undefined>();

  useEffect(() => {
    if (inputValue === undefined) {
      setArea(undefined);
      setPerimeter(undefined);
      setDiameter(undefined);
      onAreaChange?.(undefined);
      return;
    }
    let computedArea: number | undefined;
    switch (source) {
      case "area":
        computedArea = inputValue;
        setArea(inputValue);
        setDiameter(annulusDiameterFromArea(inputValue));
        setPerimeter(annulusPerimeterFromArea(inputValue));
        break;
      case "perimeter":
        computedArea = annulusAreaFromPerimeter(inputValue);
        setPerimeter(inputValue);
        setDiameter(annulusDiameterFromPerimeter(inputValue));
        setArea(computedArea);
        break;
      case "diameter":
        computedArea = annulusAreaFromDiameter(inputValue);
        setDiameter(inputValue);
        setArea(computedArea);
        setPerimeter(annulusPerimeterFromDiameter(inputValue));
        break;
    }
    onAreaChange?.(computedArea);
  }, [inputValue, source]);

  const inputLabel =
    source === "area"
      ? "Annulus Area"
      : source === "perimeter"
      ? "Annulus Perimeter"
      : "Annulus Diameter";
  const inputUnit =
    source === "area" ? "mm\u00B2" : "mm";

  return (
    <Card>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 16,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Annulus Calculator
      </Text>
      <SegmentedControl
        label="Input Parameter"
        options={[
          { value: "area" as InputSource, label: "Area" },
          { value: "perimeter" as InputSource, label: "Perimeter" },
          { value: "diameter" as InputSource, label: "Diameter" },
        ]}
        selected={source}
        onSelect={(v) => {
          setSource(v);
          setInputValue(undefined);
        }}
      />
      <NumericInput
        label={inputLabel}
        value={inputValue}
        onValueChange={setInputValue}
        unit={inputUnit}
        placeholder={source === "area" ? "e.g. 450" : source === "perimeter" ? "e.g. 75" : "e.g. 24"}
      />

      {inputValue !== undefined && (
        <View style={{ marginTop: 10 }}>
          {source !== "area" && (
            <ResultRow
              label="Calculated Area"
              value={area !== undefined ? area.toFixed(1) : undefined}
              unit="mm\u00B2"
              severity="info"
            />
          )}
          {source !== "perimeter" && (
            <ResultRow
              label="Calculated Perimeter"
              value={perimeter !== undefined ? perimeter.toFixed(1) : undefined}
              unit="mm"
              severity="info"
            />
          )}
          {source !== "diameter" && (
            <ResultRow
              label="Calculated Diameter"
              value={diameter !== undefined ? diameter.toFixed(1) : undefined}
              unit="mm"
              severity="info"
            />
          )}
          <Text style={{ color: Colors.muted, fontSize: 10, marginTop: 6, fontStyle: "italic" }}>
            Assumes circular annulus. For bicuspid or eccentric anatomy, use CT
            3D planimetry.
          </Text>
        </View>
      )}
    </Card>
  );
}
