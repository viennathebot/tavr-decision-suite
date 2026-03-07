/**
 * TAVR Decision Suite - Valve-in-Valve (VIV) Calculations & Risk Assessment
 *
 * Functions for assessing VIV TAVR risk, predicting post-VIV haemodynamics,
 * and selecting optimal transcatheter valve sizes for degenerated surgical
 * bioprostheses.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VIVRiskFlag {
  /** Short identifier for the risk */
  flag: string;
  /** Severity level */
  level: 'high' | 'intermediate' | 'low';
  /** Detailed clinical description */
  description: string;
  /** Primary literature citation */
  citation: string;
}

export interface VIVAssessmentInput {
  /** Manufacturer's labeled size of the surgical bioprosthesis (mm) */
  surgicalValveLabeledSize?: number;
  /** True internal diameter of the surgical bioprosthesis (mm) */
  surgicalValveID?: number;
  /** Distance from annulus to left coronary artery ostium (mm) */
  coronaryHeightLCA?: number;
  /** Distance from annulus to right coronary artery ostium (mm) */
  coronaryHeightRCA?: number;
  /** Sinus of Valsalva width at LCA level (mm) */
  sinusWidthLCA?: number;
  /** Sinus of Valsalva width at RCA level (mm) */
  sinusWidthRCA?: number;
  /** Patient BSA (m²) */
  patientBSA?: number;
  /** Mode of bioprosthetic failure: 'stenosis' | 'regurgitation' | 'mixed' */
  failureMode?: string;
  /** Surgical valve type: 'stented' | 'stentless' | 'sutureless' */
  procedureType?: string;
}

export interface VIVValveRecommendation {
  /** Recommended THV type */
  valveType: string;
  /** Recommended size (mm) */
  size: number;
  /** Expected post-VIV indexed EOA (cm²/m²) */
  predictedIndexedEOA?: number;
  /** Whether BVF should be considered */
  considerBVF: boolean;
  /** Clinical notes */
  notes: string[];
}

// ─── Risk Assessment ─────────────────────────────────────────────────────────

/**
 * Assess all VIV-specific risk factors and return an array of flagged risks
 * with severity levels and supporting citations.
 */
export function assessVIVRisks(input: VIVAssessmentInput): VIVRiskFlag[] {
  const flags: VIVRiskFlag[] = [];

  // ── Flag 1: Small Surgical Bioprosthesis ───────────────────────────────
  if (input.surgicalValveLabeledSize !== undefined) {
    if (input.surgicalValveLabeledSize <= 21) {
      flags.push({
        flag: 'Small Surgical Bioprosthesis',
        level: 'high',
        description:
          `Labeled size ${input.surgicalValveLabeledSize}mm. High risk of patient-prosthesis ` +
          'mismatch (PPM) post-VIV. Consider bioprosthetic valve fracture (BVF) to expand ' +
          'the effective orifice and accommodate a larger THV. Supra-annular THV designs ' +
          '(e.g., Evolut) may partially mitigate PPM in small surgical valves.',
        citation: 'Dvir D et al. JACC 2012;59:2317-2327; Pibarot P et al. JACC 2014;63:1154-1156',
      });
    } else if (input.surgicalValveLabeledSize === 23) {
      flags.push({
        flag: 'Moderate-Size Surgical Bioprosthesis',
        level: 'intermediate',
        description:
          `Labeled size ${input.surgicalValveLabeledSize}mm. Moderate risk of PPM post-VIV, ` +
          'especially in patients with large BSA (>2.0 m²). Evaluate predicted indexed EOA ' +
          'and consider BVF if predicted severe PPM.',
        citation: 'Dvir D et al. Circ Cardiovasc Interv 2014;7:709-718',
      });
    }
  }

  // ── Flag 2: Coronary Obstruction Risk — LCA ────────────────────────────
  if (input.coronaryHeightLCA !== undefined) {
    if (input.coronaryHeightLCA < 10) {
      flags.push({
        flag: 'High Risk of LCA Coronary Obstruction',
        level: 'high',
        description:
          `LCA ostium height ${input.coronaryHeightLCA}mm (<10mm). High risk of coronary ` +
          'obstruction during VIV deployment. Evaluate virtual THV-to-coronary (VTC) distance ' +
          'on CT. Consider BASILICA (Bioprosthetic or native Aortic Scallop Intentional ' +
          'Laceration to prevent Iatrogenic Coronary Artery obstruction) if VTC <4mm.',
        citation: 'Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486',
      });
    } else if (input.coronaryHeightLCA <= 12) {
      flags.push({
        flag: 'Intermediate Risk of LCA Coronary Obstruction',
        level: 'intermediate',
        description:
          `LCA ostium height ${input.coronaryHeightLCA}mm (10-12mm). Intermediate risk. ` +
          'Perform detailed VTC distance assessment on CT with virtual THV implantation.',
        citation: 'Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486',
      });
    } else {
      flags.push({
        flag: 'Low Risk of LCA Coronary Obstruction',
        level: 'low',
        description:
          `LCA ostium height ${input.coronaryHeightLCA}mm (>12mm). Low risk of coronary ` +
          'obstruction. Standard VIV approach appropriate.',
        citation: 'Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486',
      });
    }

    // Sinus width adds nuance to coronary risk
    if (input.sinusWidthLCA !== undefined && input.coronaryHeightLCA < 12) {
      if (input.sinusWidthLCA < 28) {
        flags.push({
          flag: 'Narrow LCA Sinus of Valsalva',
          level: 'high',
          description:
            `LCA sinus width ${input.sinusWidthLCA}mm (<28mm) combined with low coronary ` +
            'height further increases coronary obstruction risk. BASILICA strongly considered.',
          citation: 'Khan JM et al. JACC 2019;73:2521-2534',
        });
      }
    }
  }

  // ── Flag 3: Coronary Obstruction Risk — RCA ────────────────────────────
  if (input.coronaryHeightRCA !== undefined) {
    if (input.coronaryHeightRCA < 10) {
      flags.push({
        flag: 'High Risk of RCA Coronary Obstruction',
        level: 'high',
        description:
          `RCA ostium height ${input.coronaryHeightRCA}mm (<10mm). High risk of RCA ` +
          'obstruction during VIV. Evaluate VTC distance on CT. BASILICA may be needed ' +
          'for the right coronary cusp.',
        citation: 'Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486',
      });
    } else if (input.coronaryHeightRCA <= 12) {
      flags.push({
        flag: 'Intermediate Risk of RCA Coronary Obstruction',
        level: 'intermediate',
        description:
          `RCA ostium height ${input.coronaryHeightRCA}mm (10-12mm). Intermediate risk ` +
          'of RCA obstruction. CT VTC assessment recommended.',
        citation: 'Ribeiro HB et al. JACC Cardiovasc Interv 2013;6:479-486',
      });
    }

    if (input.sinusWidthRCA !== undefined && input.coronaryHeightRCA < 12) {
      if (input.sinusWidthRCA < 28) {
        flags.push({
          flag: 'Narrow RCA Sinus of Valsalva',
          level: 'high',
          description:
            `RCA sinus width ${input.sinusWidthRCA}mm (<28mm) combined with low coronary ` +
            'height increases RCA obstruction risk.',
          citation: 'Khan JM et al. JACC 2019;73:2521-2534',
        });
      }
    }
  }

  // ── Flag 4: Predicted PPM Risk ─────────────────────────────────────────
  if (input.surgicalValveID !== undefined && input.patientBSA !== undefined) {
    const predictedEOA = Math.PI * Math.pow((input.surgicalValveID / 10) / 2, 2) * 0.65;
    const predictedIEOA = predictedEOA / input.patientBSA;

    if (predictedIEOA < 0.65) {
      flags.push({
        flag: 'Predicted Severe Patient-Prosthesis Mismatch',
        level: 'high',
        description:
          `Predicted post-VIV indexed EOA ${predictedIEOA.toFixed(2)} cm²/m² (<0.65). ` +
          'Severe PPM expected. Strongly consider bioprosthetic valve fracture (BVF) before ' +
          'or during VIV-TAVR to allow larger THV implantation and improve haemodynamic outcome. ' +
          'Alternative: supra-annular THV design.',
        citation: 'Pibarot P et al. JACC 2014;63:1154-1156; Saxon JT et al. Struct Heart 2019;3:118-124',
      });
    } else if (predictedIEOA < 0.85) {
      flags.push({
        flag: 'Predicted Moderate Patient-Prosthesis Mismatch',
        level: 'intermediate',
        description:
          `Predicted post-VIV indexed EOA ${predictedIEOA.toFixed(2)} cm²/m² (0.65-0.85). ` +
          'Moderate PPM expected. Consider BVF if patient has large BSA, active lifestyle, ' +
          'or anticipated need for future re-intervention.',
        citation: 'Pibarot P et al. JACC 2014;63:1154-1156',
      });
    } else {
      flags.push({
        flag: 'Acceptable Predicted Post-VIV Haemodynamics',
        level: 'low',
        description:
          `Predicted post-VIV indexed EOA ${predictedIEOA.toFixed(2)} cm²/m² (>=0.85). ` +
          'No significant PPM predicted. Standard VIV approach appropriate.',
        citation: 'Pibarot P et al. JACC 2014;63:1154-1156',
      });
    }
  }

  // ── Flag 5: Leaflet Thrombosis / HALT Consideration ────────────────────
  // VIV procedures have higher rates of subclinical leaflet thrombosis (HALT)
  flags.push({
    flag: 'Hypo-Attenuated Leaflet Thickening (HALT) Risk',
    level: 'intermediate',
    description:
      'VIV TAVR carries elevated risk of subclinical leaflet thrombosis (HALT/HAM) ' +
      'compared to native-valve TAVR, likely due to leaflet-in-leaflet stasis. Post-VIV ' +
      'anticoagulation strategy should be discussed. Consider 4D CT at 1-3 months ' +
      'post-procedure to evaluate for reduced leaflet motion.',
    citation: 'Makkar RR et al. N Engl J Med 2020;382:222-232',
  });

  // ── Flag 6: Stentless Valve Considerations ─────────────────────────────
  if (input.procedureType === 'stentless') {
    flags.push({
      flag: 'Stentless Bioprosthesis — Higher VIV Complexity',
      level: 'high',
      description:
        'Stentless surgical valves (e.g., Freestyle, Toronto SPV) pose unique VIV challenges: ' +
        'lack of radiopaque landmarks for positioning, variable true ID, and higher coronary ' +
        'obstruction risk due to proximity of leaflet tissue to coronary ostia. Experienced ' +
        'VIV operator and CT-guided planning essential.',
      citation: 'Dvir D et al. Circ Cardiovasc Interv 2014;7:709-718',
    });
  }

  // ── Flag 7: Failure mode considerations ────────────────────────────────
  if (input.failureMode === 'regurgitation') {
    flags.push({
      flag: 'Regurgitant Failure Mode',
      level: 'intermediate',
      description:
        'Bioprosthetic failure due to regurgitation carries higher risk of embolisation during ' +
        'VIV deployment because the degenerated leaflets may not provide adequate sealing or ' +
        'anchoring. Higher implantation may be preferred. Ensure adequate oversizing.',
      citation: 'Dvir D et al. JACC 2012;59:2317-2327',
    });
  }

  return flags;
}

// ─── VIV Valve Recommendation ────────────────────────────────────────────────

/**
 * Recommend transcatheter heart valve (THV) size for VIV based on surgical
 * valve internal diameter and patient BSA.
 */
export function recommendVIVValve(
  surgicalValveID: number,
  patientBSA?: number,
): VIVValveRecommendation[] {
  const recommendations: VIVValveRecommendation[] = [];
  const idCm = surgicalValveID / 10;
  const predictedEOA = Math.PI * Math.pow(idCm / 2, 2) * 0.65;
  const predictedIEOA = patientBSA ? predictedEOA / patientBSA : undefined;

  // Balloon-expandable (e.g., SAPIEN 3) — size matches or is slightly smaller than surgical ID
  if (surgicalValveID >= 20 && surgicalValveID < 22) {
    recommendations.push({
      valveType: 'SAPIEN 3',
      size: 20,
      predictedIndexedEOA: predictedIEOA,
      considerBVF: true,
      notes: [
        'Small surgical valve — BVF strongly recommended before S3 20mm implantation',
        'Post-BVF: may be able to upsize to S3 23mm for improved haemodynamics',
        'Alternative: consider supra-annular self-expanding THV',
      ],
    });
  } else if (surgicalValveID >= 22 && surgicalValveID < 25) {
    recommendations.push({
      valveType: 'SAPIEN 3',
      size: 23,
      predictedIndexedEOA: predictedIEOA,
      considerBVF: predictedIEOA !== undefined && predictedIEOA < 0.65,
      notes: [
        'S3 23mm fits surgical valves with ID 22-24mm',
        predictedIEOA !== undefined && predictedIEOA < 0.65
          ? 'Severe PPM predicted — consider BVF and upsizing to S3 26mm'
          : 'Acceptable predicted post-VIV haemodynamics with S3 23mm',
      ],
    });
  } else if (surgicalValveID >= 25 && surgicalValveID < 28) {
    recommendations.push({
      valveType: 'SAPIEN 3',
      size: 26,
      predictedIndexedEOA: predictedIEOA,
      considerBVF: false,
      notes: [
        'S3 26mm appropriate for surgical valves with ID 25-27mm',
        'Low risk of PPM in this size range',
      ],
    });
  } else if (surgicalValveID >= 28) {
    recommendations.push({
      valveType: 'SAPIEN 3',
      size: 29,
      predictedIndexedEOA: predictedIEOA,
      considerBVF: false,
      notes: [
        'S3 29mm for surgical valves with ID >=28mm',
        'Excellent post-VIV haemodynamics expected',
      ],
    });
  }

  // Self-expanding (e.g., Evolut R/PRO+) — supra-annular design may provide larger EOA
  if (surgicalValveID >= 18 && surgicalValveID < 22) {
    recommendations.push({
      valveType: 'Evolut R/PRO+',
      size: 23,
      predictedIndexedEOA: predictedIEOA
        ? predictedIEOA * 1.15 // ~15% benefit from supra-annular design
        : undefined,
      considerBVF: surgicalValveID < 20,
      notes: [
        'Supra-annular design provides larger functional EOA vs. intra-annular THVs',
        'Recommended as primary option for small surgical valves (ID <22mm)',
        surgicalValveID < 20
          ? 'Very small ID — BVF still recommended even with supra-annular THV'
          : 'May avoid need for BVF due to supra-annular leaflet position',
      ],
    });
  } else if (surgicalValveID >= 22 && surgicalValveID < 26) {
    recommendations.push({
      valveType: 'Evolut R/PRO+',
      size: 26,
      predictedIndexedEOA: predictedIEOA
        ? predictedIEOA * 1.15
        : undefined,
      considerBVF: false,
      notes: [
        'Evolut 26mm for surgical valves with ID 22-25mm',
        'Supra-annular design advantage for borderline PPM cases',
      ],
    });
  } else if (surgicalValveID >= 26 && surgicalValveID < 30) {
    recommendations.push({
      valveType: 'Evolut R/PRO+',
      size: 29,
      predictedIndexedEOA: predictedIEOA
        ? predictedIEOA * 1.15
        : undefined,
      considerBVF: false,
      notes: [
        'Evolut 29mm for surgical valves with ID 26-29mm',
        'Low risk of PPM',
      ],
    });
  } else if (surgicalValveID >= 30) {
    recommendations.push({
      valveType: 'Evolut R/PRO+',
      size: 34,
      predictedIndexedEOA: predictedIEOA
        ? predictedIEOA * 1.15
        : undefined,
      considerBVF: false,
      notes: [
        'Evolut 34mm for large surgical valves with ID >=30mm',
        'Excellent post-VIV haemodynamics expected',
      ],
    });
  }

  return recommendations;
}

// ─── BVF Decision ────────────────────────────────────────────────────────────

/**
 * Determine whether bioprosthetic valve fracture (BVF) should be considered
 * prior to or during VIV-TAVR to prevent severe PPM.
 *
 * BVF = High-pressure balloon fracture of the surgical bioprosthetic ring
 * to allow expansion of a larger THV.
 *
 * Saxon JT et al. Struct Heart 2019;3:118-124.
 *
 * @param labeledSize       Manufacturer's labeled size of surgical valve (mm)
 * @param predictedIndexedEOA  Predicted post-VIV indexed EOA (cm²/m²)
 * @returns true if BVF should be considered
 */
export function shouldConsiderBVF(
  labeledSize: number,
  predictedIndexedEOA: number,
): boolean {
  // BVF strongly recommended for:
  // 1. All <=21mm surgical valves (almost invariably result in severe PPM)
  // 2. 23mm valves with predicted severe PPM (<0.65 cm²/m²)
  // 3. Any size with predicted severe PPM if anatomically feasible

  if (labeledSize <= 21) return true;
  if (labeledSize === 23 && predictedIndexedEOA < 0.65) return true;
  if (predictedIndexedEOA < 0.65) return true;

  return false;
}

// ─── VIV Sizing Utility ──────────────────────────────────────────────────────

/**
 * Calculate the predicted post-VIV effective orifice area given a surgical
 * valve internal diameter. Uses the 65% coefficient model.
 * Dvir D et al. JACC 2012;59:2317-2327.
 *
 * @param surgicalValveIDmm  True internal diameter in mm
 * @returns Predicted EOA in cm²
 */
export function predictedVIVEOA(surgicalValveIDmm: number): number {
  const radiusCm = surgicalValveIDmm / 10 / 2;
  return Math.PI * radiusCm * radiusCm * 0.65;
}

/**
 * Calculate virtual THV-to-coronary (VTC) distance.
 * VTC <4mm is considered high risk for coronary obstruction.
 * Khan JM et al. JACC 2019;73:2521-2534.
 *
 * @param sinusWidthMm     Sinus of Valsalva width (mm) at coronary level
 * @param thvDiameterMm    Expected deployed THV outer diameter (mm)
 * @param leafletLengthMm  Surgical valve leaflet length extending into sinus (mm)
 * @returns VTC distance in mm
 */
export function virtualTHVToCoronaryDistance(
  sinusWidthMm: number,
  thvDiameterMm: number,
  leafletLengthMm: number,
): number {
  // Simplified model: VTC = sinus radius - (THV radius + leaflet displacement)
  const sinusRadius = sinusWidthMm / 2;
  const thvRadius = thvDiameterMm / 2;
  // Leaflet is displaced from THV edge toward sinus wall
  const vtc = sinusRadius - thvRadius - leafletLengthMm;
  return Math.max(vtc, 0);
}
