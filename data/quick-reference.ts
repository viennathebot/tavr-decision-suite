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
    device: "SAPIEN 3 / Ultra / Ultra RESILIA (20mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (Commander)",
    minVesselDiameter: "5.5 mm",
    notes: "14F eSheath for all SAPIEN 3 sizes",
  },
  {
    device: "SAPIEN 3 / Ultra / Ultra RESILIA (23mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (Commander)",
    minVesselDiameter: "5.5 mm",
  },
  {
    device: "SAPIEN 3 / Ultra / Ultra RESILIA (26mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (Commander)",
    minVesselDiameter: "5.5 mm",
  },
  {
    device: "SAPIEN 3 / Ultra / Ultra RESILIA (29mm)",
    manufacturer: "Edwards",
    sheathOD: "14Fr eSheath (Commander)",
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
    sheathOD: "18Fr InLine",
    minVesselDiameter: "6.0 mm",
    notes: "34mm uses larger 18Fr InLine sheath",
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
    device: "Evolut PRO+",
    manufacturer: "Medtronic",
    ppmRate: "17-20%",
    riskFactors: [
      "Pre-existing RBBB (strongest predictor)",
      "First-degree AV block",
      "Implant depth >6mm below annulus",
      "Greater oversizing",
      "Membranous septum length < implant depth",
      "Cusp overlap technique may reduce rate to 10-14%",
    ],
    source: "Evolut Low Risk (Popma JJ et al. NEJM 2019), Jilaihawi et al. JACC 2019",
  },
  {
    device: "Evolut FX",
    manufacturer: "Medtronic",
    ppmRate: "14-17%",
    riskFactors: [
      "Pre-existing RBBB",
      "First-degree AV block",
      "Implant depth >6mm below annulus",
      "Redesigned frame geometry may reduce conduction injury vs PRO+",
      "Cusp overlap technique recommended",
    ],
    source: "Evolut FX US IDE Study (Forrest JK et al. JACC 2023)",
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
  {
    category: "MR Severity (ACC/AHA 2020, Zoghbi 2017)",
    items: [
      { label: "Severe MR: EROA", value: "≥ 0.40 cm²", note: "Secondary MR: ≥0.30 per COAPT" },
      { label: "Severe MR: RVol", value: "≥ 60 mL/beat" },
      { label: "Severe MR: VC Width", value: "≥ 0.70 cm" },
      { label: "Severe MR: RF", value: "≥ 50%" },
      { label: "Severe MR: 3D VC Area", value: "≥ 0.40 cm²" },
      { label: "Moderate MR: EROA", value: "0.20 – 0.39 cm²" },
      { label: "Moderate MR: RVol", value: "30 – 59 mL/beat" },
    ],
  },
  {
    category: "TEER Eligibility (COAPT Criteria)",
    items: [
      { label: "LVEF", value: "20 – 50%", note: "<20% futility risk" },
      { label: "LVESD", value: "≤ 70 mm" },
      { label: "EROA (secondary MR)", value: "≥ 0.30 cm²", note: "COAPT threshold" },
      { label: "MV Area (pre-clip)", value: "≥ 4.0 cm²", note: "Avoid iatrogenic MS" },
      { label: "Flail gap", value: "< 10 mm", note: "EVEREST II criteria" },
      { label: "Flail width", value: "< 15 mm" },
      { label: "Coaptation depth", value: "< 11 mm" },
      { label: "Coaptation length", value: "≥ 2 mm" },
    ],
  },
  {
    category: "CT Calcium Thresholds (Clavel 2014/2015)",
    items: [
      { label: "Men: Severe AS", value: "≥2000 AU", note: "Clavel JACC 2014" },
      { label: "Men: Likely severe", value: "1200-1999 AU", note: "Indeterminate zone" },
      { label: "Men: Unlikely severe", value: "<1200 AU" },
      { label: "Women: Severe AS", value: "≥1200 AU", note: "Clavel JACC 2014" },
      { label: "Women: Likely severe", value: "800-1199 AU", note: "Indeterminate zone" },
      { label: "Women: Unlikely severe", value: "<800 AU" },
    ],
  },
];

// ── Paravalvular Leak (PVL) Rates by Device ───────────────────

export interface PVLRate {
  device: string;
  manufacturer: string;
  mildPVL: string;
  moderateSeverePVL: string;
  source: string;
}

export const PVL_RATES: PVLRate[] = [
  {
    device: "SAPIEN 3 / Ultra",
    manufacturer: "Edwards",
    mildPVL: "25-30%",
    moderateSeverePVL: "0.5-1.5%",
    source: "PARTNER 3 (Mack MJ et al. NEJM 2019); PARTNER 3 5yr (Leon MB et al. NEJM 2023)",
  },
  {
    device: "Evolut PRO+",
    manufacturer: "Medtronic",
    mildPVL: "30-35%",
    moderateSeverePVL: "1.5-3.5%",
    source: "Evolut Low Risk (Popma JJ et al. NEJM 2019); Evolut Low Risk 4yr (Reardon MJ et al. JAMA 2023)",
  },
  {
    device: "Evolut FX",
    manufacturer: "Medtronic",
    mildPVL: "25-30%",
    moderateSeverePVL: "0.5-2.0%",
    source: "Evolut FX US IDE (Forrest JK et al. JACC 2023)",
  },
  {
    device: "Navitor",
    manufacturer: "Abbott",
    mildPVL: "20-28%",
    moderateSeverePVL: "1.0-3.0%",
    source: "Navitor CE Mark study, early registry data",
  },
  {
    device: "Acurate neo2",
    manufacturer: "Boston Scientific",
    mildPVL: "25-32%",
    moderateSeverePVL: "2.0-4.0%",
    source: "SCOPE II (Lanz J et al. Lancet 2022)",
  },
];

// ── Major Vascular Complication Rates ─────────────────────────

export interface VascularComplicationRate {
  device: string;
  manufacturer: string;
  majorVascularRate: string;
  lifeThreateningBleeding: string;
  source: string;
}

export const VASCULAR_COMPLICATION_RATES: VascularComplicationRate[] = [
  {
    device: "SAPIEN 3 / Ultra (14-16F eSheath)",
    manufacturer: "Edwards",
    majorVascularRate: "2.0-4.0%",
    lifeThreateningBleeding: "1.0-2.5%",
    source: "PARTNER 3 (Mack MJ et al. NEJM 2019)",
  },
  {
    device: "Evolut PRO+ / FX (14F InLine)",
    manufacturer: "Medtronic",
    majorVascularRate: "2.5-4.5%",
    lifeThreateningBleeding: "1.5-3.0%",
    source: "Evolut Low Risk (Popma JJ et al. NEJM 2019)",
  },
  {
    device: "Navitor (14F FlexNav)",
    manufacturer: "Abbott",
    majorVascularRate: "3.0-5.0%",
    lifeThreateningBleeding: "1.5-3.5%",
    source: "PORTICO IDE, early Navitor data",
  },
  {
    device: "Acurate neo2 (14F)",
    manufacturer: "Boston Scientific",
    majorVascularRate: "2.5-4.5%",
    lifeThreateningBleeding: "1.0-3.0%",
    source: "SCOPE II (Lanz J et al. Lancet 2022)",
  },
];
