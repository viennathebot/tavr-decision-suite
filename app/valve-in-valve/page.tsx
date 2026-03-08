"use client";

import { VIVCalculator } from "@/components/viv/VIVCalculator";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function ValveInValvePage() {
  return (
    <div className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">
        Valve-in-Valve Planning
      </h1>
      <p className="text-xs text-slate-400 mb-6">
        Select the failed surgical bioprosthesis, enter CT measurements, and
        assess risk factors for valve-in-valve TAVR planning.
      </p>

      <VIVCalculator />

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
