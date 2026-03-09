/**
 * TEER / MitraClip Decision Tool - MR Classification & Eligibility Engine
 *
 * Grades mitral regurgitation severity per ACC/AHA 2020 guidelines,
 * assesses TEER eligibility per COAPT criteria and Abbott MitraClip IFU,
 * recommends clip sizing (G4: NT, NTW, XT, XTW), and classifies
 * proportionate vs disproportionate secondary MR (Grayburn PA et al.
 * Circulation 2019;139:747-750).
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type MRGrade = 'none' | 'mild' | 'moderate' | 'moderate-severe' | 'severe';

export type MREtiology = 'primary' | 'secondary' | 'mixed';

export interface MRGradingInput {
  eroa?: number;        // cm²
  rVol?: number;        // mL/beat
  vcWidth?: number;     // cm
  rf?: number;          // %
  vcArea3D?: number;    // cm²  (3D vena contracta area)
  etiology?: MREtiology;
}

export interface MRGradingResult {
  grade: MRGrade;
  gradeName: string;
  gradeNumeric: number;   // 0-4 scale (0=none, 1=mild, 2=mod, 3=mod-severe, 4=severe)
  parameterGrades: { parameter: string; value: number; grade: MRGrade }[];
  discordances: string[];
}

export interface TEERInput {
  // Anatomical
  mvArea?: number;          // cm²
  flailGap?: number;        // mm
  flailWidth?: number;      // mm
  coaptationDepth?: number; // mm
  coaptationLength?: number; // mm
  graspZoneCalcification?: boolean;

  // Clinical
  lvef?: number;            // %
  lvesd?: number;           // mm
  lvedv?: number;           // mL
  eroa?: number;            // cm²
  symptomaticOnGDMT?: boolean;
  prohibitiveSurgicalRisk?: boolean;

  // Exclusions
  activeEndocarditis?: boolean;
  rheumaticDisease?: boolean;
  significantMS?: boolean;
  intracardiacThrombus?: boolean;
}

export interface EligibilityResult {
  eligible: boolean;
  met: string[];
  notMet: string[];
  exclusions: string[];
  warnings: string[];
  proportionateMR?: 'disproportionate' | 'proportionate' | 'indeterminate';
}

export type ClipRecommendation = 'NT' | 'NTW' | 'XT' | 'XTW';

export interface ClipSizingResult {
  recommended: ClipRecommendation[];
  reasoning: string[];
}

// ─── MR Severity Grading ─────────────────────────────────────────────────────

function gradeParameter(
  param: string,
  value: number,
  thresholds: { mild: number; moderate: number; severe: number; direction: 'gte' | 'lte' },
): MRGrade {
  if (thresholds.direction === 'gte') {
    if (value >= thresholds.severe) return 'severe';
    if (value >= thresholds.moderate) return 'moderate';
    if (value >= thresholds.mild) return 'mild';
    return 'none';
  }
  // lte direction (lower = worse)
  if (value <= thresholds.severe) return 'severe';
  if (value <= thresholds.moderate) return 'moderate';
  if (value <= thresholds.mild) return 'mild';
  return 'none';
}

const gradeToNumeric: Record<MRGrade, number> = {
  none: 0,
  mild: 1,
  moderate: 2,
  'moderate-severe': 3,
  severe: 4,
};

const numericToGrade = (n: number): MRGrade => {
  if (n <= 0.5) return 'none';
  if (n <= 1.5) return 'mild';
  if (n <= 2.5) return 'moderate';
  if (n <= 3.5) return 'moderate-severe';
  return 'severe';
};

const gradeNames: Record<MRGrade, string> = {
  none: 'None / Trace',
  mild: 'Mild (1+)',
  moderate: 'Moderate (2+)',
  'moderate-severe': 'Moderate-Severe (3+)',
  severe: 'Severe (4+)',
};

export function gradeMR(input: MRGradingInput): MRGradingResult {
  const parameterGrades: { parameter: string; value: number; grade: MRGrade }[] = [];
  const discordances: string[] = [];

  if (input.eroa !== undefined) {
    const grade = gradeParameter('EROA', input.eroa, {
      mild: 0.10, moderate: 0.20, severe: 0.40, direction: 'gte',
    });
    parameterGrades.push({ parameter: 'EROA', value: input.eroa, grade });

    // Secondary MR note
    if (input.etiology === 'secondary' && input.eroa >= 0.20 && input.eroa < 0.40) {
      discordances.push(
        'EROA 0.20–0.39 cm²: Moderate by ACC/AHA but clinically significant for secondary MR per COAPT (≥0.30 cm²)',
      );
    }
  }

  if (input.rVol !== undefined) {
    const grade = gradeParameter('RVol', input.rVol, {
      mild: 15, moderate: 30, severe: 60, direction: 'gte',
    });
    parameterGrades.push({ parameter: 'Regurgitant Volume', value: input.rVol, grade });
  }

  if (input.vcWidth !== undefined) {
    const grade = gradeParameter('VC Width', input.vcWidth, {
      mild: 0.15, moderate: 0.30, severe: 0.70, direction: 'gte',
    });
    parameterGrades.push({ parameter: 'Vena Contracta Width', value: input.vcWidth, grade });
  }

  if (input.rf !== undefined) {
    const grade = gradeParameter('RF', input.rf, {
      mild: 15, moderate: 30, severe: 50, direction: 'gte',
    });
    parameterGrades.push({ parameter: 'Regurgitant Fraction', value: input.rf, grade });
  }

  if (input.vcArea3D !== undefined) {
    const grade = gradeParameter('3D VC Area', input.vcArea3D, {
      mild: 0.10, moderate: 0.20, severe: 0.40, direction: 'gte',
    });
    parameterGrades.push({ parameter: '3D Vena Contracta Area', value: input.vcArea3D, grade });
  }

  if (parameterGrades.length === 0) {
    return {
      grade: 'none',
      gradeName: gradeNames.none,
      gradeNumeric: 0,
      parameterGrades: [],
      discordances: ['No MR parameters provided'],
    };
  }

  // Integrative grading: use the highest individual parameter grade
  // ACC/AHA recommends integrative approach — the most severe parameter drives grading
  const numericGrades = parameterGrades.map((p) => gradeToNumeric[p.grade]);
  const maxGrade = Math.max(...numericGrades);
  const avgGrade = numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length;

  // Check for discordance between parameters
  const minGrade = Math.min(...numericGrades);
  if (maxGrade - minGrade >= 2) {
    discordances.push(
      'Significant discordance between MR parameters — consider integrative approach with additional imaging',
    );
  }

  // Use max grade but flag when average is significantly lower
  const finalNumeric = maxGrade;
  const grade = numericToGrade(finalNumeric);

  return {
    grade,
    gradeName: gradeNames[grade],
    gradeNumeric: finalNumeric,
    parameterGrades,
    discordances,
  };
}

// ─── TEER Eligibility Assessment ─────────────────────────────────────────────

export function assessTEEREligibility(input: TEERInput): EligibilityResult {
  const met: string[] = [];
  const notMet: string[] = [];
  const exclusions: string[] = [];
  const warnings: string[] = [];

  // Anatomical criteria
  if (input.mvArea !== undefined) {
    if (input.mvArea >= 4.0) {
      met.push('MV area ≥ 4.0 cm² — adequate for TEER');
    } else {
      notMet.push(`MV area ${input.mvArea.toFixed(1)} cm² — risk of iatrogenic MS (need ≥4.0 cm²)`);
    }
  }

  if (input.flailGap !== undefined) {
    if (input.flailGap < 10) {
      met.push(`Flail gap ${input.flailGap} mm — within TEER range (<10 mm)`);
    } else {
      notMet.push(`Flail gap ${input.flailGap} mm — exceeds TEER limit (≥10 mm)`);
    }
  }

  if (input.flailWidth !== undefined) {
    if (input.flailWidth < 15) {
      met.push(`Flail width ${input.flailWidth} mm — within TEER range (<15 mm)`);
    } else {
      notMet.push(`Flail width ${input.flailWidth} mm — exceeds TEER limit (≥15 mm)`);
    }
  }

  if (input.coaptationDepth !== undefined) {
    if (input.coaptationDepth < 11) {
      met.push(`Coaptation depth ${input.coaptationDepth} mm — within range (<11 mm)`);
    } else {
      notMet.push(`Coaptation depth ${input.coaptationDepth} mm — deep tethering may limit TEER success (≥11 mm)`);
    }
  }

  if (input.coaptationLength !== undefined) {
    if (input.coaptationLength >= 2) {
      met.push(`Coaptation length ${input.coaptationLength} mm — adequate for grasping (≥2 mm)`);
    } else {
      notMet.push(`Coaptation length ${input.coaptationLength} mm — insufficient for clip grasping (<2 mm)`);
    }
  }

  if (input.graspZoneCalcification === false) {
    met.push('No significant calcification at grasp zone');
  } else if (input.graspZoneCalcification === true) {
    notMet.push('Significant calcification at grasp zone — increased clip detachment risk');
  }

  // Clinical criteria (COAPT-based)
  if (input.lvef !== undefined) {
    if (input.lvef >= 20 && input.lvef <= 50) {
      met.push(`LVEF ${input.lvef}% — within COAPT range (20–50%)`);
    } else if (input.lvef < 20) {
      notMet.push(`LVEF ${input.lvef}% — below COAPT range (<20%, associated with futility)`);
    } else {
      warnings.push(`LVEF ${input.lvef}% — above COAPT range (>50%). Consider primary MR etiology and surgical repair.`);
    }
  }

  if (input.lvesd !== undefined) {
    if (input.lvesd <= 70) {
      met.push(`LVESD ${input.lvesd} mm — within COAPT limit (≤70 mm)`);
    } else {
      notMet.push(`LVESD ${input.lvesd} mm — exceeds COAPT limit (>70 mm, advanced cardiomyopathy)`);
    }
  }

  if (input.eroa !== undefined) {
    if (input.eroa >= 0.30) {
      met.push(`EROA ${input.eroa.toFixed(2)} cm² — meets COAPT severity threshold (≥0.30 cm²)`);
    } else if (input.eroa >= 0.20) {
      warnings.push(`EROA ${input.eroa.toFixed(2)} cm² — significant per some criteria but below COAPT threshold (0.20–0.29 cm²). MITRA-FR included this range and showed no benefit.`);
    }
  }

  if (input.symptomaticOnGDMT === true) {
    met.push('Symptomatic despite optimal GDMT');
  } else if (input.symptomaticOnGDMT === false) {
    notMet.push('Not symptomatic on GDMT — TEER not indicated for asymptomatic secondary MR');
  }

  if (input.prohibitiveSurgicalRisk === true) {
    met.push('Prohibitive surgical risk — TEER appropriate');
  } else if (input.prohibitiveSurgicalRisk === false) {
    warnings.push('Not deemed prohibitive surgical risk — consider MV surgery vs TEER based on anatomy and Heart Team discussion');
  }

  // Exclusions
  if (input.activeEndocarditis === true) {
    exclusions.push('Active endocarditis — absolute contraindication');
  }
  if (input.rheumaticDisease === true) {
    exclusions.push('Rheumatic valve disease — not amenable to TEER');
  }
  if (input.significantMS === true) {
    exclusions.push('Significant mitral stenosis — high risk of iatrogenic MS after TEER');
  }
  if (input.intracardiacThrombus === true) {
    exclusions.push('Intracardiac thrombus — contraindicates transseptal access');
  }

  // Proportionate vs Disproportionate MR (Grayburn PA et al. Circulation 2019)
  let proportionateMR: 'disproportionate' | 'proportionate' | 'indeterminate' | undefined;
  if (input.eroa !== undefined && (input.lvedv !== undefined || input.lvesd !== undefined)) {
    const hasSevereMR = input.eroa >= 0.30;
    const hasAdvancedCM =
      (input.lvedv !== undefined && input.lvedv > 200) ||
      (input.lvesd !== undefined && input.lvesd > 70);

    if (hasSevereMR && !hasAdvancedCM) {
      proportionateMR = 'disproportionate';
    } else if (!hasSevereMR || hasAdvancedCM) {
      proportionateMR = 'proportionate';
    } else {
      proportionateMR = 'indeterminate';
    }
  }

  const eligible = exclusions.length === 0 && notMet.length === 0;

  return { eligible, met, notMet, exclusions, warnings, proportionateMR };
}

// ─── Clip Sizing Recommendation ──────────────────────────────────────────────

export function recommendClipSize(input: {
  flailGap?: number;      // mm
  flailWidth?: number;    // mm
  coaptationDepth?: number; // mm
  leafletLength?: number; // mm — available leaflet for grasping
  etiology?: MREtiology;
}): ClipSizingResult {
  const recommended: ClipRecommendation[] = [];
  const reasoning: string[] = [];

  const { flailGap, flailWidth, coaptationDepth, etiology } = input;

  // Extended arms (XT/XTW) for deeper grasping needs
  const needsExtended =
    (flailGap !== undefined && flailGap > 5) ||
    (coaptationDepth !== undefined && coaptationDepth >= 7) ||
    etiology === 'secondary';

  // Wide clips (NTW/XTW) for broader pathology
  const needsWide = flailWidth !== undefined && flailWidth > 12;

  if (needsExtended && needsWide) {
    recommended.push('XTW');
    reasoning.push('Extended + Wide: deep coaptation/large flail gap with broad pathology');
    recommended.push('XT');
    reasoning.push('XT alternative if flail width manageable with standard width');
  } else if (needsExtended) {
    recommended.push('XT');
    reasoning.push('Extended arms: deeper grasp for tethered leaflets, flail gap >5 mm, or secondary MR');
    if (etiology === 'secondary') {
      reasoning.push('Secondary MR typically benefits from extended grasp depth (9 mm)');
    }
  } else if (needsWide) {
    recommended.push('NTW');
    reasoning.push('Wide clip: flail width >12 mm requires broader coverage');
    recommended.push('NT');
    reasoning.push('NT alternative if adequate reduction achieved with standard width');
  } else {
    recommended.push('NT');
    reasoning.push('Standard narrow clip: focal pathology with adequate leaflet tissue');
  }

  // Add XT as consideration for all secondary MR
  if (etiology === 'secondary' && !recommended.includes('XT') && !recommended.includes('XTW')) {
    recommended.push('XT');
    reasoning.push('Consider XT for secondary MR due to tethered leaflet geometry');
  }

  return { recommended, reasoning };
}
