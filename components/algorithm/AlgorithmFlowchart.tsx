import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function FlowBox({
  label,
  sublabel,
  color,
}: {
  label: string;
  sublabel?: string;
  color: string;
}) {
  return (
    <View
      style={[
        styles.flowBox,
        { backgroundColor: color + "15", borderColor: color },
      ]}
    >
      <Text style={styles.flowBoxLabel}>{label}</Text>
      {sublabel && <Text style={styles.flowBoxSublabel}>{sublabel}</Text>}
    </View>
  );
}

function DecisionDiamond({
  label,
  sublabel,
  color,
}: {
  label: string;
  sublabel?: string;
  color: string;
}) {
  return (
    <View
      style={[
        styles.diamondOuter,
        { borderColor: color, backgroundColor: color + "15" },
      ]}
    >
      <Text style={styles.diamondLabel}>{label}</Text>
      {sublabel && <Text style={styles.diamondSublabel}>{sublabel}</Text>}
    </View>
  );
}

function Arrow({ height = 20, color }: { height?: number; color?: string }) {
  const lineColor = color || Colors.muted;
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{ width: 2, height, backgroundColor: lineColor }}
      />
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderTopWidth: 6,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: lineColor,
        }}
      />
    </View>
  );
}

function BranchLabel({ text, color }: { text: string; color?: string }) {
  return (
    <Text style={[styles.branchLabel, color ? { color } : undefined]}>
      {text}
    </Text>
  );
}

function HorizontalLine({ width = 40, color }: { width?: number; color?: string }) {
  return (
    <View
      style={{
        width,
        height: 2,
        backgroundColor: color || Colors.muted,
      }}
    />
  );
}

function VerticalLine({ height = 30, color }: { height?: number; color?: string }) {
  return (
    <View
      style={{
        width: 2,
        height,
        backgroundColor: color || Colors.muted,
        alignSelf: "center",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Flowchart Component                                                */
/* ------------------------------------------------------------------ */

export function AlgorithmFlowchart() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AS Evaluation Flowchart</Text>
        <Text style={styles.headerSubtitle}>
          Visual decision pathway for aortic stenosis grading
        </Text>
      </View>

      {/* ---- Step 1: Echo Measurements ---- */}
      <View style={styles.centerColumn}>
        <FlowBox
          label="Echocardiography"
          sublabel="AVA, MG, DVI, Vmax"
          color={Colors.accent}
        />
        <Arrow color={Colors.accent} />

        {/* Decision: Concordant? */}
        <DecisionDiamond
          label="Concordant?"
          sublabel="AVA + Gradient agree"
          color={Colors.accent}
        />
      </View>

      {/* ---- Branch: Concordant vs Discordant ---- */}
      <View style={styles.branchRow}>
        {/* Left: Concordant High Gradient */}
        <View style={styles.branchColumn}>
          <BranchLabel text="YES" color={Colors.success} />
          <VerticalLine height={16} color={Colors.success} />

          <DecisionDiamond
            label="High Gradient?"
            sublabel="MG \u226540 mmHg"
            color={Colors.success}
          />

          <VerticalLine height={16} color={Colors.success} />
          <BranchLabel text="YES" color={Colors.success} />
          <VerticalLine height={8} color={Colors.success} />

          <FlowBox
            label="Severe AS Confirmed"
            sublabel="Proceed to Heart Team"
            color={Colors.success}
          />

          <Arrow color={Colors.success} />

          <FlowBox
            label="AVR Recommended"
            sublabel="Class I"
            color={Colors.success}
          />
        </View>

        {/* Horizontal connector line */}
        <View style={styles.branchSpacer} />

        {/* Right: Discordant */}
        <View style={styles.branchColumn}>
          <BranchLabel text="NO \u2014 Discordant" color={Colors.warning} />
          <VerticalLine height={16} color={Colors.warning} />

          <FlowBox
            label="Assess LVEF"
            sublabel="Classify flow state"
            color={Colors.warning}
          />
        </View>
      </View>

      {/* ---- LVEF Branch Point ---- */}
      <View style={styles.centerColumn}>
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>LVEF Assessment</Text>
          <View style={styles.dividerLine} />
        </View>

        <DecisionDiamond
          label="LVEF Status?"
          color={Colors.warning}
        />
      </View>

      {/* ---- Three LVEF Branches ---- */}
      <View style={styles.threeBranchRow}>
        {/* Left: Reduced EF (<50%) */}
        <View style={styles.threeBranchColumn}>
          <BranchLabel text="<50%" color={Colors.danger} />
          <Text style={styles.branchDescription}>Reduced EF</Text>
          <VerticalLine height={12} color={Colors.danger} />

          <FlowBox
            label="Low-Dose DSE"
            sublabel="5-20 mcg/kg/min"
            color={Colors.danger}
          />

          <Arrow color={Colors.danger} />

          <DecisionDiamond
            label="Flow Reserve?"
            sublabel="SV \u226520% increase"
            color={Colors.danger}
          />

          <VerticalLine height={12} color={Colors.danger} />

          {/* DSE sub-branches */}
          <View style={styles.subBranchRow}>
            <View style={styles.subBranchColumn}>
              <BranchLabel text="True Severe" color={Colors.danger} />
              <Text style={styles.microText}>AVA &lt;1.0</Text>
              <Text style={styles.microText}>MG \u226540</Text>
              <VerticalLine height={8} color={Colors.danger} />
              <FlowBox
                label="AVR"
                color={Colors.danger}
              />
            </View>

            <View style={styles.subBranchColumn}>
              <BranchLabel text="Pseudo-Severe" color={Colors.muted} />
              <Text style={styles.microText}>AVA &gt;1.0</Text>
              <Text style={styles.microText}>MG &lt;40</Text>
              <VerticalLine height={8} color={Colors.muted} />
              <FlowBox
                label="Medical Rx"
                color={Colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Center: Borderline (50-54%) */}
        <View style={styles.threeBranchColumn}>
          <BranchLabel text="50-54%" color={Colors.warning} />
          <Text style={styles.branchDescription}>Borderline</Text>
          <VerticalLine height={12} color={Colors.warning} />

          <FlowBox
            label="Assess SVI"
            sublabel="SV / BSA"
            color={Colors.warning}
          />

          <Arrow color={Colors.warning} />

          <DecisionDiamond
            label="SVI?"
            color={Colors.warning}
          />

          <VerticalLine height={12} color={Colors.warning} />

          <View style={styles.subBranchRow}>
            <View style={styles.subBranchColumn}>
              <BranchLabel text="<35" color={Colors.warning} />
              <Text style={styles.microText}>Low Flow</Text>
              <VerticalLine height={8} color={Colors.warning} />
              <FlowBox
                label="DSE + CT Ca"
                sublabel="Combined"
                color={Colors.warning}
              />
            </View>

            <View style={styles.subBranchColumn}>
              <BranchLabel text="\u226535" color={Colors.muted} />
              <Text style={styles.microText}>Normal Flow</Text>
              <VerticalLine height={8} color={Colors.muted} />
              <FlowBox
                label="Recheck Echo"
                sublabel="? Moderate AS"
                color={Colors.muted}
              />
            </View>
          </View>
        </View>

        {/* Right: Preserved EF (>=55%) */}
        <View style={styles.threeBranchColumn}>
          <BranchLabel text="\u226555%" color={Colors.accent} />
          <Text style={styles.branchDescription}>Preserved EF</Text>
          <VerticalLine height={12} color={Colors.accent} />

          <FlowBox
            label="Calculate SVI"
            sublabel="SV / BSA"
            color={Colors.accent}
          />

          <Arrow color={Colors.accent} />

          <DecisionDiamond
            label="SVI?"
            color={Colors.accent}
          />

          <VerticalLine height={12} color={Colors.accent} />

          <View style={styles.subBranchRow}>
            <View style={styles.subBranchColumn}>
              <BranchLabel text="<35" color={Colors.accent} />
              <Text style={styles.microText}>Paradoxical</Text>
              <Text style={styles.microText}>Low Flow</Text>
              <VerticalLine height={8} color={Colors.accent} />
              <FlowBox
                label="CT AV Calcium"
                sublabel="Flow-independent"
                color={Colors.accent}
              />
              <Arrow height={12} color={Colors.accent} />
              <FlowBox
                label="Confirm Severity"
                sublabel="Sex-specific cutoffs"
                color={Colors.accent}
              />
            </View>

            <View style={styles.subBranchColumn}>
              <BranchLabel text="\u226535" color={Colors.muted} />
              <Text style={styles.microText}>Normal Flow</Text>
              <VerticalLine height={8} color={Colors.muted} />
              <FlowBox
                label="Measurement Error?"
                sublabel="Exclude errors"
                color={Colors.muted}
              />
              <Arrow height={12} color={Colors.muted} />
              <FlowBox
                label="Likely Moderate AS"
                sublabel="Follow-up"
                color={Colors.muted}
              />
            </View>
          </View>
        </View>
      </View>

      {/* ---- Final Convergence: Heart Team ---- */}
      <View style={styles.centerColumn}>
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>If Severe AS Confirmed</Text>
          <View style={styles.dividerLine} />
        </View>

        <FlowBox
          label="Invasive Assessment"
          sublabel="Catheterization if still inconclusive"
          color={Colors.accent}
        />

        <Arrow color={Colors.accent} />

        <FlowBox
          label="Heart Team Conference"
          sublabel="Integrate all data + patient factors"
          color={Colors.accent}
        />

        <Arrow color={Colors.accent} />

        <DecisionDiamond
          label="Surgical Risk?"
          sublabel="STS-PROM Score"
          color={Colors.accent}
        />

        <VerticalLine height={16} color={Colors.accent} />
      </View>

      {/* ---- TAVR vs SAVR Selection ---- */}
      <View style={styles.branchRow}>
        <View style={styles.branchColumn}>
          <BranchLabel text="Low Risk" color={Colors.success} />
          <BranchLabel text="STS <3%" color={Colors.success} />
          <VerticalLine height={8} color={Colors.success} />
          <FlowBox
            label="TAVR or SAVR"
            sublabel="Shared decision"
            color={Colors.success}
          />
        </View>

        <View style={styles.branchColumn}>
          <BranchLabel text="Intermediate" color={Colors.warning} />
          <BranchLabel text="STS 3-8%" color={Colors.warning} />
          <VerticalLine height={8} color={Colors.warning} />
          <FlowBox
            label="TAVR Preferred"
            sublabel="In most patients"
            color={Colors.warning}
          />
        </View>

        <View style={styles.branchColumn}>
          <BranchLabel text="High / Prohibitive" color={Colors.danger} />
          <BranchLabel text="STS >8%" color={Colors.danger} />
          <VerticalLine height={8} color={Colors.danger} />
          <FlowBox
            label="TAVR"
            sublabel="If feasible"
            color={Colors.danger}
          />
        </View>
      </View>

      {/* ---- Considerations Footer ---- */}
      <View style={styles.considerationsBox}>
        <Text style={styles.considerationsTitle}>
          Modality Selection Considerations
        </Text>
        <View style={styles.considerationsGrid}>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Age &amp; life expectancy
            </Text>
          </View>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Valve anatomy (bicuspid)
            </Text>
          </View>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Vascular access
            </Text>
          </View>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Expected durability
            </Text>
          </View>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Future coronary access
            </Text>
          </View>
          <View style={styles.considerationItem}>
            <Text style={styles.considerationDot}>{"\u2022"}</Text>
            <Text style={styles.considerationText}>
              Concomitant disease
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Static visual aid. Refer to the Step-by-Step Algorithm for
          interactive clinical detail.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    alignSelf: "stretch",
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  centerColumn: {
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },

  /* Flow Box */
  flowBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 140,
  },
  flowBoxLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  flowBoxSublabel: {
    color: Colors.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },

  /* Decision Diamond (rendered as a rounded rectangle for clarity) */
  diamondOuter: {
    borderWidth: 1.5,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    minWidth: 120,
    transform: [{ rotate: "0deg" }],
  },
  diamondLabel: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  diamondSublabel: {
    color: Colors.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },

  /* Branching */
  branchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    gap: 12,
    marginVertical: 8,
  },
  branchColumn: {
    alignItems: "center",
    flex: 1,
  },
  branchSpacer: {
    width: 8,
  },
  branchLabel: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 2,
  },
  branchDescription: {
    color: Colors.muted,
    fontSize: 9,
    textAlign: "center",
    marginBottom: 2,
  },

  /* Three branch layout */
  threeBranchRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    gap: 6,
    marginVertical: 8,
  },
  threeBranchColumn: {
    alignItems: "center",
    flex: 1,
  },

  /* Sub-branches within DSE / SVI */
  subBranchRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    width: "100%",
  },
  subBranchColumn: {
    alignItems: "center",
    flex: 1,
  },
  microText: {
    color: Colors.muted,
    fontSize: 9,
    textAlign: "center",
  },

  /* Section Divider */
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.cardBorder,
  },
  dividerText: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginHorizontal: 12,
  },

  /* Considerations Footer */
  considerationsBox: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 14,
    marginTop: 16,
    width: "100%",
  },
  considerationsTitle: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },
  considerationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  considerationItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 4,
  },
  considerationDot: {
    color: Colors.accent,
    fontSize: 12,
    marginRight: 6,
  },
  considerationText: {
    color: Colors.muted,
    fontSize: 11,
    flex: 1,
  },

  /* Footer */
  footer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    width: "100%",
  },
  footerText: {
    color: Colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default AlgorithmFlowchart;
