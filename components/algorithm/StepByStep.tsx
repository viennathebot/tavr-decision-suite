"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface AlgorithmStep {
  step: number;
  title: string;
  brief: string;
  details: string[];
  evidence: string;
  guidelineClass: "I" | "IIa" | "IIb" | "III";
}

const STEPS: AlgorithmStep[] = [
  {
    step: 1,
    title: "Initial Echocardiographic Assessment",
    brief:
      "Obtain baseline measurements: AVA, mean gradient, Vmax, LVEF, SVI, and DVI.",
    details: [
      "Measure LVOT diameter in parasternal long axis (mid-systole, inner edge to inner edge).",
      "Obtain LVOT TVI from apical 5-chamber with pulsed-wave Doppler at the annular level.",
      "Obtain AoV TVI from multiple windows (apical, right parasternal, suprasternal) using CW Doppler. Use the highest velocity signal.",
      "Calculate AVA via continuity equation: AVA = (LVOT area x LVOT TVI) / AoV TVI.",
      "Calculate DVI = LVOT TVI / AoV TVI (flow-independent check).",
      "Measure stroke volume and calculate SVI = SV / BSA.",
      "Report Vmax (peak aortic velocity) and mean transvalvular gradient.",
    ],
    evidence:
      "Baumgartner H et al. JASE 2017;30:372-392. ASE/EACVI Recommendations for echocardiographic assessment of aortic stenosis.",
    guidelineClass: "I",
  },
  {
    step: 2,
    title: "Assess Left Ventricular Ejection Fraction",
    brief:
      "Determine LVEF: Reduced (<50%) vs Preserved (>=50%). This branches the algorithm.",
    details: [
      "LVEF <50%: Reduced EF suggests possible classic low-flow low-gradient AS phenotype.",
      "LVEF >=50%: Preserved EF with low gradient raises suspicion for paradoxical LFLG or normal-flow low-gradient AS.",
      "Biplane Simpson method recommended for accurate LVEF quantification.",
      "Consider 3D echo or CMR if 2D image quality is suboptimal.",
      "Reduced LVEF shifts subsequent workup toward DSE for true-severe vs pseudo-severe differentiation.",
    ],
    evidence:
      "Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197. 2020 ACC/AHA VHD Guidelines.",
    guidelineClass: "I",
  },
  {
    step: 3,
    title: "Assess Flow Status",
    brief:
      "Classify flow: Low-flow (SVI <35 mL/m2) vs Normal-flow (SVI >=35 mL/m2).",
    details: [
      "SVI <35 mL/m2 defines low-flow state regardless of LVEF.",
      "Low-flow + reduced EF = Classic LFLG AS (most common low-gradient phenotype).",
      "Low-flow + preserved EF = Paradoxical LFLG AS (restrictive physiology, small LV, concentric remodeling).",
      "Normal-flow + low gradient = Normal-flow low-gradient (most commonly measurement error).",
      "Flow rate (SV / ejection time) <200 mL/s is an alternative low-flow marker.",
      "Assess systemic arterial compliance (SVI / pulse pressure): <0.6 mL/m2/mmHg indicates high afterload contributing to low flow.",
    ],
    evidence:
      "Hachicha Z et al. Circulation 2007;115:2856-2864. Pibarot P, Dumesnil JG. JACC 2012.",
    guidelineClass: "I",
  },
  {
    step: 4,
    title: "Check for Measurement Error",
    brief:
      "Systematic review: LVOT diameter, Doppler alignment, blood pressure at time of echo.",
    details: [
      "LVOT diameter is the most common source of error (squared in the AVA calculation).",
      "Underestimation of LVOT diameter by 1-2 mm can reduce AVA by 10-20%.",
      "Re-measure in zoom mode, inner-edge to inner-edge, mid-systole.",
      "Verify CW Doppler alignment with aortic jet from multiple windows.",
      "Check for overdrawing of spectral envelopes (use dense modal velocity).",
      "Elevated blood pressure (SBP >140 mmHg) at echo can falsely lower transvalvular gradients.",
      "If SBP >140 mmHg, consider repeating echo after blood pressure normalization.",
      "Compare LVOT TVI to expected range (15-25 cm for normal flow).",
      "DVI >=0.25 with AVA <1.0 cm2 is internally inconsistent -- recheck measurements.",
    ],
    evidence:
      "Clavel MA, Dumesnil JG, Pibarot P. Structural Heart 2018. Baumgartner H et al. JASE 2017;30:372-392.",
    guidelineClass: "I",
  },
  {
    step: 5,
    title: "CT Aortic Valve Calcium Scoring",
    brief:
      "Non-contrast CT for sex-specific calcium thresholds to confirm severity independent of flow.",
    details: [
      "CT aortic valve calcium scoring is independent of hemodynamic conditions (flow, gradient).",
      "Sex-specific thresholds (Clavel MA et al. JACC 2014):",
      "Men: >=2000 AU = severe AS; 1200-1999 AU = likely severe; <1200 AU = unlikely severe.",
      "Women: >=1200 AU = severe AS; 800-1199 AU = likely severe; <800 AU = unlikely severe.",
      "Preferred adjudicator for paradoxical LFLG AS (preserved EF) where DSE is less reliable.",
      "Also useful when DSE shows no contractile reserve (indeterminate result).",
      "Dense calcium (>1300 HU) may underestimate total burden; consider calcium density index.",
      "Use non-contrast, ECG-gated CT with Agatston scoring protocol.",
    ],
    evidence:
      "Clavel MA et al. JACC Cardiovasc Imaging 2014;7:1218. Pawade T et al. Circ Cardiovasc Imaging 2017.",
    guidelineClass: "IIa",
  },
  {
    step: 6,
    title: "Dobutamine Stress Echocardiography",
    brief:
      "For reduced EF: Low-dose DSE to distinguish true-severe from pseudo-severe AS.",
    details: [
      "Indicated primarily for classic LFLG AS (AVA <1.0 cm2, MG <40 mmHg, LVEF <50%).",
      "Protocol: low-dose dobutamine infusion up to 20 mcg/kg/min.",
      "At peak stress, measure AVA, mean gradient, stroke volume, and LVEF.",
      "True-severe AS: AVA remains <1.0 cm2 with MG >=40 mmHg at peak stress.",
      "Pseudo-severe AS: AVA increases to >=1.0 cm2 with flow augmentation (cardiomyopathy is the primary pathology).",
      "No contractile reserve (<20% increase in SV): indeterminate result -- proceed to CT calcium scoring.",
      "Projected AVA at normalized flow rate (250 mL/s) can be calculated for additional adjudication.",
      "Less useful in preserved-EF LFLG because the LV cannot reliably augment flow.",
    ],
    evidence:
      "Monin JL et al. Circulation 2003;108:319-324. Clavel MA et al. J Am Coll Cardiol 2021.",
    guidelineClass: "IIa",
  },
  {
    step: 7,
    title: "Invasive Haemodynamics",
    brief:
      "When noninvasive testing remains inconclusive: Gorlin formula via simultaneous LV-aortic pressures.",
    details: [
      "Reserved for patients in whom echo, CT calcium, and DSE are all inconclusive.",
      "Simultaneous LV and aortic pressure measurement provides the most accurate mean gradient.",
      "Gorlin formula: AVA = flow / (44.3 x sqrt(mean gradient)).",
      "Flow = cardiac output / (HR x systolic ejection period).",
      "Thermodilution or Fick method for cardiac output measurement.",
      "Catheter entrapment in a severely stenotic valve must be avoided.",
      "Consider invasive evaluation during diagnostic coronary angiography to minimize additional procedures.",
    ],
    evidence:
      "Rodes-Cabau J et al. EuroIntervention 2018. Gorlin R & Gorlin SG. Am Heart J 1951;41:1-29.",
    guidelineClass: "IIb",
  },
  {
    step: 8,
    title: "Heart Team Discussion",
    brief:
      "Integrate all imaging, clinical data, and patient factors for a consensus decision.",
    details: [
      "Multidisciplinary review: interventional cardiologist, cardiac surgeon, imaging specialist, anesthesiologist.",
      "Review: AS severity classification, symptom status, frailty, comorbidities, life expectancy.",
      "Incorporate STS-PROM score, frailty assessment (5-meter walk, grip strength, ADLs).",
      "Stage cardiac damage per Genereux classification (Stages 0-4).",
      "Assess coronary artery disease: concomitant CABG may favor SAVR.",
      "Evaluate vascular access for TAVR (CT angiography of iliofemoral arteries).",
      "Assess annular anatomy for TAVR sizing (CT measurement of annulus area, perimeter, diameter).",
      "Discuss patient goals of care, preferences, and values.",
      "Consider futility in extreme-risk patients (severe frailty, advanced dementia, ESRD).",
    ],
    evidence:
      "Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197. 2020 ACC/AHA VHD Guidelines, Class I.",
    guidelineClass: "I",
  },
  {
    step: 9,
    title: "TAVR vs SAVR Decision",
    brief:
      "Select intervention based on surgical risk, anatomy, durability considerations, and patient preference.",
    details: [
      "Low risk (STS <3%): Both TAVR and SAVR are Class I. Age <65: consider SAVR for durability. Age >=65: TAVR reasonable (PARTNER 3, Evolut Low Risk).",
      "Intermediate risk (STS 3-8%): Both TAVR and SAVR are Class I. Heart Team discussion for shared decision-making.",
      "High risk (STS 8-15%): TAVR generally preferred (Class I). PARTNER 1, CoreValve High Risk.",
      "Extreme/prohibitive risk (STS >15%): TAVR recommended if expected survival >12 months with acceptable QOL.",
      "Anatomic considerations favoring SAVR: bicuspid valve (young patients), ascending aortic aneurysm, concomitant CABG or mitral surgery.",
      "Anatomic considerations favoring TAVR: prior sternotomy (porcelain aorta, hostile chest), frailty, severe comorbidity.",
      "Valve durability: TAVR durability data extends to 5-8 years; younger patients may require re-intervention.",
      "Transfemoral TAVR preferred when vascular access is suitable; alternative access (transaxillary, transaortic) if TF is not feasible.",
    ],
    evidence:
      "Mack MJ et al. NEJM 2019 (PARTNER 3); Popma JJ et al. NEJM 2019 (Evolut Low Risk); Leon MB et al. NEJM 2016 (PARTNER 2).",
    guidelineClass: "I",
  },
];

const classVariant: Record<string, "gold" | "success" | "warning" | "muted"> = {
  I: "success",
  IIa: "gold",
  IIb: "warning",
  III: "muted",
};

export function StepByStep() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setExpanded((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {STEPS.map((s, idx) => {
        const isOpen = expanded === idx;
        return (
          <div
            key={s.step}
            className="border border-navy-600 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-start gap-4 px-4 py-3 bg-navy-800 hover:bg-navy-700 transition-colors text-left"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                <span className="text-sm font-bold text-gold">{s.step}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-200">
                    {s.title}
                  </span>
                  <Badge variant={classVariant[s.guidelineClass] ?? "muted"}>
                    Class {s.guidelineClass}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">{s.brief}</p>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform mt-1 shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-4 py-4 bg-navy-800/50 border-t border-navy-600">
                <ul className="space-y-2">
                  {s.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <span className="text-gold mt-0.5 shrink-0">-</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 px-3 py-2 bg-navy-700/50 rounded-lg">
                  <p className="text-[10px] text-slate-500">
                    <span className="text-slate-400 font-medium">Evidence: </span>
                    {s.evidence}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
