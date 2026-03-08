"use client";

import { useCalculatorStore } from "@/store/calculatorStore";
import { Card } from "@/components/ui/Card";
import { NumericInput } from "@/components/ui/NumericInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Trash2 } from "lucide-react";

export function DemographicsSection() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const setDemographic = useCalculatorStore((s) => s.setDemographic);
  const clearDemographics = useCalculatorStore((s) => s.clearDemographics);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-200">Demographics</h2>
        <button
          onClick={clearDemographics}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NumericInput
          label="Age"
          value={demographics.age}
          onChange={(v) => setDemographic("age", v)}
          unit="yrs"
          placeholder="65"
          min={0}
          max={120}
          step={1}
        />

        <SegmentedControl
          label="Sex"
          options={[
            { label: "Male", value: "male" as const },
            { label: "Female", value: "female" as const },
          ]}
          value={demographics.sex}
          onChange={(v) => setDemographic("sex", v)}
        />

        <NumericInput
          label="Height"
          value={demographics.heightCm}
          onChange={(v) => setDemographic("heightCm", v)}
          unit="cm"
          placeholder="170"
          min={50}
          max={250}
          step={1}
        />

        <NumericInput
          label="Weight"
          value={demographics.weightKg}
          onChange={(v) => setDemographic("weightKg", v)}
          unit="kg"
          placeholder="75"
          min={20}
          max={300}
          step={0.1}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        <SegmentedControl
          label="Symptomatic"
          options={[
            { label: "Yes", value: "yes" as const },
            { label: "No", value: "no" as const },
          ]}
          value={
            demographics.symptomatic === undefined
              ? undefined
              : demographics.symptomatic
                ? "yes"
                : "no"
          }
          onChange={(v) => setDemographic("symptomatic", v === "yes")}
        />

        <SegmentedControl
          label="NYHA Class"
          options={[
            { label: "I", value: "I" as const },
            { label: "II", value: "II" as const },
            { label: "III", value: "III" as const },
            { label: "IV", value: "IV" as const },
          ]}
          value={demographics.nyhaClass}
          onChange={(v) => setDemographic("nyhaClass", v)}
        />
      </div>
    </Card>
  );
}
