/**
 * TAVR Decision Suite - Recommendation Engine
 *
 * Generates ordered clinical recommendations based on the AS classification
 * pattern, symptom status, CT calcium scoring, LVEF, and dobutamine stress
 * echo results. All recommendations reference the 2020/2021 ACC/AHA VHD
 * guidelines and primary literature.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type Urgency = 'high' | 'moderate' | 'watch';
export type GuidelineClass = 'I' | 'IIa' | 'IIb' | 'III';

export interface Recommendation {
  /** Short headline for the recommendation */
  title: string;
  /** Full clinical description */
  description: string;
  /** Urgency level for UI ordering and colouring */
  urgency: Urgency;
  /** Ordered list of specific action items */
  actions: string[];
  /** Name of the guideline document referenced */
  guideline: string;
  /** ACC/AHA class of recommendation */
  guidelineClass: GuidelineClass;
  /** Primary literature citation */
  citation: string;
}

export interface RecommendationInput {
  /** AS pattern from the classification engine */
  pattern: string;
  /** Whether the patient is symptomatic (dyspnoea, angina, syncope) */
  symptomatic: boolean;
  /** Left ventricular ejection fraction (%) */
  lvef?: number;
  /** Aortic valve calcium score (AU) from non-contrast CT */
  calciumScore?: number;
  /** Patient sex for sex-specific calcium thresholds */
  sex?: string;
  /** NYHA functional class */
  nyhaClass?: string;
  /** Whether dobutamine stress echo data is available */
  hasDobutamineData: boolean;
  /** AVA measured at peak dobutamine stress (cm²) */
  stressAVA?: number;
  /** Mean gradient at peak dobutamine stress (mmHg) */
  stressMeanGradient?: number;
}

// ─── Calcium Score Helpers ───────────────────────────────────────────────────

function isCalciumSevere(score: number, sex?: string): boolean {
  // Clavel MA et al. JACC 2014 sex-specific thresholds
  if (sex?.toLowerCase() === 'female' || sex?.toLowerCase() === 'f') {
    return score >= 1200;
  }
  return score >= 2000; // male / unknown
}

function calciumSeverityLabel(score: number, sex?: string): string {
  const threshold = sex?.toLowerCase() === 'female' || sex?.toLowerCase() === 'f' ? 1200 : 2000;
  if (score >= threshold) return 'above sex-specific threshold for severe AS';
  if (score >= threshold * 0.5) return 'in the indeterminate zone';
  return 'below threshold, unlikely severe AS';
}

// ─── Generator ───────────────────────────────────────────────────────────────

/**
 * Generate an ordered list of clinical recommendations based on the patient's
 * AS classification pattern and clinical context.
 */
export function generateRecommendations(input: RecommendationInput): Recommendation[] {
  const recs: Recommendation[] = [];

  switch (input.pattern) {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // HIGH-GRADIENT SEVERE AS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'high-gradient': {
      if (input.symptomatic) {
        recs.push({
          title: 'Aortic Valve Replacement Indicated',
          description:
            'Symptomatic severe high-gradient AS. AVR is recommended with Class I indication. ' +
            'Both SAVR and TAVR are options depending on surgical risk, anatomy, and patient preference.',
          urgency: 'high',
          actions: [
            'Heart Team evaluation for TAVR vs SAVR',
            'Calculate STS-PROM score for surgical risk stratification',
            'CT angiography for TAVR planning if TAVR pathway selected',
            'Coronary angiography (invasive or CT-based)',
            'Assess frailty, cognitive status, and futility considerations',
            'Optimise comorbidities pre-procedure (renal function, anaemia, dental clearance)',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'I',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });

        if (input.lvef !== undefined && input.lvef < 50) {
          recs.push({
            title: 'Reduced LVEF — Assess Myocardial Recovery Potential',
            description:
              'LVEF <50% in symptomatic severe high-gradient AS. AVR remains indicated; however, ' +
              'reduced EF may impact procedural risk and long-term outcomes. Evaluate for ' +
              'concomitant coronary artery disease or primary cardiomyopathy.',
            urgency: 'high',
            actions: [
              'Coronary angiography to exclude ischaemic cardiomyopathy',
              'Consider cardiac MRI for myocardial fibrosis assessment if time permits',
              'GDMT for heart failure optimisation pre-procedure',
              'Reassess LVEF 3-6 months post-AVR for recovery',
            ],
            guideline: 'ACC/AHA 2020 VHD Guidelines',
            guidelineClass: 'I',
            citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
          });
        }
      } else {
        // Asymptomatic high-gradient severe
        recs.push({
          title: 'Exercise Testing for Symptom Provocation',
          description:
            'Asymptomatic severe high-gradient AS. Exercise testing is reasonable to confirm ' +
            'true asymptomatic status. AVR is recommended if exercise testing reveals symptoms, ' +
            'abnormal BP response, or reduced exercise capacity.',
          urgency: 'moderate',
          actions: [
            'Supervised exercise stress test (treadmill or bicycle)',
            'Assess for exercise-induced symptoms, hypotension, or arrhythmia',
            'If abnormal: reclassify as symptomatic and recommend AVR (Class I)',
            'If normal: serial surveillance with echo every 6-12 months',
            'Measure BNP/NT-proBNP as prognostic biomarker',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIa',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });

        recs.push({
          title: 'Consider Early AVR in Selected Asymptomatic Patients',
          description:
            'Early intervention may be considered in truly asymptomatic severe AS when ' +
            'Vmax >5.0 m/s, rapid haemodynamic progression (MG increase >10 mmHg/yr), ' +
            'or very high BNP/cardiac damage. EARLY TAVR trial (2024) supports early intervention ' +
            'in selected patients.',
          urgency: 'watch',
          actions: [
            'Evaluate Vmax progression rate on serial echos',
            'Stage cardiac damage per Genereux classification',
            'Assess BNP/NT-proBNP trend',
            'If Vmax >=5.0 m/s or rapid progression: consider early AVR (Class IIa)',
            'Discuss shared decision-making regarding early intervention vs watchful waiting',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIa',
          citation: 'Kang DH et al. N Engl J Med 2020;382:111-119 (RECOVERY); Banovic M et al. Lancet 2024 (EARLY TAVR)',
        });
      }
      break;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CLASSIC LOW-FLOW LOW-GRADIENT (REDUCED EF)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'classic-lflg': {
      // Always recommend DSE or CT calcium for severity adjudication
      recs.push({
        title: 'Dobutamine Stress Echo or CT Calcium Scoring for Severity Adjudication',
        description:
          'Classic low-flow low-gradient AS with reduced EF. The low gradient may reflect ' +
          'reduced flow (true-severe AS) or intrinsic valve flexibility (pseudo-severe AS). ' +
          'Dobutamine stress echocardiography (DSE) is the traditional adjudicator; CT aortic ' +
          'valve calcium scoring is an alternative when DSE is contraindicated or inconclusive.',
        urgency: 'high',
        actions: [
          'Low-dose dobutamine stress echo (up to 20 mcg/kg/min)',
          'At peak stress: measure AVA, mean gradient, and stroke volume',
          'True-severe: AVA remains <1.0 cm² with MG >=40 mmHg at peak stress',
          'Pseudo-severe: AVA increases to >=1.0 cm² with flow augmentation',
          'If no contractile reserve (<20% increase in SV): CT calcium score recommended',
          'CT calcium thresholds — Male: >=2000 AU severe; Female: >=1200 AU severe (Clavel MA et al. Circulation 2014)',
        ],
        guideline: 'ACC/AHA 2020 VHD Guidelines',
        guidelineClass: 'I',
        citation: 'Clavel MA et al. Circulation 2014;129:2516-2525',
      });

      if (input.symptomatic) {
        // Check if DSE data available
        if (input.hasDobutamineData && input.stressAVA !== undefined) {
          if (input.stressAVA < 1.0 && input.stressMeanGradient !== undefined && input.stressMeanGradient >= 40) {
            recs.push({
              title: 'AVR Indicated — True-Severe AS Confirmed on DSE',
              description:
                'DSE confirms true-severe AS (stress AVA <1.0 cm², stress MG >=40 mmHg). ' +
                'AVR is recommended in symptomatic patients with true-severe classic LFLG AS.',
              urgency: 'high',
              actions: [
                'Heart Team evaluation for TAVR vs SAVR',
                'TAVR may be preferred given reduced LVEF and surgical risk',
                'Optimise heart failure therapy pre-procedure',
                'Assess for contractile reserve (prognostic, not a contraindication to AVR)',
                'Post-AVR LVEF recovery monitoring at 3 and 12 months',
              ],
              guideline: 'ACC/AHA 2020 VHD Guidelines',
              guidelineClass: 'IIa',
              citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
            });
          } else {
            recs.push({
              title: 'Pseudo-Severe AS — Optimise Medical Therapy',
              description:
                'DSE suggests pseudo-severe AS (AVA increases >=1.0 cm² with flow augmentation). ' +
                'The primary pathology is likely cardiomyopathy rather than aortic stenosis.',
              urgency: 'moderate',
              actions: [
                'GDMT optimisation for heart failure with reduced EF',
                'Evaluate for coronary artery disease',
                'Consider cardiac MRI for myocardial viability and fibrosis',
                'Serial echo surveillance every 6-12 months',
                'Reassess symptoms and haemodynamics after GDMT optimisation',
              ],
              guideline: 'ACC/AHA 2020 VHD Guidelines',
              guidelineClass: 'I',
              citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
            });
          }
        } else if (input.calciumScore !== undefined) {
          const severe = isCalciumSevere(input.calciumScore, input.sex);
          recs.push({
            title: severe
              ? 'AVR Indicated — CT Calcium Confirms Severe AS'
              : 'CT Calcium Below Severe Threshold — Likely Not Severe',
            description: severe
              ? `AV calcium score ${input.calciumScore} AU is ${calciumSeverityLabel(input.calciumScore, input.sex)}. ` +
                'Combined with symptoms, AVR is reasonable.'
              : `AV calcium score ${input.calciumScore} AU is ${calciumSeverityLabel(input.calciumScore, input.sex)}. ` +
                'Severity of AS is uncertain; optimise medical therapy and monitor.',
            urgency: severe ? 'high' : 'moderate',
            actions: severe
              ? [
                  'Heart Team evaluation for TAVR vs SAVR',
                  'TAVR may be preferred given reduced LVEF',
                  'Optimise heart failure therapy pre-procedure',
                ]
              : [
                  'GDMT optimisation for heart failure with reduced EF',
                  'Serial echo surveillance every 6-12 months',
                  'Repeat DSE if clinical status changes',
                ],
            guideline: 'ACC/AHA 2020 VHD Guidelines',
            guidelineClass: severe ? 'IIa' : 'IIb',
            citation: 'Clavel MA et al. Circulation 2014;129:2516-2525',
          });
        } else {
          recs.push({
            title: 'Symptomatic Classic LFLG — AVR Reasonable After Severity Confirmation',
            description:
              'Symptomatic classic LFLG AS. AVR is reasonable if true-severe AS is confirmed. ' +
              'Obtain DSE or CT calcium score before proceeding.',
            urgency: 'high',
            actions: [
              'Obtain DSE or CT aortic valve calcium score (see recommendation above)',
              'Heart Team discussion once severity is adjudicated',
              'Optimise GDMT while awaiting adjudication',
            ],
            guideline: 'ACC/AHA 2020 VHD Guidelines',
            guidelineClass: 'IIa',
            citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
          });
        }
      } else {
        // Asymptomatic classic LFLG
        recs.push({
          title: 'Asymptomatic Classic LFLG — Medical Therapy and Surveillance',
          description:
            'Asymptomatic classic LFLG AS with reduced EF. Optimise heart failure medical therapy ' +
            'and monitor for symptom development. Exercise testing may be considered to unmask symptoms.',
          urgency: 'moderate',
          actions: [
            'GDMT optimisation for HFrEF',
            'Serial echocardiography every 6-12 months',
            'BNP/NT-proBNP monitoring',
            'Low threshold for supervised exercise testing',
            'Stage cardiac damage (Genereux classification)',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIb',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });
      }
      break;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // PARADOXICAL LOW-FLOW LOW-GRADIENT (PRESERVED EF)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'paradoxical-lflg': {
      // CT calcium is the primary adjudicator for paradoxical LFLG
      recs.push({
        title: 'CT Aortic Valve Calcium Scoring — Primary Adjudicator',
        description:
          'Paradoxical LFLG AS: CT aortic valve calcium scoring is the preferred method for ' +
          'severity adjudication. DSE is less useful in preserved-EF LFLG because augmenting ' +
          'flow in a restrictive/stiff LV is unreliable.',
        urgency: 'high',
        actions: [
          'Non-contrast CT for aortic valve calcium quantification',
          'Sex-specific thresholds: Male >=2000 AU, Female >=1200 AU = likely severe',
          'Indeterminate zone: Male 1200-2000 AU, Female 800-1200 AU',
          'Below threshold: unlikely severe — consider measurement error or moderate AS',
          'Evaluate systemic arterial compliance (SAC = SVI / pulse pressure)',
          'Low SAC (<0.6 mL/m²/mmHg) exacerbates low-flow state (Hachicha Z et al. Circulation 2007)',
        ],
        guideline: 'ACC/AHA 2020 VHD Guidelines',
        guidelineClass: 'I',
        citation: 'Clavel MA et al. J Am Coll Cardiol 2016;67:2263-2274',
      });

      if (input.symptomatic) {
        if (input.calciumScore !== undefined) {
          const severe = isCalciumSevere(input.calciumScore, input.sex);
          recs.push({
            title: severe
              ? 'AVR Indicated — Severe AS Confirmed by CT Calcium'
              : 'Calcium Below Threshold — Likely Not Severe',
            description: severe
              ? `AV calcium score ${input.calciumScore} AU is ${calciumSeverityLabel(input.calciumScore, input.sex)}. ` +
                'Symptomatic paradoxical LFLG AS with calcium confirmation. AVR is reasonable.'
              : `AV calcium score ${input.calciumScore} AU is ${calciumSeverityLabel(input.calciumScore, input.sex)}. ` +
                'Symptoms may be due to comorbidities (hypertension, diastolic dysfunction). ' +
                'Re-evaluate alternative causes.',
            urgency: severe ? 'high' : 'moderate',
            actions: severe
              ? [
                  'Heart Team evaluation for TAVR vs SAVR',
                  'Address arterial hypertension aggressively (reduces afterload mismatch)',
                  'CT angiography for TAVR planning',
                  'Assess vascular access and anatomy',
                ]
              : [
                  'Treat hypertension and diastolic dysfunction',
                  'Consider alternative diagnoses for symptoms (HFpEF, CAD, pulmonary disease)',
                  'Serial echo surveillance every 6-12 months',
                  'Reassess if symptoms worsen or haemodynamics progress',
                ],
            guideline: 'ACC/AHA 2020 VHD Guidelines',
            guidelineClass: severe ? 'IIa' : 'IIb',
            citation: 'Clavel MA et al. J Am Coll Cardiol 2016;67:2263-2274',
          });
        } else {
          recs.push({
            title: 'Symptomatic Paradoxical LFLG — Obtain CT Calcium Before AVR Decision',
            description:
              'Symptomatic paradoxical LFLG AS requires CT calcium scoring for severity ' +
              'adjudication before intervention can be recommended.',
            urgency: 'high',
            actions: [
              'Obtain non-contrast CT for AV calcium quantification',
              'Evaluate systemic arterial compliance',
              'Optimise blood pressure control (repeat echo after BP normalisation)',
              'Heart Team discussion once calcium score available',
            ],
            guideline: 'ACC/AHA 2020 VHD Guidelines',
            guidelineClass: 'IIa',
            citation: 'Clavel MA et al. J Am Coll Cardiol 2016;67:2263-2274',
          });
        }
      } else {
        // Asymptomatic paradoxical LFLG
        recs.push({
          title: 'Asymptomatic Paradoxical LFLG — Surveillance and BP Optimisation',
          description:
            'Asymptomatic paradoxical LFLG AS. Aggressive blood pressure management is critical ' +
            'as hypertension worsens afterload mismatch. Close surveillance recommended.',
          urgency: 'moderate',
          actions: [
            'Optimise blood pressure control (target SBP <130 mmHg)',
            'CT calcium scoring if not already obtained (for prognostic information)',
            'Serial echocardiography every 6-12 months',
            'Exercise testing to confirm asymptomatic status',
            'BNP/NT-proBNP monitoring',
            'Evaluate for and treat concurrent diastolic dysfunction',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIb',
          citation: 'Hachicha Z et al. Circulation 2007;115:2856-2864',
        });
      }
      break;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // NORMAL-FLOW LOW-GRADIENT
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'normal-flow-lg': {
      // Measurement error checklist first
      recs.push({
        title: 'Systematic Measurement Error Review',
        description:
          'Normal-flow low-gradient pattern is most commonly caused by measurement error, ' +
          'particularly LVOT diameter undermeasurement. A structured checklist should be ' +
          'completed before further workup.',
        urgency: 'high',
        actions: [
          'Re-measure LVOT diameter in multiple views (zoom on parasternal long axis)',
          'Check for LVOT diameter <1.8 cm or >2.5 cm (flag for re-measurement)',
          'Verify Doppler envelopes: dense signals only, avoid overdrawing modal velocity',
          'Compare LVOT TVI to expected range (15-25 cm)',
          'Re-examine DVI: if >=0.25, true-severe AS is unlikely',
          'Confirm BP at time of echo: SBP >140 mmHg falsely lowers gradient',
          'Consider body habitus: BMI-related LVOT measurement difficulty',
          'If available, use 3D echo or CT for LVOT area (cross-sectional) instead of 2D diameter',
        ],
        guideline: 'ASE Recommendations for Echo Assessment of AS',
        guidelineClass: 'I',
        citation: 'Baumgartner H et al. JASE 2017;30:372-392',
      });

      recs.push({
        title: 'CT Aortic Valve Calcium Scoring if Measurement Error Excluded',
        description:
          'If systematic measurement review does not resolve the discordance, CT calcium scoring ' +
          'is recommended as an independent severity adjudicator.',
        urgency: 'moderate',
        actions: [
          'Non-contrast CT for AV calcium quantification',
          'Sex-specific thresholds: Male >=2000 AU, Female >=1200 AU = likely severe',
          'If calcium is below threshold: most likely moderate AS (not severe)',
          'If calcium confirms severity: consider evolving paradoxical LFLG phenotype',
        ],
        guideline: 'ACC/AHA 2020 VHD Guidelines',
        guidelineClass: 'IIa',
        citation: 'Clavel MA et al. Circulation 2014;129:2516-2525',
      });

      if (input.symptomatic) {
        recs.push({
          title: 'Evaluate Alternative Symptom Aetiologies',
          description:
            'In the normal-flow low-gradient pattern, symptoms may not be due to severe AS. ' +
            'A thorough evaluation for competing diagnoses is important before attributing ' +
            'symptoms to aortic stenosis.',
          urgency: 'moderate',
          actions: [
            'Evaluate for coronary artery disease',
            'Assess diastolic dysfunction and HFpEF',
            'Consider pulmonary disease evaluation',
            'Review medication effects on symptoms',
            'Reassess after measurement error correction and BP optimisation',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIa',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });
      }
      break;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // MODERATE AS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'moderate': {
      recs.push({
        title: 'Cardiac Damage Staging (Genereux Classification)',
        description:
          'Moderate AS may cause significant cardiac damage even before haemodynamic severity ' +
          'criteria are met. The Genereux staging system (Stages 0-4) classifies extra-valvular ' +
          'cardiac damage and has prognostic implications.',
        urgency: 'moderate',
        actions: [
          'Stage 0: No cardiac damage',
          'Stage 1: LV damage (LVH, diastolic dysfunction)',
          'Stage 2: LA/mitral damage (MR, LA enlargement, AF)',
          'Stage 3: Pulmonary vasculature / tricuspid damage (PHT, TR)',
          'Stage 4: RV dysfunction',
          'Higher stages may warrant closer surveillance or earlier intervention consideration',
          'Document staging for longitudinal tracking',
        ],
        guideline: 'Genereux Classification of Cardiac Damage in AS',
        guidelineClass: 'IIa',
        citation: 'Genereux P et al. JAMA Cardiol 2017;2:56-65',
      });

      if (input.symptomatic) {
        recs.push({
          title: 'Evaluate Symptoms — Consider Competing Diagnoses',
          description:
            'Symptoms in moderate AS may be due to the valve disease itself (particularly with ' +
            'advanced cardiac damage staging) or competing aetiologies. Currently, AVR for moderate ' +
            'AS is not guideline-recommended outside of trials.',
          urgency: 'moderate',
          actions: [
            'Comprehensive evaluation for CAD, HF, pulmonary disease',
            'If concomitant cardiac surgery needed: may consider concomitant AVR for moderate AS (Class IIa)',
            'Review emerging trial data: TAVR-UNLOAD (HF + moderate AS) and PROGRESS (moderate AS + TAVR)',
            'Consider enrolment in clinical trials if eligible',
            'GDMT optimisation for HF symptoms',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIb',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });
      }

      recs.push({
        title: 'Surveillance and Progression Monitoring',
        description:
          'Moderate AS typically progresses to severe over 2-5 years. Regular surveillance ' +
          'with echocardiography and biomarkers is essential.',
        urgency: 'watch',
        actions: [
          'Serial echocardiography every 12 months (or sooner if symptoms develop)',
          'Track AVA, mean gradient, and Vmax progression rates',
          'BNP/NT-proBNP every 6-12 months',
          'Document progression rate: rapid progression = MG increase >10 mmHg/yr',
          'Patient education: report new dyspnoea, chest pain, or syncope immediately',
          'Review TAVR-UNLOAD and PROGRESS trial results when published',
        ],
        guideline: 'ACC/AHA 2020 VHD Guidelines',
        guidelineClass: 'I',
        citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
      });
      break;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // DISCORDANT / MEASUREMENT ERROR
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    case 'discordant': {
      recs.push({
        title: 'Systematic Measurement Review Required',
        description:
          'Discordant haemodynamic parameters. Before making clinical decisions, a structured ' +
          'review of all echocardiographic measurements is mandatory to identify and correct ' +
          'potential errors.',
        urgency: 'high',
        actions: [
          'Re-measure LVOT diameter: most common single source of AVA error (squared in calculation)',
          'Verify Doppler spectral envelopes: dense modal velocity, not overdrawing',
          'Confirm CW Doppler aligned with jet: use multi-window approach',
          'Check for pressure recovery (small aorta <3.0 cm — use energy loss index)',
          'Reassess in the context of blood pressure at time of study',
          'Consider 3D echo or CT LVOT area if 2D measurement is unreliable',
          'Review for technical factors: poor acoustic windows, arrhythmia, AR contamination',
        ],
        guideline: 'ASE Recommendations for Echo Assessment of AS',
        guidelineClass: 'I',
        citation: 'Baumgartner H et al. JASE 2017;30:372-392',
      });

      recs.push({
        title: 'Multimodality Imaging for Definitive Assessment',
        description:
          'When echocardiographic parameters remain discordant after systematic review, ' +
          'multimodality imaging is recommended to resolve the ambiguity.',
        urgency: 'moderate',
        actions: [
          'CT aortic valve calcium scoring (independent of haemodynamics)',
          'CT-derived LVOT area for continuity equation recalculation',
          'Consider cardiac MRI for planimetric AVA in selected cases',
          'Invasive haemodynamics (Gorlin formula) if non-invasive remains inconclusive',
          'Integrate all data in Heart Team discussion',
        ],
        guideline: 'ACC/AHA 2020 VHD Guidelines',
        guidelineClass: 'IIa',
        citation: 'Clavel MA et al. J Am Coll Cardiol 2016;67:2263-2274',
      });

      if (input.symptomatic) {
        recs.push({
          title: 'Symptomatic with Discordant Data — Do Not Delay If Truly Severe',
          description:
            'If symptoms are clearly attributable to AS and multimodality imaging supports ' +
            'severe stenosis, intervention should not be delayed by persistent discordance ' +
            'on a single modality.',
          urgency: 'moderate',
          actions: [
            'Prioritise expedited multimodality evaluation',
            'Heart Team discussion with all imaging data',
            'If CT calcium confirms severity and symptoms align: proceed with AVR planning',
            'If severity remains uncertain: close clinical follow-up with repeat imaging in 3-6 months',
          ],
          guideline: 'ACC/AHA 2020 VHD Guidelines',
          guidelineClass: 'IIa',
          citation: 'Otto CM et al. J Am Coll Cardiol 2021;77:e25-e197',
        });
      }
      break;
    }

    default:
      break;
  }

  return recs;
}
