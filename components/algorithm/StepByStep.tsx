import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";
import { DecisionNode } from "./DecisionNode";

interface AlgorithmStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string;
  evidence?: string;
  guidelineClass?: "I" | "IIa" | "IIb" | "III";
}

const ALGORITHM_STEPS: AlgorithmStep[] = [
  {
    stepNumber: 1,
    title: "Confirm Echo Measurements",
    description:
      "Perform concordance check between aortic valve area (AVA), mean gradient (MG), and dimensionless velocity index (DVI) to determine AS severity classification.",
    details:
      "Concordant severe AS: AVA <1.0 cm\u00B2, MG \u226540 mmHg, DVI <0.25, Vmax >4 m/s. " +
      "Concordant non-severe AS: AVA >1.0 cm\u00B2, MG <40 mmHg, DVI >0.25. " +
      "Discordant findings (e.g., AVA <1.0 cm\u00B2 but MG <40 mmHg) require additional workup to resolve. " +
      "Key principle: if AVA and gradient are concordant, the classification is straightforward and no further hemodynamic investigation is needed. " +
      "When discordant, proceed to Step 2 to assess LVEF and flow state.",
    evidence:
      "Baumgartner H et al. 2017 ESC/EACTS Guidelines for the management of valvular heart disease. Eur Heart J 2017;38:2739-2791.",
    guidelineClass: "I",
  },
  {
    stepNumber: 2,
    title: "Assess LVEF",
    description:
      "Classify the patient's flow state based on left ventricular ejection fraction (LVEF) to determine the subsequent workup pathway.",
    details:
      "LVEF \u226555%: Normal systolic function. Low gradient may be due to paradoxical low-flow state, measurement error, or genuinely moderate AS. Proceed to SVI assessment.\n\n" +
      "LVEF 50-54%: Borderline reduced. May represent early cardiomyopathy or afterload mismatch. Consider both DSE and CT calcium pathways.\n\n" +
      "LVEF <50%: Reduced systolic function. Classic low-flow, low-gradient pattern. Dobutamine stress echo (DSE) is the primary next step to differentiate true severe from pseudo-severe AS.\n\n" +
      "Important: LVEF alone does not determine severity\u2014it determines the diagnostic pathway.",
    evidence:
      "Otto CM et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. J Am Coll Cardiol 2021;77(4):e25-e197.",
    guidelineClass: "I",
  },
  {
    stepNumber: 3,
    title: "Calculate Stroke Volume Index",
    description:
      "Compute stroke volume index (SVI = SV / BSA) to distinguish low-flow from normal-flow aortic stenosis patterns.",
    details:
      "SVI = Stroke Volume / Body Surface Area\n\n" +
      "SVI <35 mL/m\u00B2: Low-flow state. In the setting of preserved LVEF, this defines paradoxical low-flow, low-gradient severe AS (a recognized entity with poor prognosis if untreated).\n\n" +
      "SVI \u226535 mL/m\u00B2: Normal flow. A low gradient with normal flow and AVA <1.0 cm\u00B2 is often due to measurement error (particularly LVOT diameter underestimation) or genuinely moderate AS.\n\n" +
      "Paradoxical low-flow occurs in patients with small ventricles, restrictive physiology, significant LVH, or atrial fibrillation. " +
      "These patients have outcomes similar to high-gradient severe AS and benefit from intervention.",
    evidence:
      "Hachicha Z et al. Paradoxical low-flow, low-gradient severe aortic stenosis despite preserved ejection fraction is associated with higher afterload and reduced survival. Circulation 2007;115:2856-2864.",
  },
  {
    stepNumber: 4,
    title: "Exclude Measurement Error",
    description:
      "Systematically review the echocardiographic study for potential sources of measurement error before pursuing further workup.",
    details:
      "Interactive checklist of common error sources:\n\n" +
      "\u2022 LVOT Diameter Accuracy: Measured in mid-systole, parasternal long-axis view, inner edge to inner edge. A 1 mm error causes ~15% AVA miscalculation. Consider CT-derived LVOT area.\n\n" +
      "\u2022 Doppler Alignment: CW Doppler must be parallel to jet direction. Misalignment >20\u00B0 leads to significant gradient underestimation. Use multiple windows (apical, right parasternal, suprasternal).\n\n" +
      "\u2022 Blood Pressure at Time of Echo: Hypertension during the study artificially lowers gradients. Record BP at time of Doppler acquisition. Consider repeating echo with BP <140/90.\n\n" +
      "\u2022 Body Habitus: Obesity, COPD, and chest wall deformity can limit acoustic windows and underestimate peak velocities.\n\n" +
      "\u2022 Atrial Fibrillation: Average measurements over 5-10 cardiac cycles. Avoid post-PVC beats.",
    evidence:
      "Minners J et al. Inconsistencies of echocardiographic criteria for the grading of aortic valve stenosis. Eur Heart J 2008;29:1043-1048.",
  },
  {
    stepNumber: 5,
    title: "CT Aortic Valve Calcium Score",
    description:
      "Use non-contrast CT to quantify aortic valve calcification (AVC) as an independent, flow-independent measure of AS severity.",
    details:
      "Sex-specific thresholds for severe AS:\n\n" +
      "Male:\n" +
      "\u2022 AVC \u22652000 AU \u2192 Severe (highly likely)\n" +
      "\u2022 AVC 1600-1999 AU \u2192 Indeterminate\n" +
      "\u2022 AVC <1600 AU \u2192 Non-severe (likely)\n\n" +
      "Female:\n" +
      "\u2022 AVC \u22651200 AU \u2192 Severe (highly likely)\n" +
      "\u2022 AVC 800-1199 AU \u2192 Indeterminate\n" +
      "\u2022 AVC <800 AU \u2192 Non-severe (likely)\n\n" +
      "CT AVC is particularly valuable in low-flow, low-gradient AS with preserved LVEF (paradoxical low-flow) where DSE is not informative. " +
      "It is a Class IIa recommendation for confirming severity when echocardiography is inconclusive. " +
      "AVC density (calcium score indexed to annulus area) may improve diagnostic accuracy in patients with very large or very small annuli.",
    evidence:
      "Clavel MA et al. The complex nature of discordant severe calcified aortic valve disease grading: New insights from combined Doppler echocardiographic and computed tomographic study. Circulation 2014;128(S1):A15251.",
    guidelineClass: "IIa",
  },
  {
    stepNumber: 6,
    title: "Low-Dose Dobutamine Stress Echo",
    description:
      "Perform dobutamine stress echocardiography (DSE) to assess contractile (flow) reserve and differentiate true severe from pseudo-severe AS in patients with reduced LVEF.",
    details:
      "Protocol: Start at 5 mcg/kg/min, increase by 5 mcg/kg/min every 3-5 minutes, up to 20 mcg/kg/min maximum. Avoid higher doses (risk of ischemia/arrhythmia).\n\n" +
      "Flow Reserve: Defined as stroke volume increase \u226520% from baseline. Present in ~60% of patients with low-flow AS.\n\n" +
      "Interpretation:\n" +
      "\u2022 True Severe AS: Stress AVA remains <1.0 cm\u00B2 AND stress MG \u226540 mmHg. The valve is fixed and severely stenotic; increased flow unmasks the true gradient.\n" +
      "\u2022 Pseudo-Severe AS: Stress AVA increases >1.0 cm\u00B2 AND MG remains <40 mmHg. The valve has reserve opening capacity; the low AVA at rest was due to low cardiac output, not intrinsic valve disease.\n" +
      "\u2022 No Flow Reserve: SV does not increase \u226520%. This is prognostically ominous but does not help distinguish true vs pseudo-severe. Consider CT calcium scoring.\n\n" +
      "Projected AVA (AVA at a standardized flow rate of 250 mL/s) can improve classification in borderline cases.",
    evidence:
      "Nishimura RA et al. Low-output, low-gradient aortic stenosis in patients with depressed left ventricular systolic function: the clinical utility of the dobutamine challenge in the catheterization laboratory. Circulation 2002;106:809-813.",
    guidelineClass: "IIa",
  },
  {
    stepNumber: 7,
    title: "Cardiac Catheterization",
    description:
      "Invasive hemodynamic assessment using the Gorlin formula when non-invasive evaluation remains inconclusive.",
    details:
      "Gorlin Formula: AVA = CO / (44.3 \u00D7 SEP \u00D7 HR \u00D7 \u221A\u0394P)\n" +
      "Where CO = cardiac output, SEP = systolic ejection period, HR = heart rate, \u0394P = mean transvalvular pressure gradient.\n\n" +
      "Key considerations:\n" +
      "\u2022 Simultaneous LV-aortic pressure measurement is preferred (dual catheter technique). Pullback gradients may be unreliable.\n" +
      "\u2022 The Gorlin formula is flow-dependent and may underestimate AVA in low-output states.\n" +
      "\u2022 Invasive evaluation reclassifies approximately 30% of patients with discordant non-invasive findings.\n" +
      "\u2022 Combine with coronary angiography for surgical planning.\n" +
      "\u2022 Assess for concomitant hemodynamic lesions: pulmonary hypertension, mitral regurgitation, diastolic dysfunction.\n\n" +
      "Reserve catheterization for cases where non-invasive testing (echo, DSE, CT calcium) has not resolved the clinical question.",
    evidence:
      "Rod\u00E9s-Cabau J et al. Aortic stenosis: Diagnosis and management in 2018. EuroIntervention 2018;13(18):e1827-e1842.",
    guidelineClass: "IIa",
  },
  {
    stepNumber: 8,
    title: "Heart Team / AVR Decision",
    description:
      "Integrate all diagnostic data with clinical assessment through a multidisciplinary Heart Team conference to determine candidacy for aortic valve replacement (AVR).",
    details:
      "Data integration:\n" +
      "\u2022 Confirmed AS severity from echo, DSE, CT calcium, and/or catheterization\n" +
      "\u2022 Symptom status (dyspnea, angina, syncope) and exercise tolerance\n" +
      "\u2022 STS Predicted Risk of Mortality (STS-PROM) score\n" +
      "\u2022 Frailty assessment (5-meter walk, grip strength, serum albumin, independence in ADLs)\n" +
      "\u2022 Comorbidity burden (porcelain aorta, prior cardiac surgery, radiation heart disease, liver disease, renal function)\n\n" +
      "Heart Team composition: Interventional cardiologist, cardiac surgeon, imaging cardiologist, anesthesiologist, and when applicable, geriatrician or palliative care specialist.\n\n" +
      "Decision framework:\n" +
      "\u2022 Symptomatic severe AS with acceptable risk \u2192 AVR recommended (Class I)\n" +
      "\u2022 Asymptomatic severe AS with LVEF <50% \u2192 AVR recommended (Class I)\n" +
      "\u2022 Asymptomatic severe AS with rapid progression, very severe (Vmax >5), or exercise-induced symptoms \u2192 AVR reasonable (Class IIa)\n" +
      "\u2022 Prohibitive surgical risk with life expectancy <1 year or minimal symptom improvement expected \u2192 Palliative care/medical therapy",
    evidence:
      "Otto CM et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. J Am Coll Cardiol 2021;77(4):e25-e197.",
    guidelineClass: "I",
  },
  {
    stepNumber: 9,
    title: "TAVR vs SAVR Selection",
    description:
      "Select the optimal intervention modality\u2014transcatheter aortic valve replacement (TAVR) or surgical aortic valve replacement (SAVR)\u2014based on patient-specific factors.",
    details:
      "Factors guiding modality selection:\n\n" +
      "\u2022 Age: Younger patients (<65) generally favor SAVR due to proven long-term durability and lower rates of paravalvular leak and pacemaker implantation. Older patients (\u226580) generally favor TAVR.\n\n" +
      "\u2022 Surgical Risk:\n" +
      "  - Low risk (STS <3%): Both options reasonable; shared decision-making (Class I)\n" +
      "  - Intermediate risk (STS 3-8%): TAVR preferred in most patients\n" +
      "  - High risk (STS >8%): TAVR recommended\n" +
      "  - Prohibitive/inoperable: TAVR if feasible, otherwise palliative\n\n" +
      "\u2022 Anatomy: Bicuspid valves may have suboptimal TAVR outcomes (though newer-generation devices show improvement). Heavy LVOT calcification, low coronary ostia, and horizontal aorta increase TAVR complexity. Small or heavily calcified annuli affect device sizing.\n\n" +
      "\u2022 Access: Transfemoral preferred for TAVR. Alternative access (transaxillary, transaortic, transcaval, transcarotid) when iliofemoral anatomy is prohibitive.\n\n" +
      "\u2022 Durability: SAVR bioprosthetic valves have 15-20 year track record. TAVR valves show excellent 5-year data with emerging 10-year results. Structural valve degeneration considerations are critical in younger patients.\n\n" +
      "\u2022 Coronary Access: Future coronary re-access may be compromised after TAVR, particularly with supra-annular self-expanding valves or valve-in-valve procedures. Essential consideration if future PCI is anticipated.\n\n" +
      "\u2022 Concomitant Disease: Need for CABG, mitral/tricuspid surgery, or aortic root replacement favors SAVR.",
    evidence:
      "Mack MJ et al. Five-year outcomes of transcatheter aortic valve replacement or surgical aortic valve replacement for high surgical risk patients (PARTNER 1A). Circulation 2015;131:1540-1549. Popma JJ et al. EVOLUT Low Risk Trial. N Engl J Med 2019;380:1706-1715.",
    guidelineClass: "I",
  },
];

export function StepByStep() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleStepPress = (stepNumber: number) => {
    setExpandedStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Aortic Stenosis Evaluation Algorithm
        </Text>
        <Text style={styles.headerSubtitle}>
          9-step clinical pathway for discordant AS grading and TAVR/SAVR
          decision-making
        </Text>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Guideline Recommendation Classes</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.success }]}
            />
            <Text style={styles.legendText}>Class I</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.accent }]}
            />
            <Text style={styles.legendText}>Class IIa</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.warning }]}
            />
            <Text style={styles.legendText}>Class IIb</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: Colors.danger }]}
            />
            <Text style={styles.legendText}>Class III</Text>
          </View>
        </View>
      </View>

      {/* Algorithm Steps */}
      {ALGORITHM_STEPS.map((step) => (
        <View key={step.stepNumber}>
          <DecisionNode
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            details={step.details}
            evidence={step.evidence}
            guidelineClass={step.guidelineClass}
            isActive={expandedStep === step.stepNumber}
            onPress={() => handleStepPress(step.stepNumber)}
          />
          {/* Connector line between steps */}
          {step.stepNumber < ALGORITHM_STEPS.length && (
            <View style={styles.connector}>
              <View style={styles.connectorLine} />
              <View style={styles.connectorArrow} />
            </View>
          )}
        </View>
      ))}

      {/* Footer Disclaimer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This algorithm is intended as a clinical decision-support tool and
          does not replace clinical judgment. All management decisions should be
          made in the context of individual patient characteristics and
          institutional expertise.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
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
  legend: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 12,
    marginBottom: 20,
  },
  legendTitle: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: Colors.primary,
    fontSize: 12,
  },
  connector: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
  },
  connectorLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.accent + "40",
  },
  connectorArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.accent + "40",
  },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  footerText: {
    color: Colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default StepByStep;
