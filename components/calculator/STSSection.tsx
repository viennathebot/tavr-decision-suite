"use client";

import { useMemo } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { Badge } from "@/components/ui/Badge";
import { calculateSTSPROM } from "@/lib/sts-prom";
import type { STSRiskCategory } from "@/lib/sts-prom";

const riskBadgeVariant: Record<STSRiskCategory, "success" | "warning" | "danger"> = {
  low: "success",
  intermediate: "warning",
  high: "danger",
  extreme: "danger",
};

export function STSSection() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const echo = useCalculatorStore((s) => s.echo);
  const sts = useCalculatorStore((s) => s.sts);
  const setSTS = useCalculatorStore((s) => s.setSTS);

  const stsResult = useMemo(() => {
    return calculateSTSPROM({
      age: demographics.age,
      sex: demographics.sex,
      heightCm: demographics.heightCm,
      weightKg: demographics.weightKg,
      nyhaClass: demographics.nyhaClass,
      lvef: echo.lvef,
      creatinine: sts.creatinine,
      diabetes: sts.diabetes,
      priorCardiacSurgery: sts.priorCardiacSurgery,
      urgency: sts.urgency,
      endocarditis: sts.endocarditis,
      chronicLungDisease: sts.chronicLungDisease,
      peripheralVascularDisease: sts.peripheralVascularDisease,
      cerebrovascularDisease: sts.cerebrovascularDisease,
      preoperativeDialysis: sts.preoperativeDialysis,
    });
  }, [demographics, echo.lvef, sts]);

  const resultBadge = stsResult.sufficient ? (
    <Badge variant={riskBadgeVariant[stsResult.category]}>
      {stsResult.mortality.toFixed(2)}% &mdash; {stsResult.categoryLabel}
    </Badge>
  ) : null;

  return (
    <CollapsibleSection
      title="STS-PROM Risk Score"
      defaultOpen={false}
      badge={resultBadge}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="Creatinine"
          value={sts.creatinine}
          onChange={(v) => setSTS("creatinine", v)}
          unit="mg/dL"
          placeholder="1.0"
          min={0}
          max={20}
          step={0.1}
        />

        <SegmentedControl
          label="Diabetes"
          options={[
            { label: "None", value: "none" as const },
            { label: "Diet", value: "diet" as const },
            { label: "Oral", value: "oral" as const },
            { label: "Insulin", value: "insulin" as const },
          ]}
          value={sts.diabetes}
          onChange={(v) => setSTS("diabetes", v)}
        />

        <SegmentedControl
          label="Prior Cardiac Surgery"
          options={[
            { label: "No", value: "no" as const },
            { label: "Yes", value: "yes" as const },
          ]}
          value={
            sts.priorCardiacSurgery === undefined
              ? undefined
              : sts.priorCardiacSurgery
                ? "yes"
                : "no"
          }
          onChange={(v) => setSTS("priorCardiacSurgery", v === "yes")}
        />

        <SegmentedControl
          label="Urgency"
          options={[
            { label: "Elective", value: "elective" as const },
            { label: "Urgent", value: "urgent" as const },
            { label: "Emergent", value: "emergent" as const },
          ]}
          value={sts.urgency}
          onChange={(v) => setSTS("urgency", v)}
        />

        <SegmentedControl
          label="Endocarditis"
          options={[
            { label: "No", value: "no" as const },
            { label: "Yes", value: "yes" as const },
          ]}
          value={
            sts.endocarditis === undefined
              ? undefined
              : sts.endocarditis
                ? "yes"
                : "no"
          }
          onChange={(v) => setSTS("endocarditis", v === "yes")}
        />

        <SegmentedControl
          label="Chronic Lung Disease"
          options={[
            { label: "None", value: "none" as const },
            { label: "Mild", value: "mild" as const },
            { label: "Mod", value: "moderate" as const },
            { label: "Severe", value: "severe" as const },
          ]}
          value={sts.chronicLungDisease}
          onChange={(v) => setSTS("chronicLungDisease", v)}
        />

        <SegmentedControl
          label="PVD"
          options={[
            { label: "No", value: "no" as const },
            { label: "Yes", value: "yes" as const },
          ]}
          value={
            sts.peripheralVascularDisease === undefined
              ? undefined
              : sts.peripheralVascularDisease
                ? "yes"
                : "no"
          }
          onChange={(v) =>
            setSTS("peripheralVascularDisease", v === "yes")
          }
        />

        <SegmentedControl
          label="CVD"
          options={[
            { label: "No", value: "no" as const },
            { label: "Yes", value: "yes" as const },
          ]}
          value={
            sts.cerebrovascularDisease === undefined
              ? undefined
              : sts.cerebrovascularDisease
                ? "yes"
                : "no"
          }
          onChange={(v) =>
            setSTS("cerebrovascularDisease", v === "yes")
          }
        />

        <SegmentedControl
          label="Dialysis"
          options={[
            { label: "No", value: "no" as const },
            { label: "Yes", value: "yes" as const },
          ]}
          value={
            sts.preoperativeDialysis === undefined
              ? undefined
              : sts.preoperativeDialysis
                ? "yes"
                : "no"
          }
          onChange={(v) =>
            setSTS("preoperativeDialysis", v === "yes")
          }
        />
      </div>

      {/* STS-PROM Result Display */}
      {stsResult.sufficient && (
        <div className="mt-4 rounded-lg border border-navy-600 bg-navy-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-200">
              Estimated 30-Day Mortality
            </span>
            <Badge variant={riskBadgeVariant[stsResult.category]}>
              {stsResult.mortality.toFixed(2)}%
            </Badge>
          </div>
          <div className="mb-2">
            <span
              className={`text-xs font-medium ${
                stsResult.category === "low"
                  ? "text-emerald-400"
                  : stsResult.category === "intermediate"
                    ? "text-amber-400"
                    : "text-red-400"
              }`}
            >
              {stsResult.categoryLabel}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {stsResult.interpretation}
          </p>
        </div>
      )}

      {!stsResult.sufficient && (
        <p className="mt-3 text-xs text-slate-500 italic">
          {stsResult.interpretation}
        </p>
      )}
    </CollapsibleSection>
  );
}
