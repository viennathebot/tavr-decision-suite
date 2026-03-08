"use client";

import { useMemo } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { NumericInput } from "@/components/ui/NumericInput";
import { CollapsibleSection } from "@/components/ui/CollapsibleSection";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp } from "lucide-react";

export function DobutamineSection() {
  const echo = useCalculatorStore((s) => s.echo);
  const dobutamine = useCalculatorStore((s) => s.dobutamine);
  const setDobutamine = useCalculatorStore((s) => s.setDobutamine);

  const flowReserve = useMemo(() => {
    const baselineSV = echo.strokeVolume;
    const stressSV = dobutamine.stressStrokeVolume;
    if (baselineSV === undefined || stressSV === undefined) return null;
    if (baselineSV <= 0) return null;

    const percentIncrease = ((stressSV - baselineSV) / baselineSV) * 100;
    const hasContractileReserve = percentIncrease >= 20;

    return { percentIncrease, hasContractileReserve };
  }, [echo.strokeVolume, dobutamine.stressStrokeVolume]);

  return (
    <CollapsibleSection title="Dobutamine Stress Echo" defaultOpen={false}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NumericInput
          label="Stress LVEF"
          value={dobutamine.stressLVEF}
          onChange={(v) => setDobutamine("stressLVEF", v)}
          unit="%"
          placeholder="45"
          min={0}
          max={100}
          step={1}
        />

        <NumericInput
          label="Stress Mean Gradient"
          value={dobutamine.stressMeanGradient}
          onChange={(v) => setDobutamine("stressMeanGradient", v)}
          unit="mmHg"
          placeholder="40"
          min={0}
          max={200}
          step={1}
        />

        <NumericInput
          label="Stress AVA"
          value={dobutamine.stressAVA}
          onChange={(v) => setDobutamine("stressAVA", v)}
          unit="cm\u00B2"
          placeholder="0.8"
          min={0}
          max={5}
          step={0.01}
        />

        <NumericInput
          label="Stress Stroke Volume"
          value={dobutamine.stressStrokeVolume}
          onChange={(v) => setDobutamine("stressStrokeVolume", v)}
          unit="mL"
          placeholder="85"
          min={0}
          max={200}
          step={1}
        />
      </div>

      {flowReserve && (
        <div
          className={`mt-4 flex items-center gap-3 rounded-lg px-4 py-3 border ${
            flowReserve.hasContractileReserve
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <TrendingUp
            size={18}
            className={
              flowReserve.hasContractileReserve
                ? "text-emerald-400"
                : "text-red-400"
            }
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-200">
                Flow Reserve
              </span>
              <Badge
                variant={
                  flowReserve.hasContractileReserve ? "success" : "danger"
                }
              >
                {flowReserve.hasContractileReserve
                  ? "Present"
                  : "Absent"}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              SV increase: {flowReserve.percentIncrease >= 0 ? "+" : ""}
              {flowReserve.percentIncrease.toFixed(1)}%
              {flowReserve.hasContractileReserve
                ? " (\u226520% = contractile reserve present)"
                : " (<20% = no contractile reserve)"}
            </p>
          </div>
        </div>
      )}
    </CollapsibleSection>
  );
}
