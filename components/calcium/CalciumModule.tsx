"use client";

import { useMemo } from "react";
import { useCalciumStore } from "@/store/calciumStore";
import { Card } from "@/components/ui/Card";
import { NumericInput } from "@/components/ui/NumericInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Badge } from "@/components/ui/Badge";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import {
  assessCalcium,
  CLAVEL_THRESHOLDS,
  ACC_AHA_THRESHOLDS,
  DENSITY_THRESHOLDS,
} from "@/lib/calcium-scoring";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Info,
  Beaker,
} from "lucide-react";

const severityConfig = {
  "very-likely-severe": {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    dot: "bg-red-400",
    badge: "danger" as const,
    label: "Very Likely Severe",
  },
  "likely-severe": {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-400",
    badge: "warning" as const,
    label: "Likely Severe",
  },
  indeterminate: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-400",
    badge: "warning" as const,
    label: "Indeterminate",
  },
  "unlikely-severe": {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    badge: "success" as const,
    label: "Unlikely Severe",
  },
};

export function CalciumModule() {
  const store = useCalciumStore();

  const assessment = useMemo(() => {
    if (store.calciumScore === undefined || !store.sex) return null;
    return assessCalcium({
      score: store.calciumScore,
      sex: store.sex,
      annulusAreaMm2: store.annulusAreaMm2,
      echo:
        store.ava !== undefined || store.meanGradient !== undefined
          ? {
              ava: store.ava,
              meanGradient: store.meanGradient,
              lvef: store.lvef,
              svi: store.svi,
            }
          : undefined,
    });
  }, [
    store.calciumScore,
    store.sex,
    store.annulusAreaMm2,
    store.ava,
    store.meanGradient,
    store.lvef,
    store.svi,
  ]);

  const sexThresholds = store.sex
    ? CLAVEL_THRESHOLDS[store.sex]
    : CLAVEL_THRESHOLDS.male;

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-200">
            AV Calcium Score Input
          </h2>
          <button
            onClick={store.clearAll}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <RotateCcw size={12} />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SegmentedControl
            label="Sex"
            options={[
              { label: "Male", value: "male" as const },
              { label: "Female", value: "female" as const },
            ]}
            value={store.sex}
            onChange={store.setSex}
          />
          <NumericInput
            label="AV Calcium Score"
            value={store.calciumScore}
            onChange={(v) => store.setField("calciumScore", v)}
            unit="AU"
            placeholder="e.g. 1800"
            min={0}
            step={1}
          />
          <NumericInput
            label="CT Annulus Area"
            value={store.annulusAreaMm2}
            onChange={(v) => store.setField("annulusAreaMm2", v)}
            unit="mm²"
            placeholder="Optional"
            min={0}
            max={1200}
            step={1}
          />
        </div>
      </Card>

      {/* Optional Echo Context */}
      <CollapsibleSection
        title="Echo Context (for discordant adjudication)"
        defaultOpen={false}
      >
        <p className="text-[10px] text-slate-500 mb-3">
          Enter echo parameters if calcium score is being used to adjudicate
          discordant low-gradient AS (AVA &lt;1.0 cm² + MG &lt;40 mmHg).
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <NumericInput
            label="AVA"
            value={store.ava}
            onChange={(v) => store.setField("ava", v)}
            unit="cm²"
            placeholder="0.8"
            min={0}
            max={6}
            step={0.01}
          />
          <NumericInput
            label="Mean Gradient"
            value={store.meanGradient}
            onChange={(v) => store.setField("meanGradient", v)}
            unit="mmHg"
            placeholder="30"
            min={0}
            max={120}
            step={1}
          />
          <NumericInput
            label="LVEF"
            value={store.lvef}
            onChange={(v) => store.setField("lvef", v)}
            unit="%"
            placeholder="55"
            min={0}
            max={90}
            step={1}
          />
          <NumericInput
            label="SVI"
            value={store.svi}
            onChange={(v) => store.setField("svi", v)}
            unit="mL/m²"
            placeholder="35"
            min={0}
            max={100}
            step={1}
          />
        </div>
      </CollapsibleSection>

      {/* Results */}
      {assessment && (
        <>
          {/* Calcium Severity Gauge */}
          <Card>
            <h2 className="text-sm font-semibold text-slate-200 mb-3">
              Calcium Severity Classification
            </h2>
            <CalciumGauge
              score={store.calciumScore!}
              sex={store.sex!}
              severity={assessment.absolute.severity}
            />
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Badge variant={severityConfig[assessment.absolute.severity].badge}>
                {severityConfig[assessment.absolute.severity].label}
              </Badge>
              {assessment.absolute.accAhaSevere && (
                <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                  ACC/AHA: Severe
                </span>
              )}
              {assessment.absolute.escSevere && (
                <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                  ESC: Severe
                </span>
              )}
            </div>
          </Card>

          {/* Calcium Density Index */}
          {assessment.density && (
            <Card>
              <h2 className="text-sm font-semibold text-slate-200 mb-2">
                Calcium Density Index
              </h2>
              <div
                className={`rounded-lg border p-3 ${severityConfig[assessment.density.severity].bg} ${severityConfig[assessment.density.severity].border}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Beaker size={14} className={severityConfig[assessment.density.severity].text} />
                  <span className="text-sm font-mono font-medium text-slate-200">
                    {assessment.density.density.toFixed(0)} AU/cm²
                  </span>
                  <Badge variant={severityConfig[assessment.density.severity].badge}>
                    {severityConfig[assessment.density.severity].label}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400">
                  AVC Score / CT Annulus Area. Thresholds ({store.sex === "female" ? "women" : "men"}
                  ): Very likely severe ≥{DENSITY_THRESHOLDS[store.sex!].veryLikely} AU/cm²,
                  Likely ≥{DENSITY_THRESHOLDS[store.sex!].likely} AU/cm²
                </p>
                <p className="text-[9px] text-slate-500 mt-1">
                  Clavel MA et al. JACC Cardiovasc Imaging 2016;9:460-469
                </p>
              </div>
            </Card>
          )}

          {/* Clinical Conclusion */}
          <Card>
            <h2 className="text-sm font-semibold text-slate-200 mb-2">
              Clinical Assessment
            </h2>
            {assessment.adjudicatesDiscordance && (
              <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info size={14} className="text-blue-400 shrink-0" />
                <span className="text-xs text-blue-300">
                  Adjudicating discordant low-gradient AS (AVA &lt;1.0, MG &lt;40)
                </span>
              </div>
            )}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-medium text-slate-400 mb-1">
                  Conclusion
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {assessment.conclusion}
                </p>
              </div>
              <div
                className={`rounded-lg border p-3 ${severityConfig[assessment.absolute.severity].bg} ${severityConfig[assessment.absolute.severity].border}`}
              >
                <h3 className="text-xs font-medium text-slate-400 mb-1">
                  Recommended Action
                </h3>
                <p className={`text-xs font-medium ${severityConfig[assessment.absolute.severity].text} leading-relaxed`}>
                  {assessment.clinicalAction}
                </p>
              </div>
            </div>
          </Card>

          {/* Guideline Threshold Comparison */}
          <Card>
            <h2 className="text-sm font-semibold text-slate-200 mb-3">
              Guideline Threshold Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-navy-600">
                    <th className="pb-2 pr-4">Guideline</th>
                    <th className="pb-2 pr-4">Male Severe</th>
                    <th className="pb-2 pr-4">Female Severe</th>
                    <th className="pb-2">System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-600/50">
                  <tr className="text-slate-300">
                    <td className="py-2 pr-4 font-medium">Clavel 2014</td>
                    <td className="py-2 pr-4 font-mono">≥2000 AU</td>
                    <td className="py-2 pr-4 font-mono">≥1200 AU</td>
                    <td className="py-2 text-slate-500">3-tier</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-2 pr-4 font-medium">ACC/AHA 2020</td>
                    <td className="py-2 pr-4 font-mono">≥2000 AU</td>
                    <td className="py-2 pr-4 font-mono">≥1300 AU</td>
                    <td className="py-2 text-slate-500">Binary</td>
                  </tr>
                  <tr className="text-slate-300">
                    <td className="py-2 pr-4 font-medium">ESC 2021</td>
                    <td className="py-2 pr-4 font-mono">≥2000 AU</td>
                    <td className="py-2 pr-4 font-mono">≥1200 AU</td>
                    <td className="py-2 text-slate-500">3-tier</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Indeterminate zone */}
            <div className="mt-3 rounded-lg bg-navy-700/50 border border-navy-600 p-3">
              <h3 className="text-xs font-medium text-amber-400 mb-1">
                Indeterminate Zone (Clavel/ESC)
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500">Men:</span>{" "}
                  <span className="font-mono">1200–1999 AU</span>
                </div>
                <div>
                  <span className="text-slate-500">Women:</span>{" "}
                  <span className="font-mono">800–1199 AU</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Scores in this zone are &ldquo;likely severe&rdquo; but cannot definitively
                confirm severity. Consider calcium density index or serial imaging.
              </p>
            </div>
          </Card>

          {/* Density Thresholds Reference */}
          <Card>
            <h2 className="text-sm font-semibold text-slate-200 mb-3">
              Calcium Density Thresholds
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-navy-600">
                    <th className="pb-2 pr-4">Severity</th>
                    <th className="pb-2 pr-4">Male (AU/cm²)</th>
                    <th className="pb-2 pr-4">Female (AU/cm²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-600/50">
                  <tr>
                    <td className="py-2 pr-4 text-red-400">Very Likely Severe</td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      ≥{DENSITY_THRESHOLDS.male.veryLikely}
                    </td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      ≥{DENSITY_THRESHOLDS.female.veryLikely}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-amber-400">Likely Severe</td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      {DENSITY_THRESHOLDS.male.likely}–{DENSITY_THRESHOLDS.male.veryLikely - 1}
                    </td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      {DENSITY_THRESHOLDS.female.likely}–{DENSITY_THRESHOLDS.female.veryLikely - 1}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-emerald-400">Unlikely Severe</td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      &lt;{DENSITY_THRESHOLDS.male.likely}
                    </td>
                    <td className="py-2 pr-4 font-mono text-slate-300">
                      &lt;{DENSITY_THRESHOLDS.female.likely}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[9px] text-slate-500 mt-2">
              Calcium density = AVC Score ÷ CT annulus area (cm²). Clavel MA et al.
              JACC Cardiovasc Imaging 2016;9:460-469.
            </p>
          </Card>
        </>
      )}

      {/* Always show: Quick Reference */}
      {!assessment && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            AV Calcium Scoring — Quick Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Severity</th>
                  <th className="pb-2 pr-4">Male (AU)</th>
                  <th className="pb-2 pr-4">Female (AU)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-600/50">
                <tr>
                  <td className="py-2 pr-4 text-red-400">Severe AS</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">≥2000</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">≥1200</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-amber-400">Likely Severe</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">1200–1999</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">800–1199</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-emerald-400">Unlikely Severe</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">&lt;1200</td>
                  <td className="py-2 pr-4 font-mono text-slate-300">&lt;800</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-slate-500 mt-2">
            Clavel MA et al. JACC 2014;63:1724-1735 &amp; Heart 2015;101:1881-1888
          </p>
          <p className="text-xs text-slate-500 mt-4">
            Enter sex and calcium score above to see full analysis.
          </p>
        </Card>
      )}
    </div>
  );
}

// ─── Visual Calcium Gauge ─────────────────────────────────────────────────────

function CalciumGauge({
  score,
  sex,
  severity,
}: {
  score: number;
  sex: "male" | "female";
  severity: string;
}) {
  const thresholds = CLAVEL_THRESHOLDS[sex];
  // Gauge spans 0 to max (2x the severe threshold for visual range)
  const maxGauge = thresholds.severe * 1.5;
  const position = Math.min(100, (score / maxGauge) * 100);

  const unlikelyWidth = (thresholds.likelySevere / maxGauge) * 100;
  const likelyWidth =
    ((thresholds.severe - thresholds.likelySevere) / maxGauge) * 100;
  const severeWidth = 100 - unlikelyWidth - likelyWidth;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-slate-400">
          AV Calcium Score ({sex === "female" ? "Female" : "Male"} thresholds)
        </span>
        <span className="text-sm font-mono font-medium text-slate-200">
          {score} AU
        </span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-emerald-600"
          style={{ width: `${unlikelyWidth}%` }}
          title="Unlikely Severe"
        />
        <div
          className="h-full bg-amber-600"
          style={{ width: `${likelyWidth}%` }}
          title="Likely Severe (Indeterminate)"
        />
        <div
          className="h-full bg-red-600"
          style={{ width: `${severeWidth}%` }}
          title="Very Likely Severe"
        />
        {/* Marker */}
        <div
          className="absolute top-0 w-0.5 h-full bg-white shadow-[0_0_6px_white]"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="flex text-[9px] text-slate-500">
        <div style={{ width: `${unlikelyWidth}%` }}>
          Unlikely (&lt;{thresholds.likelySevere})
        </div>
        <div style={{ width: `${likelyWidth}%` }} className="text-center">
          Likely
        </div>
        <div style={{ width: `${severeWidth}%` }} className="text-right">
          Severe (≥{thresholds.severe})
        </div>
      </div>
    </div>
  );
}
