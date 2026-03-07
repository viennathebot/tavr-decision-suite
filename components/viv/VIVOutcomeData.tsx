import { View, Text } from "react-native";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { CollapsibleSection } from "../ui/CollapsibleSection";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ResultRow } from "../ui/ResultRow";

// ── Static outcome data ───────────────────────────────────────

function MetricRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.cardBorder,
      }}
    >
      <Text style={{ color: Colors.primary, fontSize: 12, flex: 1 }}>
        {label}
      </Text>
      <Text
        style={{
          color: color ?? Colors.accent,
          fontSize: 13,
          fontFamily: "DMMono_400Regular",
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

// ── Component ─────────────────────────────────────────────────

export function VIVOutcomeData() {
  return (
    <View>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 16,
          fontWeight: "700",
          marginBottom: Spacing.md,
        }}
      >
        VIV Outcome Data
      </Text>
      <Text
        style={{
          color: Colors.muted,
          fontSize: 11,
          marginBottom: Spacing.lg,
        }}
      >
        Key trial and registry data for valve-in-valve procedures
      </Text>

      {/* 1. VIVID Registry */}
      <CollapsibleSection
        title="VIVID Registry"
        badge="n=202"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Dvir D et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JAMA 2014; 312(2):162-170
              </Text>
            </View>
            <Badge label="Registry" color={Colors.accent} />
          </View>

          <MetricRow label="30-day mortality" value="8.4%" color={Colors.warning} />
          <MetricRow label="1-year mortality" value="16.8%" color={Colors.warning} />
          <MetricRow
            label="PPM in small valves"
            value="Major driver"
            color={Colors.danger}
          />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              Key finding: Labeled size ≤21 mm associated with significantly
              worse outcomes. Patient-prosthesis mismatch is the predominant
              driver of adverse outcomes in small surgical valves. Supra-annular
              TAVR valves may provide hemodynamic advantage in small VIV cases.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>

      {/* 2. PPM Post-VIV */}
      <CollapsibleSection
        title="PPM Assessment Post-VIV"
        badge="PPM"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Dvir D et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JACC 2012; 60(11):1046-1055
              </Text>
            </View>
            <Badge label="Study" color={Colors.accent} />
          </View>

          <MetricRow
            label="Severe PPM threshold"
            value="<0.65 cm²/m²"
            color={Colors.danger}
          />
          <MetricRow
            label="Moderate PPM threshold"
            value="0.65-0.85 cm²/m²"
            color={Colors.warning}
          />
          <MetricRow
            label="Assessment method"
            value="Predicted EOA"
            color={Colors.accent}
          />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              Predicted effective orifice area (EOA) method used for PPM
              assessment. Severe PPM defined as indexed EOA &lt;0.65 cm²/m².
              Pre-procedural CT assessment of internal diameter critical for
              predicting post-VIV hemodynamics.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>

      {/* 3. 5-Year Outcomes */}
      <CollapsibleSection
        title="5-Year VIV Outcomes"
        badge="Long-term"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Didier R et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JACC 2018; 72(4):370-382
              </Text>
            </View>
            <Badge label="Long-term" color={Colors.success} />
          </View>

          <MetricRow label="5-year all-cause mortality" value="35.5%" color={Colors.warning} />
          <MetricRow label="5-year CV mortality" value="19.7%" color={Colors.warning} />
          <MetricRow label="Valve durability at 5y" value="Favorable" color={Colors.success} />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              First comprehensive long-term VIV durability data. Structural
              valve deterioration rates were low at 5 years. Mortality largely
              driven by non-cardiac causes and baseline comorbidity profile.
              Supports VIV as a viable long-term strategy for failed
              bioprostheses.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>

      {/* 4. TAVR-in-TAVR */}
      <CollapsibleSection
        title="TAVR-in-TAVR Feasibility"
        badge="n=63"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Landes U et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JACC 2020; 76(13):1545-1557
              </Text>
            </View>
            <Badge label="TAVR-in-TAVR" color={Colors.warning} />
          </View>

          <MetricRow label="30-day mortality" value="3.2%" color={Colors.success} />
          <MetricRow label="1-year mortality" value="12.7%" color={Colors.warning} />
          <MetricRow label="Device success" value="90.5%" color={Colors.success} />
          <MetricRow label="Coronary obstruction" value="3.2%" color={Colors.warning} />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              First multicenter study of repeat TAVR feasibility. 30-day and
              1-year outcomes comparable to primary TAVR in high-risk
              populations. Key considerations include coronary access, stacked
              frame height, and future re-intervention planning. Coronary
              obstruction risk higher than standard VIV.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>

      {/* 5. Coronary Obstruction */}
      <CollapsibleSection
        title="Coronary Obstruction Post-VIV"
        badge="0.7%"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Ribeiro HB et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JACC CV Interventions 2013; 6(5):452-461
              </Text>
            </View>
            <Badge label="Safety" color={Colors.danger} />
          </View>

          <MetricRow label="Overall incidence" value="0.7%" color={Colors.warning} />
          <MetricRow label="VIV-specific incidence" value="2.5%" color={Colors.danger} />
          <MetricRow label="30-day mortality if occurs" value="50%" color={Colors.danger} />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              Coronary obstruction is rare but devastating (0.7% overall TAVR,
              up to 2.5% in VIV). Risk factors include low coronary ostia
              (&lt;12 mm), narrow sinuses of Valsalva, stentless surgical
              valves, and externally mounted leaflets (e.g. Trifecta). VIV
              procedures carry higher risk than native valve TAVR.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>

      {/* 6. BASILICA */}
      <CollapsibleSection
        title="BASILICA Technique"
        badge="Prevention"
      >
        <Card style={{ marginBottom: Spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: Spacing.sm,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 13,
                  fontWeight: "600",
                }}
              >
                Barbanti M et al.
              </Text>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  fontStyle: "italic",
                }}
              >
                JACC CV Interventions 2019; 12(13):1240-1252
              </Text>
            </View>
            <Badge label="BASILICA" color={Colors.success} />
          </View>

          <MetricRow
            label="Technique"
            value="Leaflet laceration"
            color={Colors.accent}
          />
          <MetricRow
            label="Purpose"
            value="Prevent coronary obstruction"
            color={Colors.accent}
          />
          <MetricRow
            label="Technical success"
            value="93.5%"
            color={Colors.success}
          />
          <MetricRow
            label="Coronary obstruction prevented"
            value="Yes"
            color={Colors.success}
          />

          <View style={{ marginTop: Spacing.sm }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              BASILICA (Bioprosthetic or Native Aortic Scallop Intentional
              Laceration to prevent Iatrogenic Coronary Artery obstruction) uses
              electrosurgery to lacerate the at-risk leaflet prior to TAVR
              deployment. Creates a triangle-shaped opening that preserves
              coronary flow. Indicated when coronary height &lt;10 mm or VTC
              (valve-to-coronary) distance &lt;4 mm.
            </Text>
          </View>
        </Card>
      </CollapsibleSection>
    </View>
  );
}
