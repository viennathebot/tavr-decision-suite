"use client";

import { useMemo } from "react";
import { useTEERStore } from "@/store/teerStore";
import {
  gradeMR,
  assessTEEREligibility,
  recommendClipSize,
} from "@/lib/mr-classification";
import {
  MR_REDUCTION_ESTIMATES,
  COAPT_TRIAL,
  MITRA_FR_TRIAL,
  PROPORTIONATE_MR_CONCEPT,
  MITRACLIP_G4_SIZES,
} from "@/data/teer-data";
import { Badge } from "@/components/ui/Badge";
import { ResultRow } from "@/components/ui/ResultRow";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const gradeColor: Record<string, "success" | "warning" | "danger" | "gold" | "muted"> = {
  none: "muted",
  mild: "success",
  moderate: "warning",
  "moderate-severe": "warning",
  severe: "danger",
};

export function TEERResultsPanel() {
  const mr = useTEERStore((s) => s.mr);
  const anatomy = useTEERStore((s) => s.anatomy);
  const clinical = useTEERStore((s) => s.clinical);
  const exclusions = useTEERStore((s) => s.exclusions);

  const mrResult = useMemo(() => gradeMR(mr), [mr]);

  const eligibility = useMemo(
    () =>
      assessTEEREligibility({
        ...anatomy,
        ...clinical,
        ...exclusions,
        eroa: mr.eroa,
      }),
    [anatomy, clinical, exclusions, mr.eroa]
  );

  const clipSizing = useMemo(
    () =>
      recommendClipSize({
        flailGap: anatomy.flailGap,
        flailWidth: anatomy.flailWidth,
        coaptationDepth: anatomy.coaptationDepth,
        etiology: mr.etiology,
      }),
    [anatomy.flailGap, anatomy.flailWidth, anatomy.coaptationDepth, mr.etiology]
  );

  const hasAnyInput =
    mr.eroa !== undefined ||
    mr.rVol !== undefined ||
    mr.vcWidth !== undefined ||
    mr.rf !== undefined ||
    mr.vcArea3D !== undefined;

  return (
    <div className="space-y-4">
      {/* MR Severity Grading */}
      <div className="border border-navy-600 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-200">
              MR Severity Grade
            </span>
            {hasAnyInput && (
              <Badge variant={gradeColor[mrResult.grade]}>
                {mrResult.gradeName}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 bg-navy-800/50">
          {!hasAnyInput ? (
            <p className="text-xs text-slate-500">
              Enter MR parameters to calculate severity grade
            </p>
          ) : (
            <>
              {mrResult.parameterGrades.map((pg) => (
                <ResultRow
                  key={pg.parameter}
                  label={pg.parameter}
                  value={pg.value}
                  unit={
                    pg.parameter === "EROA"
                      ? "cm\u00B2"
                      : pg.parameter === "Regurgitant Volume"
                      ? "mL"
                      : pg.parameter === "Vena Contracta Width"
                      ? "cm"
                      : pg.parameter === "Regurgitant Fraction"
                      ? "%"
                      : "cm\u00B2"
                  }
                  severity={
                    pg.grade === "severe" || pg.grade === "moderate-severe"
                      ? "severe"
                      : pg.grade === "moderate"
                      ? "moderate"
                      : "normal"
                  }
                  subtext={pg.grade.replace("-", "-")}
                />
              ))}
              {mrResult.discordances.map((d, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 mt-2 p-2 bg-amber-500/5 border border-amber-500/20 rounded-lg"
                >
                  <AlertTriangle
                    size={12}
                    className="text-amber-400 mt-0.5 shrink-0"
                  />
                  <span className="text-[10px] text-amber-200/70">{d}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* TEER Eligibility */}
      <div className="border border-navy-600 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-200">
              TEER Eligibility
            </span>
            {(eligibility.met.length > 0 ||
              eligibility.notMet.length > 0 ||
              eligibility.exclusions.length > 0) && (
              <Badge
                variant={
                  eligibility.exclusions.length > 0
                    ? "danger"
                    : eligibility.eligible
                    ? "success"
                    : "warning"
                }
              >
                {eligibility.exclusions.length > 0
                  ? "Contraindicated"
                  : eligibility.eligible
                  ? "Criteria Met"
                  : "Criteria Not Met"}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 bg-navy-800/50 space-y-2">
          {eligibility.exclusions.length === 0 &&
            eligibility.met.length === 0 &&
            eligibility.notMet.length === 0 &&
            eligibility.warnings.length === 0 && (
              <p className="text-xs text-slate-500">
                Enter anatomy and clinical data to assess eligibility
              </p>
            )}

          {eligibility.exclusions.map((e, i) => (
            <div key={`ex-${i}`} className="flex items-start gap-2">
              <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
              <span className="text-xs text-red-300">{e}</span>
            </div>
          ))}

          {eligibility.notMet.map((n, i) => (
            <div key={`nm-${i}`} className="flex items-start gap-2">
              <XCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <span className="text-xs text-amber-300">{n}</span>
            </div>
          ))}

          {eligibility.met.map((m, i) => (
            <div key={`m-${i}`} className="flex items-start gap-2">
              <CheckCircle
                size={14}
                className="text-emerald-400 mt-0.5 shrink-0"
              />
              <span className="text-xs text-emerald-300">{m}</span>
            </div>
          ))}

          {eligibility.warnings.map((w, i) => (
            <div key={`w-${i}`} className="flex items-start gap-2">
              <AlertTriangle
                size={14}
                className="text-amber-400 mt-0.5 shrink-0"
              />
              <span className="text-xs text-amber-200/80">{w}</span>
            </div>
          ))}

          {/* Proportionate MR assessment */}
          {eligibility.proportionateMR && (
            <div className="mt-3 p-3 bg-navy-700/50 rounded-lg border border-navy-600">
              <p className="text-xs font-medium text-gold mb-1">
                Grayburn Classification
              </p>
              <Badge
                variant={
                  eligibility.proportionateMR === "disproportionate"
                    ? "success"
                    : eligibility.proportionateMR === "proportionate"
                    ? "warning"
                    : "muted"
                }
              >
                {eligibility.proportionateMR === "disproportionate"
                  ? "Disproportionate MR (COAPT-like) — Likely to benefit"
                  : eligibility.proportionateMR === "proportionate"
                  ? "Proportionate MR (MITRA-FR-like) — Benefit uncertain"
                  : "Indeterminate"}
              </Badge>
              <p className="text-[10px] text-slate-500 mt-1">
                Grayburn PA et al. Circulation 2019;139:747-750
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Clip Sizing */}
      <div className="border border-navy-600 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
          <span className="text-sm font-semibold text-slate-200">
            MitraClip G4 Sizing
          </span>
        </div>
        <div className="p-4 bg-navy-800/50">
          {clipSizing.recommended.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 mb-3">
                {clipSizing.recommended.map((clip, i) => (
                  <Badge key={clip} variant={i === 0 ? "gold" : "muted"}>
                    {clip}
                    {i === 0 ? " (Recommended)" : ""}
                  </Badge>
                ))}
              </div>
              {clipSizing.reasoning.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 mb-1"
                >
                  <Info
                    size={12}
                    className="text-slate-400 mt-0.5 shrink-0"
                  />
                  <span className="text-[11px] text-slate-300">{r}</span>
                </div>
              ))}

              {/* Clip dimensions table */}
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="text-left py-1 px-2 text-slate-400 font-medium">Clip</th>
                      <th className="text-left py-1 px-2 text-slate-400 font-medium">Width</th>
                      <th className="text-left py-1 px-2 text-slate-400 font-medium">Grasp</th>
                      <th className="text-left py-1 px-2 text-slate-400 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MITRACLIP_G4_SIZES.map((clip) => {
                      const isRec = clipSizing.recommended.includes(
                        clip.name as "NT" | "NTW" | "XT" | "XTW"
                      );
                      return (
                        <tr
                          key={clip.name}
                          className={`border-b border-navy-600/50 ${
                            isRec ? "bg-gold/5" : ""
                          }`}
                        >
                          <td
                            className={`py-1.5 px-2 font-mono ${
                              isRec ? "text-gold font-medium" : "text-slate-300"
                            }`}
                          >
                            {clip.name}
                          </td>
                          <td className="py-1.5 px-2 text-slate-300">
                            {clip.clipWidth} mm
                          </td>
                          <td className="py-1.5 px-2 text-slate-300">
                            {clip.graspLength} mm
                          </td>
                          <td className="py-1.5 px-2 text-slate-400">
                            {clip.type === "narrow" ? "Narrow" : "Extended"}
                            {clip.width === "wide" ? " Wide" : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-500">
              Enter anatomy data for clip sizing recommendation
            </p>
          )}
        </div>
      </div>

      {/* MR Reduction Estimates */}
      <div className="border border-navy-600 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
          <span className="text-sm font-semibold text-slate-200">
            Expected MR Reduction by Clip Count
          </span>
        </div>
        <div className="p-4 bg-navy-800/50">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-navy-600">
                  <th className="text-left py-1 px-2 text-slate-400 font-medium">Clips</th>
                  <th className="text-left py-1 px-2 text-slate-400 font-medium">Reduction</th>
                  <th className="text-left py-1 px-2 text-slate-400 font-medium">Residual MR</th>
                  <th className="text-left py-1 px-2 text-slate-400 font-medium">MS Risk</th>
                </tr>
              </thead>
              <tbody>
                {MR_REDUCTION_ESTIMATES.map((est) => (
                  <tr
                    key={est.clips}
                    className="border-b border-navy-600/50"
                  >
                    <td className="py-1.5 px-2 text-gold font-mono font-medium">
                      {est.clips}
                    </td>
                    <td className="py-1.5 px-2 text-slate-300">
                      {est.expectedReduction}
                    </td>
                    <td className="py-1.5 px-2 text-slate-300">
                      {est.residualMR}
                    </td>
                    <td className="py-1.5 px-2 text-slate-400">
                      {est.stenosisRisk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* COAPT vs MITRA-FR Comparison */}
      <div className="border border-navy-600 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-navy-800 border-b border-navy-600">
          <span className="text-sm font-semibold text-slate-200">
            COAPT vs MITRA-FR Trial Comparison
          </span>
        </div>
        <div className="p-4 bg-navy-800/50 space-y-4">
          {/* Trial metadata */}
          {[COAPT_TRIAL, MITRA_FR_TRIAL].map((trial) => (
            <div key={trial.trial} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    trial.trial === "COAPT" ? "success" : "warning"
                  }
                >
                  {trial.trial}
                </Badge>
                <span className="text-[10px] text-slate-500">
                  n={trial.sampleSize} | {trial.journal} {trial.year}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-navy-600">
                      <th className="text-left py-1 px-1.5 text-slate-400 font-medium">
                        Endpoint
                      </th>
                      <th className="text-left py-1 px-1.5 text-slate-400 font-medium">
                        Time
                      </th>
                      <th className="text-left py-1 px-1.5 text-slate-400 font-medium">
                        TEER
                      </th>
                      <th className="text-left py-1 px-1.5 text-slate-400 font-medium">
                        Control
                      </th>
                      <th className="text-left py-1 px-1.5 text-slate-400 font-medium">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trial.endpoints.map((ep, i) => (
                      <tr
                        key={i}
                        className="border-b border-navy-600/30"
                      >
                        <td className="py-1 px-1.5 text-slate-300">
                          {ep.endpoint}
                        </td>
                        <td className="py-1 px-1.5 text-slate-400">
                          {ep.timepoint}
                        </td>
                        <td className="py-1 px-1.5 font-mono text-gold">
                          {ep.teerArm}
                        </td>
                        <td className="py-1 px-1.5 font-mono text-slate-300">
                          {ep.controlArm}
                        </td>
                        <td className="py-1 px-1.5">
                          <span
                            className={`${
                              ep.significant
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }`}
                          >
                            {ep.significant ? "Sig." : "NS"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap gap-1">
                {trial.keyDifferences.slice(0, 3).map((kd, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-slate-500 bg-navy-700 px-2 py-0.5 rounded"
                  >
                    {kd}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Proportionate MR concept */}
          <div className="p-3 bg-navy-700/50 rounded-lg border border-navy-600">
            <p className="text-xs font-medium text-gold mb-1">
              {PROPORTIONATE_MR_CONCEPT.title}
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {PROPORTIONATE_MR_CONCEPT.description}
            </p>
            <div className="mt-2 space-y-1">
              {PROPORTIONATE_MR_CONCEPT.criteria.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-1.5"
                >
                  <span
                    className={`text-[10px] font-medium ${
                      c.label.includes("Disproportionate")
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }`}
                  >
                    {c.label}:
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {c.definition}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-600 mt-1">
              {PROPORTIONATE_MR_CONCEPT.citation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
