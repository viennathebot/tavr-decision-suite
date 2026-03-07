import { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import {
  Repeat2,
  ArrowRightLeft,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react-native";
import { useVIVStore } from "../../store/vivStore";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { Card } from "../ui/Card";
import { SegmentedControl } from "../ui/SegmentedControl";
import { CollapsibleSection } from "../ui/CollapsibleSection";
import { NumericInput } from "../ui/NumericInput";
import { Disclaimer } from "../ui/Disclaimer";
import { VIVValveSelector } from "./VIVValveSelector";
import { VIVSizingTable } from "./VIVSizingTable";
import { VIVRiskFlags } from "./VIVRiskFlags";
import { VIVOutcomeData } from "./VIVOutcomeData";
import { ManufacturerCard } from "./ManufacturerCard";
import {
  ALL_SURGICAL_VALVES,
  ALL_TAVR_VIV_DATA,
  type SurgicalValveData,
  type TAVRValveVIVData,
} from "../../data/viv-data";

// ── Access route options ──────────────────────────────────────
const ACCESS_ROUTES = [
  "Transfemoral",
  "Transapical",
  "Transaortic",
  "Transaxillary",
  "Transcaval",
] as const;

// ── Risk flag computation ─────────────────────────────────────
interface RiskFlag {
  flag: string;
  level: "high" | "intermediate" | "low";
  description: string;
  citation: string;
}

function computeRiskFlags(state: {
  procedureType?: string;
  manufacturer?: string;
  model?: string;
  labeledSize?: number;
  failureMode?: string;
  coronaryHeightLCA?: number;
  coronaryHeightRCA?: number;
  ctInnerDiameter?: number;
}): RiskFlag[] {
  const flags: RiskFlag[] = [];

  // Small surgical valve risk
  if (state.labeledSize !== undefined && state.labeledSize <= 21) {
    flags.push({
      flag: "Small Surgical Valve",
      level: "high",
      description:
        "Labeled size <=21 mm is associated with higher residual gradients and increased PPM risk after VIV.",
      citation: "Dvir D et al. JAMA 2014; 312(2):162-170 (VIVID Registry)",
    });
  }

  // Coronary obstruction risk - LCA
  if (
    state.coronaryHeightLCA !== undefined &&
    state.coronaryHeightLCA < 12
  ) {
    const level = state.coronaryHeightLCA < 10 ? "high" : "intermediate";
    flags.push({
      flag: "Low Coronary Height (LCA)",
      level,
      description: `LCA coronary height ${state.coronaryHeightLCA} mm. Height <12 mm increases risk of coronary obstruction. Consider BASILICA or chimney stent if <10 mm.`,
      citation:
        "Ribeiro HB et al. JACC CV Interventions 2013; 6(5):452-461",
    });
  }

  // Coronary obstruction risk - RCA
  if (
    state.coronaryHeightRCA !== undefined &&
    state.coronaryHeightRCA < 12
  ) {
    const level = state.coronaryHeightRCA < 10 ? "high" : "intermediate";
    flags.push({
      flag: "Low Coronary Height (RCA)",
      level,
      description: `RCA coronary height ${state.coronaryHeightRCA} mm. Height <12 mm increases risk of coronary obstruction.`,
      citation:
        "Ribeiro HB et al. JACC CV Interventions 2013; 6(5):452-461",
    });
  }

  // Small inner diameter on CT
  if (state.ctInnerDiameter !== undefined && state.ctInnerDiameter < 20) {
    flags.push({
      flag: "Small CT Inner Diameter",
      level: state.ctInnerDiameter < 17 ? "high" : "intermediate",
      description: `CT measured inner diameter ${state.ctInnerDiameter} mm. Small internal diameter limits TAVR valve expansion and increases risk of patient-prosthesis mismatch.`,
      citation: "Dvir D et al. JACC 2012; 60(11):1046-1055",
    });
  }

  // Stenosis failure mode
  if (state.failureMode === "stenosis") {
    flags.push({
      flag: "Stenotic Failure Pattern",
      level: "intermediate",
      description:
        "Stenotic degeneration may indicate leaflet thickening/calcification which can impact TAVR deployment and expansion within the surgical frame.",
      citation: "Dvir D et al. JAMA 2014; 312(2):162-170",
    });
  }

  // TAVR-in-TAVR specific
  if (state.procedureType === "tavr-in-tavr") {
    flags.push({
      flag: "TAVR-in-TAVR Procedure",
      level: "intermediate",
      description:
        "Repeat TAVR has limited long-term data. Consider coronary access implications and cumulative height of stacked valve frames.",
      citation: "Landes U et al. JACC 2020; 76(13):1545-1557",
    });
  }

  // No significant risk flags
  if (flags.length === 0 && state.labeledSize !== undefined) {
    flags.push({
      flag: "Standard Risk Profile",
      level: "low",
      description:
        "No high-risk features identified based on current inputs. Standard VIV planning approach appropriate.",
      citation: "Dvir D et al. JAMA 2014; 312(2):162-170",
    });
  }

  return flags;
}

// ── Main VIV Calculator Component ─────────────────────────────
export function VIVCalculator() {
  const procedureType = useVIVStore((s) => s.procedureType);
  const setProcedureType = useVIVStore((s) => s.setProcedureType);
  const manufacturer = useVIVStore((s) => s.manufacturer);
  const model = useVIVStore((s) => s.model);
  const labeledSize = useVIVStore((s) => s.labeledSize);
  const failureMode = useVIVStore((s) => s.failureMode);
  const setFailureMode = useVIVStore((s) => s.setFailureMode);
  const setField = useVIVStore((s) => s.setField);
  const ctAnnulusArea = useVIVStore((s) => s.ctAnnulusArea);
  const ctAnnulusPerimeter = useVIVStore((s) => s.ctAnnulusPerimeter);
  const ctAnnulusDiameter = useVIVStore((s) => s.ctAnnulusDiameter);
  const coronaryHeightLCA = useVIVStore((s) => s.coronaryHeightLCA);
  const coronaryHeightRCA = useVIVStore((s) => s.coronaryHeightRCA);
  const ctInnerDiameter = useVIVStore((s) => s.ctInnerDiameter);
  const accessRoutes = useVIVStore((s) => s.accessRoutes);
  const toggleAccessRoute = useVIVStore((s) => s.toggleAccessRoute);
  const clearAll = useVIVStore((s) => s.clearAll);

  const riskFlags = useMemo(
    () =>
      computeRiskFlags({
        procedureType,
        manufacturer,
        model,
        labeledSize,
        failureMode,
        coronaryHeightLCA,
        coronaryHeightRCA,
        ctInnerDiameter,
      }),
    [
      procedureType,
      manufacturer,
      model,
      labeledSize,
      failureMode,
      coronaryHeightLCA,
      coronaryHeightRCA,
      ctInnerDiameter,
    ]
  );

  const hasSelection = manufacturer && model && labeledSize;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.background }}
      contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Spacing.lg,
        }}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 22,
            fontWeight: "800",
          }}
        >
          Valve-in-Valve
        </Text>
        <Pressable
          onPress={clearAll}
          hitSlop={8}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: BorderRadius.sm,
            backgroundColor: Colors.danger + "15",
          }}
        >
          <Text
            style={{ color: Colors.danger, fontSize: 12, fontWeight: "600" }}
          >
            Clear All
          </Text>
        </Pressable>
      </View>

      <Disclaimer />

      {/* 1. Procedure Type Selector */}
      <Text
        style={{
          color: Colors.primary,
          fontSize: 14,
          fontWeight: "600",
          marginTop: Spacing.lg,
          marginBottom: Spacing.sm,
        }}
      >
        Procedure Type
      </Text>
      <View style={{ flexDirection: "row", gap: Spacing.md }}>
        <Pressable
          onPress={() => setProcedureType("tavr-in-savr")}
          style={{
            flex: 1,
            backgroundColor:
              procedureType === "tavr-in-savr"
                ? Colors.accent + "20"
                : Colors.card,
            borderRadius: BorderRadius.md,
            borderWidth: 1.5,
            borderColor:
              procedureType === "tavr-in-savr"
                ? Colors.accent
                : Colors.cardBorder,
            padding: Spacing.lg,
            alignItems: "center",
            gap: Spacing.sm,
          }}
        >
          <Repeat2
            size={28}
            color={
              procedureType === "tavr-in-savr"
                ? Colors.accent
                : Colors.muted
            }
          />
          <Text
            style={{
              color:
                procedureType === "tavr-in-savr"
                  ? Colors.accent
                  : Colors.primary,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            TAVR-in-SAVR
          </Text>
          <Text
            style={{
              color: Colors.muted,
              fontSize: 11,
              textAlign: "center",
            }}
          >
            TAVR into a failed surgical bioprosthesis
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setProcedureType("tavr-in-tavr")}
          style={{
            flex: 1,
            backgroundColor:
              procedureType === "tavr-in-tavr"
                ? Colors.accent + "20"
                : Colors.card,
            borderRadius: BorderRadius.md,
            borderWidth: 1.5,
            borderColor:
              procedureType === "tavr-in-tavr"
                ? Colors.accent
                : Colors.cardBorder,
            padding: Spacing.lg,
            alignItems: "center",
            gap: Spacing.sm,
          }}
        >
          <ArrowRightLeft
            size={28}
            color={
              procedureType === "tavr-in-tavr"
                ? Colors.accent
                : Colors.muted
            }
          />
          <Text
            style={{
              color:
                procedureType === "tavr-in-tavr"
                  ? Colors.accent
                  : Colors.primary,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            TAVR-in-TAVR
          </Text>
          <Text
            style={{
              color: Colors.muted,
              fontSize: 11,
              textAlign: "center",
            }}
          >
            Repeat TAVR into a failed transcatheter valve
          </Text>
        </Pressable>
      </View>

      {/* 2. Valve Selector */}
      {procedureType && (
        <View style={{ marginTop: Spacing.lg }}>
          <VIVValveSelector />
        </View>
      )}

      {/* Manufacturer Info Card */}
      {manufacturer && model && (
        <View style={{ marginTop: Spacing.md }}>
          <ManufacturerCard manufacturer={manufacturer} model={model} />
        </View>
      )}

      {/* Sizing Table */}
      {manufacturer && model && procedureType && (
        <View style={{ marginTop: Spacing.md }}>
          <VIVSizingTable
            manufacturer={manufacturer}
            model={model}
            procedureType={procedureType}
          />
        </View>
      )}

      {/* 3. Failure Mode Selector */}
      {procedureType && (
        <View style={{ marginTop: Spacing.lg }}>
          <SegmentedControl
            label="Failure Mode"
            options={[
              { value: "stenosis" as const, label: "Stenosis" },
              { value: "regurgitation" as const, label: "Regurgitation" },
              { value: "combined" as const, label: "Combined" },
            ]}
            selected={failureMode}
            onSelect={setFailureMode}
          />
        </View>
      )}

      {/* 4. CT Measurements */}
      {procedureType && (
        <View style={{ marginTop: Spacing.md }}>
          <CollapsibleSection title="Patient CT Measurements" badge="Optional">
            <NumericInput
              label="CT Annulus Area"
              value={ctAnnulusArea}
              onValueChange={(v) => setField("ctAnnulusArea", v)}
              unit="mm²"
              hint="Typical: 300-700"
              min={100}
              max={1200}
              placeholder="e.g. 480"
            />
            <NumericInput
              label="CT Annulus Perimeter"
              value={ctAnnulusPerimeter}
              onValueChange={(v) => setField("ctAnnulusPerimeter", v)}
              unit="mm"
              hint="Typical: 65-95"
              min={30}
              max={150}
              placeholder="e.g. 78"
            />
            <NumericInput
              label="CT Annulus Diameter"
              value={ctAnnulusDiameter}
              onValueChange={(v) => setField("ctAnnulusDiameter", v)}
              unit="mm"
              hint="Mean CT diameter"
              min={10}
              max={45}
              placeholder="e.g. 25"
            />
            <NumericInput
              label="Coronary Height (LCA)"
              value={coronaryHeightLCA}
              onValueChange={(v) => setField("coronaryHeightLCA", v)}
              unit="mm"
              hint="Risk if <12 mm"
              min={0}
              max={30}
              warningMax={12}
              warningMessage="Low coronary height - obstruction risk"
              placeholder="e.g. 14"
            />
            <NumericInput
              label="Coronary Height (RCA)"
              value={coronaryHeightRCA}
              onValueChange={(v) => setField("coronaryHeightRCA", v)}
              unit="mm"
              hint="Risk if <12 mm"
              min={0}
              max={30}
              warningMax={12}
              warningMessage="Low coronary height - obstruction risk"
              placeholder="e.g. 16"
            />
            <NumericInput
              label="CT Inner Diameter (Failed Valve)"
              value={ctInnerDiameter}
              onValueChange={(v) => setField("ctInnerDiameter", v)}
              unit="mm"
              hint="Measured on CT"
              min={10}
              max={40}
              warningMax={20}
              warningMessage="Small ID - high PPM risk"
              placeholder="e.g. 20"
            />
          </CollapsibleSection>
        </View>
      )}

      {/* 5. Access Route Checkboxes */}
      {procedureType && (
        <View style={{ marginTop: Spacing.md }}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 13,
              fontWeight: "600",
              marginBottom: Spacing.sm,
            }}
          >
            Access Routes Under Consideration
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: Spacing.sm,
            }}
          >
            {ACCESS_ROUTES.map((route) => {
              const isSelected = accessRoutes.includes(route);
              return (
                <Pressable
                  key={route}
                  onPress={() => toggleAccessRoute(route)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: BorderRadius.sm,
                    borderWidth: 1,
                    borderColor: isSelected
                      ? Colors.accent
                      : Colors.cardBorder,
                    backgroundColor: isSelected
                      ? Colors.accent + "20"
                      : Colors.card,
                  }}
                >
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      borderWidth: 1.5,
                      borderColor: isSelected
                        ? Colors.accent
                        : Colors.muted,
                      backgroundColor: isSelected
                        ? Colors.accent
                        : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isSelected && (
                      <CheckCircle2
                        size={12}
                        color={Colors.white}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: isSelected ? Colors.accent : Colors.primary,
                      fontSize: 13,
                      fontWeight: isSelected ? "600" : "400",
                    }}
                  >
                    {route}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {/* 6. Results Section - Risk Flags */}
      {riskFlags.length > 0 && hasSelection && (
        <View style={{ marginTop: Spacing.xl }}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: Spacing.md,
            }}
          >
            Risk Assessment
          </Text>
          <VIVRiskFlags riskFlags={riskFlags} />
        </View>
      )}

      {/* Recommendations Summary */}
      {hasSelection && (
        <Card
          style={{ marginTop: Spacing.lg }}
          variant={
            riskFlags.some((f) => f.level === "high") ? "danger" : "default"
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.sm,
              marginBottom: Spacing.sm,
            }}
          >
            {riskFlags.some((f) => f.level === "high") ? (
              <AlertTriangle size={18} color={Colors.danger} />
            ) : (
              <CheckCircle2 size={18} color={Colors.success} />
            )}
            <Text
              style={{
                color: Colors.primary,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Planning Summary
            </Text>
          </View>
          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {procedureType === "tavr-in-savr"
              ? `TAVR-in-SAVR planned for ${manufacturer} ${model} (${labeledSize}mm)`
              : `TAVR-in-TAVR planned for ${manufacturer} ${model} (${labeledSize}mm)`}
            {failureMode
              ? ` with ${failureMode} pattern.`
              : "."}
            {accessRoutes.length > 0
              ? ` Access: ${accessRoutes.join(", ")}.`
              : ""}
            {riskFlags.some((f) => f.level === "high")
              ? " HIGH-RISK features identified -- Heart Team discussion strongly recommended."
              : " Standard VIV planning approach appropriate."}
          </Text>
        </Card>
      )}

      {/* Outcome Data */}
      {procedureType && (
        <View style={{ marginTop: Spacing.xl }}>
          <VIVOutcomeData />
        </View>
      )}
    </ScrollView>
  );
}
