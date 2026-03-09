"use client";

import { Card } from "@/components/ui/Card";
import {
  VASCULAR_ACCESS,
  PACEMAKER_RISK,
  ANTIPLATELET_PROTOCOLS,
  CLINICAL_THRESHOLDS,
  PVL_RATES,
  VASCULAR_COMPLICATION_RATES,
} from "@/data/quick-reference";

export default function ReferencePage() {
  return (
    <div className="px-4 py-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">Quick Reference</h1>
      <p className="text-xs text-slate-400 mb-6">
        Key clinical thresholds, vascular access requirements, pacemaker risk,
        and antiplatelet protocols for TAVR planning.
      </p>

      <div className="space-y-6">
        {/* Vascular Access */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Vascular Access by Device
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Device</th>
                  <th className="pb-2 pr-4">Sheath</th>
                  <th className="pb-2 pr-4">Min Vessel</th>
                  <th className="pb-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {VASCULAR_ACCESS.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-600/50 text-slate-300"
                  >
                    <td className="py-2 pr-4 font-medium">{item.device}</td>
                    <td className="py-2 pr-4 font-mono">
                      {item.sheathOD}
                    </td>
                    <td className="py-2 pr-4 font-mono text-gold">
                      {item.minVesselDiameter}
                    </td>
                    <td className="py-2 text-slate-500">
                      {item.notes ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pacemaker Risk */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Post-TAVR Pacemaker Risk
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Device</th>
                  <th className="pb-2 pr-4">PPM Rate</th>
                  <th className="pb-2">Risk Factors</th>
                </tr>
              </thead>
              <tbody>
                {PACEMAKER_RISK.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-600/50 text-slate-300 align-top"
                  >
                    <td className="py-2 pr-4 font-medium">{item.device}</td>
                    <td className="py-2 pr-4 font-mono text-gold whitespace-nowrap">
                      {item.ppmRate}
                    </td>
                    <td className="py-2">
                      <ul className="space-y-0.5">
                        {item.riskFactors.map((rf, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <span className="text-slate-500 mt-0.5 shrink-0">
                              -
                            </span>
                            <span className="text-slate-400">{rf}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* PVL Rates */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Paravalvular Leak (PVL) Rates by Device
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Device</th>
                  <th className="pb-2 pr-4">Mild PVL</th>
                  <th className="pb-2 pr-4">Moderate+ PVL</th>
                  <th className="pb-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {PVL_RATES.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-600/50 text-slate-300"
                  >
                    <td className="py-2 pr-4 font-medium">{item.device}</td>
                    <td className="py-2 pr-4 font-mono">{item.mildPVL}</td>
                    <td className="py-2 pr-4 font-mono text-gold">
                      {item.moderateSeverePVL}
                    </td>
                    <td className="py-2 text-slate-500 text-[10px] max-w-[200px]">
                      {item.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Vascular Complications */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Vascular Complications by Device
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Device</th>
                  <th className="pb-2 pr-4">Major Vascular</th>
                  <th className="pb-2 pr-4">Life-Threatening Bleeding</th>
                  <th className="pb-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {VASCULAR_COMPLICATION_RATES.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-600/50 text-slate-300"
                  >
                    <td className="py-2 pr-4 font-medium">{item.device}</td>
                    <td className="py-2 pr-4 font-mono text-gold">
                      {item.majorVascularRate}
                    </td>
                    <td className="py-2 pr-4 font-mono">
                      {item.lifeThreateningBleeding}
                    </td>
                    <td className="py-2 text-slate-500 text-[10px] max-w-[200px]">
                      {item.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Antiplatelet Protocols */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Antiplatelet / Anticoagulation Protocols
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-400 border-b border-navy-600">
                  <th className="pb-2 pr-4">Scenario</th>
                  <th className="pb-2 pr-4">Regimen</th>
                  <th className="pb-2 pr-4">Duration</th>
                  <th className="pb-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {ANTIPLATELET_PROTOCOLS.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-navy-600/50 text-slate-300 align-top"
                  >
                    <td className="py-2 pr-4 font-medium max-w-[160px]">
                      {item.scenario}
                    </td>
                    <td className="py-2 pr-4 text-gold">{item.regimen}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {item.duration}
                    </td>
                    <td className="py-2 text-slate-400 max-w-[300px]">
                      {item.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Clinical Thresholds */}
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Key Clinical Thresholds
          </h2>
          <div className="space-y-4">
            {CLINICAL_THRESHOLDS.map((group, i) => (
              <div key={i}>
                <h3 className="text-xs font-semibold text-gold mb-2">
                  {group.category}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <tbody>
                      {group.items.map((item, j) => (
                        <tr
                          key={j}
                          className="border-b border-navy-600/50 text-slate-300"
                        >
                          <td className="py-1.5 pr-4 text-slate-400 w-1/2">
                            {item.label}
                          </td>
                          <td className="py-1.5 pr-4 font-mono text-gold">
                            {item.value}
                          </td>
                          <td className="py-1.5 text-slate-500 text-[10px]">
                            {item.note ?? ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
