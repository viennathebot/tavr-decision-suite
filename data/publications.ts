// ─────────────────────────────────────────────────────────────
// Publication Database for TAVR Decision Suite
// Comprehensive evidence base for aortic stenosis evaluation
// ─────────────────────────────────────────────────────────────

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  keyFindings: string[];
  clinicalTakeaway: string;
  tags: string[];
  evidenceLevel: 'A' | 'B' | 'C';
  sampleSize?: number;
  primaryOutcome?: string;
}

export const PUBLICATIONS: Publication[] = [
  // ── 1. Paradoxical Low-Flow Low-Gradient AS ──────────────────
  {
    id: 'hachicha-2007',
    title: 'Paradoxical Low-Flow, Low-Gradient Severe Aortic Stenosis Despite Preserved Ejection Fraction Is Associated With Higher Afterload and Reduced Survival',
    authors: 'Hachicha Z, Dumesnil JG, Bogaty P, Pibarot P',
    journal: 'Circulation',
    year: 2007,
    pmid: '17548732',
    doi: '10.1161/CIRCULATIONAHA.106.668681',
    keyFindings: [
      'Paradoxical LFLG AS (SVi <35 mL/m², MG <40 mmHg, LVEF >=50%) identified in ~15% of severe AS patients',
      'Higher global LV afterload (valvulo-arterial impedance) despite preserved LVEF',
      'Reduced survival compared to normal-flow severe AS (adjusted HR 1.56)',
      'More prevalent in elderly women with small LV cavities and concentric remodeling',
      'SVi <35 mL/m² with preserved LVEF defines the paradoxical low-flow state',
    ],
    clinicalTakeaway: 'Paradoxical LFLG AS is a distinct entity with worse prognosis than normal-flow severe AS; low flow is driven by restrictive physiology, not systolic failure.',
    tags: ['paradoxical-lflg', 'low-flow', 'prognosis', 'afterload', 'svi'],
    evidenceLevel: 'B',
    sampleSize: 512,
    primaryOutcome: 'All-cause mortality',
  },

  // ── 2. Flow-Gradient Patterns ────────────────────────────────
  {
    id: 'pibarot-2012',
    title: 'Improving Assessment of Aortic Stenosis',
    authors: 'Pibarot P, Dumesnil JG',
    journal: 'Journal of the American College of Cardiology',
    year: 2012,
    keyFindings: [
      'Four hemodynamic patterns based on flow (SVi) and gradient: NF-HG, NF-LG, LF-HG, LF-LG',
      'Normal flow high gradient (NF-HG) is the classic presentation of severe AS',
      'Low flow low gradient (LF-LG) requires further workup to confirm true severity',
      'Flow rate is a key determinant of transvalvular gradient independent of valve area',
      'Integrated approach using DVI, flow rate, and calcium scoring recommended for discordant cases',
    ],
    clinicalTakeaway: 'AS grading should incorporate flow status (SVi) and gradient together; reliance on a single parameter leads to misclassification.',
    tags: ['flow-gradient', 'classification', 'hemodynamics', 'discordant-grading'],
    evidenceLevel: 'C',
  },

  // ── 3. CT Calcium Thresholds ─────────────────────────────────
  {
    id: 'clavel-2014-calcium',
    title: 'Validation of Aortic Valve Calcium Scoring by Computed Tomography as a Marker of Severe Aortic Stenosis',
    authors: 'Clavel MA, Messika-Zeitoun D, Pibarot P, et al.',
    journal: 'JACC: Cardiovascular Imaging',
    year: 2014,
    pmid: '24922712',
    doi: '10.1016/j.jcmg.2014.01.018',
    keyFindings: [
      'Sex-specific CT calcium thresholds validated for confirming severe AS',
      'Men: AVC score >=2000 AU confirms severe AS; <1600 AU unlikely severe',
      'Women: AVC score >=1200 AU confirms severe AS; <800 AU unlikely severe',
      'CT calcium scoring is independent of flow conditions and hemodynamics',
      'Particularly useful in patients with discordant echocardiographic grading',
    ],
    clinicalTakeaway: 'CT aortic valve calcium scoring provides flow-independent confirmation of AS severity using sex-specific thresholds.',
    tags: ['ct-calcium', 'sex-specific', 'severity-confirmation', 'discordant-grading'],
    evidenceLevel: 'B',
    sampleSize: 287,
    primaryOutcome: 'Diagnostic accuracy for severe AS confirmation',
  },

  // ── 4. Dense Calcium Score ───────────────────────────────────
  {
    id: 'clavel-2013-dense',
    title: 'The Complex Nature of Discordant Severe Calcified Aortic Valve Disease Grading: New Insights From Combined Doppler Echocardiographic and Computed Tomographic Study',
    authors: 'Clavel MA, Pibarot P, Messika-Zeitoun D, et al.',
    journal: 'JACC: Cardiovascular Imaging',
    year: 2013,
    keyFindings: [
      'Dense calcium (>1300 HU on contrast CT) may underestimate total calcium burden',
      'Calcium density affects the relationship between valve calcification and hemodynamic severity',
      'Combined use of CT calcium and echocardiography improves AS severity classification',
      'Dense calcium scoring complements standard Agatston scoring in equivocal cases',
    ],
    clinicalTakeaway: 'Dense calcium scoring on CT complements standard calcium quantification and helps resolve discordant AS grading.',
    tags: ['ct-calcium', 'dense-calcium', 'discordant-grading', 'multimodality'],
    evidenceLevel: 'B',
  },

  // ── 5. Sex Differences in Calcium ───────────────────────────
  {
    id: 'aggarwal-2013',
    title: 'Sex Differences in Aortic Valve Calcification Measured by Multidetector Computed Tomography in Aortic Stenosis',
    authors: 'Aggarwal SR, Clavel MA, Messika-Zeitoun D, et al.',
    journal: 'Journal of the American Heart Association',
    year: 2013,
    keyFindings: [
      'Women develop hemodynamically severe AS with less aortic valve calcification than men',
      'Sex-specific calcium thresholds are essential for accurate severity assessment',
      'Women have more fibrosis-driven AS whereas men have more calcification-driven disease',
      'Failure to use sex-specific thresholds leads to underdiagnosis of severe AS in women',
    ],
    clinicalTakeaway: 'Women develop severe AS with lower calcium burdens than men, necessitating sex-specific CT calcium thresholds.',
    tags: ['ct-calcium', 'sex-differences', 'severity-assessment'],
    evidenceLevel: 'B',
  },

  // ── 6. CT + PET Calcium ──────────────────────────────────────
  {
    id: 'pawade-2017',
    title: 'Computed Tomography Aortic Valve Calcium Scoring in Patients With Aortic Stenosis',
    authors: 'Pawade T, Clavel MA, Tribouilloy C, et al.',
    journal: 'Circulation: Cardiovascular Imaging',
    year: 2017,
    keyFindings: [
      'CT calcium scoring validated across multiple cohorts for AS severity assessment',
      'PET 18F-NaF uptake identifies active calcification and predicts disease progression',
      'Combined CT + PET approach identifies patients at highest risk of rapid progression',
      'CT calcium thresholds have high specificity for confirming severe AS',
    ],
    clinicalTakeaway: 'CT calcium scoring is a robust and reproducible method for confirming AS severity; PET adds prognostic value for disease progression.',
    tags: ['ct-calcium', 'pet-imaging', 'disease-progression', 'multimodality'],
    evidenceLevel: 'B',
  },

  // ── 7. Discordant Grading ───────────────────────────────────
  {
    id: 'lancellotti-2015',
    title: 'Outcomes in Patients With Aortic Stenosis Grading Discordance: Insights From the EORP-AS Registry',
    authors: 'Lancellotti P, Magne J, Donal E, et al.',
    journal: 'JACC: Cardiovascular Imaging',
    year: 2015,
    pmid: '25772832',
    doi: '10.1016/j.jcmg.2015.01.009',
    keyFindings: [
      'Discordant grading (AVA <1.0 cm² but MG <40 mmHg) present in ~30% of severe AS cases',
      'Low-flow (SVi <35 mL/m²) is the primary driver of gradient underestimation',
      'Patients with true discordant severe AS have outcomes similar to concordant severe AS',
      'Multiparametric approach needed: flow status, DVI, calcium scoring',
    ],
    clinicalTakeaway: 'Discordant echocardiographic grading is common; flow assessment and ancillary markers are essential for proper classification.',
    tags: ['discordant-grading', 'registry', 'outcomes', 'flow-assessment'],
    evidenceLevel: 'B',
    sampleSize: 1710,
    primaryOutcome: 'All-cause mortality and cardiac events',
  },

  // ── 8. Discordant Outcomes ──────────────────────────────────
  {
    id: 'tribouilloy-2018',
    title: 'Low-Gradient, Low-Flow Severe Aortic Stenosis With Preserved Left Ventricular Ejection Fraction',
    authors: 'Tribouilloy C, Rusinaru D, Marechaux S, et al.',
    journal: 'European Heart Journal',
    year: 2018,
    keyFindings: [
      'Paradoxical LFLG AS patients have higher mortality than moderate AS if truly severe',
      'Outcomes depend on whether low gradient reflects true severity vs. measurement error',
      'AVR improves outcomes in confirmed severe paradoxical LFLG AS',
      'Careful evaluation to distinguish true severe from pseudo-severe is critical',
    ],
    clinicalTakeaway: 'Confirmed paradoxical LFLG severe AS carries poor prognosis; AVR should not be denied based on low gradient alone.',
    tags: ['discordant-grading', 'paradoxical-lflg', 'outcomes', 'avr-benefit'],
    evidenceLevel: 'B',
  },

  // ── 9. Multimodality Discordant ─────────────────────────────
  {
    id: 'clavel-2021-case',
    title: 'Multimodality Imaging Approach to Discordant Aortic Stenosis Grading',
    authors: 'Clavel MA, Pibarot P',
    journal: 'JACC: Case Reports',
    year: 2021,
    keyFindings: [
      'Stepwise approach to discordant grading using echocardiography, CT, and DSE',
      'CT calcium scoring as the first ancillary test in discordant low-gradient AS',
      'DSE reserved for patients with reduced LVEF and low-gradient AS',
      'Integration of multiple imaging modalities improves diagnostic accuracy',
    ],
    clinicalTakeaway: 'A structured multimodality approach (echo -> CT calcium -> DSE when needed) resolves most cases of discordant AS grading.',
    tags: ['discordant-grading', 'multimodality', 'diagnostic-algorithm', 'case-report'],
    evidenceLevel: 'C',
  },

  // ── 10. NFLG AS Guidelines Comparison ───────────────────────
  {
    id: 'nitsche-2024',
    title: 'Normal-Flow Low-Gradient Aortic Stenosis: Comparison of ESC and ACC/AHA Guideline Recommendations',
    authors: 'Nitsche C, Koschutnik M, Karam N, et al.',
    journal: 'JACC: Cardiovascular Imaging',
    year: 2024,
    keyFindings: [
      'Normal-flow low-gradient (NFLG) AS is the most common discordant pattern',
      'ESC and ACC/AHA guidelines differ in their approach to NFLG AS management',
      'CT calcium scoring helps reclassify NFLG patients as truly severe or moderate',
      'Updated CT calcium thresholds with improved sex-specific cutoffs proposed',
      'Many NFLG patients reclassified as moderate AS with updated criteria',
    ],
    clinicalTakeaway: 'NFLG AS management differs between guidelines; CT calcium scoring is the key discriminator, and updated thresholds improve classification.',
    tags: ['nflg', 'guidelines-comparison', 'ct-calcium', 'discordant-grading'],
    evidenceLevel: 'C',
  },

  // ── 11. NFLG Myth/Reality ───────────────────────────────────
  {
    id: 'clavel-2018-nflg',
    title: 'Normal-Flow Low-Gradient Severe Aortic Stenosis: Myth or Reality?',
    authors: 'Clavel MA, Dumesnil JG, Pibarot P',
    journal: 'Structural Heart',
    year: 2018,
    keyFindings: [
      'Most NFLG patients with AVA <1.0 cm² do not have truly severe AS',
      'Measurement errors (LVOT area, pressure recovery) explain many NFLG cases',
      'CT calcium scoring confirms true severity in only a minority of NFLG patients',
      'Truly severe NFLG AS exists but is less common than previously reported',
      'Indexed AVA and body size should be considered in small patients',
    ],
    clinicalTakeaway: 'Most NFLG "severe" AS cases are not truly severe; systematic evaluation for measurement errors and CT calcium scoring are essential.',
    tags: ['nflg', 'measurement-error', 'ct-calcium', 'severity-confirmation'],
    evidenceLevel: 'B',
    sampleSize: 315,
    primaryOutcome: 'Reclassification rate with CT calcium',
  },

  // ── 12. Low-Gradient DSE ────────────────────────────────────
  {
    id: 'monin-2003',
    title: 'Low-Gradient Aortic Stenosis: Operative Risk Stratification and Predictors for Long-Term Outcome — A Multicenter Study Using Dobutamine Stress Hemodynamics',
    authors: 'Monin JL, Quere JP, Monchi M, et al.',
    journal: 'Circulation',
    year: 2003,
    pmid: '12668511',
    doi: '10.1161/01.CIR.0000055724.34272.85',
    keyFindings: [
      'Dobutamine stress echo differentiates true severe from pseudo-severe LFLG AS',
      'True severe: AVA remains <1.0 cm² with flow augmentation (>20% SV increase)',
      'Pseudo-severe: AVA increases >1.0 cm² indicating contractile reserve with moderate AS',
      'Lack of contractile reserve (<20% SV increase) predicts high operative mortality',
      'Flow reserve is the strongest predictor of operative survival in LFLG AS',
    ],
    clinicalTakeaway: 'DSE differentiates true severe from pseudo-severe LFLG AS; lack of contractile reserve identifies the highest-risk surgical patients.',
    tags: ['dse', 'lflg', 'contractile-reserve', 'pseudo-severe', 'operative-risk'],
    evidenceLevel: 'B',
    sampleSize: 136,
    primaryOutcome: 'Operative mortality and long-term survival',
  },

  // ── 13. LFLG Outcomes ───────────────────────────────────────
  {
    id: 'fougeres-2014',
    title: 'Outcome After TAVR in Patients With Low-Flow, Low-Gradient Aortic Stenosis and Reduced vs Preserved Ejection Fraction',
    authors: 'Fougeres E, Tribouilloy C, Monchi M, et al.',
    journal: 'European Heart Journal',
    year: 2014,
    keyFindings: [
      'TAVR improves outcomes in classical LFLG AS (reduced EF) and paradoxical LFLG AS',
      'Mortality benefit observed regardless of LVEF status in confirmed severe LFLG AS',
      'Classical LFLG (reduced EF) has higher early mortality but similar long-term benefit',
      'Paradoxical LFLG has better early outcomes but persistent elevated long-term risk',
    ],
    clinicalTakeaway: 'TAVR provides survival benefit in both classical and paradoxical LFLG AS when severity is confirmed.',
    tags: ['lflg', 'tavr-outcomes', 'lvef', 'paradoxical-lflg'],
    evidenceLevel: 'B',
    sampleSize: 218,
    primaryOutcome: '2-year all-cause mortality',
  },

  // ── 14. DSE vs CT Calcium in LFLG ──────────────────────────
  {
    id: 'clavel-2021-dse-ct',
    title: 'Dobutamine Stress Echocardiography vs CT Calcium Scoring in Low-Flow Low-Gradient Aortic Stenosis',
    authors: 'Clavel MA, Berthelot-Richer M, Le Ven F, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2021,
    keyFindings: [
      'CT calcium scoring and DSE provide complementary information in LFLG AS',
      'CT calcium scoring has higher reproducibility than DSE for confirming severity',
      'DSE uniquely provides information on contractile reserve and projected valve area',
      'CT calcium is preferred when DSE is contraindicated or inconclusive',
      'Combined approach reclassifies more patients correctly than either test alone',
    ],
    clinicalTakeaway: 'CT calcium scoring and DSE are complementary in LFLG AS; CT is more reproducible while DSE provides unique hemodynamic data.',
    tags: ['lflg', 'dse', 'ct-calcium', 'diagnostic-comparison'],
    evidenceLevel: 'B',
  },

  // ── 15. TAVR vs Conservative in LG AS ──────────────────────
  {
    id: 'ludwig-2023',
    title: 'TAVR vs Conservative Management in Patients With Low-Gradient Aortic Stenosis',
    authors: 'Ludwig S, Thiele A, Wunderlich S, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2023,
    keyFindings: [
      'TAVR associated with improved survival vs conservative management in low-gradient AS',
      'Benefit most pronounced in patients with confirmed severe AS by CT calcium',
      'Patients with truly moderate AS (low calcium) do not benefit from TAVR',
      'Highlights importance of confirming severity before intervention in LG AS',
    ],
    clinicalTakeaway: 'TAVR improves outcomes in confirmed severe low-gradient AS; severity confirmation is mandatory before intervention.',
    tags: ['tavr-outcomes', 'low-gradient', 'conservative-management', 'severity-confirmation'],
    evidenceLevel: 'B',
  },

  // ── 16. Invasive Evaluation LFLG ───────────────────────────
  {
    id: 'rodes-cabau-2018',
    title: 'Invasive Hemodynamic Evaluation of Patients With Low-Flow Low-Gradient Aortic Stenosis',
    authors: 'Rodes-Cabau J, Clavel MA, Guzzetti E, et al.',
    journal: 'EuroIntervention',
    year: 2018,
    keyFindings: [
      'Invasive hemodynamics can resolve discrepancies when noninvasive testing is inconclusive',
      'Simultaneous LV-aortic pressure measurement provides accurate gradient assessment',
      'Catheter-based flow measurements complement noninvasive SVI assessment',
      'Invasive testing recommended when echo, CT, and DSE remain inconclusive',
    ],
    clinicalTakeaway: 'Invasive hemodynamic evaluation is a final arbiter for LFLG AS severity when all noninvasive modalities are inconclusive.',
    tags: ['lflg', 'invasive-hemodynamics', 'diagnostic-workup'],
    evidenceLevel: 'B',
    sampleSize: 64,
    primaryOutcome: 'Diagnostic reclassification rate',
  },

  // ── 17. LFLG Challenges ─────────────────────────────────────
  {
    id: 'tribouilloy-2012',
    title: 'Low-Flow Low-Gradient Aortic Stenosis With Preserved Left Ventricular Ejection Fraction: Clinical Challenges and Management Strategies',
    authors: 'Tribouilloy C, Levy F, Rusinaru D, et al.',
    journal: 'Archives of Cardiovascular Diseases',
    year: 2012,
    keyFindings: [
      'Clinical challenge of distinguishing truly severe from moderate AS in paradoxical LFLG',
      'Importance of checking for measurement errors before accepting low-gradient severe AS',
      'Role of systemic arterial compliance in explaining paradoxical low-flow states',
      'Management algorithm for systematic workup of paradoxical LFLG AS',
    ],
    clinicalTakeaway: 'Paradoxical LFLG AS requires systematic exclusion of measurement errors and comprehensive evaluation of vascular load.',
    tags: ['paradoxical-lflg', 'diagnostic-workup', 'measurement-error', 'clinical-review'],
    evidenceLevel: 'C',
  },

  // ── 18. Multimodality Imaging Review ────────────────────────
  {
    id: 'clavel-2020',
    title: 'Multimodality Imaging Approach in the Diagnosis of Aortic Stenosis',
    authors: 'Clavel MA, Pibarot P, Bhatt DL',
    journal: 'Frontiers in Cardiovascular Medicine',
    year: 2020,
    keyFindings: [
      'Comprehensive review of echocardiography, CT, CMR, and PET in AS evaluation',
      'Stepwise multimodality approach improves diagnostic accuracy in complex AS',
      'CT for calcium scoring and annular sizing; CMR for myocardial fibrosis assessment',
      'PET for disease activity and progression prediction',
      'Integration of imaging findings within clinical context is essential',
    ],
    clinicalTakeaway: 'Multimodality imaging combining echo, CT, CMR, and PET provides the most accurate assessment of AS severity and myocardial impact.',
    tags: ['multimodality', 'imaging-review', 'diagnostic-algorithm', 'ct-calcium', 'cmr'],
    evidenceLevel: 'C',
  },

  // ── 19. Cardiac Damage Staging ──────────────────────────────
  {
    id: 'genereux-2017',
    title: 'Cardiac Damage Staging Classification in Patients With Aortic Stenosis',
    authors: 'Genereux P, Pibarot P, Redfors B, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2017,
    keyFindings: [
      'Five-stage classification of extravalvular cardiac damage in AS (Stages 0-4)',
      'Stage 0: No damage; Stage 1: LV damage (LVH, diastolic dysfunction)',
      'Stage 2: LA or mitral valve damage; Stage 3: pulmonary/tricuspid involvement',
      'Stage 4: RV dysfunction, severe pulmonary hypertension',
      'Higher damage stages predict worse outcomes after both SAVR and TAVR',
      'Staging helps risk-stratify patients and determine urgency of intervention',
    ],
    clinicalTakeaway: 'Cardiac damage staging (0-4) provides incremental prognostic value beyond AS severity and guides timing of intervention.',
    tags: ['cardiac-damage', 'staging', 'prognosis', 'risk-stratification'],
    evidenceLevel: 'B',
  },

  // ── 20. Moderate AS Management ──────────────────────────────
  {
    id: 'nitsche-2023',
    title: 'Management of Moderate Aortic Stenosis: Current Evidence and Future Directions',
    authors: 'Nitsche C, Koschutnik M, Donà C, et al.',
    journal: 'European Heart Journal',
    year: 2023,
    keyFindings: [
      'Moderate AS with concomitant LV dysfunction may benefit from intervention',
      'No current guideline recommendation for intervention in moderate AS alone',
      'Ongoing trials (TAVR-UNLOAD, PROGRESS) evaluating early intervention',
      'Rate of progression from moderate to severe AS is variable and unpredictable',
      'Need for better markers to identify moderate AS patients at highest risk',
    ],
    clinicalTakeaway: 'Moderate AS management is evolving; intervention may benefit select patients with concomitant LV dysfunction, pending trial results.',
    tags: ['moderate-as', 'management', 'clinical-trials', 'disease-progression'],
    evidenceLevel: 'C',
  },

  // ── 21. TAVR-UNLOAD Trial ───────────────────────────────────
  {
    id: 'tavr-unload',
    title: 'TAVR-UNLOAD: Transcatheter Aortic Valve Replacement to UNload the Left Ventricle in Patients With Advanced Heart Failure',
    authors: 'Spitzer E, Van Mieghem NM, Pibarot P, et al.',
    journal: 'American Heart Journal',
    year: 2016,
    keyFindings: [
      'Randomized trial of TAVR vs optimal medical therapy in moderate AS with HFrEF',
      'Primary endpoint: composite of death, HF hospitalization, change in KCCQ',
      'Hypothesis: TAVR unloads LV and improves outcomes in moderate AS + HFrEF',
      'Target enrollment 300 patients across multiple centers',
      'Will inform whether TAVR indication should expand to moderate AS with HF',
    ],
    clinicalTakeaway: 'TAVR-UNLOAD tests whether TAVR in moderate AS with HFrEF improves outcomes, potentially expanding TAVR indications.',
    tags: ['moderate-as', 'hfref', 'clinical-trial', 'rct', 'tavr-expansion'],
    evidenceLevel: 'A',
    sampleSize: 300,
    primaryOutcome: 'Composite of death, HF hospitalization, KCCQ change at 1 year',
  },

  // ── 22. PROGRESS Trial ─────────────────────────────────────
  {
    id: 'progress',
    title: 'PROGRESS: Management of Moderate Aortic Stenosis by Clinical Surveillance or TAVR',
    authors: 'Pibarot P, Bhatt DL, Bhagra S, et al.',
    journal: 'New England Journal of Medicine',
    year: 2024,
    keyFindings: [
      'Randomized trial of early TAVR vs clinical surveillance in moderate AS',
      'Primary endpoint: composite of death, stroke, and HF hospitalization',
      'Addresses the gap in evidence for timing of intervention in moderate AS',
      'Includes patients with moderate AS at higher risk of progression',
      'Results will shape future guideline recommendations for moderate AS',
    ],
    clinicalTakeaway: 'PROGRESS will determine whether early TAVR in moderate AS reduces major adverse cardiovascular events vs surveillance.',
    tags: ['moderate-as', 'clinical-trial', 'rct', 'early-intervention', 'tavr-expansion'],
    evidenceLevel: 'A',
  },

  // ── 23. PARTNER 1B ──────────────────────────────────────────
  {
    id: 'partner-1b',
    title: 'Transcatheter Aortic-Valve Implantation for Aortic Stenosis in Patients Who Cannot Undergo Surgery',
    authors: 'Leon MB, Smith CR, Mack M, et al.',
    journal: 'New England Journal of Medicine',
    year: 2010,
    pmid: '20961243',
    doi: '10.1056/NEJMoa1008232',
    keyFindings: [
      'TAVR vs standard therapy in inoperable severe AS patients',
      'TAVR reduced all-cause mortality at 1 year (30.7% vs 50.7%, p<0.001)',
      'Absolute mortality reduction of 20% with TAVR over standard therapy',
      'Higher stroke rate with TAVR but offset by large mortality benefit',
      'Established TAVR as a viable treatment for inoperable patients',
    ],
    clinicalTakeaway: 'PARTNER 1B established TAVR as superior to medical therapy in inoperable severe AS, with a 20% absolute mortality reduction at 1 year.',
    tags: ['partner', 'landmark-trial', 'rct', 'inoperable', 'tavr-vs-medical'],
    evidenceLevel: 'A',
    primaryOutcome: '1-year all-cause mortality',
  },

  // ── 24. PARTNER 1A ──────────────────────────────────────────
  {
    id: 'partner-1a',
    title: 'Transcatheter Versus Surgical Aortic-Valve Replacement in High-Risk Patients',
    authors: 'Smith CR, Leon MB, Mack MJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2011,
    pmid: '21639811',
    doi: '10.1056/NEJMoa1103510',
    keyFindings: [
      'TAVR non-inferior to SAVR in high-risk patients (STS >=8%)',
      '1-year mortality similar: TAVR 24.2% vs SAVR 26.8% (p=0.44)',
      'More vascular complications and paravalvular leak with TAVR',
      'More bleeding and atrial fibrillation with SAVR',
      'Established TAVR as an alternative to surgery in high-risk patients',
    ],
    clinicalTakeaway: 'PARTNER 1A demonstrated TAVR non-inferiority to SAVR in high-risk patients, expanding TAVR to the surgical-risk population.',
    tags: ['partner', 'landmark-trial', 'rct', 'high-risk', 'tavr-vs-savr'],
    evidenceLevel: 'A',
    primaryOutcome: '1-year all-cause mortality',
  },

  // ── 25. PARTNER 2A ──────────────────────────────────────────
  {
    id: 'partner-2a',
    title: 'Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Intermediate-Risk Patients',
    authors: 'Leon MB, Smith CR, Mack MJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2016,
    pmid: '27040324',
    doi: '10.1056/NEJMoa1514616',
    keyFindings: [
      'TAVR non-inferior to SAVR in intermediate-risk patients (STS 4-8%)',
      '2-year death or disabling stroke: TAVR 19.3% vs SAVR 21.1% (p=0.25)',
      '5-year all-cause mortality: TAVR 47.9% vs SAVR 43.4% (HR 1.09, non-significant)',
      '5-year TF-TAVR vs SAVR: 44.5% vs 43.4% (comparable)',
      '5-year aortic valve reintervention: TAVR 3.2% vs SAVR 0.8%',
      'Transfemoral TAVR superior to SAVR for primary endpoint at 2yr',
      'Structural valve deterioration similar between groups at 5yr',
    ],
    clinicalTakeaway: 'PARTNER 2A demonstrated TAVR non-inferiority at 2yr in intermediate-risk. 5-year data showed comparable mortality with TF access, but higher reintervention with TAVR.',
    tags: ['partner', 'landmark-trial', 'rct', 'intermediate-risk', 'tavr-vs-savr'],
    evidenceLevel: 'A',
    sampleSize: 2032,
    primaryOutcome: '2-year death or disabling stroke; 5-year all-cause mortality',
  },

  // ── 26. PARTNER 3 ───────────────────────────────────────────
  {
    id: 'partner-3',
    title: 'Transcatheter Aortic-Valve Replacement with a Balloon-Expandable Valve in Low-Risk Patients',
    authors: 'Mack MJ, Leon MB, Thourani VH, et al.',
    journal: 'New England Journal of Medicine',
    year: 2019,
    pmid: '30787670',
    doi: '10.1056/NEJMoa1814052',
    keyFindings: [
      'TAVR superior to SAVR in low-risk patients (STS <4%) at 1 year',
      '1-year death, stroke, or rehospitalization: TAVR 8.5% vs SAVR 15.1% (p<0.001)',
      '5-year composite (death/stroke/rehospitalization): TAVR 22.8% vs SAVR 27.2% (not significant)',
      '5-year all-cause mortality: TAVR 10.0% vs SAVR 8.2%',
      '5-year stroke: TAVR 5.8% vs SAVR 6.4%',
      '5-year aortic valve reintervention: TAVR 3.2% vs SAVR 0.8%',
      'Pacemaker: TAVR 13.5% vs SAVR 10.4% at 5yr',
      'Mild PVL at 5yr: TAVR 26.0% vs SAVR 2.3%',
      'New-onset AF: TAVR 13.7% vs SAVR 42.4%',
    ],
    clinicalTakeaway: 'PARTNER 3 showed TAVR superiority at 1yr. At 5 years, no significant difference in the composite endpoint (22.8% vs 27.2%). TAVR had less AF but more PVL and reintervention.',
    tags: ['partner', 'landmark-trial', 'rct', 'low-risk', 'tavr-vs-savr', 'sapien-3'],
    evidenceLevel: 'A',
    sampleSize: 1000,
    primaryOutcome: '1-year composite of death, stroke, or rehospitalization; 5-year composite',
  },

  // ── 27. Evolut Low Risk ─────────────────────────────────────
  {
    id: 'evolut-low-risk',
    title: 'Self-Expanding Transcatheter Aortic Valve Replacement vs Surgical Aortic Valve Replacement in Patients at Low Surgical Risk',
    authors: 'Popma JJ, Deeb GM, Yakubov SJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2019,
    pmid: '30883058',
    doi: '10.1056/NEJMoa1816885',
    keyFindings: [
      'Self-expanding TAVR non-inferior to SAVR in low-risk patients',
      '2-year death or disabling stroke: TAVR 5.3% vs SAVR 6.7% (primary endpoint, met non-inferiority)',
      '4-year death or disabling stroke: TAVR 10.7% vs SAVR 14.1% (HR 0.74, p=0.05)',
      '4-year all-cause mortality: TAVR 13.5% vs SAVR 14.9%',
      'Permanent pacemaker at 30 days: TAVR 23.2% vs SAVR 9.1%',
      'Lower mean gradient with Evolut vs surgical bioprosthesis at 4yr',
      'PVL (none/trace) at 4yr: TAVR 84.7% vs SAVR 98.4%',
    ],
    clinicalTakeaway: 'Evolut Low Risk confirmed TAVR non-inferiority at 2yr. At 4yr, death/disabling stroke favored TAVR (10.7% vs 14.1%, HR 0.74). Trade-off: higher pacemaker rates (23.2% vs 9.1%).',
    tags: ['evolut', 'landmark-trial', 'rct', 'low-risk', 'tavr-vs-savr', 'self-expanding'],
    evidenceLevel: 'A',
    sampleSize: 1468,
    primaryOutcome: '2-year death or disabling stroke; 4-year all-cause mortality',
  },

  // ── 28. PARTNER 2 Five-Year / HALT ──────────────────────────
  {
    id: 'makkar-2020',
    title: 'Five-Year Outcomes of Transcatheter or Surgical Aortic-Valve Replacement',
    authors: 'Makkar RR, Thourani VH, Mack MJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2020,
    keyFindings: [
      '5-year outcomes of PARTNER 2A: TAVR comparable to SAVR in intermediate-risk',
      'Hypo-attenuated leaflet thickening (HALT) detected on CT in ~13% of TAVR patients',
      'HALT associated with higher transvalvular gradients but unclear clinical significance',
      'Structural valve deterioration rates similar between TAVR and SAVR at 5 years',
      'Long-term durability data reassuring for intermediate-risk TAVR use',
    ],
    clinicalTakeaway: 'PARTNER 2 five-year data showed durable TAVR outcomes; HALT was identified as a phenomenon requiring ongoing surveillance.',
    tags: ['partner', 'long-term', 'durability', 'halt', 'structural-deterioration'],
    evidenceLevel: 'A',
    primaryOutcome: '5-year all-cause mortality',
  },

  // ── 29. Meta-Analysis TAVR vs SAVR ──────────────────────────
  {
    id: 'siontis-2016',
    title: 'Transcatheter Aortic Valve Implantation vs Surgical Aortic Valve Replacement for Treatment of Severe Aortic Stenosis: A Meta-Analysis of Randomized Trials',
    authors: 'Siontis GC, Praz F, Pilgrim T, et al.',
    journal: 'Lancet',
    year: 2016,
    keyFindings: [
      'Meta-analysis of 4 major RCTs comparing TAVR vs SAVR',
      'TAVR associated with lower all-cause mortality at 2 years (HR 0.89)',
      'Transfemoral TAVR had greatest survival benefit (HR 0.79)',
      'TAVR: more paravalvular leak, pacemakers; SAVR: more bleeding, AF, AKI',
      'Results support transfemoral-first approach',
    ],
    clinicalTakeaway: 'Pooled RCT data demonstrate TAVR mortality benefit across risk categories, strongest with transfemoral access.',
    tags: ['meta-analysis', 'tavr-vs-savr', 'transfemoral', 'outcomes'],
    evidenceLevel: 'A',
    primaryOutcome: '2-year all-cause mortality (pooled HR)',
  },

  // ── 30. Bicuspid TAVR ───────────────────────────────────────
  {
    id: 'yoon-2017',
    title: 'Outcomes in Transcatheter Aortic Valve Replacement for Bicuspid Versus Tricuspid Aortic Valve Stenosis',
    authors: 'Yoon SH, Bleiziffer S, De Backer O, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2017,
    keyFindings: [
      'Bicuspid TAVR feasible with acceptable outcomes using newer-generation devices',
      'Higher rates of paravalvular leak with early-generation devices in bicuspid anatomy',
      'Newer-generation valves narrowed the outcomes gap vs tricuspid anatomy',
      'Elliptical annulus and heavy calcification are key challenges in bicuspid TAVR',
      'CT-based sizing is essential due to atypical annular geometry',
    ],
    clinicalTakeaway: 'Bicuspid TAVR is feasible with newer devices; CT-based planning is critical due to challenging anatomy.',
    tags: ['bicuspid', 'tavr-outcomes', 'anatomy', 'valve-selection'],
    evidenceLevel: 'B',
    sampleSize: 561,
    primaryOutcome: '30-day and 1-year mortality and paravalvular leak',
  },

  // ── 31. Bicuspid Low-Risk ───────────────────────────────────
  {
    id: 'makkar-2023',
    title: 'TAVR in Patients With Bicuspid Aortic Valve Stenosis at Low Surgical Risk',
    authors: 'Makkar RR, Yoon SH, Leon MB, et al.',
    journal: 'New England Journal of Medicine',
    year: 2023,
    keyFindings: [
      'TAVR in low-risk bicuspid AS patients shows comparable outcomes to tricuspid',
      'New-generation balloon-expandable valves perform well in bicuspid anatomy',
      'Paravalvular leak rates comparable to tricuspid TAVR with contemporary devices',
      'Careful CT assessment of calcium distribution and raphe morphology is essential',
      'Supports expansion of TAVR to low-risk bicuspid patients with appropriate anatomy',
    ],
    clinicalTakeaway: 'TAVR is a viable option for low-risk bicuspid AS with contemporary devices when anatomy is suitable based on CT evaluation.',
    tags: ['bicuspid', 'low-risk', 'rct', 'tavr-expansion'],
    evidenceLevel: 'A',
  },

  // ── 32. VIVID Registry VIV ──────────────────────────────────
  {
    id: 'dvir-2014',
    title: 'Transcatheter Aortic Valve-in-Valve Implantation for Patients With Degenerative Surgical Bioprosthetic Valves: Results From the Global Valve-in-Valve Registry',
    authors: 'Dvir D, Webb JG, Bleiziffer S, et al.',
    journal: 'JAMA',
    year: 2014,
    pmid: '25268440',
    doi: '10.1001/jama.2014.12432',
    keyFindings: [
      'VIV-TAVR is feasible and effective for failed surgical bioprostheses',
      '1-year mortality 16.8% in the global registry of VIV procedures',
      'Small surgical valve size (<=21mm) is the strongest predictor of adverse outcomes',
      'Elevated post-procedure gradients common, especially in small valves',
      'Coronary obstruction risk higher in stented bioprostheses with short leaflets',
    ],
    clinicalTakeaway: 'VIV-TAVR is a viable alternative to redo surgery for failed bioprostheses; small valve size predicts worse hemodynamic outcomes.',
    tags: ['viv', 'registry', 'surgical-bioprosthesis', 'small-valve', 'outcomes'],
    evidenceLevel: 'B',
    sampleSize: 202,
    primaryOutcome: '1-year all-cause mortality',
  },

  // ── 33. PPM Post-VIV ────────────────────────────────────────
  {
    id: 'dvir-2012',
    title: 'Prosthesis-Patient Mismatch After Transcatheter Aortic Valve-in-Valve Implantation',
    authors: 'Dvir D, Webb JG, Piazza N, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2012,
    keyFindings: [
      'PPM is highly prevalent after VIV-TAVR, especially with small surgical valves',
      'Severe PPM (iEOA <0.65 cm\u00B2/m\u00B2) in ~30% of VIV patients with <=21mm valves',
      'PPM associated with worse functional outcomes and higher residual gradients',
      'Supra-annular positioning and high deployment may mitigate PPM',
      'Valve selection should account for internal diameter of the failed surgical valve',
    ],
    clinicalTakeaway: 'PPM is a major concern in VIV-TAVR, especially in small surgical valves; valve selection and positioning strategy are critical.',
    tags: ['viv', 'ppm', 'small-valve', 'hemodynamics', 'valve-selection'],
    evidenceLevel: 'B',
  },

  // ── 34. Paravalvular Regurgitation ──────────────────────────
  {
    id: 'pibarot-2014',
    title: 'Paravalvular Regurgitation After Transcatheter Aortic Valve Replacement: Mechanisms, Assessment, and Clinical Consequences',
    authors: 'Pibarot P, Hahn RT, Weissman NJ, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2014,
    keyFindings: [
      'Moderate or greater paravalvular leak (PVL) associated with higher mortality after TAVR',
      'PVL grading should use multiparametric approach: circumferential extent, regurgitant volume',
      'Undersizing relative to annulus is the primary cause of significant PVL',
      'Newer-generation devices have significantly reduced PVL rates',
      'Mild PVL has no significant impact on long-term outcomes',
    ],
    clinicalTakeaway: 'Moderate or greater PVL increases mortality post-TAVR; accurate annular sizing with CT is the key preventive measure.',
    tags: ['pvl', 'paravalvular-leak', 'tavr-complications', 'valve-sizing', 'outcomes'],
    evidenceLevel: 'B',
  },

  // ── 35. Five-Year VIV Outcomes ──────────────────────────────
  {
    id: 'didier-2018',
    title: 'Five-Year Clinical Outcomes and Valve Durability After Transcatheter Aortic Valve-in-Valve Replacement',
    authors: 'Didier R, Eltchaninoff H, Donzeau-Gouge P, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2018,
    keyFindings: [
      '5-year survival after VIV-TAVR approximately 50-60% in high-risk elderly patients',
      'Hemodynamic results remain stable at 5 years in most patients',
      'Structural valve deterioration uncommon at 5-year follow-up',
      'Residual high gradients at baseline predict worse long-term outcomes',
      'VIV-TAVR provides durable benefit for selected patients with failed bioprostheses',
    ],
    clinicalTakeaway: 'VIV-TAVR demonstrates durable hemodynamic results at 5 years; baseline elevated gradients are prognostically important.',
    tags: ['viv', 'long-term', 'durability', 'outcomes'],
    evidenceLevel: 'B',
  },

  // ── 36. TAVR-in-TAVR ───────────────────────────────────────
  {
    id: 'landes-2020',
    title: 'Transcatheter Replacement of Transcatheter Versus Surgically Implanted Aortic Valve Bioprostheses',
    authors: 'Landes U, Webb JG, De Backer O, et al.',
    journal: 'Journal of the American College of Cardiology',
    year: 2020,
    keyFindings: [
      'TAVR-in-TAVR is technically feasible with acceptable short-term outcomes',
      'Coronary access may be compromised, especially with self-expanding valve-in-self-expanding',
      'Commissural alignment can preserve coronary access in selected cases',
      'Neo-skirt height and TAVR frame dimensions are critical for planning',
      'CT simulation essential for predicting coronary obstruction risk',
    ],
    clinicalTakeaway: 'TAVR-in-TAVR is feasible but carries coronary obstruction risk; detailed CT planning and commissural alignment are essential.',
    tags: ['tavr-in-tavr', 'redo', 'coronary-obstruction', 'ct-planning'],
    evidenceLevel: 'B',
    sampleSize: 63,
    primaryOutcome: '30-day mortality and procedural success',
  },

  // ── 37. Coronary Obstruction ────────────────────────────────
  {
    id: 'ribeiro-2013',
    title: 'Predictors and Impact of Coronary Obstruction Following Transcatheter Aortic Valve Replacement',
    authors: 'Ribeiro HB, Webb JG, Makkar RR, et al.',
    journal: 'JACC: Cardiovascular Interventions',
    year: 2013,
    keyFindings: [
      'Coronary obstruction occurs in ~1% of native valve TAVR but is catastrophic',
      'Low coronary ostium height (<10 mm) is the strongest predictor',
      'Shallow sinuses of Valsalva (<30 mm width) increase risk',
      'Women and patients with bulky calcification are at higher risk',
      'Emergent PCI is often required but has variable success',
    ],
    clinicalTakeaway: 'Coronary obstruction is rare but lethal; coronary height <10 mm and narrow sinuses are key risk factors requiring preprocedural CT assessment.',
    tags: ['coronary-obstruction', 'tavr-complications', 'ct-planning', 'risk-factors'],
    evidenceLevel: 'B',
  },

  // ── 38. SURTAVI ────────────────────────────────────────────
  {
    id: 'surtavi',
    title: 'Surgical or Transcatheter Aortic-Valve Replacement in Intermediate-Risk Patients',
    authors: 'Reardon MJ, Van Mieghem NM, Popma JJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2017,
    pmid: '28304219',
    doi: '10.1056/NEJMoa1700456',
    keyFindings: [
      'Self-expanding TAVR non-inferior to SAVR in intermediate-risk patients (STS mean 4.4-4.5%)',
      '2-year death or disabling stroke: TAVR 12.6% vs SAVR 14.0% (met non-inferiority, posterior probability of superiority 98.4%)',
      '2-year all-cause mortality: TAVR 11.4% vs SAVR 11.6%',
      '5-year death or disabling stroke: TAVR 31.3% vs SAVR 30.8% (HR 1.02, p=0.85)',
      '30-day pacemaker: TAVR 25.9% vs SAVR 6.6%',
      '5-year structural valve deterioration: TAVR 2.57% vs SAVR 4.38% (lower with TAVR)',
      'Less AKI and atrial fibrillation with TAVR; more PVL and pacemaker with TAVR',
    ],
    clinicalTakeaway: 'SURTAVI confirmed self-expanding TAVR non-inferiority at 2yr and equivalent outcomes at 5yr (31.3% vs 30.8%). PPM rate was 25.9% vs 6.6%. SVD was lower with TAVR.',
    tags: ['surtavi', 'landmark-trial', 'rct', 'intermediate-risk', 'tavr-vs-savr', 'self-expanding'],
    evidenceLevel: 'A',
    sampleSize: 1660,
    primaryOutcome: '2-year death or disabling stroke (Bayesian non-inferiority); 5-year outcomes',
  },

  // ── 39. CoreValve US Pivotal High Risk ─────────────────────
  {
    id: 'corevalve-high-risk',
    title: 'Transcatheter Aortic Valve Replacement with a Self-Expanding Valve in High-Risk Patients',
    authors: 'Adams DH, Popma JJ, Reardon MJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2014,
    pmid: '24678937',
    doi: '10.1056/NEJMoa1400590',
    keyFindings: [
      'Self-expanding TAVR (CoreValve) superior to SAVR in high-risk patients (STS mean 7.4%)',
      '1-year all-cause mortality: TAVR 14.2% vs SAVR 19.1% (p=0.04, superiority)',
      '5-year all-cause mortality: TAVR 55.3% vs SAVR 55.4% (converged)',
      '5-year cardiovascular mortality: TAVR 39.7% vs SAVR 39.5%',
      'First trial to show TAVR superiority (not just non-inferiority) over surgery',
      'Early mortality benefit with TAVR driven by surgical recovery burden in high-risk population',
      'Structural valve deterioration infrequent with either method at 5yr',
    ],
    clinicalTakeaway: 'CoreValve US Pivotal was the first trial to show TAVR superiority over SAVR (14.2% vs 19.1% at 1yr, p=0.04). At 5yr, outcomes converged (55.3% vs 55.4%).',
    tags: ['corevalve', 'landmark-trial', 'rct', 'high-risk', 'tavr-vs-savr', 'self-expanding'],
    evidenceLevel: 'A',
    sampleSize: 795,
    primaryOutcome: '1-year all-cause mortality; 1-year death or major stroke',
  },

  // ── 40. NOTION Trial ──────────────────────────────────────
  {
    id: 'notion',
    title: 'Transcatheter or Surgical Aortic Valve Implantation: 10-Year Outcomes of the NOTION Trial',
    authors: 'Thyregod HGH, Ihlemann N, Jorgensen TH, et al.',
    journal: 'European Heart Journal',
    year: 2024,
    doi: '10.1093/eurheartj/ehae003',
    keyFindings: [
      'First randomized trial of TAVR in all-comers/low-risk (enrolled 2009-2013, self-expanding CoreValve)',
      '10-year composite (death/stroke/MI): TAVI 65.5% vs SAVR 65.5% (HR 1.0, p=0.9)',
      '10-year severe structural valve deterioration: TAVI 1.5% vs SAVR 10.0% (HR 0.2, p=0.02, favoring TAVI)',
      '10-year bioprosthetic valve failure: TAVI 9.7% vs SAVR 13.8% (not significant)',
      '5-year pacemaker rate: TAVI 41.7% vs SAVR 7.8%',
      'Endocarditis similar: TAVI 7.2% vs SAVR 7.4%',
      'Enrolled mostly low-risk patients (mean STS 2.9%, mean age ~79)',
    ],
    clinicalTakeaway: 'NOTION provides the longest TAVR follow-up (10 years): identical composite outcomes (65.5% both groups). Surprisingly, severe SVD was significantly lower with TAVI (1.5% vs 10.0%). High PPM rate with first-generation CoreValve.',
    tags: ['notion', 'landmark-trial', 'rct', 'low-risk', 'long-term', 'tavr-vs-savr', 'durability'],
    evidenceLevel: 'A',
    sampleSize: 280,
    primaryOutcome: '10-year composite of death, stroke, or MI',
  },

  // ── 41. UK TAVI Trial ─────────────────────────────────────
  {
    id: 'uk-tavi',
    title: 'Effect of Transcatheter Aortic Valve Implantation vs Surgical Aortic Valve Replacement on All-Cause Mortality in Patients With Aortic Stenosis',
    authors: 'Toff WD, Hildick-Smith D, Kovac J, et al.',
    journal: 'JAMA',
    year: 2022,
    pmid: '35510397',
    doi: '10.1001/jama.2022.5776',
    keyFindings: [
      'Pragmatic, independent (non-industry funded) RCT of TAVI vs SAVR in UK',
      'Patients aged >=70 with severe symptomatic AS at moderately increased operative risk',
      '1-year all-cause mortality: TAVI 4.6% vs SAVR 6.6% (p=0.23, met non-inferiority)',
      'TAVI associated with less bleeding and shorter hospital stay',
      'SAVR associated with fewer vascular complications, less PPM, less PVL',
      'Mixed valve platforms (SAPIEN 3, Evolut) reflecting real-world practice',
    ],
    clinicalTakeaway: 'UK TAVI was the first large independent (non-industry) pragmatic trial confirming TAVR non-inferiority to SAVR (4.6% vs 6.6% mortality at 1yr).',
    tags: ['uk-tavi', 'landmark-trial', 'rct', 'pragmatic', 'tavr-vs-savr'],
    evidenceLevel: 'A',
    sampleSize: 913,
    primaryOutcome: '1-year all-cause mortality (non-inferiority)',
  },

  // ── 42. EARLY TAVR ────────────────────────────────────────
  {
    id: 'early-tavr',
    title: 'Transcatheter Aortic-Valve Replacement for Asymptomatic Severe Aortic Stenosis',
    authors: 'Genereux P, Schwartz A, Giannopoulos AA, et al.',
    journal: 'New England Journal of Medicine',
    year: 2024,
    doi: '10.1056/NEJMoa2405880',
    keyFindings: [
      'Early TAVR vs clinical surveillance in asymptomatic severe AS (mean age 75.8, mean STS 1.8%)',
      'Primary composite (death, stroke, unplanned CV hospitalization): TAVR 26.8% vs surveillance 45.3% (HR 0.50, p<0.001)',
      'All-cause mortality: TAVR 8.4% vs surveillance 9.2% (not significant)',
      'Stroke: TAVR 4.2% vs surveillance 6.7%',
      'Unplanned CV hospitalization: TAVR 20.9% vs surveillance 41.7% (main driver of benefit)',
      '50% relative risk reduction in primary composite favoring early TAVR',
      'Median follow-up 3.8 years; 83.6% low surgical risk',
    ],
    clinicalTakeaway: 'EARLY TAVR showed 50% reduction in the primary composite (26.8% vs 45.3%, p<0.001), driven by reduction in unplanned CV hospitalization. Mortality was similar. Paradigm-shifting for asymptomatic AS management.',
    tags: ['early-tavr', 'landmark-trial', 'rct', 'asymptomatic', 'early-intervention'],
    evidenceLevel: 'A',
    sampleSize: 901,
    primaryOutcome: 'Composite of death, stroke, or unplanned CV hospitalization at median 3.8yr',
  },

  // ── 43. RECOVERY Trial ────────────────────────────────────
  {
    id: 'recovery',
    title: 'Early Surgery or Conservative Care for Asymptomatic Aortic Stenosis',
    authors: 'Kang DH, Park SJ, Lee SA, et al.',
    journal: 'New England Journal of Medicine',
    year: 2020,
    pmid: '31893513',
    doi: '10.1056/NEJMoa1912846',
    keyFindings: [
      'Early surgery (SAVR) vs conservative management in asymptomatic very severe AS (AVA <=0.75 cm², Vmax >=4.5 m/s or MG >=50 mmHg)',
      'Primary composite (operative mortality or CV death): early surgery 1% (1/73) vs conservative 15% (11/72) (HR 0.09, p=0.003)',
      'At 8 years: primary composite early surgery 1% vs conservative 26%',
      'All-cause mortality: early surgery 7% (5/73) vs conservative 21% (15/72) (HR 0.33)',
      'Zero operative deaths in the early surgery group',
      'Sudden death occurred exclusively in the conservative group',
    ],
    clinicalTakeaway: 'RECOVERY demonstrated that early SAVR in asymptomatic very severe AS dramatically reduces CV death (1% vs 15% primary composite, HR 0.09). All-cause mortality 7% vs 21% at 8 years.',
    tags: ['recovery', 'landmark-trial', 'rct', 'asymptomatic', 'early-intervention', 'savr'],
    evidenceLevel: 'A',
    sampleSize: 145,
    primaryOutcome: 'Composite of operative mortality or cardiovascular death during follow-up',
  },

  // ── 44. POPular TAVI ──────────────────────────────────────
  {
    id: 'popular-tavi',
    title: 'Antiplatelet Therapy After TAVR: POPular TAVI Trial',
    authors: 'Brouwer S, Nijenhuis VJ, Devilée ECFJ, et al.',
    journal: 'New England Journal of Medicine',
    year: 2020,
    pmid: '31995689',
    doi: '10.1056/NEJMoa1910343',
    keyFindings: [
      'Cohort A (no OAC indication): aspirin alone vs aspirin + clopidogrel for 3 months',
      'Cohort A all bleeding at 12mo: aspirin alone 15.1% vs DAPT 26.6% (p=0.001)',
      'Cohort A CV death/stroke/MI: aspirin 9.7% vs DAPT 9.9% (no increase in thrombotic events)',
      'Cohort B (on OAC): OAC alone vs OAC + clopidogrel',
      'Cohort B all bleeding at 12mo: OAC alone 21.7% vs OAC + clopidogrel 34.6% (p=0.01)',
      'Adding clopidogrel increased bleeding without reducing thromboembolic events in both cohorts',
    ],
    clinicalTakeaway: 'POPular TAVI established aspirin monotherapy (Cohort A) and OAC monotherapy (Cohort B) as the standard post-TAVR regimen, reducing bleeding by 40-45% without increasing thrombotic events.',
    tags: ['popular-tavi', 'landmark-trial', 'rct', 'antiplatelet', 'bleeding', 'post-tavr'],
    evidenceLevel: 'A',
    sampleSize: 665,
    primaryOutcome: 'All bleeding and non-procedure-related bleeding at 1 year',
  },

  // ── 45. BASILICA ────────────────────────────────────────────
  {
    id: 'barbanti-2019',
    title: 'BASILICA (Bioprosthetic or Native Aortic Scallop Intentional Laceration to Prevent Iatrogenic Coronary Artery Obstruction)',
    authors: 'Barbanti M, Yang TH, Rodes-Cabau J, et al.',
    journal: 'JACC: Cardiovascular Interventions',
    year: 2019,
    keyFindings: [
      'BASILICA technique lacerates the leaflet threatening coronary obstruction before TAVR',
      'Successfully prevents coronary obstruction in high-risk VIV and native valve cases',
      'Procedural success rate >90% in experienced centers',
      'Applicable to both VIV and native valve TAVR with high coronary obstruction risk',
      'Requires careful preprocedural CT planning to identify at-risk leaflets',
    ],
    clinicalTakeaway: 'BASILICA is an effective technique to prevent coronary obstruction in high-risk TAVR/VIV cases by lacerating the at-risk leaflet.',
    tags: ['basilica', 'coronary-obstruction', 'viv', 'procedural-technique', 'prevention'],
    evidenceLevel: 'B',
  },

  // ── 46. COAPT (2yr) ──────────────────────────────────────────
  {
    id: 'coapt-2yr',
    title: 'Transcatheter Mitral-Valve Repair in Patients with Heart Failure',
    authors: 'Stone GW, Lindenfeld J, Abraham WT, et al.',
    journal: 'New England Journal of Medicine',
    year: 2018,
    pmid: '30280640',
    doi: '10.1056/NEJMoa1806640',
    keyFindings: [
      'TEER (MitraClip) + GDMT vs GDMT alone in secondary MR with HFrEF (LVEF 20–50%, LVESD ≤70mm, EROA ≥0.30 cm²)',
      'HF hospitalization at 2yr: TEER 35.8% vs control 67.9% (HR 0.53, 95% CI 0.40–0.70, p<0.001)',
      'All-cause mortality at 2yr: TEER 29.1% vs control 46.1% (HR 0.62, 95% CI 0.46–0.82, p<0.001)',
      'MR ≤2+ achieved in 94.8% of TEER patients at 2 years',
      'KCCQ improvement ≥10 pts at 1yr: TEER 73.1% vs control 36.0% (p<0.001)',
      'Mean 1.7 clips per patient; rigorous GDMT optimization required',
    ],
    clinicalTakeaway: 'COAPT established TEER as class I recommendation for secondary MR in HFrEF with disproportionate MR (EROA ≥0.30), reducing HF hospitalization by 47% and mortality by 38% at 2 years.',
    tags: ['coapt', 'landmark-trial', 'rct', 'teer', 'mitraclip', 'secondary-mr', 'hfref'],
    evidenceLevel: 'A',
    sampleSize: 614,
    primaryOutcome: 'Annualized rate of HF hospitalization within 24 months',
  },

  // ── 47. COAPT (5yr) ──────────────────────────────────────────
  {
    id: 'coapt-5yr',
    title: 'Five-Year Follow-up of Transcatheter Mitral-Valve Repair in Heart Failure (COAPT)',
    authors: 'Stone GW, Abraham WT, Lindenfeld J, et al.',
    journal: 'New England Journal of Medicine',
    year: 2023,
    pmid: '36876756',
    doi: '10.1056/NEJMoa2210903',
    keyFindings: [
      'COAPT 5-year extended follow-up of MitraClip vs GDMT alone',
      'All-cause mortality at 5yr: TEER 57.3% vs control 67.2% (HR 0.72, 95% CI 0.58–0.89, p=0.003)',
      'HF hospitalization at 5yr: 33.1 vs 58.5 per 100 patient-years (RR 0.57, p<0.001)',
      'Durable MR reduction maintained through 5 years',
      'Mortality benefit sustained and even appeared to widen over time',
      'Number needed to treat (NNT) of ~10 over 5 years to prevent one death',
    ],
    clinicalTakeaway: 'COAPT 5-year data confirms durable survival benefit of TEER (HR 0.72) with persistent reduction in HF hospitalization, supporting long-term benefit of edge-to-edge repair in disproportionate secondary MR.',
    tags: ['coapt', 'landmark-trial', 'rct', 'teer', 'mitraclip', 'secondary-mr', 'long-term'],
    evidenceLevel: 'A',
    sampleSize: 614,
    primaryOutcome: 'All-cause mortality and HF hospitalization at 5 years',
  },

  // ── 48. MITRA-FR (1yr) ────────────────────────────────────────
  {
    id: 'mitra-fr-1yr',
    title: 'Percutaneous Repair with the MitraClip Device for Severe Functional/Secondary Mitral Regurgitation',
    authors: 'Obadia JF, Messika-Zeitoun D, Leurent G, et al.',
    journal: 'New England Journal of Medicine',
    year: 2018,
    pmid: '30280641',
    doi: '10.1056/NEJMoa1805374',
    keyFindings: [
      'TEER (MitraClip) + GDMT vs GDMT alone in secondary MR (LVEF 15–40%, EROA ≥0.20 cm²)',
      'Death or unplanned HF hospitalization at 1yr: TEER 54.6% vs control 51.3% (OR 1.16, p=0.53, NS)',
      'All-cause mortality at 1yr: TEER 24.3% vs control 22.4% (HR 1.11, p=0.67, NS)',
      'MR ≤2+ achieved in 83.2% of TEER patients (lower than COAPT 94.8%)',
      'Mean 1.3 clips per patient (fewer than COAPT 1.7)',
      'No LVESD upper limit — included patients with more advanced cardiomyopathy',
    ],
    clinicalTakeaway: 'MITRA-FR showed no benefit of TEER in secondary MR with proportionate MR (lower EROA threshold, more dilated LVs). Divergent results from COAPT led to the proportionate vs disproportionate MR framework.',
    tags: ['mitra-fr', 'landmark-trial', 'rct', 'teer', 'mitraclip', 'secondary-mr', 'negative-trial'],
    evidenceLevel: 'A',
    sampleSize: 304,
    primaryOutcome: 'Composite of death or unplanned HF hospitalization at 12 months',
  },

  // ── 49. MITRA-FR (5yr) ────────────────────────────────────────
  {
    id: 'mitra-fr-5yr',
    title: 'Five-Year Outcomes After Transcatheter Mitral Valve Repair for Secondary Mitral Regurgitation (MITRA-FR)',
    authors: 'Obadia JF, Messika-Zeitoun D, Leurent G, et al.',
    journal: 'European Heart Journal',
    year: 2023,
    pmid: '36721295',
    doi: '10.1093/eurheartj/ehad049',
    keyFindings: [
      'MITRA-FR 5-year extended follow-up',
      'All-cause mortality at 5yr: TEER 52.0% vs control 55.9% (HR 0.95, 95% CI 0.72–1.26, p=0.75, NS)',
      'Death or HF hospitalization at 5yr: TEER 63.2% vs control 68.4% (HR 0.91, 95% CI 0.70–1.18, p=0.47, NS)',
      'Neutral results persist at 5 years with no late benefit emerging',
      'Confirms that proportionate MR does not benefit from TEER',
    ],
    clinicalTakeaway: 'MITRA-FR 5-year data confirms no survival benefit from TEER in proportionate secondary MR. Reinforces the importance of patient selection (COAPT criteria) over device implantation alone.',
    tags: ['mitra-fr', 'landmark-trial', 'rct', 'teer', 'mitraclip', 'secondary-mr', 'long-term', 'negative-trial'],
    evidenceLevel: 'A',
    sampleSize: 304,
    primaryOutcome: 'All-cause mortality and composite death/HF hospitalization at 5 years',
  },

  // ── 50. EVEREST II ────────────────────────────────────────────
  {
    id: 'everest-ii',
    title: 'Percutaneous Repair or Surgery for Mitral Regurgitation (EVEREST II)',
    authors: 'Feldman T, Foster E, Glower DD, et al.',
    journal: 'New England Journal of Medicine',
    year: 2011,
    pmid: '21463150',
    doi: '10.1056/NEJMoa1009355',
    keyFindings: [
      'First RCT comparing percutaneous MitraClip repair vs MV surgery for significant MR (primary and secondary)',
      'Safety at 30 days: MitraClip 15.0% vs surgery 48.0% (p<0.001) — major adverse events',
      'Efficacy at 1yr: freedom from death/surgery/MR ≥3+: MitraClip 55% vs surgery 73% (p=0.007)',
      'MR ≤2+ at 1yr: MitraClip 79% vs surgery 87%',
      'At 5 years: MR ≤2+ MitraClip 64.3% vs surgery 82.5% — higher reintervention with clips',
      'Established anatomical eligibility criteria used in all subsequent TEER trials',
    ],
    clinicalTakeaway: 'EVEREST II demonstrated MitraClip safety superiority but lower efficacy vs surgery. Established foundational TEER eligibility criteria (flail gap <10mm, flail width <15mm) and paved the way for COAPT/MITRA-FR.',
    tags: ['everest', 'landmark-trial', 'rct', 'teer', 'mitraclip', 'mv-surgery', 'primary-mr'],
    evidenceLevel: 'A',
    sampleSize: 279,
    primaryOutcome: 'Composite of freedom from death, MV surgery, or MR ≥3+ at 1 year',
  },

  // ── 51. Grayburn Proportionate MR ─────────────────────────────
  {
    id: 'grayburn-2019',
    title: 'Proportionate and Disproportionate Functional Mitral Regurgitation: A New Conceptual Framework',
    authors: 'Grayburn PA, Sannino A, Packer M',
    journal: 'Circulation',
    year: 2019,
    pmid: '30586700',
    doi: '10.1161/CIRCULATIONAHA.118.037327',
    keyFindings: [
      'Proposed "proportionate vs disproportionate" MR as framework to reconcile COAPT and MITRA-FR',
      'Disproportionate MR: MR severity out of proportion to LV dilation (EROA ≥0.30 with LVEDV ≤200 mL)',
      'Proportionate MR: MR expected for degree of cardiomyopathy (lower EROA with severely dilated LV)',
      'COAPT enrolled disproportionate MR → benefit from TEER',
      'MITRA-FR enrolled proportionate MR → no benefit from TEER',
      'Framework helps guide patient selection for transcatheter mitral intervention',
    ],
    clinicalTakeaway: 'The Grayburn "proportionate vs disproportionate MR" hypothesis explains divergent COAPT/MITRA-FR outcomes and is now used clinically to guide TEER patient selection.',
    tags: ['teer', 'mitraclip', 'secondary-mr', 'patient-selection', 'proportionate-mr', 'conceptual-framework'],
    evidenceLevel: 'C',
  },

  // ── 52. Zoghbi 2017 MR Quantification ────────────────────────
  {
    id: 'zoghbi-2017',
    title: 'Recommendations for Noninvasive Evaluation of Native Valvular Regurgitation (ASE/EACVI)',
    authors: 'Zoghbi WA, Adams D, Bonow RO, et al.',
    journal: 'Journal of the American Society of Echocardiography',
    year: 2017,
    pmid: '28314623',
    doi: '10.1016/j.echo.2017.01.007',
    keyFindings: [
      'Defines integrative approach to MR severity grading using multiple parameters',
      'Severe MR thresholds: EROA ≥0.40 cm², RVol ≥60 mL, VC width ≥0.70 cm, RF ≥50%',
      'Moderate MR: EROA 0.20–0.39, RVol 30–59, VC 0.30–0.69',
      'Recommends 3D vena contracta area (≥0.40 cm²) when available',
      'Emphasizes integrative approach — no single parameter is definitive',
      'Addresses specific challenges of secondary MR quantification',
    ],
    clinicalTakeaway: 'Zoghbi 2017 is the definitive reference for echocardiographic MR severity grading thresholds used in all TEER eligibility assessment.',
    tags: ['mr-grading', 'echocardiography', 'guidelines', 'eroa', 'regurgitation', 'ase'],
    evidenceLevel: 'C',
  },
];

// ── Helper: look up publication by ID ─────────────────────────
export function getPublicationById(id: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.id === id);
}

// ── Helper: filter publications by tag ────────────────────────
export function getPublicationsByTag(tag: string): Publication[] {
  return PUBLICATIONS.filter((p) => p.tags.includes(tag));
}

// ── Helper: filter publications by evidence level ─────────────
export function getPublicationsByEvidenceLevel(level: 'A' | 'B' | 'C'): Publication[] {
  return PUBLICATIONS.filter((p) => p.evidenceLevel === level);
}
