// ─────────────────────────────────────────────────────────────
// TEER / MitraClip Decision Tool Data
// Sources: ACC/AHA 2020 VHD Guidelines, COAPT (Stone GW et al. NEJM 2018),
// MITRA-FR (Obadia JF et al. NEJM 2018), Abbott MitraClip IFU
// ─────────────────────────────────────────────────────────────

// ── MR Severity Thresholds (ACC/AHA 2020, Zoghbi WA et al. JASE 2017) ──

export interface MRSeverityThreshold {
  parameter: string;
  unit: string;
  mild: string;
  moderate: string;
  severe: string;
  note?: string;
}

export const MR_SEVERITY_THRESHOLDS: MRSeverityThreshold[] = [
  {
    parameter: 'Effective Regurgitant Orifice Area (EROA)',
    unit: 'cm²',
    mild: '< 0.20',
    moderate: '0.20 – 0.39',
    severe: '≥ 0.40',
    note: 'For secondary MR, EROA ≥0.20 cm² is clinically significant per COAPT; ACC/AHA uses ≥0.40 for severe',
  },
  {
    parameter: 'Regurgitant Volume (RVol)',
    unit: 'mL/beat',
    mild: '< 30',
    moderate: '30 – 59',
    severe: '≥ 60',
    note: 'For secondary MR, RVol ≥45 mL may be significant',
  },
  {
    parameter: 'Vena Contracta Width',
    unit: 'cm',
    mild: '< 0.30',
    moderate: '0.30 – 0.69',
    severe: '≥ 0.70',
  },
  {
    parameter: 'Regurgitant Fraction (RF)',
    unit: '%',
    mild: '< 30',
    moderate: '30 – 49',
    severe: '≥ 50',
  },
  {
    parameter: 'Color Jet Area / LA Area',
    unit: '%',
    mild: '< 20',
    moderate: '20 – 39',
    severe: '≥ 40',
    note: 'Qualitative; affected by hemodynamics and machine settings',
  },
  {
    parameter: '3D Vena Contracta Area',
    unit: 'cm²',
    mild: '< 0.20',
    moderate: '0.20 – 0.39',
    severe: '≥ 0.40',
    note: 'Preferred over 2D VC width when available',
  },
];

// ── MitraClip G4 Clip Sizing Data ──────────────────────────────

export interface ClipSize {
  name: string;
  type: 'narrow' | 'extended';
  width: 'standard' | 'wide';
  clipWidth: number;      // mm
  graspLength: number;    // mm — leaflet insertion depth
  indications: string[];
  notes?: string;
}

export const MITRACLIP_G4_SIZES: ClipSize[] = [
  {
    name: 'NT',
    type: 'narrow',
    width: 'standard',
    clipWidth: 17,
    graspLength: 6,
    indications: [
      'Standard anatomy with adequate leaflet tissue',
      'Flail width < 12 mm',
      'Coaptation depth < 11 mm',
      'Adequate leaflet length for 6 mm grasp',
    ],
  },
  {
    name: 'NTW',
    type: 'narrow',
    width: 'wide',
    clipWidth: 21,
    graspLength: 6,
    indications: [
      'Wider pathology requiring broader grasp zone',
      'Flail width 12–15 mm',
      'Coaptation depth < 11 mm',
      'Larger MV area (less risk of stenosis with wider clip)',
    ],
  },
  {
    name: 'XT',
    type: 'extended',
    width: 'standard',
    clipWidth: 17,
    graspLength: 9,
    indications: [
      'Short or restricted leaflets requiring deeper grasp',
      'Flail gap > 5 mm',
      'Coaptation depth ≥ 7 mm (functional MR)',
      'Tethered leaflets in secondary MR',
    ],
  },
  {
    name: 'XTW',
    type: 'extended',
    width: 'wide',
    clipWidth: 21,
    graspLength: 9,
    indications: [
      'Large flail width with restricted leaflets',
      'Flail gap > 5 mm AND flail width > 12 mm',
      'Deep coaptation with broad pathology',
      'Complex Barlow disease',
    ],
  },
];

// ── TEER Eligibility Criteria ──────────────────────────────────

export interface EligibilityCriterion {
  id: string;
  category: 'anatomical' | 'clinical' | 'exclusion';
  label: string;
  description: string;
  threshold?: string;
  source: string;
}

export const TEER_ELIGIBILITY_CRITERIA: EligibilityCriterion[] = [
  // Anatomical
  {
    id: 'mv-area',
    category: 'anatomical',
    label: 'Mitral Valve Area ≥ 4.0 cm²',
    description: 'Adequate MV area to prevent iatrogenic mitral stenosis after clip placement',
    threshold: '≥ 4.0 cm²',
    source: 'Abbott MitraClip IFU',
  },
  {
    id: 'flail-gap',
    category: 'anatomical',
    label: 'Flail Gap < 10 mm',
    description: 'Maximum flail gap amenable to TEER grasping',
    threshold: '< 10 mm',
    source: 'EVEREST II criteria',
  },
  {
    id: 'flail-width',
    category: 'anatomical',
    label: 'Flail Width < 15 mm',
    description: 'Width of flail segment accessible with single or double clip',
    threshold: '< 15 mm',
    source: 'EVEREST II criteria',
  },
  {
    id: 'coaptation-depth',
    category: 'anatomical',
    label: 'Coaptation Depth < 11 mm',
    description: 'Depth of leaflet coaptation below the annular plane; deeper coaptation suggests severe tethering',
    threshold: '< 11 mm',
    source: 'COAPT eligibility criteria',
  },
  {
    id: 'coaptation-length',
    category: 'anatomical',
    label: 'Coaptation Length ≥ 2 mm',
    description: 'Minimum residual leaflet coaptation for clip grasping',
    threshold: '≥ 2 mm',
    source: 'Abbott MitraClip IFU',
  },
  {
    id: 'no-calcification',
    category: 'anatomical',
    label: 'No Significant Calcification at Grasp Zone',
    description: 'Calcification at the grasping site prevents adequate leaflet capture and increases clip detachment risk',
    source: 'Abbott MitraClip IFU',
  },
  // Clinical (for secondary MR per COAPT)
  {
    id: 'lvef-range',
    category: 'clinical',
    label: 'LVEF 20–50%',
    description: 'COAPT enrolled patients with LVEF 20–50%. LVEF < 20% associated with futility; LVEF > 50% suggests primary MR etiology.',
    threshold: '20–50%',
    source: 'COAPT Trial (Stone GW et al. NEJM 2018)',
  },
  {
    id: 'lvesd',
    category: 'clinical',
    label: 'LVESD ≤ 70 mm',
    description: 'LV end-systolic dimension ≤ 70 mm. Excessively dilated LV predicts poor response to TEER.',
    threshold: '≤ 70 mm',
    source: 'COAPT Trial (Stone GW et al. NEJM 2018)',
  },
  {
    id: 'eroa-severity',
    category: 'clinical',
    label: 'EROA ≥ 0.30 cm² (Secondary MR)',
    description: 'COAPT enrolled patients with EROA ≥0.30 cm² (moderate-to-severe or severe). MITRA-FR used ≥0.20 cm² and showed no benefit.',
    threshold: '≥ 0.30 cm²',
    source: 'COAPT Trial; Grayken "proportionate MR" hypothesis',
  },
  {
    id: 'symptomatic-gdmt',
    category: 'clinical',
    label: 'Symptomatic Despite Optimal GDMT',
    description: 'Maximally tolerated guideline-directed medical therapy for ≥3 months including CRT if indicated',
    source: 'COAPT Trial, ACC/AHA 2020 VHD Guidelines',
  },
  {
    id: 'surgical-risk',
    category: 'clinical',
    label: 'Prohibitive Surgical Risk or Not a Candidate for MV Surgery',
    description: 'Heart Team determination that MV surgery carries excessive risk. STS score for MV repair ≥8% supports TEER.',
    source: 'ACC/AHA 2020 VHD Guidelines',
  },
  // Exclusions
  {
    id: 'no-endocarditis',
    category: 'exclusion',
    label: 'No Active Endocarditis',
    description: 'Active endocarditis is an absolute contraindication to TEER',
    source: 'Abbott MitraClip IFU',
  },
  {
    id: 'no-rheumatic',
    category: 'exclusion',
    label: 'No Rheumatic Valve Disease',
    description: 'Rheumatic mitral valve disease with commissural fusion is not amenable to TEER',
    source: 'Abbott MitraClip IFU',
  },
  {
    id: 'no-ms',
    category: 'exclusion',
    label: 'No Significant Mitral Stenosis (MV Area < 4.0 cm²)',
    description: 'Pre-existing mitral stenosis increases risk of severe stenosis after clip placement',
    source: 'Abbott MitraClip IFU',
  },
  {
    id: 'no-intracardiac-thrombus',
    category: 'exclusion',
    label: 'No Intracardiac Thrombus',
    description: 'LA or LV thrombus contraindicates transseptal access and device manipulation',
    source: 'Abbott MitraClip IFU',
  },
];

// ── Expected MR Reduction by Clip Count ────────────────────────

export interface MRReductionEstimate {
  clips: number;
  expectedReduction: string;
  residualMR: string;
  stenosisRisk: string;
  notes: string;
  source: string;
}

export const MR_REDUCTION_ESTIMATES: MRReductionEstimate[] = [
  {
    clips: 1,
    expectedReduction: '1–2 grade reduction',
    residualMR: 'Moderate (2+) residual MR in 60–70%',
    stenosisRisk: 'Very low (<1%)',
    notes: 'Single clip may be sufficient for focal pathology (e.g., P2 prolapse with narrow flail). MR ≤1+ in ~35% of single-clip cases.',
    source: 'EVEREST II, COAPT Registry Data',
  },
  {
    clips: 2,
    expectedReduction: '2–3 grade reduction',
    residualMR: 'Mild or less (≤1+) in 60–80%',
    stenosisRisk: 'Low (2–5%); mean MV gradient ~3–5 mmHg',
    notes: 'Most common strategy (mean 1.7 clips in COAPT). Double-orifice technique. Monitor MV gradient after each clip.',
    source: 'COAPT (Stone GW et al. NEJM 2018)',
  },
  {
    clips: 3,
    expectedReduction: '3+ grade reduction',
    residualMR: 'Mild or less (≤1+) in 70–85%',
    stenosisRisk: 'Moderate (5–10%); mean MV gradient may exceed 5 mmHg',
    notes: 'Reserved for complex/wide pathology, Barlow disease, or suboptimal result with 2 clips. Must monitor MV gradient carefully.',
    source: 'MitraClip Registry, Expert Consensus',
  },
  {
    clips: 4,
    expectedReduction: 'Maximal achievable',
    residualMR: 'Minimal residual in most',
    stenosisRisk: 'High (10–20%); significant iatrogenic MS likely',
    notes: 'Rare. Only in very large MV areas (>6 cm²) with extensive pathology. High risk of clinically significant mitral stenosis.',
    source: 'Case series, Expert Consensus',
  },
];

// ── COAPT vs MITRA-FR Trial Comparison ─────────────────────────

export interface TrialEndpoint {
  endpoint: string;
  timepoint: string;
  teerArm: string;
  controlArm: string;
  statistic: string;
  significant: boolean;
}

export interface TrialComparison {
  trial: string;
  fullTitle: string;
  authors: string;
  journal: string;
  year: number;
  pmid: string;
  doi: string;
  population: string;
  sampleSize: number;
  inclusionCriteria: string[];
  meanClips: number;
  primaryEndpoint: string;
  endpoints: TrialEndpoint[];
  keyDifferences: string[];
}

export const COAPT_TRIAL: TrialComparison = {
  trial: 'COAPT',
  fullTitle: 'Cardiovascular Outcomes Assessment of the MitraClip Percutaneous Therapy for Heart Failure Patients With Functional Mitral Regurgitation',
  authors: 'Stone GW, Lindenfeld J, Abraham WT, et al.',
  journal: 'New England Journal of Medicine',
  year: 2018,
  pmid: '30280640',
  doi: '10.1056/NEJMoa1806640',
  population: 'Secondary (functional) MR with HFrEF, LVEF 20–50%, LVESD ≤70mm, EROA ≥0.30 cm², symptomatic on optimal GDMT',
  sampleSize: 614,
  inclusionCriteria: [
    'EROA ≥ 0.30 cm² or RVol ≥ 45 mL',
    'LVEF 20–50%',
    'LVESD ≤ 70 mm',
    'NYHA II–IVa symptoms on maximally tolerated GDMT',
    'Heart Team agreement that MV surgery is not appropriate',
    'Suitable MV anatomy for TEER',
  ],
  meanClips: 1.7,
  primaryEndpoint: 'Annualized rate of HF hospitalization within 24 months',
  endpoints: [
    {
      endpoint: 'HF Hospitalization (annualized rate)',
      timepoint: '2 years',
      teerArm: '35.8%',
      controlArm: '67.9%',
      statistic: 'HR 0.53 (95% CI 0.40–0.70), p<0.001',
      significant: true,
    },
    {
      endpoint: 'All-Cause Mortality',
      timepoint: '2 years',
      teerArm: '29.1%',
      controlArm: '46.1%',
      statistic: 'HR 0.62 (95% CI 0.46–0.82), p<0.001',
      significant: true,
    },
    {
      endpoint: 'All-Cause Mortality',
      timepoint: '5 years',
      teerArm: '57.3%',
      controlArm: '67.2%',
      statistic: 'HR 0.72 (95% CI 0.58–0.89), p=0.003',
      significant: true,
    },
    {
      endpoint: 'MR ≤ 2+ (Moderate or Less)',
      timepoint: '2 years',
      teerArm: '94.8%',
      controlArm: 'N/A',
      statistic: 'Per-protocol analysis',
      significant: true,
    },
    {
      endpoint: 'KCCQ Score Improvement ≥ 10 pts',
      timepoint: '1 year',
      teerArm: '73.1%',
      controlArm: '36.0%',
      statistic: 'p<0.001',
      significant: true,
    },
    {
      endpoint: 'HF Hospitalization (annualized)',
      timepoint: '5 years',
      teerArm: '33.1 per 100 PY',
      controlArm: '58.5 per 100 PY',
      statistic: 'RR 0.57 (95% CI 0.44–0.72), p<0.001',
      significant: true,
    },
  ],
  keyDifferences: [
    'Enrolled patients with "disproportionate" MR — severe MR relative to LV size',
    'More rigorous GDMT optimization (mandatory CRT evaluation, HF specialist management)',
    'Higher mean clips per patient (1.7) achieving greater MR reduction',
    'Excluded patients with LVESD > 70 mm (less advanced cardiomyopathy)',
    'Required EROA ≥ 0.30 cm² (more severe MR than MITRA-FR)',
  ],
};

export const MITRA_FR_TRIAL: TrialComparison = {
  trial: 'MITRA-FR',
  fullTitle: 'Percutaneous Repair with the MitraClip Device for Severe Functional/Secondary Mitral Regurgitation',
  authors: 'Obadia JF, Messika-Zeitoun D, Leurent G, et al.',
  journal: 'New England Journal of Medicine',
  year: 2018,
  pmid: '30280641',
  doi: '10.1056/NEJMoa1805374',
  population: 'Secondary (functional) MR with symptomatic HF, LVEF 15–40%, EROA ≥0.20 cm²',
  sampleSize: 304,
  inclusionCriteria: [
    'EROA ≥ 0.20 cm² or RVol ≥ 30 mL',
    'LVEF 15–40%',
    'No LVESD upper limit specified',
    'NYHA II–IV symptoms',
    'Optimal medical therapy',
    'Heart Team determination that surgery is not indicated',
  ],
  meanClips: 1.3,
  primaryEndpoint: 'Composite of death or unplanned HF hospitalization at 12 months',
  endpoints: [
    {
      endpoint: 'Death or Unplanned HF Hospitalization',
      timepoint: '1 year',
      teerArm: '54.6%',
      controlArm: '51.3%',
      statistic: 'OR 1.16 (95% CI 0.73–1.84), p=0.53',
      significant: false,
    },
    {
      endpoint: 'All-Cause Mortality',
      timepoint: '1 year',
      teerArm: '24.3%',
      controlArm: '22.4%',
      statistic: 'HR 1.11 (95% CI 0.69–1.77), p=0.67',
      significant: false,
    },
    {
      endpoint: 'All-Cause Mortality',
      timepoint: '5 years',
      teerArm: '52.0%',
      controlArm: '55.9%',
      statistic: 'HR 0.95 (95% CI 0.72–1.26), p=0.75',
      significant: false,
    },
    {
      endpoint: 'Death or HF Hospitalization',
      timepoint: '5 years',
      teerArm: '63.2%',
      controlArm: '68.4%',
      statistic: 'HR 0.91 (95% CI 0.70–1.18), p=0.47',
      significant: false,
    },
    {
      endpoint: 'MR ≤ 2+ (Moderate or Less)',
      timepoint: '1 year',
      teerArm: '83.2%',
      controlArm: 'N/A',
      statistic: 'Per-protocol analysis',
      significant: true,
    },
    {
      endpoint: 'Unplanned HF Hospitalization',
      timepoint: '1 year',
      teerArm: '48.7%',
      controlArm: '47.4%',
      statistic: 'Not significant',
      significant: false,
    },
  ],
  keyDifferences: [
    'Enrolled patients with "proportionate" MR — MR severity proportional to LV dilation',
    'Lower EROA threshold (≥0.20 cm²) included patients with less severe MR',
    'No upper limit on LVESD — included patients with more advanced cardiomyopathy',
    'Fewer clips per patient (mean 1.3) with less MR reduction',
    'Less rigorous GDMT optimization compared to COAPT',
    'Lower LVEF range (15–40%) included patients with more severe LV dysfunction',
  ],
};

// ── Proportionate vs Disproportionate MR Concept ───────────────

export const PROPORTIONATE_MR_CONCEPT = {
  title: 'Proportionate vs Disproportionate MR (Grayken Hypothesis)',
  description:
    'The divergent results of COAPT and MITRA-FR are explained by the concept of ' +
    '"proportionate" vs "disproportionate" secondary MR. When MR severity is out of ' +
    'proportion to the degree of LV dilation (disproportionate — as in COAPT), correcting ' +
    'the MR yields clinical benefit. When MR is proportionate to advanced cardiomyopathy ' +
    '(as in MITRA-FR), the primary disease is the cardiomyopathy, and fixing the MR alone ' +
    'does not improve outcomes.',
  criteria: [
    {
      label: 'Disproportionate MR (COAPT-like)',
      definition: 'EROA ≥ 0.30 cm² with LVEDV ≤ 200 mL or LVESD ≤ 70 mm',
      outcome: 'Likely to benefit from TEER',
    },
    {
      label: 'Proportionate MR (MITRA-FR-like)',
      definition: 'EROA 0.20–0.29 cm² with severely dilated LV (LVEDV > 200 mL)',
      outcome: 'Unlikely to benefit from TEER alone — focus on GDMT, CRT, LVAD',
    },
  ],
  citation: 'Grayburn PA, Sannino A, Packer M. Circulation 2019;139:747-750',
};
