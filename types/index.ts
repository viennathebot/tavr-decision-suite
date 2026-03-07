// =============================================================================
// TAVR Decision Suite - TypeScript Type Definitions
// For interventional cardiologists evaluating aortic stenosis and
// transcatheter aortic valve replacement candidacy.
// =============================================================================

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

export enum Sex {
  Male = "Male",
  Female = "Female",
}

export enum NYHAClass {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
}

export enum BicuspidType {
  None = "None",
  Type0 = "Type0",
  Type1 = "Type1",
  Type2 = "Type2",
}

export enum CalcificationGrade {
  None = "None",
  Mild = "Mild",
  Moderate = "Moderate",
  Severe = "Severe",
}

export enum ASPattern {
  HighGradient = "HighGradient",
  ClassicLFLG = "ClassicLFLG",
  ParadoxicalLFLG = "ParadoxicalLFLG",
  NormalFlowLG = "NormalFlowLG",
  Moderate = "Moderate",
  Discordant = "Discordant",
}

export enum Urgency {
  High = "High",
  Moderate = "Moderate",
  Watch = "Watch",
}

export enum EvidenceLevel {
  A = "A",
  B = "B",
  C = "C",
}

export enum FailureMode {
  Stenosis = "Stenosis",
  Regurgitation = "Regurgitation",
  Combined = "Combined",
}

export enum AccessRoute {
  Transfemoral = "Transfemoral",
  Transapical = "Transapical",
  Transaortic = "Transaortic",
  Transaxillary = "Transaxillary",
  Transcaval = "Transcaval",
}

export enum RiskLevel {
  High = "High",
  Intermediate = "Intermediate",
  Low = "Low",
}

export enum ProcedureType {
  TAVRinSAVR = "TAVRinSAVR",
  TAVRinTAVR = "TAVRinTAVR",
}

export enum GuidelineClass {
  I = "I",
  IIa = "IIa",
  IIb = "IIb",
  III = "III",
}

export enum FlowState {
  LowFlow = "LowFlow",
  NormalFlow = "NormalFlow",
}

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

/** Patient demographic and baseline clinical information. */
export interface Demographics {
  age: number | undefined;
  sex: Sex | undefined;
  heightCm: number | undefined;
  weightKg: number | undefined;
  symptomatic: boolean | undefined;
  nyhaClass: NYHAClass | undefined;
}

/** Transthoracic echocardiographic measurements for AS evaluation. */
export interface EchoParameters {
  lvef: number | undefined;
  lvotDiameter: number | undefined;
  lvotTVI: number | undefined;
  aovTVI: number | undefined;
  meanGradient: number | undefined;
  peakGradient: number | undefined;
  vmax: number | undefined;
  strokeVolume: number | undefined;
  lvEjectionTime: number | undefined;
  systolicBP: number | undefined;
  diastolicBP: number | undefined;
}

/** CT-derived annular and calcium measurements for TAVR planning. */
export interface CTParameters {
  calciumScore: number | undefined;
  annulusDiameter: number | undefined;
  annulusArea: number | undefined;
  annulusPerimeter: number | undefined;
  lvotDiameterCT: number | undefined;
  bicuspidType: BicuspidType | undefined;
  leafletCalcification: CalcificationGrade | undefined;
  lvotCalcification: CalcificationGrade | undefined;
}

/** Low-dose dobutamine stress echo parameters for low-flow, low-gradient AS. */
export interface DobutamineParameters {
  stressLVEF: number | undefined;
  stressMeanGradient: number | undefined;
  stressAVA: number | undefined;
  stressStrokeVolume: number | undefined;
}

/** Hemodynamic values derived from primary measurements. */
export interface CalculatedValues {
  bsa: number;
  ava: number;
  indexedAVA: number;
  svi: number;
  flowRate: number;
  dvi: number;
  arterialCompliance: number;
  projectedAVA?: number;
}

/** Result of algorithmic AS pattern classification. */
export interface ClassificationResult {
  pattern: ASPattern;
  confidence: number;
  discordances: string[];
  description: string;
}

/** Validation error or warning for a specific measurement field. */
export interface MeasurementError {
  field: string;
  message: string;
  severity: "warning" | "error";
}

/** Guideline-based clinical recommendation with actionable steps. */
export interface Recommendation {
  title: string;
  description: string;
  urgency: Urgency;
  actions: string[];
  guideline: string;
  guidelineClass: GuidelineClass;
  citation: string;
}

/** Aortic valve calcium score interpretation stratified by sex. */
export interface CalciumInterpretation {
  category: "non-severe" | "indeterminate" | "severe";
  threshold: number;
  score: number;
  sex: Sex;
}

/** Reference to a clinical publication or landmark trial. */
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  keyFindings: string[];
  clinicalTakeaway: string;
  tags: string[];
  evidenceLevel: EvidenceLevel;
  sampleSize?: number;
  primaryOutcome?: string;
}

/** Specifications for a surgical aortic valve prosthesis. */
export interface SurgicalValve {
  manufacturer: string;
  model: string;
  labeledSize: number;
  internalDiameter: number;
  externalDiameter: number;
  stented: boolean;
  supraAnnular?: boolean;
  notes?: string;
}

/** Specifications for a transcatheter aortic valve prosthesis. */
export interface TAVRValve {
  manufacturer: string;
  model: string;
  size: number;
  annulusAreaRange: [min: number, max: number];
  annulusPerimeterRange?: [min: number, max: number];
  annulusDiameterRange?: [min: number, max: number];
  sheathSize?: number;
  selfExpanding: boolean;
  notes?: string;
}

/** Valve-in-valve recommendation with sizing, access, and risk guidance. */
export interface VIVRecommendation {
  recommendedValve: string;
  recommendedSize: number;
  rationale: string;
  alternatives: Array<{
    valve: string;
    size: number;
    pros: string[];
    cons: string[];
  }>;
  riskFlags: VIVRiskFlag[];
  accessRecommendation: AccessRoute;
  preDilationRecommended: boolean;
  bvfConsideration?: string;
  anticoagulationNote: string;
}

/** Risk flag raised during valve-in-valve evaluation. */
export interface VIVRiskFlag {
  flag: string;
  level: RiskLevel;
  description: string;
  citation: string;
}

/** A clinical threshold defining severity boundaries for a parameter. */
export interface ClinicalThreshold {
  parameter: string;
  value: number;
  unit: string;
  comparison: "<" | ">" | "<=" | ">=";
  severity: "severe" | "moderate" | "normal";
  citation: string;
}

/** A single node in the diagnostic or treatment decision algorithm. */
export interface AlgorithmStep {
  id: string;
  title: string;
  description: string;
  details: string;
  evidence?: string;
  guidelineClass?: GuidelineClass;
  children?: string[];
}

/** A persisted patient case with all input and derived data. */
export interface SavedCase {
  id: string;
  name: string;
  date: string;
  demographics: Demographics;
  echo: EchoParameters;
  ct?: CTParameters;
  dobutamine?: DobutamineParameters;
  calculated: CalculatedValues;
  classification: ClassificationResult;
  recommendations: Recommendation[];
}

/** CT-derived annulus dimensions (all values in mm). */
export interface AnnulusCalculation {
  area?: number;
  perimeter?: number;
  diameter?: number;
}
