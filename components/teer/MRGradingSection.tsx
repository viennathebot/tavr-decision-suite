"use client";

import { useTEERStore } from "@/store/teerStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

export function MRGradingSection() {
  const mr = useTEERStore((s) => s.mr);
  const setMR = useTEERStore((s) => s.setMR);

  return (
    <CollapsibleSection title="MR Severity Parameters" defaultOpen={true}>
      <div className="mb-3">
        <label className="text-xs font-medium text-slate-400">MR Etiology</label>
        <select
          value={mr.etiology ?? ""}
          onChange={(e) =>
            setMR("etiology", (e.target.value || undefined) as "primary" | "secondary" | "mixed" | undefined)
          }
          className="w-full mt-1 bg-navy-700 border border-navy-500 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors"
        >
          <option value="">Select etiology</option>
          <option value="primary">Primary (Degenerative)</option>
          <option value="secondary">Secondary (Functional)</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="EROA"
          value={mr.eroa}
          onChange={(v) => setMR("eroa", v)}
          unit="cm²"
          placeholder="0.40"
          min={0}
          max={2}
          step={0.01}
        />

        <NumericInput
          label="Regurgitant Volume"
          value={mr.rVol}
          onChange={(v) => setMR("rVol", v)}
          unit="mL"
          placeholder="60"
          min={0}
          max={200}
          step={1}
        />

        <NumericInput
          label="Vena Contracta Width"
          value={mr.vcWidth}
          onChange={(v) => setMR("vcWidth", v)}
          unit="cm"
          placeholder="0.70"
          min={0}
          max={2}
          step={0.01}
        />

        <NumericInput
          label="Regurgitant Fraction"
          value={mr.rf}
          onChange={(v) => setMR("rf", v)}
          unit="%"
          placeholder="50"
          min={0}
          max={100}
          step={1}
        />

        <NumericInput
          label="3D VC Area"
          value={mr.vcArea3D}
          onChange={(v) => setMR("vcArea3D", v)}
          unit="cm²"
          placeholder="0.40"
          min={0}
          max={3}
          step={0.01}
        />
      </div>
    </CollapsibleSection>
  );
}
