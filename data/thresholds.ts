// ─────────────────────────────────────────────────────────────
// Clinical Thresholds for TAVR Decision Suite
// Sources: ACC/AHA 2020/2021 VHD Guidelines, ESC 2021 VHD Guidelines,
//          Clavel MA et al. Circulation 2014, Nitsche C et al. JACC CV Imaging 2024
// ─────────────────────────────────────────────────────────────

export interface ClinicalThreshold {
  parameter: string;
  value: number;
  unit: string;
  comparison: '<' | '>' | '<=' | '>=';
  severity: 'severe' | 'moderate' | 'normal';
  citation: string;
}

// ── Aortic Valve Area (AVA) ──────────────────────────────────
export const AVA_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'AVA',
    value: 1.0,
    unit: 'cm\u00B2',
    comparison: '<',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'AVA',
    value: 1.5,
    unit: 'cm\u00B2',
    comparison: '<',
    severity: 'moderate',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'AVA',
    value: 1.5,
    unit: 'cm\u00B2',
    comparison: '>=',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Indexed AVA (AVAi) ───────────────────────────────────────
export const INDEXED_AVA_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'AVAi',
    value: 0.6,
    unit: 'cm\u00B2/m\u00B2',
    comparison: '<',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'AVAi',
    value: 0.85,
    unit: 'cm\u00B2/m\u00B2',
    comparison: '<',
    severity: 'moderate',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'AVAi',
    value: 0.85,
    unit: 'cm\u00B2/m\u00B2',
    comparison: '>=',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Mean Gradient ────────────────────────────────────────────
export const MEAN_GRADIENT_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'Mean Gradient',
    value: 40,
    unit: 'mmHg',
    comparison: '>=',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'Mean Gradient',
    value: 20,
    unit: 'mmHg',
    comparison: '>=',
    severity: 'moderate',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'Mean Gradient',
    value: 20,
    unit: 'mmHg',
    comparison: '<',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Peak Aortic Jet Velocity ─────────────────────────────────
export const PEAK_VELOCITY_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'Peak Velocity',
    value: 4.0,
    unit: 'm/s',
    comparison: '>=',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'Peak Velocity',
    value: 3.0,
    unit: 'm/s',
    comparison: '>=',
    severity: 'moderate',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'Peak Velocity',
    value: 3.0,
    unit: 'm/s',
    comparison: '<',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Stroke Volume Index (SVI) ────────────────────────────────
export const SVI_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'SVI',
    value: 35,
    unit: 'mL/m\u00B2',
    comparison: '<',
    severity: 'severe',
    citation: 'Hachicha Z et al. Circulation 2007; ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'SVI',
    value: 35,
    unit: 'mL/m\u00B2',
    comparison: '>=',
    severity: 'normal',
    citation: 'Hachicha Z et al. Circulation 2007; ACC/AHA 2021 Guidelines',
  },
];

// ── Dimensionless Velocity Index (DVI) ───────────────────────
export const DVI_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'DVI',
    value: 0.25,
    unit: '',
    comparison: '<',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'DVI',
    value: 0.25,
    unit: '',
    comparison: '>=',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Left Ventricular Ejection Fraction (LVEF) ────────────────
export const LVEF_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'LVEF',
    value: 50,
    unit: '%',
    comparison: '<',
    severity: 'severe',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'LVEF',
    value: 55,
    unit: '%',
    comparison: '>=',
    severity: 'normal',
    citation: 'ACC/AHA 2021 Guidelines',
  },
  {
    parameter: 'LVEF',
    value: 55,
    unit: '%',
    comparison: '<',
    severity: 'moderate',
    citation: 'ACC/AHA 2021 Guidelines',
  },
];

// ── Transvalvular Flow Rate ──────────────────────────────────
export const FLOW_RATE_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'Flow Rate',
    value: 200,
    unit: 'mL/s',
    comparison: '<',
    severity: 'severe',
    citation: 'Pibarot P, Dumesnil JG. JACC 2012',
  },
  {
    parameter: 'Flow Rate',
    value: 200,
    unit: 'mL/s',
    comparison: '>=',
    severity: 'normal',
    citation: 'Pibarot P, Dumesnil JG. JACC 2012',
  },
];

// ── Systemic Arterial Compliance ─────────────────────────────
export const ARTERIAL_COMPLIANCE_THRESHOLDS: ClinicalThreshold[] = [
  {
    parameter: 'SAC',
    value: 0.6,
    unit: 'mL/m\u00B2/mmHg',
    comparison: '<',
    severity: 'severe',
    citation: 'Hachicha Z et al. Circulation 2007',
  },
  {
    parameter: 'SAC',
    value: 0.6,
    unit: 'mL/m\u00B2/mmHg',
    comparison: '>=',
    severity: 'normal',
    citation: 'Hachicha Z et al. Circulation 2007',
  },
];

// ── CT Aortic Valve Calcium Scoring Thresholds (by Sex) ──────
// Citation: Clavel MA et al. Circulation 2014; Nitsche C et al. JACC CV Imaging 2024
export interface CTCalciumThresholds {
  sex: 'male' | 'female';
  nonSevere: number;
  indeterminate: [number, number];
  severe: number;
  unit: string;
  citation: string;
}

export const CT_CALCIUM_MALE: CTCalciumThresholds = {
  sex: 'male',
  nonSevere: 1600,
  indeterminate: [1600, 1999],
  severe: 2000,
  unit: 'AU',
  citation: 'Clavel MA et al. Circulation 2014; Nitsche C et al. JACC CV Imaging 2024',
};

export const CT_CALCIUM_FEMALE: CTCalciumThresholds = {
  sex: 'female',
  nonSevere: 800,
  indeterminate: [800, 1199],
  severe: 1200,
  unit: 'AU',
  citation: 'Clavel MA et al. Circulation 2014; Nitsche C et al. JACC CV Imaging 2024',
};

// ── Measurement Error / Quality Flags ────────────────────────
export const LVOT_DIAMETER_RANGE = { min: 1.5, max: 3.2, unit: 'cm' } as const;
export const SBP_HYPERTENSION = 140; // mmHg
export const BSA_SMALL = 1.6; // m²
export const LVOT_TVI_MIN = 15; // cm

// ── Coronary Obstruction Risk Thresholds ─────────────────────
// Citation: Ribeiro HB et al. JACC CV Interventions 2013; Barbanti M et al. JACC CV Interventions 2019
export const CORONARY_HEIGHT_HIGH_RISK = 10; // mm — high risk if coronary ostium height < 10 mm
export const CORONARY_HEIGHT_INTERMEDIATE = 12; // mm — intermediate risk if 10-12 mm

// ── Prosthesis-Patient Mismatch (PPM) Thresholds ─────────────
// Citation: Pibarot P, Dumesnil JG. Heart 2006; Dvir D et al. JACC 2012
export const PPM_SEVERE = 0.65; // cm²/m² — severe mismatch if indexed EOA < 0.65
export const PPM_MODERATE = 0.85; // cm²/m² — moderate mismatch if indexed EOA 0.65–0.85
