"use client";

import { useState, useCallback, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { NumericInput } from "@/components/ui/NumericInput";
import {
  annulusAreaFromDiameter,
  annulusAreaFromPerimeter,
  annulusDiameterFromArea,
  annulusDiameterFromPerimeter,
  annulusPerimeterFromArea,
  annulusPerimeterFromDiameter,
} from "@/lib/calculations";

interface AnnulusCalculatorProps {
  onCalculated?: (values: {
    diameter?: number;
    area?: number;
    perimeter?: number;
  }) => void;
}

type InputSource = "diameter" | "area" | "perimeter" | null;

export function AnnulusCalculator({ onCalculated }: AnnulusCalculatorProps) {
  const [diameter, setDiameter] = useState<number | undefined>();
  const [area, setArea] = useState<number | undefined>();
  const [perimeter, setPerimeter] = useState<number | undefined>();
  const [source, setSource] = useState<InputSource>(null);

  const recalculate = useCallback(
    (src: InputSource, value: number | undefined) => {
      if (value === undefined) {
        setDiameter(undefined);
        setArea(undefined);
        setPerimeter(undefined);
        onCalculated?.({});
        return;
      }

      let d: number | undefined;
      let a: number | undefined;
      let p: number | undefined;

      switch (src) {
        case "diameter":
          d = value;
          a = annulusAreaFromDiameter(value);
          p = annulusPerimeterFromDiameter(value);
          break;
        case "area":
          a = value;
          d = annulusDiameterFromArea(value);
          p = annulusPerimeterFromArea(value);
          break;
        case "perimeter":
          p = value;
          d = annulusDiameterFromPerimeter(value);
          a = annulusAreaFromPerimeter(value);
          break;
      }

      setDiameter(d !== undefined ? Math.round(d * 100) / 100 : undefined);
      setArea(a !== undefined ? Math.round(a * 100) / 100 : undefined);
      setPerimeter(p !== undefined ? Math.round(p * 100) / 100 : undefined);
      onCalculated?.({ diameter: d, area: a, perimeter: p });
    },
    [onCalculated]
  );

  const handleDiameter = (v: number | undefined) => {
    setSource("diameter");
    setDiameter(v);
    recalculate("diameter", v);
  };

  const handleArea = (v: number | undefined) => {
    setSource("area");
    setArea(v);
    recalculate("area", v);
  };

  const handlePerimeter = (v: number | undefined) => {
    setSource("perimeter");
    setPerimeter(v);
    recalculate("perimeter", v);
  };

  return (
    <Card>
      <h2 className="text-sm font-semibold text-slate-200 mb-1">
        Annulus Geometry Calculator
      </h2>
      <p className="text-[10px] text-slate-500 mb-4">
        Enter any one measurement to calculate the others (assumes circular
        cross-section).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <NumericInput
            label="Diameter"
            value={diameter}
            onChange={handleDiameter}
            unit="mm"
            placeholder="24.0"
            min={0}
            max={50}
            step={0.1}
          />
          {source !== "diameter" && source !== null && diameter !== undefined && (
            <p className="text-[10px] text-gold mt-1 font-mono">
              = {diameter.toFixed(1)} mm
            </p>
          )}
        </div>
        <div>
          <NumericInput
            label="Area"
            value={area}
            onChange={handleArea}
            unit="mm2"
            placeholder="452"
            min={0}
            max={1200}
            step={1}
          />
          {source !== "area" && source !== null && area !== undefined && (
            <p className="text-[10px] text-gold mt-1 font-mono">
              = {area.toFixed(1)} mm2
            </p>
          )}
        </div>
        <div>
          <NumericInput
            label="Perimeter"
            value={perimeter}
            onChange={handlePerimeter}
            unit="mm"
            placeholder="75.4"
            min={0}
            max={150}
            step={0.1}
          />
          {source !== "perimeter" &&
            source !== null &&
            perimeter !== undefined && (
              <p className="text-[10px] text-gold mt-1 font-mono">
                = {perimeter.toFixed(1)} mm
              </p>
            )}
        </div>
      </div>
    </Card>
  );
}
