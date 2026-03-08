"use client";

import { useState, useCallback } from "react";
import { AnnulusCalculator } from "@/components/sizing/AnnulusCalculator";
import { NativeSizingTable } from "@/components/sizing/NativeSizingTable";

export default function SizingPage() {
  const [annulus, setAnnulus] = useState<{
    diameter?: number;
    area?: number;
    perimeter?: number;
  }>({});

  const handleCalculated = useCallback(
    (values: { diameter?: number; area?: number; perimeter?: number }) => {
      setAnnulus(values);
    },
    []
  );

  return (
    <div className="px-4 py-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">TAVR Valve Sizing</h1>
      <p className="text-xs text-slate-400 mb-6">
        Calculate annulus geometry and find matching TAVR valve sizes based on
        CT-derived measurements.
      </p>

      <div className="space-y-4">
        <AnnulusCalculator onCalculated={handleCalculated} />
        <NativeSizingTable
          annulusArea={annulus.area}
          annulusPerimeter={annulus.perimeter}
          annulusDiameter={annulus.diameter}
        />
      </div>
    </div>
  );
}
