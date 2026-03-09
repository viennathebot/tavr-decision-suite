"use client";

import { useTEERStore } from "@/store/teerStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";

export function AnatomySection() {
  const anatomy = useTEERStore((s) => s.anatomy);
  const setAnatomy = useTEERStore((s) => s.setAnatomy);

  return (
    <CollapsibleSection title="Mitral Valve Anatomy" defaultOpen={true}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NumericInput
          label="MV Area"
          value={anatomy.mvArea}
          onChange={(v) => setAnatomy("mvArea", v)}
          unit="cm²"
          placeholder="4.5"
          min={0}
          max={10}
          step={0.1}
        />

        <NumericInput
          label="Flail Gap"
          value={anatomy.flailGap}
          onChange={(v) => setAnatomy("flailGap", v)}
          unit="mm"
          placeholder="5"
          min={0}
          max={30}
          step={0.5}
        />

        <NumericInput
          label="Flail Width"
          value={anatomy.flailWidth}
          onChange={(v) => setAnatomy("flailWidth", v)}
          unit="mm"
          placeholder="10"
          min={0}
          max={40}
          step={0.5}
        />

        <NumericInput
          label="Coaptation Depth"
          value={anatomy.coaptationDepth}
          onChange={(v) => setAnatomy("coaptationDepth", v)}
          unit="mm"
          placeholder="8"
          min={0}
          max={30}
          step={0.5}
        />

        <NumericInput
          label="Coaptation Length"
          value={anatomy.coaptationLength}
          onChange={(v) => setAnatomy("coaptationLength", v)}
          unit="mm"
          placeholder="3"
          min={0}
          max={20}
          step={0.5}
        />
      </div>

      <div className="mt-3">
        <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={anatomy.graspZoneCalcification ?? false}
            onChange={(e) => setAnatomy("graspZoneCalcification", e.target.checked)}
            className="rounded border-navy-500 bg-navy-700 text-gold focus:ring-gold/20"
          />
          Significant calcification at grasp zone
        </label>
      </div>
    </CollapsibleSection>
  );
}
