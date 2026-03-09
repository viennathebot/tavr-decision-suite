"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { findSuitableValves, ALL_TAVR_VALVES } from "@/data/valve-sizing";
import type { TAVRValveModel, TAVRValveSize } from "@/data/valve-sizing";

interface NativeSizingTableProps {
  annulusArea?: number;
  annulusPerimeter?: number;
  annulusDiameter?: number;
}

export function NativeSizingTable({
  annulusArea,
  annulusPerimeter,
  annulusDiameter,
}: NativeSizingTableProps) {
  const hasInput =
    annulusArea !== undefined &&
    annulusArea > 0;

  const matchingValves = useMemo(() => {
    if (!hasInput || annulusArea === undefined) return [];
    return findSuitableValves(annulusArea, annulusPerimeter, annulusDiameter);
  }, [hasInput, annulusArea, annulusPerimeter, annulusDiameter]);

  // Build a flat list of all valves for the reference table
  const allValves = useMemo(() => {
    const list: {
      model: TAVRValveModel;
      size: TAVRValveSize;
      isMatch: boolean;
    }[] = [];

    for (const model of ALL_TAVR_VALVES) {
      for (const size of model.sizes) {
        const isMatch = matchingValves.some(
          (mv) =>
            mv.model.model === model.model &&
            mv.size.size === size.size
        );
        list.push({ model, size, isMatch });
      }
    }
    return list;
  }, [matchingValves]);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-200">
          {hasInput ? "Matching TAVR Valve Sizes" : "TAVR Valve Sizing Reference"}
        </h2>
        {hasInput && matchingValves.length > 0 && (
          <Badge variant="gold">
            {matchingValves.length} match{matchingValves.length > 1 ? "es" : ""}
          </Badge>
        )}
      </div>

      {hasInput && matchingValves.length === 0 && (
        <p className="text-xs text-slate-500 mb-3">
          No valve sizes match the provided annulus dimensions. Check measurements
          or consider borderline sizing with Heart Team discussion.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-slate-400 border-b border-navy-600">
              <th className="pb-2 pr-3">Manufacturer</th>
              <th className="pb-2 pr-3">Model</th>
              <th className="pb-2 pr-3">Size</th>
              <th className="pb-2 pr-3">
                Area (mm<sup>2</sup>)
              </th>
              <th className="pb-2 pr-3">Perimeter (mm)</th>
              <th className="pb-2 pr-3">Sheath</th>
              <th className="pb-2 pr-3">Min Vessel</th>
              <th className="pb-2">PPM Rate</th>
            </tr>
          </thead>
          <tbody>
            {allValves.map((item, i) => (
              <tr
                key={`${item.model.model}-${item.size.size}-${i}`}
                className={`border-b border-navy-600/50 ${
                  item.isMatch
                    ? "bg-gold/5 text-gold"
                    : "text-slate-300"
                }`}
              >
                <td className="py-2 pr-3">{item.model.manufacturer}</td>
                <td className="py-2 pr-3">{item.model.model}</td>
                <td className="py-2 pr-3 font-mono font-medium">
                  {item.size.size}
                </td>
                <td className="py-2 pr-3 font-mono">
                  {item.size.annulusAreaRange[0]}-{item.size.annulusAreaRange[1]}
                </td>
                <td className="py-2 pr-3 font-mono">
                  {item.size.annulusPerimeterRange
                    ? `${item.size.annulusPerimeterRange[0]}-${item.size.annulusPerimeterRange[1]}`
                    : "-"}
                </td>
                <td className="py-2 pr-3">{item.size.sheathSize ?? "-"}</td>
                <td className="py-2 pr-3 font-mono">
                  {item.size.minVesselDiameter
                    ? `${item.size.minVesselDiameter} mm`
                    : "-"}
                </td>
                <td className="py-2 font-mono text-slate-400">
                  {item.model.pacemakerRate ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
