/**
 * TAVR Decision Suite - Clinical Calculations
 *
 * All hemodynamic and anatomical calculation functions used throughout the
 * application. Each function includes JSDoc with the originating formula
 * name and primary literature citation.
 */

// ─── Body Surface Area ───────────────────────────────────────────────────────

/** BSA using Mosteller formula. Mosteller RD. N Engl J Med 1987;317:1098. */
export function bsa(heightCm: number, weightKg: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

// ─── Valve Area & Flow Calculations ──────────────────────────────────────────

/**
 * Aortic Valve Area via the Continuity Equation.
 * AVA = (LVOT_area x LVOT_TVI) / AoV_TVI
 * Zoghbi WA et al. JASE 2009;22:1-23.
 */
export function ava(lvotDiamCm: number, lvotTVI: number, aovTVI: number): number {
  const lvotArea = Math.PI * Math.pow(lvotDiamCm / 2, 2);
  return (lvotArea * lvotTVI) / aovTVI;
}

/**
 * Indexed AVA (AVA / BSA).
 * Severe: <0.6 cm²/m².
 * Pibarot P, Dumesnil JG. Heart 2012;98:938-946.
 */
export function indexedAVA(avaVal: number, bsaVal: number): number {
  return avaVal / bsaVal;
}

/**
 * Stroke Volume Index (SV / BSA).
 * Low-flow threshold: <35 mL/m².
 * Hachicha Z et al. Circulation 2007;115:2856-2864.
 */
export function strokeVolumeIndex(sv: number, bsaVal: number): number {
  return sv / bsaVal;
}

/**
 * Transvalvular Flow Rate (mL/s).
 * Low-flow threshold: <200 mL/s.
 * Clavel MA et al. Circulation 2014;129:2516-2525.
 */
export function flowRate(sv: number, lvEjectionTimeMs: number): number {
  return sv / (lvEjectionTimeMs / 1000);
}

/**
 * Dimensionless Velocity Index (LVOT_TVI / AoV_TVI).
 * Severe AS: <0.25.
 * Otto CM. J Am Coll Cardiol 2006;47:2141-2151.
 */
export function dvi(lvotTVI: number, aovTVI: number): number {
  return lvotTVI / aovTVI;
}

/**
 * Systemic Arterial Compliance (SAC = SVI / pulse pressure).
 * Low compliance: <0.6 mL/m²/mmHg.
 * Hachicha Z et al. Circulation 2007;115:2856-2864.
 */
export function arterialCompliance(svi: number, sbp: number, dbp: number): number {
  return svi / (sbp - dbp);
}

/**
 * Projected AVA at normal flow rate (250 mL/s by default).
 * Used to distinguish true-severe from pseudo-severe AS on DSE.
 * Blais C et al. Circulation 2006;113:711-721.
 */
export function projectedAVA(
  stressAVA: number,
  stressFlow: number,
  normalFlow: number = 250,
): number {
  return stressAVA + (stressAVA * (normalFlow - stressFlow)) / stressFlow;
}

/**
 * Gorlin formula for invasive (catheterisation-derived) AVA.
 * AVA = flow / (44.3 x sqrt(mean gradient))
 * Gorlin R & Gorlin SG. Am Heart J 1951;41:1-29.
 *
 * @param cardiacOutput  Cardiac output in L/min
 * @param heartRate      Heart rate in bpm
 * @param sep            Systolic ejection period in seconds
 * @param meanGradient   Mean transvalvular gradient in mmHg
 */
export function gorlin(
  cardiacOutput: number,
  heartRate: number,
  sep: number,
  meanGradient: number,
): number {
  const flow = (cardiacOutput * 1000) / (heartRate * sep);
  return flow / (44.3 * Math.sqrt(meanGradient));
}

// ─── Valve-in-Valve Calculations ─────────────────────────────────────────────

/**
 * Predicted Valve-in-Valve Effective Orifice Area.
 * Uses 65 % coefficient of the internal geometric orifice area.
 * Dvir D et al. JACC 2012;59:2317-2327.
 *
 * @param surgicalValveInternalDiameterCm  True internal diameter in cm
 */
export function predictedVIVEOA(surgicalValveInternalDiameterCm: number): number {
  return Math.PI * Math.pow(surgicalValveInternalDiameterCm / 2, 2) * 0.65;
}

/**
 * Indexed Effective Orifice Area.
 * Severe PPM: <0.65 cm²/m². Moderate PPM: 0.65-0.85 cm²/m².
 * Pibarot P, Dumesnil JG. JACC 2014;63:1154-1156.
 */
export function indexedEOA(eoa: number, bsaVal: number): number {
  return eoa / bsaVal;
}

/**
 * Coronary obstruction risk stratification based on coronary ostium height
 * above the annulus measured on CT.
 * Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486.
 *
 * @param coronaryHeightMm  Distance from annulus to coronary ostium in mm
 */
export function coronaryObstructionRisk(
  coronaryHeightMm: number,
): 'high' | 'intermediate' | 'low' {
  if (coronaryHeightMm < 10) return 'high';
  if (coronaryHeightMm <= 12) return 'intermediate';
  return 'low';
}

// ─── Annulus Geometry Conversions ─────────────────────────────────────────────
// All values in mm (or mm² for area). These assume a circular cross-section;
// for CT-derived elliptical measurements use the area-derived diameter.

/** Calculate annulus area (mm²) from diameter (mm). */
export function annulusAreaFromDiameter(diameterMm: number): number {
  return Math.PI * Math.pow(diameterMm / 2, 2);
}

/** Calculate annulus diameter (mm) from area (mm²). */
export function annulusDiameterFromArea(areaMm2: number): number {
  return 2 * Math.sqrt(areaMm2 / Math.PI);
}

/** Calculate annulus diameter (mm) from perimeter (mm). */
export function annulusDiameterFromPerimeter(perimeterMm: number): number {
  return perimeterMm / Math.PI;
}

/** Calculate annulus perimeter (mm) from diameter (mm). */
export function annulusPerimeterFromDiameter(diameterMm: number): number {
  return Math.PI * diameterMm;
}

/** Calculate annulus area (mm²) from perimeter (mm). */
export function annulusAreaFromPerimeter(perimeterMm: number): number {
  const d = perimeterMm / Math.PI;
  return Math.PI * Math.pow(d / 2, 2);
}

/** Calculate annulus perimeter (mm) from area (mm²). */
export function annulusPerimeterFromArea(areaMm2: number): number {
  const d = 2 * Math.sqrt(areaMm2 / Math.PI);
  return Math.PI * d;
}
