"use client";

import { useTEERStore } from "@/store/teerStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

export function ClinicalSection() {
  const clinical = useTEERStore((s) => s.clinical);
  const setClinical = useTEERStore((s) => s.setClinical);
  const exclusions = useTEERStore((s) => s.exclusions);
  const setExclusion = useTEERStore((s) => s.setExclusion);

  return (
    <CollapsibleSection title="Clinical & Exclusions" defaultOpen={true}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="LVEF"
          value={clinical.lvef}
          onChange={(v) => setClinical("lvef", v)}
          unit="%"
          placeholder="30"
          min={0}
          max={100}
          step={1}
        />

        <NumericInput
          label="LVESD"
          value={clinical.lvesd}
          onChange={(v) => setClinical("lvesd", v)}
          unit="mm"
          placeholder="55"
          min={0}
          max={120}
          step={1}
        />

        <NumericInput
          label="LVEDV"
          value={clinical.lvedv}
          onChange={(v) => setClinical("lvedv", v)}
          unit="mL"
          placeholder="180"
          min={0}
          max={500}
          step={1}
        />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-slate-400 mb-1">Clinical Status</p>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={clinical.symptomaticOnGDMT ?? false}
            onChange={(e) => setClinical("symptomaticOnGDMT", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-gold focus:ring-gold/20"
          />
          Symptomatic despite optimal GDMT
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={clinical.prohibitiveSurgicalRisk ?? false}
            onChange={(e) => setClinical("prohibitiveSurgicalRisk", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-gold focus:ring-gold/20"
          />
          Prohibitive surgical risk
        </label>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-medium text-red-400 mb-1">Exclusion Criteria</p>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={exclusions.activeEndocarditis ?? false}
            onChange={(e) => setExclusion("activeEndocarditis", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-red-400 focus:ring-red-400/20"
          />
          Active endocarditis
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={exclusions.rheumaticDisease ?? false}
            onChange={(e) => setExclusion("rheumaticDisease", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-red-400 focus:ring-red-400/20"
          />
          Rheumatic valve disease
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={exclusions.significantMS ?? false}
            onChange={(e) => setExclusion("significantMS", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-red-400 focus:ring-red-400/20"
          />
          Significant mitral stenosis
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={exclusions.intracardiacThrombus ?? false}
            onChange={(e) => setExclusion("intracardiacThrombus", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-red-400 focus:ring-red-400/20"
          />
          Intracardiac thrombus
        </label>
      </div>
    </CollapsibleSection>
  );
}
