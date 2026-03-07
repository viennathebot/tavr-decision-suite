/**
 * TAVR Decision Suite - Aortic Stenosis Classification Engine
 *
 * Classifies AS into one of six haemodynamic patterns based on
 * echocardiographic parameters and flow status, following the
 * 2021 ACC/AHA Valvular Heart Disease Guidelines and the
 * Clavel MA et al. grading framework (Circulation 2014).
 *
 * Includes Clavel 2015 Discordant AS classification (PMID: 25772832)
 * with CT calcium score-based severity adjudication.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type ASPattern =
  | 'high-gradient'
  | 'classic-lflg'
  | 'paradoxical-lflg'
  | 'normal-flow-lg'
  | 'moderate'
  | 'discordant';

export interface ClassificationInput {
  /** Aortic Valve Area in cm² */
  ava?: number;
  /** Mean transvalvular gradient in mmHg */
  meanGradient?: number;
  /** Peak aortic velocity in m/s */
  vmax?: number;
  /** Left Ventricular Ejection Fraction (%) */
  lvef?: number;
  /** Stroke Volume Index in mL/m² */
  svi?: number;
  /** Dimensionless Velocity Index */
  dvi?: number;
}

export interface ClassificationResult {
  /** Machine-readable pattern identifier */
  pattern: ASPattern;
  /** Confidence score 0-1 reflecting how well the data fits the pattern */
  confidence: number;
  /** Human-readable discordance messages for clinical review */
  discordances: string[];
  /** Full clinical description of the pattern */
  description: string;
  /** Short display-friendly name */
  patternName: string;
  /** Clavel classification label when applicable */
  clavelClassification?: ClavelResult;
}

// ─── Clavel 2015 Classification ──────────────────────────────────────────────

export type ClavelCategory =
  | 'concordant-severe'
  | 'concordant-non-severe'
  | 'discordant-lflg-reduced-ef'
  | 'discordant-lflg-preserved-ef'
  | 'discordant-normal-flow-lg';

export interface ClavelResult {
  /** Clavel classification category */
  category: ClavelCategory;
  /** Display name */
  label: string;
  /** Recommended next step per Clavel 2015 */
  nextStep: string;
  /** CT calcium interpretation when provided */
  calciumInterpretation?: ClavelCalciumResult;
  /** DSE interpretation when provided */
  dseInterpretation?: string;
}

export interface ClavelCalciumResult {
  /** Severity conclusion from calcium score */
  severity: 'severe' | 'likely-severe' | 'indeterminate' | 'unlikely-severe';
  /** Display label */
  label: string;
  /** Sex-specific threshold used */
  threshold: string;
}

/**
 * Clavel 2015 Discordant AS Classification
 * (Clavel MA et al. Heart 2015;101:1881-1888, PMID: 25772832)
 *
 * Classifies discordant low-gradient AS and provides next-step
 * guidance including CT calcium score adjudication.
 */
export function clavelClassify(input: {
  ava?: number;
  meanGradient?: number;
  lvef?: number;
  svi?: number;
  sex?: 'male' | 'female';
  calciumScore?: number;
  stressAVA?: number;
  stressMeanGradient?: number;
}): ClavelResult | null {
  const { ava, meanGradient, lvef, svi, sex, calciumScore, stressAVA, stressMeanGradient } = input;

  if (ava === undefined || meanGradient === undefined) return null;

  // ── Concordant Severe: high gradient + low AVA ────────────────────────────
  if (ava < 1.0 && meanGradient >= 40) {
    return {
      category: 'concordant-severe',
      label: 'Concordant Severe AS',
      nextStep: 'No further adjudication needed. Evaluate for AVR based on symptoms and risk.',
    };
  }

  // ── Concordant Non-Severe: AVA >=1.0 and MG <40 ──────────────────────────
  if (ava >= 1.0 && meanGradient < 40) {
    return {
      category: 'concordant-non-severe',
      label: 'Concordant Non-Severe AS',
      nextStep: 'Surveillance echocardiography. Rate of progression monitoring.',
    };
  }

  // ── Discordant Low-Flow Low-Gradient with Reduced EF ──────────────────────
  if (ava < 1.0 && meanGradient < 40 && lvef !== undefined && lvef < 50) {
    const result: ClavelResult = {
      category: 'discordant-lflg-reduced-ef',
      label: 'Discordant Low-Flow Low-Gradient (Reduced EF)',
      nextStep: 'Dobutamine stress echocardiography (DSE) recommended to distinguish true-severe from pseudo-severe AS.',
    };

    // DSE interpretation
    if (stressAVA !== undefined && stressMeanGradient !== undefined) {
      if (stressAVA < 1.0 && stressMeanGradient >= 40) {
        result.dseInterpretation = 'TRUE-SEVERE AS: AVA remains <1.0 cm² with MG >=40 mmHg at peak stress. AVR indicated if symptomatic.';
      } else if (stressAVA >= 1.0) {
        result.dseInterpretation = 'PSEUDO-SEVERE AS: AVA increases to >=1.0 cm² with flow augmentation. Primary cardiomyopathy likely — optimize GDMT.';
      } else {
        result.dseInterpretation = 'INDETERMINATE: AVA <1.0 cm² but MG <40 mmHg at peak stress (no contractile reserve). CT calcium scoring recommended.';
        result.nextStep = 'No contractile reserve on DSE. CT aortic valve calcium scoring recommended as alternative adjudicator.';
      }
    }

    // CT calcium as alternative/supplementary adjudicator
    if (calciumScore !== undefined && sex) {
      result.calciumInterpretation = interpretCalciumClavel(calciumScore, sex);
    }

    return result;
  }

  // ── Discordant Low-Flow Low-Gradient with Preserved EF ────────────────────
  if (ava < 1.0 && meanGradient < 40 && lvef !== undefined && lvef >= 50 && svi !== undefined && svi < 35) {
    const result: ClavelResult = {
      category: 'discordant-lflg-preserved-ef',
      label: 'Discordant Low-Flow Low-Gradient (Preserved EF)',
      nextStep: 'CT aortic valve calcium scoring is the preferred adjudicator. DSE is less reliable with preserved EF.',
    };

    if (calciumScore !== undefined && sex) {
      result.calciumInterpretation = interpretCalciumClavel(calciumScore, sex);
    }

    return result;
  }

  // ── Discordant Normal-Flow Low-Gradient ───────────────────────────────────
  if (ava < 1.0 && meanGradient < 40 && (svi === undefined || svi >= 35)) {
    const result: ClavelResult = {
      category: 'discordant-normal-flow-lg',
      label: 'Discordant Normal-Flow Low-Gradient',
      nextStep: 'Exclude measurement error first (LVOT diameter). If confirmed, CT calcium scoring as tiebreaker.',
    };

    if (calciumScore !== undefined && sex) {
      result.calciumInterpretation = interpretCalciumClavel(calciumScore, sex);
    }

    return result;
  }

  return null;
}

/**
 * Interpret aortic valve calcium score using Clavel sex-specific thresholds.
 * Clavel MA et al. JACC 2014;63:1724-1735 & Heart 2015;101:1881-1888.
 *
 * Men:   >=2000 AU = severe, 1200-1999 = likely severe, <1200 = unlikely severe
 * Women: >=1200 AU = severe, 800-1199 = likely severe,  <800  = unlikely severe
 */
function interpretCalciumClavel(score: number, sex: 'male' | 'female'): ClavelCalciumResult {
  if (sex === 'male') {
    if (score >= 2000) {
      return {
        severity: 'severe',
        label: `AVC ${score} AU: Severe AS (>=2000 AU threshold for men)`,
        threshold: 'Men: >=2000 AU = severe',
      };
    }
    if (score >= 1200) {
      return {
        severity: 'likely-severe',
        label: `AVC ${score} AU: Likely severe AS (1200-2000 AU, indeterminate zone for men)`,
        threshold: 'Men: 1200-2000 AU = likely severe',
      };
    }
    return {
      severity: 'unlikely-severe',
      label: `AVC ${score} AU: Unlikely severe AS (<1200 AU for men)`,
      threshold: 'Men: <1200 AU = unlikely severe',
    };
  }

  // Female
  if (score >= 1200) {
    return {
      severity: 'severe',
      label: `AVC ${score} AU: Severe AS (>=1200 AU threshold for women)`,
      threshold: 'Women: >=1200 AU = severe',
    };
  }
  if (score >= 800) {
    return {
      severity: 'likely-severe',
      label: `AVC ${score} AU: Likely severe AS (800-1200 AU, indeterminate zone for women)`,
      threshold: 'Women: 800-1200 AU = likely severe',
    };
  }
  return {
    severity: 'unlikely-severe',
    label: `AVC ${score} AU: Unlikely severe AS (<800 AU for women)`,
    threshold: 'Women: <800 AU = unlikely severe',
  };
}

// ─── Main Classifier ────────────────────────────────────────────────────────

/**
 * Classify an echocardiographic dataset into one of six AS haemodynamic
 * patterns. Returns `null` when there is insufficient data for any
 * classification (requires at minimum AVA and mean gradient).
 *
 * Now includes Clavel 2015 classification for discordant patterns.
 */
export function classifyAS(
  input: ClassificationInput,
  clavelInput?: {
    sex?: 'male' | 'female';
    calciumScore?: number;
    stressAVA?: number;
    stressMeanGradient?: number;
  },
): ClassificationResult | null {
  const { ava, meanGradient, vmax, lvef, svi, dvi: dviVal } = input;

  // Minimum data gate: AVA + mean gradient required
  if (ava === undefined || meanGradient === undefined) return null;

  // ── Collect global discordances ──────────────────────────────────────────

  const discordances: string[] = [];

  // DVI vs AVA internal consistency
  if (dviVal !== undefined) {
    if (ava < 1.0 && dviVal >= 0.25) {
      discordances.push(
        'DVI >=0.25 is inconsistent with AVA <1.0 cm\u00B2 — recheck LVOT diameter measurement',
      );
    }
    if (ava >= 1.0 && dviVal < 0.25) {
      discordances.push(
        'DVI <0.25 suggests severe AS but AVA >=1.0 cm\u00B2 — verify Doppler envelope tracing',
      );
    }
  }

  // Vmax vs mean gradient consistency
  if (vmax !== undefined && meanGradient !== undefined) {
    const expectedMG = vmax * vmax * 4 * 0.5;
    if (Math.abs(expectedMG - meanGradient) > 20) {
      discordances.push(
        'Mean gradient and Vmax appear inconsistent — confirm Doppler envelope tracings',
      );
    }
  }

  // Compute Clavel classification for all applicable patterns
  const clavel = clavelClassify({
    ava,
    meanGradient,
    lvef,
    svi,
    sex: clavelInput?.sex,
    calciumScore: clavelInput?.calciumScore,
    stressAVA: clavelInput?.stressAVA,
    stressMeanGradient: clavelInput?.stressMeanGradient,
  });

  // ── Pattern 1: High-Gradient Severe AS ───────────────────────────────────
  if (ava < 1.0 && meanGradient >= 40 && (vmax === undefined || vmax >= 4.0)) {
    return {
      pattern: 'high-gradient',
      confidence: 0.95,
      discordances,
      description:
        'AVA <1.0 cm\u00B2, mean gradient >=40 mmHg. Concordant severe AS with high gradient. ' +
        'This is the most straightforward severe AS phenotype with excellent concordance ' +
        'between gradient and valve area criteria.',
      patternName: 'High-Gradient Severe AS',
      clavelClassification: clavel ?? undefined,
    };
  }

  // ── Pattern 2: Classic Low-Flow Low-Gradient (reduced EF) ────────────────
  if (
    ava < 1.0 &&
    meanGradient < 40 &&
    lvef !== undefined &&
    lvef < 50 &&
    svi !== undefined &&
    svi < 35
  ) {
    return {
      pattern: 'classic-lflg',
      confidence: 0.85,
      discordances: [
        ...discordances,
        'Low gradient may reflect reduced transvalvular flow rather than non-severe stenosis',
      ],
      description:
        'AVA <1.0 cm\u00B2, MG <40 mmHg, LVEF <50%, SVI <35 mL/m\u00B2. Classic low-flow ' +
        'low-gradient AS with reduced ejection fraction. Dobutamine stress echocardiography ' +
        '(DSE) or CT aortic valve calcium scoring recommended to distinguish true-severe ' +
        'from pseudo-severe AS.',
      patternName: 'Classic Low-Flow Low-Gradient AS',
      clavelClassification: clavel ?? undefined,
    };
  }

  // ── Pattern 3: Paradoxical Low-Flow Low-Gradient (preserved EF) ──────────
  if (
    ava < 1.0 &&
    meanGradient < 40 &&
    lvef !== undefined &&
    lvef >= 50 &&
    svi !== undefined &&
    svi < 35
  ) {
    return {
      pattern: 'paradoxical-lflg',
      confidence: 0.80,
      discordances: [
        ...discordances,
        'Low flow despite preserved EF — consider restrictive physiology, small LV cavity, or measurement error',
      ],
      description:
        'AVA <1.0 cm\u00B2, MG <40 mmHg, LVEF >=50%, SVI <35 mL/m\u00B2. Paradoxical low-flow ' +
        'low-gradient AS. CT aortic valve calcium scoring is the preferred adjudicator. ' +
        'Evaluate systemic arterial compliance and rule out measurement error.',
      patternName: 'Paradoxical Low-Flow Low-Gradient AS',
      clavelClassification: clavel ?? undefined,
    };
  }

  // ── Pattern 4: Normal-Flow Low-Gradient ──────────────────────────────────
  if (
    ava < 1.0 &&
    meanGradient < 40 &&
    lvef !== undefined &&
    lvef >= 50 &&
    (svi === undefined || svi >= 35)
  ) {
    return {
      pattern: 'normal-flow-lg',
      confidence: 0.70,
      discordances: [
        ...discordances,
        'Normal flow with low gradient and small AVA — measurement error is the most likely cause',
        'Consider: LVOT measurement error, body size indexing, aortic compliance',
      ],
      description:
        'AVA <1.0 cm\u00B2, MG <40 mmHg, LVEF >=50%, SVI >=35 mL/m\u00B2. Most commonly due to ' +
        'measurement error (particularly LVOT diameter). CT aortic valve calcium scoring ' +
        'recommended for adjudication.',
      patternName: 'Normal-Flow Low-Gradient AS',
      clavelClassification: clavel ?? undefined,
    };
  }

  // ── Pattern 5: Moderate AS ───────────────────────────────────────────────
  if (ava >= 1.0 && ava <= 1.5 && meanGradient >= 20 && meanGradient < 40) {
    return {
      pattern: 'moderate',
      confidence: 0.90,
      discordances,
      description:
        'AVA 1.0-1.5 cm\u00B2, MG 20-40 mmHg. Moderate AS. Consider cardiac damage staging ' +
        '(Genereux classification) and emerging trial data (TAVR-UNLOAD, PROGRESS).',
      patternName: 'Moderate AS',
    };
  }

  // ── Pattern 6: Discordant / Measurement Error ───────────────────────────
  const specificDiscordances: string[] = [];

  if (ava >= 1.0 && meanGradient >= 40) {
    specificDiscordances.push(
      'Gradient suggests severe but AVA does not — consider high-flow state, ' +
        'aortic regurgitation, or large body habitus',
    );
  }
  if (ava < 1.0 && meanGradient < 20) {
    specificDiscordances.push(
      'Very low gradient with small AVA — likely mild/moderate AS with measurement ' +
        'error, or truly very low flow',
    );
  }
  if (ava >= 1.5 && meanGradient >= 40) {
    specificDiscordances.push(
      'AVA in mild range but gradient in severe range — likely high-flow state ' +
        '(anemia, AR, AV fistula)',
    );
  }
  if (ava < 1.0 && meanGradient >= 20 && meanGradient < 40 && lvef === undefined) {
    specificDiscordances.push(
      'Low-gradient with small AVA but LVEF not provided — cannot determine flow status. ' +
        'Provide LVEF and SVI for accurate classification.',
    );
  }

  return {
    pattern: 'discordant',
    confidence: 0.50,
    discordances: [...discordances, ...specificDiscordances],
    description:
      'Parameters are discordant. Systematic review of measurements recommended. ' +
      'Consider multimodality imaging (CT calcium score, cardiac MRI, or invasive ' +
      'haemodynamics) for definitive grading.',
    patternName: 'Discordant / Measurement Error Likely',
    clavelClassification: clavel ?? undefined,
  };
}
