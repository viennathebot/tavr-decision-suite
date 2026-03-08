"use client";

import { useMemo } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import {
  bsa as calcBSA,
  ava as calcAVA,
  indexedAVA,
  strokeVolumeIndex,
  dvi as calcDVI,
  flowRate as calcFlowRate,
  arterialCompliance,
} from "@/lib/calculations";
import { classifyAS } from "@/lib/classification";
import { generateRecommendations } from "@/lib/recommendations";
import { checkMeasurementErrors } from "@/lib/validation";
import { calculateSTSPROM } from "@/lib/sts-prom";
import { ResultRow } from "@/components/ui/ResultRow";
import { SeverityBar } from "@/components/ui/SeverityBar";
import { MeasurementErrorChecklist } from "./MeasurementErrorChecklist";
import { CalciumInterpretation } from "./CalciumInterpretation";
import { PatternCard } from "./PatternCard";
import { RecommendationCard } from "./RecommendationCard";
import { Badge } from "@/components/ui/Badge";
import type { STSRiskCategory } from "@/lib/sts-prom";

const stsRiskBadgeVariant: Record<STSRiskCategory, "success" | "warning" | "danger"> = {
  low: "success",
  intermediate: "warning",
  high: "danger",
  extreme: "danger",
};

export function ResultsPanel() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const echo = useCalculatorStore((s) => s.echo);
  const ct = useCalculatorStore((s) => s.ct);
  const dobutamine = useCalculatorStore((s) => s.dobutamine);
  const sts = useCalculatorStore((s) => s.sts);

  // Derived calculations
  const calcs = useMemo(() => {
    const bsaVal =
      demographics.heightCm && demographics.weightKg
        ? calcBSA(demographics.heightCm, demographics.weightKg)
        : undefined;

    const avaVal =
      echo.lvotDiameter && echo.lvotTVI && echo.aovTVI
        ? calcAVA(echo.lvotDiameter, echo.lvotTVI, echo.aovTVI)
        : undefined;

    const iAVA =
      avaVal !== undefined && bsaVal !== undefined
        ? indexedAVA(avaVal, bsaVal)
        : undefined;

    const sviVal =
      echo.strokeVolume !== undefined && bsaVal !== undefined
        ? strokeVolumeIndex(echo.strokeVolume, bsaVal)
        : undefined;

    const dviVal =
      echo.lvotTVI !== undefined && echo.aovTVI !== undefined
        ? calcDVI(echo.lvotTVI, echo.aovTVI)
        : undefined;

    const flowRateVal =
      echo.strokeVolume !== undefined && echo.lvEjectionTime !== undefined
        ? calcFlowRate(echo.strokeVolume, echo.lvEjectionTime)
        : undefined;

    const sacVal =
      sviVal !== undefined &&
      echo.systolicBP !== undefined &&
      echo.diastolicBP !== undefined &&
      echo.systolicBP > echo.diastolicBP
        ? arterialCompliance(sviVal, echo.systolicBP, echo.diastolicBP)
        : undefined;

    return { bsaVal, avaVal, iAVA, sviVal, dviVal, flowRateVal, sacVal };
  }, [demographics, echo]);

  // Classification
  const classification = useMemo(() => {
    return classifyAS(
      {
        ava: calcs.avaVal,
        meanGradient: echo.meanGradient,
        vmax: echo.vmax,
        lvef: echo.lvef,
        svi: calcs.sviVal,
        dvi: calcs.dviVal,
      },
      {
        sex: demographics.sex,
        calciumScore: ct.calciumScore,
        stressAVA: dobutamine.stressAVA,
        stressMeanGradient: dobutamine.stressMeanGradient,
      },
    );
  }, [calcs, echo, demographics.sex, ct.calciumScore, dobutamine]);

  // STS-PROM
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

  // Measurement errors
  const measurementErrors = useMemo(() => {
    return checkMeasurementErrors({
      lvotDiameter: echo.lvotDiameter,
      lvotTVI: echo.lvotTVI,
      bsa: calcs.bsaVal,
      ava: calcs.avaVal,
      dvi: calcs.dviVal,
      sbp: echo.systolicBP,
    });
  }, [echo, calcs]);

  // Recommendations
  const recommendations = useMemo(() => {
    if (!classification) return [];
    return generateRecommendations({
      pattern: classification.pattern,
      symptomatic: demographics.symptomatic ?? false,
      lvef: echo.lvef,
      calciumScore: ct.calciumScore,
      sex: demographics.sex,
      nyhaClass: demographics.nyhaClass,
      hasDobutamineData:
        dobutamine.stressAVA !== undefined ||
        dobutamine.stressMeanGradient !== undefined,
      stressAVA: dobutamine.stressAVA,
      stressMeanGradient: dobutamine.stressMeanGradient,
      stsMortality: stsResult.sufficient ? stsResult.mortality : undefined,
      stsRiskCategory: stsResult.sufficient ? stsResult.category : undefined,
    });
  }, [classification, demographics, echo.lvef, ct, dobutamine, stsResult]);

  // Helper for AVA severity
  const avaSeverity = (v: number): "normal" | "moderate" | "severe" => {
    if (v < 1.0) return "severe";
    if (v <= 1.5) return "moderate";
    return "normal";
  };

  // Helper for SVI severity
  const sviSeverity = (v: number): "normal" | "severe" => {
    return v < 35 ? "severe" : "normal";
  };

  // Helper for DVI severity
  const dviSeverity = (v: number): "normal" | "severe" => {
    return v < 0.25 ? "severe" : "normal";
  };

  const hasAnyData =
    calcs.bsaVal !== undefined ||
    calcs.avaVal !== undefined ||
    calcs.sviVal !== undefined ||
    calcs.dviVal !== undefined ||
    echo.vmax !== undefined;

  if (!hasAnyData) {
    return (
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-8 text-center">
        <p className="text-sm text-slate-500">
          Enter echocardiographic measurements to see calculated results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Calculated Values */}
      <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">
          Calculated Values
        </h3>
        <div className="space-y-0">
          {calcs.bsaVal !== undefined && (
            <ResultRow
              label="BSA"
              value={calcs.bsaVal.toFixed(2)}
              unit="m\u00B2"
              subtext="Mosteller formula"
            />
          )}

          {calcs.avaVal !== undefined && (
            <ResultRow
              label="AVA"
              value={calcs.avaVal.toFixed(2)}
              unit="cm\u00B2"
              severity={avaSeverity(calcs.avaVal)}
              subtext="Continuity equation"
            />
          )}

          {calcs.iAVA !== undefined && (
            <ResultRow
              label="iAVA"
              value={calcs.iAVA.toFixed(2)}
              unit="cm\u00B2/m\u00B2"
              severity={calcs.iAVA < 0.6 ? "severe" : calcs.iAVA <= 0.85 ? "moderate" : "normal"}
              subtext="Indexed AVA (severe <0.6)"
            />
          )}

          {calcs.sviVal !== undefined && (
            <ResultRow
              label="SVI"
              value={calcs.sviVal.toFixed(1)}
              unit="mL/m\u00B2"
              severity={sviSeverity(calcs.sviVal)}
              subtext="Low-flow <35"
            />
          )}

          {calcs.dviVal !== undefined && (
            <ResultRow
              label="DVI"
              value={calcs.dviVal.toFixed(2)}
              severity={dviSeverity(calcs.dviVal)}
              subtext="Severe <0.25"
            />
          )}

          {calcs.flowRateVal !== undefined && (
            <ResultRow
              label="Flow Rate"
              value={calcs.flowRateVal.toFixed(0)}
              unit="mL/s"
              severity={calcs.flowRateVal < 200 ? "severe" : "normal"}
              subtext="Low-flow <200 mL/s"
            />
          )}

          {calcs.sacVal !== undefined && (
            <ResultRow
              label="SAC"
              value={calcs.sacVal.toFixed(2)}
              unit="mL/m\u00B2/mmHg"
              severity={calcs.sacVal < 0.6 ? "severe" : "normal"}
              subtext="Low compliance <0.6"
            />
          )}
        </div>
      </div>

      {/* Severity Bars */}
      {echo.vmax !== undefined && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <SeverityBar
            label="Peak Aortic Velocity (Vmax)"
            value={echo.vmax}
            unit="m/s"
            thresholds={[
              { label: "Normal", min: 0, max: 3, color: "#10b981" },
              { label: "Moderate", min: 3, max: 4, color: "#f59e0b" },
              { label: "Severe", min: 4, max: 7, color: "#ef4444" },
            ]}
          />
        </div>
      )}

      {calcs.sviVal !== undefined && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <SeverityBar
            label="Stroke Volume Index (SVI)"
            value={calcs.sviVal}
            unit="mL/m\u00B2"
            thresholds={[
              { label: "Low-Flow", min: 0, max: 35, color: "#ef4444" },
              { label: "Normal Flow", min: 35, max: 70, color: "#10b981" },
            ]}
          />
        </div>
      )}

      {/* Measurement Error Checklist */}
      <MeasurementErrorChecklist errors={measurementErrors} />

      {/* Calcium Interpretation */}
      {ct.calciumScore !== undefined && (
        <CalciumInterpretation
          calciumScore={ct.calciumScore}
          sex={demographics.sex}
        />
      )}

      {/* Pattern Classification */}
      {classification && <PatternCard result={classification} />}

      {/* STS-PROM Summary */}
      {stsResult.sufficient && (
        <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-200">
              STS-PROM Estimate
            </h3>
            <Badge variant={stsRiskBadgeVariant[stsResult.category]}>
              {stsResult.mortality.toFixed(2)}% &mdash;{" "}
              {stsResult.categoryLabel}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {stsResult.interpretation}
          </p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">
            Recommendations
          </h3>
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
