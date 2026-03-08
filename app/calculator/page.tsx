"use client";

import { DemographicsSection } from "@/components/calculator/DemographicsSection";
import { EchoSection } from "@/components/calculator/EchoSection";
import { CTSection } from "@/components/calculator/CTSection";
import { DobutamineSection } from "@/components/calculator/DobutamineSection";
import { STSSection } from "@/components/calculator/STSSection";
import { ResultsPanel } from "@/components/calculator/ResultsPanel";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function CalculatorPage() {
  return (
    <div className="px-4 py-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-6">
        AS Hemodynamic Calculator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <DemographicsSection />
          <EchoSection />
          <CTSection />
          <DobutamineSection />
          <STSSection />
        </div>

        {/* Right column: Results (sticky on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-6">
            <ResultsPanel />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
