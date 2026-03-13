/**
 * TAVR Decision Suite - CT Calcium Scoring Engine
 *
 * Standalone module for aortic valve calcium (AVC) score-based AS severity
 * adjudication, following:
 *   - Clavel MA et al. JACC 2014;63:1724-1735 (sex-specific AVC thresholds)
 *   - Clavel MA et al. Heart 2015;101:1881-1888 (discordant AS algorithm)
 *   - Clavel MA et al. JACC Cardiovasc Imaging 2016;9:460-469 (calcium density)
 *   - ACC/AHA 2020 VHD Guidelines §4.3.2 (binary calcium cutoffs)
 *   - ESC 2021 VHD Guidelines §5.2 (three-tier calcium grading)
 *   - Pawade T et al. Heart 2015;101:1826-1834 (indexed calcium metrics)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type CalciumSeverity =
  | 'very-likely-severe'
  | 'likely-severe'
  | 'indeterminate'
  | 'unlikely-severe';

export interface CalciumScoreResult {
  /** Overall severity determination */
  severity: CalciumSeverity;
  /** Display label */
  label: string;
  /** Clavel/ESC three-tier classification */
  clavelTier: 'severe' | 'likely-severe' | 'unlikely-severe';
  /** Whether score exceeds ACC/AHA 2020 binary cutoff */
  accAhaSevere: boolean;
  /** Whether score exceeds ESC 2021 severe cutoff */
  escSevere: boolean;
}

export interface CalciumDensityResult {
  /** Calcium density in AU/cm² */
  density: number;
  /** Severity based on density thresholds */
  severity: CalciumSeverity;
  /** Display label */
  label: string;
  /** Sex-specific threshold used */
  threshold: number;
}

export interface CalciumAssessment {
  /** Absolute AVC score classification */
  absolute: CalciumScoreResult;
  /** Calcium density classification (if annulus area provided) */
  density?: CalciumDensityResult;
  /** Overall conclusion combining both metrics */
  conclusion: string;
  /** Recommended clinical action */
  clinicalAction: string;
  /** Whether the calcium data can adjudicate discordant AS */
  adjudicatesDiscordance: boolean;
}

// ─── Threshold Constants ────────────────────────────────────────────────────

/** Clavel MA et al. JACC 2014;63:1724-1735 & Heart 2015;101:1881-1888 */
export const CLAVEL_THRESHOLDS = {
  male: {
    severe: 2000,
    likelySevere: 1200,
    label: 'Clavel/ESC',
  },
  female: {
    severe: 1200,
    likelySevere: 800,
    label: 'Clavel/ESC',
  },
} as const;

/** ACC/AHA 2020 VHD Guidelines — binary cutoffs */
export const ACC_AHA_THRESHOLDS = {
  male: { severe: 2000, label: 'ACC/AHA 2020' },
  female: { severe: 1300, label: 'ACC/AHA 2020' },
} as const;

/** ESC 2021 VHD Guidelines — matches Clavel three-tier system */
export const ESC_THRESHOLDS = {
  male: { severe: 2000, likelySevere: 1200, label: 'ESC 2021' },
  female: { severe: 1200, likelySevere: 800, label: 'ESC 2021' },
} as const;

/**
 * Calcium density thresholds: AVC / annulus area (AU/cm²)
 * Clavel MA et al. JACC Cardiovasc Imaging 2016;9:460-469
 */
export const DENSITY_THRESHOLDS = {
  male: {
    veryLikely: 476,
    likely: 292,
    label: 'Clavel JCVI 2016',
  },
  female: {
    veryLikely: 292,
    likely: 176,
    label: 'Clavel JCVI 2016',
  },
} as const;

// ─── Classification Functions ───────────────────────────────────────────────

/**
 * Classify AS severity by absolute AVC score using sex-specific thresholds.
 * Combines Clavel/ESC three-tier and ACC/AHA binary approaches.
 */
export function classifyByAbsoluteScore(
  score: number,
  sex: 'male' | 'female',
): CalciumScoreResult {
  const clavel = CLAVEL_THRESHOLDS[sex];
  const accAha = ACC_AHA_THRESHOLDS[sex];

  const accAhaSevere = score >= accAha.severe;
  const escSevere = score >= clavel.severe;

  if (score >= clavel.severe) {
    return {
      severity: 'very-likely-severe',
      label: `AVC ${score} AU — Very likely severe AS`,
      clavelTier: 'severe',
      accAhaSevere,
      escSevere,
    };
  }

  if (score >= clavel.likelySevere) {
    return {
      severity: 'likely-severe',
      label: `AVC ${score} AU — Likely severe AS (indeterminate zone)`,
      clavelTier: 'likely-severe',
      accAhaSevere,
      escSevere,
    };
  }

  return {
    severity: 'unlikely-severe',
    label: `AVC ${score} AU — Unlikely severe AS`,
    clavelTier: 'unlikely-severe',
    accAhaSevere,
    escSevere,
  };
}

/**
 * Classify AS severity by calcium density index (AVC / annulus area).
 * Clavel MA et al. JACC Cardiovasc Imaging 2016;9:460-469.
 *
 * @param score     Agatston AVC score (AU)
 * @param areaCm2   CT annulus area in cm²
 * @param sex       Patient sex
 */
export function classifyByDensity(
  score: number,
  areaCm2: number,
  sex: 'male' | 'female',
): CalciumDensityResult {
  const density = score / areaCm2;
  const thresholds = DENSITY_THRESHOLDS[sex];

  if (density >= thresholds.veryLikely) {
    return {
      density,
      severity: 'very-likely-severe',
      label: `${density.toFixed(0)} AU/cm² — Very likely severe AS`,
      threshold: thresholds.veryLikely,
    };
  }
  if (density >= thresholds.likely) {
    return {
      density,
      severity: 'likely-severe',
      label: `${density.toFixed(0)} AU/cm² — Likely severe AS`,
      threshold: thresholds.likely,
    };
  }
  return {
    density,
    severity: 'unlikely-severe',
    label: `${density.toFixed(0)} AU/cm² — Unlikely severe AS`,
    threshold: thresholds.likely,
  };
}

/**
 * Comprehensive calcium assessment combining absolute score and density.
 * Produces overall conclusion and clinical action guidance.
 */
export function assessCalcium(input: {
  score: number;
  sex: 'male' | 'female';
  /** CT annulus area in mm² (will be converted to cm²) */
  annulusAreaMm2?: number;
  /** Echo context for discordant adjudication */
  echo?: {
    ava?: number;
    meanGradient?: number;
    lvef?: number;
    svi?: number;
  };
}): CalciumAssessment {
  const { score, sex, annulusAreaMm2, echo } = input;

  const absolute = classifyByAbsoluteScore(score, sex);

  let density: CalciumDensityResult | undefined;
  if (annulusAreaMm2 !== undefined && annulusAreaMm2 > 0) {
    const areaCm2 = annulusAreaMm2 / 100; // mm² to cm²
    density = classifyByDensity(score, areaCm2, sex);
  }

  // Determine overall conclusion
  const bestSeverity = density
    ? getHigherSeverity(absolute.severity, density.severity)
    : absolute.severity;

  // Check if we're in a discordant echo scenario
  const isDiscordant =
    echo &&
    echo.ava !== undefined &&
    echo.meanGradient !== undefined &&
    echo.ava < 1.0 &&
    echo.meanGradient < 40;

  let conclusion: string;
  let clinicalAction: string;
  let adjudicatesDiscordance = false;

  if (isDiscordant) {
    adjudicatesDiscordance = true;
    const lowFlow = echo.svi !== undefined && echo.svi < 35;
    const reducedEF = echo.lvef !== undefined && echo.lvef < 50;
    const preservedEF = echo.lvef !== undefined && echo.lvef >= 50;

    if (bestSeverity === 'very-likely-severe') {
      conclusion =
        'CT calcium confirms severe AS despite low gradient on echocardiography. ' +
        'The AVC score exceeds sex-specific thresholds for severe AS.';
      clinicalAction = reducedEF
        ? 'True-severe AS confirmed. Evaluate for AVR/TAVR per guidelines (Class I if symptomatic).'
        : preservedEF && lowFlow
          ? 'Paradoxical LFLG severe AS confirmed by calcium scoring. Evaluate for AVR/TAVR if symptomatic (Class IIa).'
          : 'Severe AS confirmed. Correlate with clinical symptoms and cardiac damage staging.';
    } else if (bestSeverity === 'likely-severe') {
      conclusion =
        'CT calcium falls in the indeterminate zone. Severity cannot be definitively confirmed or excluded. ' +
        'Consider additional imaging (cardiac MRI, invasive haemodynamics) for definitive grading.';
      clinicalAction =
        'Close follow-up recommended. Repeat calcium scoring in 1-2 years or proceed to ' +
        'invasive haemodynamics if clinical decision-making is urgent.';
    } else {
      conclusion =
        'CT calcium is below sex-specific thresholds for severe AS. The low gradient likely ' +
        'reflects non-severe stenosis rather than low-flow state.';
      clinicalAction = reducedEF
        ? 'Low AVA likely pseudo-severe. Primary cardiomyopathy probable — optimize GDMT.'
        : 'Measurement error is the most likely explanation. Recheck LVOT diameter and Doppler tracings.';
    }
  } else {
    // Standalone calcium interpretation (not in discordant context)
    if (bestSeverity === 'very-likely-severe') {
      conclusion =
        `AVC ${score} AU exceeds sex-specific thresholds for severe AS. ` +
        'Very high AVC burden is independently associated with adverse outcomes and rapid AS progression.';
      clinicalAction = 'If echo is concordant with severe AS, proceed with guideline-directed evaluation for intervention.';
    } else if (bestSeverity === 'likely-severe') {
      conclusion =
        `AVC ${score} AU falls in the indeterminate zone for ${sex === 'male' ? 'men' : 'women'}. ` +
        'Cannot definitively confirm or exclude severe AS by calcium alone.';
      clinicalAction = 'Integrate with echo parameters, symptoms, and cardiac damage staging. Consider serial imaging.';
    } else {
      conclusion =
        `AVC ${score} AU is below sex-specific thresholds for severe AS. ` +
        'This calcium burden makes severe AS unlikely.';
      clinicalAction = 'Surveillance echocardiography recommended. Monitor for AS progression.';
    }
  }

  return {
    absolute,
    density,
    conclusion,
    clinicalAction,
    adjudicatesDiscordance,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getHigherSeverity(a: CalciumSeverity, b: CalciumSeverity): CalciumSeverity {
  const order: CalciumSeverity[] = [
    'unlikely-severe',
    'indeterminate',
    'likely-severe',
    'very-likely-severe',
  ];
  return order.indexOf(a) >= order.indexOf(b) ? a : b;
}

/**
 * Calculate calcium score progression rate (AU/year).
 * Useful for serial imaging interpretation.
 * Pawade T et al. Heart 2015;101:1826-1834.
 */
export function calciumProgressionRate(
  score1: number,
  score2: number,
  intervalYears: number,
): { annualRate: number; label: string } {
  if (intervalYears <= 0) return { annualRate: 0, label: 'Invalid interval' };
  const rate = (score2 - score1) / intervalYears;
  const label =
    rate > 200
      ? 'Rapid progression (>200 AU/yr)'
      : rate > 100
        ? 'Moderate progression (100-200 AU/yr)'
        : rate > 0
          ? 'Slow progression (<100 AU/yr)'
          : 'No progression or regression';
  return { annualRate: rate, label };
}
