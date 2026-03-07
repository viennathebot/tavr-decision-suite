/**
 * STS-PROM (Society of Thoracic Surgeons Predicted Risk of Mortality)
 * Simplified estimation model for isolated aortic valve replacement.
 *
 * NOTE: This is a simplified logistic regression approximation of the
 * STS PROM calculator. The full STS model uses >60 variables and is
 * proprietary. This provides a clinical estimate for decision support.
 *
 * Based on published risk factor coefficients from:
 * - O'Brien SM et al. Ann Thorac Surg 2009;87:1424-1431
 * - Shahian DM et al. Ann Thorac Surg 2009;88:S23-S42
 * - STS Adult Cardiac Surgery Database v2.9
 */

export interface STSInput {
  age?: number;
  sex?: 'male' | 'female';
  heightCm?: number;
  weightKg?: number;
  creatinine?: number;       // mg/dL
  diabetes?: 'none' | 'diet' | 'oral' | 'insulin';
  nyhaClass?: 'I' | 'II' | 'III' | 'IV';
  priorCardiacSurgery?: boolean;
  lvef?: number;             // %
  urgency?: 'elective' | 'urgent' | 'emergent';
  endocarditis?: boolean;
  chronicLungDisease?: 'none' | 'mild' | 'moderate' | 'severe';
  peripheralVascularDisease?: boolean;
  cerebrovascularDisease?: boolean;
  preoperativeDialysis?: boolean;
}

export type STSRiskCategory = 'low' | 'intermediate' | 'high' | 'extreme';

export interface STSResult {
  /** Estimated 30-day mortality (%) */
  mortality: number;
  /** Risk category */
  category: STSRiskCategory;
  /** Display label */
  categoryLabel: string;
  /** Interpretation notes */
  interpretation: string;
  /** Whether sufficient data was provided */
  sufficient: boolean;
}

/**
 * Simplified STS-PROM estimation for isolated AVR.
 *
 * Uses a logistic regression model with published risk factor weights
 * to approximate 30-day operative mortality.
 */
export function calculateSTSPROM(input: STSInput): STSResult {
  const { age, sex, heightCm, weightKg, creatinine, diabetes, nyhaClass,
    priorCardiacSurgery, lvef, urgency, endocarditis, chronicLungDisease,
    peripheralVascularDisease, cerebrovascularDisease, preoperativeDialysis } = input;

  // Minimum required: age and sex
  if (age === undefined || sex === undefined) {
    return {
      mortality: 0,
      category: 'low',
      categoryLabel: 'Insufficient Data',
      interpretation: 'Age and sex are required at minimum for STS-PROM estimation.',
      sufficient: false,
    };
  }

  // Baseline intercept for isolated AVR
  let logit = -5.25;

  // Age contribution (exponential increase after 70)
  if (age >= 80) {
    logit += 0.06 * (age - 50);
  } else if (age >= 70) {
    logit += 0.04 * (age - 50);
  } else {
    logit += 0.025 * (age - 50);
  }

  // Sex (female has higher operative mortality for AVR)
  if (sex === 'female') {
    logit += 0.35;
  }

  // BMI extremes
  if (heightCm && weightKg) {
    const bmi = weightKg / Math.pow(heightCm / 100, 2);
    if (bmi < 20) logit += 0.35;
    else if (bmi > 40) logit += 0.25;
  }

  // Creatinine / Renal function
  if (preoperativeDialysis) {
    logit += 1.1;
  } else if (creatinine !== undefined) {
    if (creatinine >= 2.0) logit += 0.65;
    else if (creatinine >= 1.5) logit += 0.3;
  }

  // Diabetes
  if (diabetes === 'insulin') logit += 0.35;
  else if (diabetes === 'oral') logit += 0.15;
  else if (diabetes === 'diet') logit += 0.08;

  // NYHA class
  if (nyhaClass === 'IV') logit += 0.55;
  else if (nyhaClass === 'III') logit += 0.25;
  else if (nyhaClass === 'II') logit += 0.08;

  // Prior cardiac surgery (redo)
  if (priorCardiacSurgery) {
    logit += 0.75;
  }

  // LVEF
  if (lvef !== undefined) {
    if (lvef < 20) logit += 0.9;
    else if (lvef < 30) logit += 0.6;
    else if (lvef < 40) logit += 0.35;
    else if (lvef < 50) logit += 0.15;
  }

  // Urgency
  if (urgency === 'emergent') logit += 1.2;
  else if (urgency === 'urgent') logit += 0.45;

  // Endocarditis
  if (endocarditis) logit += 0.7;

  // Chronic lung disease
  if (chronicLungDisease === 'severe') logit += 0.45;
  else if (chronicLungDisease === 'moderate') logit += 0.2;
  else if (chronicLungDisease === 'mild') logit += 0.08;

  // Peripheral vascular disease
  if (peripheralVascularDisease) logit += 0.3;

  // Cerebrovascular disease
  if (cerebrovascularDisease) logit += 0.2;

  // Convert logit to probability
  const mortality = (1 / (1 + Math.exp(-logit))) * 100;

  // Categorize
  const category = categorizeRisk(mortality);

  return {
    mortality: Math.round(mortality * 100) / 100,
    category,
    categoryLabel: riskLabels[category],
    interpretation: getInterpretation(category),
    sufficient: true,
  };
}

function categorizeRisk(mortality: number): STSRiskCategory {
  if (mortality < 3) return 'low';
  if (mortality < 8) return 'intermediate';
  if (mortality < 15) return 'high';
  return 'extreme';
}

const riskLabels: Record<STSRiskCategory, string> = {
  low: 'Low Risk (<3%)',
  intermediate: 'Intermediate Risk (3-8%)',
  high: 'High Risk (8-15%)',
  extreme: 'Extreme Risk (>15%)',
};

function getInterpretation(category: STSRiskCategory): string {
  switch (category) {
    case 'low':
      return 'Low surgical risk. Both SAVR and TAVR are options per 2020 ACC/AHA guidelines. ' +
        'For patients >=65 years, TAVR is a Class I recommendation (PARTNER 3, Evolut Low Risk).';
    case 'intermediate':
      return 'Intermediate surgical risk. Both SAVR and TAVR are Class I recommendations. ' +
        'Heart Team discussion recommended for shared decision-making.';
    case 'high':
      return 'High surgical risk. TAVR is generally preferred over SAVR (Class I). ' +
        'PARTNER 1 and CoreValve High Risk trials demonstrated TAVR superiority or non-inferiority.';
    case 'extreme':
      return 'Extreme/prohibitive surgical risk. TAVR is recommended if expected survival >12 months ' +
        'with acceptable quality of life (Class I). Assess for futility considerations.';
  }
}
