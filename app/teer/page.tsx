"use client";

import { MRGradingSection } from "@/components/teer/MRGradingSection";
import { AnatomySection } from "@/components/teer/AnatomySection";
import { ClinicalSection } from "@/components/teer/ClinicalSection";
import { TEERResultsPanel } from "@/components/teer/TEERResultsPanel";
import { Disclaimer } from "@/components/ui/Disclaimer";

export default function TEERPage() {
  return (
    <div className="px-4 py-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-1">
        TEER / MitraClip Decision Tool
      </h1>
      <p className="text-xs text-slate-400 mb-6">
        MR severity grading, TEER eligibility, clip sizing, and trial comparison
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <MRGradingSection />
          <AnatomySection />
          <ClinicalSection />
        </div>

        {/* Right column: Results (sticky on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-6">
            <TEERResultsPanel />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
