"use client";

import { useMemo } from "react";
import { useVIVStore } from "@/store/vivStore";
import { Card } from "@/components/ui/Card";
import { NumericInput } from "@/components/ui/NumericInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Badge } from "@/components/ui/Badge";
import {
  ALL_SURGICAL_VALVES,
  findTAVRForVIV,
  getSurgicalValveID,
} from "@/data/viv-data";
import {
  assessVIVRisks,
  recommendVIVValve,
  shouldConsiderBVF,
  predictedVIVEOA,
} from "@/lib/viv-calculations";
import { AlertTriangle, CheckCircle, Info, RotateCcw, Zap } from "lucide-react";

const ACCESS_ROUTES = [
  "Transfemoral",
  "Transapical",
  "Transaortic",
  "Transaxillary",
  "Transcaval",
];

export function VIVCalculator() {
  const store = useVIVStore();

  // Derive unique manufacturers
  const manufacturers = useMemo(() => {
    const mfgs = new Set(ALL_SURGICAL_VALVES.map((v) => v.manufacturer));
    return Array.from(mfgs);
  }, []);

  // Models for selected manufacturer
  const models = useMemo(() => {
    if (!store.manufacturer) return [];
    return ALL_SURGICAL_VALVES.filter(
      (v) => v.manufacturer === store.manufacturer
    );
  }, [store.manufacturer]);

  // Selected valve data
  const selectedValve = useMemo(() => {
    if (!store.manufacturer || !store.model) return null;
    return ALL_SURGICAL_VALVES.find(
      (v) => v.manufacturer === store.manufacturer && v.model === store.model
    );
  }, [store.manufacturer, store.model]);

  // Available sizes
  const sizes = useMemo(() => {
    if (!selectedValve) return [];
    return selectedValve.sizes.map((s) => s.labeledSize);
  }, [selectedValve]);

  // Surgical valve internal diameter
  const surgicalValveID = useMemo(() => {
    if (!selectedValve || !store.labeledSize) return undefined;
    return getSurgicalValveID(selectedValve, store.labeledSize);
  }, [selectedValve, store.labeledSize]);

  // Use CT-measured ID if available, otherwise use known ID from data
  const effectiveID = store.ctInnerDiameter ?? surgicalValveID;

  // Compatible TAVR valves
  const compatibleTAVR = useMemo(() => {
    if (!effectiveID) return [];
    return findTAVRForVIV(effectiveID);
  }, [effectiveID]);

  // Risk flags — now includes sinus width and BSA
  const riskFlags = useMemo(() => {
    return assessVIVRisks({
      surgicalValveLabeledSize: store.labeledSize,
      surgicalValveID: effectiveID,
      coronaryHeightLCA: store.coronaryHeightLCA,
      coronaryHeightRCA: store.coronaryHeightRCA,
      sinusWidthLCA: store.sinusWidthLCA,
      sinusWidthRCA: store.sinusWidthRCA,
      patientBSA: store.patientBSA,
      failureMode: store.failureMode,
      procedureType: selectedValve?.stented === false ? "stentless" : undefined,
    });
  }, [
    store.labeledSize,
    effectiveID,
    store.coronaryHeightLCA,
    store.coronaryHeightRCA,
    store.sinusWidthLCA,
    store.sinusWidthRCA,
    store.patientBSA,
    store.failureMode,
    selectedValve,
  ]);

  // THV Recommendations
  const vivRecommendations = useMemo(() => {
    if (!effectiveID) return [];
    return recommendVIVValve(effectiveID, store.patientBSA);
  }, [effectiveID, store.patientBSA]);

  // Predicted post-VIV haemodynamics
  const predictedEOA = useMemo(() => {
    if (!effectiveID) return undefined;
    return predictedVIVEOA(effectiveID);
  }, [effectiveID]);

  const predictedIEOA = useMemo(() => {
    if (predictedEOA === undefined || !store.patientBSA) return undefined;
    return predictedEOA / store.patientBSA;
  }, [predictedEOA, store.patientBSA]);

  // BVF decision
  const bvfRecommended = useMemo(() => {
    if (!store.labeledSize || predictedIEOA === undefined) return undefined;
    return shouldConsiderBVF(store.labeledSize, predictedIEOA);
  }, [store.labeledSize, predictedIEOA]);

  const riskIcon = (level: string) => {
    if (level === "high")
      return <AlertTriangle size={12} className="text-red-400" />;
    if (level === "intermediate")
      return <Info size={12} className="text-amber-400" />;
    return <CheckCircle size={12} className="text-emerald-400" />;
  };

  const riskBadgeVariant = (level: string): "danger" | "warning" | "success" => {
    if (level === "high") return "danger";
    if (level === "intermediate") return "warning";
    return "success";
  };

  return (
    <div className="space-y-4">
      {/* Procedure Type & Valve Selection */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-200">
            Valve Selection
          </h2>
          <button
            onClick={store.clearAll}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <RotateCcw size={12} />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SegmentedControl
            label="Procedure Type"
            options={[
              { label: "TAVR-in-SAVR", value: "tavr-in-savr" as const },
              { label: "TAVR-in-TAVR", value: "tavr-in-tavr" as const },
            ]}
            value={store.procedureType}
            onChange={store.setProcedureType}
          />

          <SegmentedControl
            label="Failure Mode"
            options={[
              { label: "Stenosis", value: "stenosis" as const },
              { label: "Regurgitation", value: "regurgitation" as const },
              { label: "Combined", value: "combined" as const },
            ]}
            value={store.failureMode}
            onChange={store.setFailureMode}
          />
        </div>

        {/* Manufacturer */}
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-400 block mb-1">
            Manufacturer
          </label>
          <div className="flex flex-wrap gap-1.5">
            {manufacturers.map((m) => (
              <button
                key={m}
                onClick={() => store.setManufacturer(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  store.manufacturer === m
                    ? "bg-gold/15 text-gold border-gold/30"
                    : "bg-navy-700 text-slate-400 border-navy-500 hover:text-slate-200 hover:border-navy-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        {store.manufacturer && models.length > 0 && (
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-400 block mb-1">
              Model
            </label>
            <div className="flex flex-wrap gap-1.5">
              {models.map((v) => (
                <button
                  key={v.model}
                  onClick={() => store.setModel(v.model)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    store.model === v.model
                      ? "bg-gold/15 text-gold border-gold/30"
                      : "bg-navy-700 text-slate-400 border-navy-500 hover:text-slate-200 hover:border-navy-400"
                  }`}
                >
                  {v.model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {selectedValve && sizes.length > 0 && (
          <div className="mt-3">
            <label className="text-xs font-medium text-slate-400 block mb-1">
              Labeled Size (mm)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => store.setLabeledSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    store.labeledSize === s
                      ? "bg-gold/15 text-gold border-gold/30"
                      : "bg-navy-700 text-slate-400 border-navy-500 hover:text-slate-200 hover:border-navy-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {surgicalValveID !== undefined && (
              <p className="text-[10px] text-slate-500 mt-1">
                Known internal diameter: {surgicalValveID} mm
              </p>
            )}
          </div>
        )}
      </Card>

      {/* CT Measurements */}
      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">
          CT Measurements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <NumericInput
            label="LCA Coronary Height"
            value={store.coronaryHeightLCA}
            onChange={(v) => store.setField("coronaryHeightLCA", v)}
            unit="mm"
            placeholder="12"
            min={0}
            max={30}
            step={0.1}
          />
          <NumericInput
            label="RCA Coronary Height"
            value={store.coronaryHeightRCA}
            onChange={(v) => store.setField("coronaryHeightRCA", v)}
            unit="mm"
            placeholder="14"
            min={0}
            max={30}
            step={0.1}
          />
          <NumericInput
            label="CT Inner Diameter"
            value={store.ctInnerDiameter}
            onChange={(v) => store.setField("ctInnerDiameter", v)}
            unit="mm"
            placeholder="20"
            min={0}
            max={40}
            step={0.1}
          />
          <NumericInput
            label="LCA Sinus Width"
            value={store.sinusWidthLCA}
            onChange={(v) => store.setField("sinusWidthLCA", v)}
            unit="mm"
            placeholder="30"
            min={0}
            max={50}
            step={0.1}
          />
          <NumericInput
            label="RCA Sinus Width"
            value={store.sinusWidthRCA}
            onChange={(v) => store.setField("sinusWidthRCA", v)}
            unit="mm"
            placeholder="32"
            min={0}
            max={50}
            step={0.1}
          />
          <NumericInput
            label="Patient BSA"
            value={store.patientBSA}
            onChange={(v) => store.setField("patientBSA", v)}
            unit="m²"
            placeholder="1.85"
            min={0.5}
            max={3.5}
            step={0.01}
          />
        </div>
      </Card>

      {/* Access Routes */}
      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-3">
          Access Routes
        </h2>
        <div className="flex flex-wrap gap-2">
          {ACCESS_ROUTES.map((route) => {
            const isActive = store.accessRoutes.includes(route);
            return (
              <button
                key={route}
                onClick={() => store.toggleAccessRoute(route)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? "bg-gold/15 text-gold border-gold/30"
                    : "bg-navy-700 text-slate-400 border-navy-500 hover:text-slate-200"
                }`}
              >
                {route}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Predicted Haemodynamics */}
      {effectiveID && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Predicted Post-VIV Haemodynamics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="rounded-lg bg-navy-700/50 border border-navy-600 p-3">
              <span className="text-[10px] text-slate-500 block">
                Predicted EOA
              </span>
              <span className="text-sm font-mono text-slate-200">
                {predictedEOA !== undefined
                  ? `${predictedEOA.toFixed(2)} cm²`
                  : "—"}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">
                65% coefficient model
              </span>
            </div>
            <div className="rounded-lg bg-navy-700/50 border border-navy-600 p-3">
              <span className="text-[10px] text-slate-500 block">
                Predicted Indexed EOA
              </span>
              <span
                className={`text-sm font-mono ${
                  predictedIEOA !== undefined
                    ? predictedIEOA < 0.65
                      ? "text-red-400"
                      : predictedIEOA < 0.85
                        ? "text-amber-400"
                        : "text-emerald-400"
                    : "text-slate-200"
                }`}
              >
                {predictedIEOA !== undefined
                  ? `${predictedIEOA.toFixed(2)} cm²/m²`
                  : store.patientBSA
                    ? "—"
                    : "Enter BSA"}
              </span>
              <span className="text-[9px] text-slate-500 block mt-0.5">
                Severe PPM &lt;0.65, Moderate &lt;0.85
              </span>
            </div>
            {bvfRecommended !== undefined && (
              <div
                className={`rounded-lg border p-3 ${
                  bvfRecommended
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-emerald-500/10 border-emerald-500/30"
                }`}
              >
                <span className="text-[10px] text-slate-500 block">
                  BVF Recommendation
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {bvfRecommended ? (
                    <>
                      <Zap size={14} className="text-red-400" />
                      <span className="text-sm font-medium text-red-400">
                        Consider BVF
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">
                        BVF Not Required
                      </span>
                    </>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  Saxon JT et al. Struct Heart 2019
                </span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* THV Recommendations */}
      {vivRecommendations.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            THV Recommendations
          </h2>
          <div className="space-y-3">
            {vivRecommendations.map((rec, i) => (
              <div
                key={i}
                className={`rounded-lg border p-3 ${
                  rec.considerBVF
                    ? "bg-amber-500/5 border-amber-500/20"
                    : "bg-navy-700/50 border-navy-600"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-200">
                    {rec.valveType}
                  </span>
                  <span className="text-sm font-mono text-gold">
                    {rec.size}mm
                  </span>
                  {rec.predictedIndexedEOA !== undefined && (
                    <Badge
                      variant={
                        rec.predictedIndexedEOA < 0.65
                          ? "danger"
                          : rec.predictedIndexedEOA < 0.85
                            ? "warning"
                            : "success"
                      }
                    >
                      iEOA {rec.predictedIndexedEOA.toFixed(2)}
                    </Badge>
                  )}
                  {rec.considerBVF && (
                    <Badge variant="warning">BVF Recommended</Badge>
                  )}
                </div>
                <ul className="space-y-0.5">
                  {rec.notes.map((note, j) => (
                    <li
                      key={j}
                      className="text-[10px] text-slate-400 pl-3 relative before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:rounded-full before:bg-slate-600"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-slate-500 mt-2">
            Dvir D et al. JACC 2012;59:2317-2327; Pibarot P et al. JACC
            2014;63:1154-1156
          </p>
        </Card>
      )}

      {/* Risk Flags */}
      {riskFlags.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Risk Assessment
          </h2>
          <div className="space-y-2">
            {riskFlags.map((flag, i) => (
              <div
                key={i}
                className="flex items-start gap-2 px-3 py-2 rounded-lg bg-navy-700/50 border border-navy-600"
              >
                <div className="mt-0.5 shrink-0">{riskIcon(flag.level)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-200">
                      {flag.flag}
                    </span>
                    <Badge variant={riskBadgeVariant(flag.level)}>
                      {flag.level}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {flag.description}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    {flag.citation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Compatible TAVR Valves */}
      {effectiveID && (
        <Card>
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Compatible TAVR Valves
            <span className="text-xs font-normal text-slate-400 ml-2">
              (ID: {effectiveID.toFixed(1)} mm)
            </span>
          </h2>
          {compatibleTAVR.length === 0 ? (
            <p className="text-xs text-slate-500">
              No compatible TAVR valves found for this surgical valve internal
              diameter. Consider bioprosthetic valve fracture (BVF) to expand
              the orifice.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-navy-600">
                    <th className="pb-2 pr-4">Manufacturer</th>
                    <th className="pb-2 pr-4">Model</th>
                    <th className="pb-2 pr-4">Size</th>
                    <th className="pb-2 pr-4">Inner D</th>
                    <th className="pb-2 pr-4">Outer D</th>
                    <th className="pb-2">Min ID</th>
                  </tr>
                </thead>
                <tbody>
                  {compatibleTAVR.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-navy-600/50 text-slate-300"
                    >
                      <td className="py-2 pr-4">
                        {item.tavrValve.manufacturer}
                      </td>
                      <td className="py-2 pr-4">{item.tavrValve.model}</td>
                      <td className="py-2 pr-4 font-mono text-gold">
                        {item.size.size}
                      </td>
                      <td className="py-2 pr-4 font-mono">
                        {item.size.innerDiameter}
                      </td>
                      <td className="py-2 pr-4 font-mono">
                        {item.size.outerDiameter}
                      </td>
                      <td className="py-2 font-mono">
                        {item.size.minIDForVIV ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
