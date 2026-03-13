"use client";

import { CalciumModule } from "@/components/calcium/CalciumModule";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function CalciumPage() {
  return (
    <div className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">
        CT Calcium Scoring
      </h1>
      <p className="text-xs text-slate-400 mb-6">
        Aortic valve calcium score analysis using sex-specific Clavel thresholds
        for AS severity adjudication. Especially useful when echocardiographic
        parameters are discordant (AVA &lt;1.0 cm² with mean gradient &lt;40
        mmHg).
      </p>

      <CalciumModule />

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
