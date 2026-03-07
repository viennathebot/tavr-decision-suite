// ── Vascular Access Minimum Vessel Diameter by Device ──────────

export interface VascularAccessThreshold {
  device: string;
  manufacturer: string;
  sheathOD: string;
  minVesselDiameter: string;
  notes?: string;
}

export const VASCULAR_ACCESS: VascularAccessThreshold[] = [
  {
    device: "SAPIEN 3 (20mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (expands to 16Fr)",
    minVesselDiameter: "5.0 mm",
    notes: "Expandable sheath collapses after delivery",
  },
  {
    device: "SAPIEN 3 (23mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (expands to 16Fr)",
    minVesselDiameter: "5.5 mm",
  },
  {
    device: "SAPIEN 3 (26mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (expands to 18Fr)",
    minVesselDiameter: "5.5 mm",
  },
  {
    device: "SAPIEN 3 (29mm)",
    manufacturer: "Edwards",
    sheathOD: "16Fr eSheath (expands to 20Fr)",
    minVesselDiameter: "6.0 mm",
  },
  {
    device: "Evolut PRO+ / FX (23mm)",
    manufacturer: "Medtronic",
    sheathOD: "14Fr InLine",
    minVesselDiameter: "5.0 mm",
    notes: "14Fr InLine sheath across all sizes",
  },
  {
    device: "Evolut PRO+ / FX (26mm)",
    manufacturer: "Medtronic",
    sheathOD: "14Fr InLine",
    minVesselDiameter: "5.0 mm",
  },
  {
    device: "Evolut PRO+ / FX (29mm)",
    manufacturer: "Medtronic",
    sheathOD: "14Fr InLine",
    minVesselDiameter: "5.0 mm",
  },
  {
    device: "Evolut PRO+ / FX (34mm)",
    manufacturer: "Medtronic",
    sheathOD: "14Fr InLine",
    minVesselDiameter: "5.0 mm",
  },
  {
    device: "Navitor (23mm)",
    manufacturer: "Abbott",
    sheathOD: "14Fr FlexNav",
    minVesselDiameter: "5.0 mm",
  },
  {
    device: "Navitor (25mm)",
    manufacturer: "Abbott",
    sheathOD: "14Fr FlexNav",
    minVesselDiameter: "5.0 mm",
  },
  {
    device: "Navitor (27mm)",
    manufacturer: "Abbott",
    sheathOD: "16Fr FlexNav",
    minVesselDiameter: "5.5 mm",
  },
  {
    device: "Navitor (29mm)",
    manufacturer: "Abbott",
    sheathOD: "16Fr FlexNav",
    minVesselDiameter: "5.5 mm",
  },
];

// ── Post-TAVR Pacemaker Risk by Device ────────────────────────

export interface PacemakerRisk {
  device: string;
  manufacturer: string;
  ppmRate: string;
  riskFactors: string[];
  source: string;
}

export const PACEMAKER_RISK: PacemakerRisk[] = [
  {
    device: "SAPIEN 3 / Ultra",
    manufacturer: "Edwards",
    ppmRate: "6-12%",
    riskFactors: [
      "Pre-existing RBBB (strongest predictor)",
      "First-degree AV block",
      "Low implant depth (>6mm below annulus)",
      "Oversizing >20%",
      "Membranous septum length < implant depth",
    ],
    source: "PARTNER 3, Jilaihawi et al. JACC 2019",
  },
  {
    device: "Evolut PRO+ / FX",
    manufacturer: "Medtronic",
    ppmRate: "17-26%",
    riskFactors: [
      "Pre-existing RBBB",
      "First-degree AV block",
      "Implant depth >6mm below annulus",
      "Greater oversizing",
      "Membranous septum length < implant depth",
      "Cusp overlap technique may reduce rate to 10-14%",
    ],
    source: "Evolut Low Risk, Jilaihawi et al. JACC 2019",
  },
  {
    device: "Navitor",
    manufacturer: "Abbott",
    ppmRate: "10-18%",
    riskFactors: [
      "Pre-existing RBBB",
      "Implant depth",
      "Degree of oversizing",
      "Limited long-term data -- rates may evolve with experience",
    ],
    source: "PORTICO IDE, Early Navitor registry data",
  },
  {
    device: "Acurate neo2",
    manufacturer: "Boston Scientific",
    ppmRate: "5-10%",
    riskFactors: [
      "Pre-existing RBBB",
      "Lowest reported pacemaker rates among TAVR platforms",
      "Supra-annular design with minimal radial force on conduction system",
    ],
    source: "SCOPE I/II, neo2 registry",
  },
];

// ── Antiplatelet / Anticoagulation Protocols ──────────────────

export interface AntiplateletProtocol {
  scenario: string;
  regimen: string;
  duration: string;
  details: string;
  guidelineClass: string;
  source: string;
}

export const ANTIPLATELET_PROTOCOLS: AntiplateletProtocol[] = [
  {
    scenario: "Standard post-TAVR (no AF, no anticoagulation indication)",
    regimen: "Single antiplatelet therapy (SAPT)",
    duration: "Lifelong aspirin 81mg daily",
    details:
      "POPular TAVI Cohort A demonstrated SAPT non-inferior to DAPT with less bleeding. 2020 ACC/AHA VHD guidelines: SAPT reasonable (Class IIa).",
    guidelineClass: "IIa",
    source: "POPular TAVI Cohort A, 2020 ACC/AHA VHD Guidelines",
  },
  {
    scenario: "Post-TAVR with atrial fibrillation (OAC indication)",
    regimen: "OAC alone (no antiplatelet)",
    duration: "Lifelong OAC",
    details:
      "POPular TAVI Cohort B showed OAC alone was associated with less bleeding than OAC + clopidogrel without increase in thrombotic events. DOAC preferred over warfarin in most patients.",
    guidelineClass: "IIa",
    source: "POPular TAVI Cohort B, 2020 ACC/AHA VHD Guidelines",
  },
  {
    scenario: "Post-TAVR with recent PCI (<6 months)",
    regimen: "DAPT (aspirin + P2Y12 inhibitor)",
    duration: "Complete DAPT per PCI indication, then step down",
    details:
      "Continue DAPT per coronary stent indication. Consider shortened DAPT (1-3 months) followed by P2Y12 monotherapy if high bleeding risk. No TAVR-specific RCT data for this scenario.",
    guidelineClass: "IIa",
    source: "2020 ACC/AHA VHD, Expert consensus",
  },
  {
    scenario: "Post-TAVR with recent PCI + AF",
    regimen: "Triple therapy → OAC + single antiplatelet → OAC alone",
    duration: "Triple 1 week → Dual 1-3 months → OAC alone",
    details:
      "Minimize triple therapy duration. Transition to OAC + clopidogrel, then OAC alone. Use DOAC at VTE dose. Avoid prasugrel. Balance ischemic vs bleeding risk.",
    guidelineClass: "IIa",
    source: "2020 ACC/AHA VHD, AUGUSTUS/WOEST extrapolation",
  },
  {
    scenario: "Subclinical leaflet thrombosis (HALT)",
    regimen: "Therapeutic anticoagulation",
    duration: "3-6 months, then reassess with CT",
    details:
      "Hypo-attenuated leaflet thickening (HALT) detected on CT. Warfarin or DOAC for 3-6 months typically resolves HALT. Repeat CT to confirm resolution. Clinical significance of HALT without hemodynamic change is debated.",
    guidelineClass: "IIb",
    source: "GALILEO-4D, PARTNER 3 CT substudy",
  },
  {
    scenario: "High bleeding risk (HAS-BLED >=3)",
    regimen: "Aspirin 81mg alone",
    duration: "Lifelong",
    details:
      "Avoid DAPT. Single antiplatelet preferred. Consider PPI co-therapy. Re-evaluate bleeding risk periodically. Omit antiplatelet entirely only if bleeding risk is extreme and thrombotic risk is low.",
    guidelineClass: "IIa",
    source: "2020 ACC/AHA VHD Guidelines",
  },
];

// ── Key Clinical Thresholds Quick Reference ───────────────────

export interface ClinicalThreshold {
  category: string;
  items: { label: string; value: string; note?: string }[];
}

export const CLINICAL_THRESHOLDS: ClinicalThreshold[] = [
  {
    category: "Aortic Stenosis Severity",
    items: [
      { label: "Severe AS: AVA", value: "< 1.0 cm\u00B2" },
      { label: "Severe AS: Mean Gradient", value: "> 40 mmHg" },
      { label: "Severe AS: Vmax", value: "> 4.0 m/s" },
      { label: "Severe AS: iAVA", value: "< 0.6 cm\u00B2/m\u00B2" },
      { label: "Severe AS: DVI", value: "< 0.25" },
      { label: "Moderate AS: AVA", value: "1.0 - 1.5 cm\u00B2" },
      { label: "Low-flow state: SVI", value: "< 35 mL/m\u00B2" },
    ],
  },
  {
    category: "CT Planning Measurements",
    items: [
      { label: "Coronary height concern", value: "< 10-12 mm", note: "Consider BASILICA" },
      { label: "Sinus of Valsalva (narrow)", value: "< 28 mm" },
      { label: "Annulus area for smallest SAPIEN", value: "> 273 mm\u00B2" },
      { label: "Annulus area for largest Evolut", value: "< 707 mm\u00B2" },
      { label: "Calcium volume (severe)", value: "> 300 mm\u00B3 (male), > 200 mm\u00B3 (female)" },
    ],
  },
  {
    category: "Procedural",
    items: [
      { label: "Target implant depth (BEV)", value: "3-5 mm (80/20 rule)" },
      { label: "Target implant depth (SEV)", value: "3-5 mm (cusp overlap)" },
      { label: "Rapid pacing rate", value: "160-200 bpm" },
      { label: "Post-dilation threshold", value: "Moderate+ PVL" },
    ],
  },
];
