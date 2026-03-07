/**
 * TAVR Decision Suite - Input Validation
 *
 * Comprehensive range-checking and clinical plausibility validation for all
 * user-entered measurements. Returns structured errors and warnings with
 * clinically helpful messages.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ValidationError {
  /** Field identifier that failed validation */
  field: string;
  /** Human-readable clinical message */
  message: string;
  /** 'error' = blocks calculation; 'warning' = flags for review but allows calculation */
  severity: 'warning' | 'error';
}

export interface EchoParams {
  lvef?: number;
  lvotDiameter?: number;
  lvotTVI?: number;
  aovTVI?: number;
  meanGradient?: number;
  peakGradient?: number;
  vmax?: number;
  strokeVolume?: number;
  lvEjectionTime?: number;
  systolicBP?: number;
  diastolicBP?: number;
}

export interface CTParams {
  calciumScore?: number;
  annulusDiameter?: number;
  annulusArea?: number;
  annulusPerimeter?: number;
}

export interface MeasurementErrorParams {
  lvotDiameter?: number;
  lvotTVI?: number;
  bsa?: number;
  ava?: number;
  dvi?: number;
  sbp?: number;
}

// ─── Demographics Validation ─────────────────────────────────────────────────

/**
 * Validate patient demographic inputs: age, height, weight.
 */
export function validateDemographics(
  age?: number,
  heightCm?: number,
  weightKg?: number,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (age !== undefined) {
    if (!Number.isFinite(age) || age < 0) {
      errors.push({
        field: 'age',
        message: 'Age must be a positive number.',
        severity: 'error',
      });
    } else if (age < 18) {
      errors.push({
        field: 'age',
        message: 'Age <18 years. This tool is designed for adult aortic stenosis evaluation.',
        severity: 'error',
      });
    } else if (age < 50) {
      errors.push({
        field: 'age',
        message:
          'Age <50 years is unusual for degenerative AS. Consider bicuspid aortopathy workup ' +
          'and confirm aetiology.',
        severity: 'warning',
      });
    } else if (age > 100) {
      errors.push({
        field: 'age',
        message:
          'Age >100 years. Verify entry. If correct, futility considerations and goals of ' +
          'care discussion are particularly important.',
        severity: 'warning',
      });
    }
  }

  if (heightCm !== undefined) {
    if (!Number.isFinite(heightCm) || heightCm <= 0) {
      errors.push({
        field: 'heightCm',
        message: 'Height must be a positive number in centimetres.',
        severity: 'error',
      });
    } else if (heightCm < 100 || heightCm > 220) {
      errors.push({
        field: 'heightCm',
        message:
          `Height ${heightCm} cm is outside the expected adult range (100-220 cm). ` +
          'Verify the value and units (ensure cm, not inches).',
        severity: heightCm < 50 || heightCm > 250 ? 'error' : 'warning',
      });
    }
  }

  if (weightKg !== undefined) {
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      errors.push({
        field: 'weightKg',
        message: 'Weight must be a positive number in kilograms.',
        severity: 'error',
      });
    } else if (weightKg < 30) {
      errors.push({
        field: 'weightKg',
        message:
          `Weight ${weightKg} kg is very low. Verify units (ensure kg, not lbs). ` +
          'If correct, consider cachexia impact on procedural risk.',
        severity: 'warning',
      });
    } else if (weightKg > 200) {
      errors.push({
        field: 'weightKg',
        message:
          `Weight ${weightKg} kg. Verify entry. Extreme obesity affects BSA calculations, ` +
          'vascular access assessment, and CT imaging quality.',
        severity: 'warning',
      });
    }
  }

  return errors;
}

// ─── Echocardiographic Validation ────────────────────────────────────────────

/**
 * Validate echocardiographic measurement inputs with clinically relevant
 * range checks and internal consistency evaluation.
 */
export function validateEcho(params: EchoParams): ValidationError[] {
  const errors: ValidationError[] = [];

  // ── LVEF ───────────────────────────────────────────────────────────────
  if (params.lvef !== undefined) {
    if (!Number.isFinite(params.lvef)) {
      errors.push({ field: 'lvef', message: 'LVEF must be a number.', severity: 'error' });
    } else if (params.lvef < 0 || params.lvef > 100) {
      errors.push({
        field: 'lvef',
        message: 'LVEF must be between 0% and 100%.',
        severity: 'error',
      });
    } else if (params.lvef > 75) {
      errors.push({
        field: 'lvef',
        message:
          `LVEF ${params.lvef}% is supranormal. Verify measurement method. ` +
          'Hyperdynamic LV may indicate small cavity / restrictive physiology.',
        severity: 'warning',
      });
    }
  }

  // ── LVOT Diameter ──────────────────────────────────────────────────────
  if (params.lvotDiameter !== undefined) {
    if (!Number.isFinite(params.lvotDiameter) || params.lvotDiameter <= 0) {
      errors.push({
        field: 'lvotDiameter',
        message: 'LVOT diameter must be a positive number (cm).',
        severity: 'error',
      });
    } else if (params.lvotDiameter < 1.5) {
      errors.push({
        field: 'lvotDiameter',
        message:
          `LVOT diameter ${params.lvotDiameter} cm is below 1.5 cm. This is unusually small ` +
          'and is a common source of AVA underestimation. Re-measure with zoom in the ' +
          'parasternal long axis view, inner edge to inner edge, in mid-systole.',
        severity: 'warning',
      });
    } else if (params.lvotDiameter > 3.2) {
      errors.push({
        field: 'lvotDiameter',
        message:
          `LVOT diameter ${params.lvotDiameter} cm exceeds 3.2 cm. This is unusually large. ` +
          'Verify measurement — possible inclusion of the aortic root or septal hypertrophy artifact.',
        severity: 'warning',
      });
    }
  }

  // ── LVOT TVI ───────────────────────────────────────────────────────────
  if (params.lvotTVI !== undefined) {
    if (!Number.isFinite(params.lvotTVI) || params.lvotTVI <= 0) {
      errors.push({
        field: 'lvotTVI',
        message: 'LVOT TVI must be a positive number (cm).',
        severity: 'error',
      });
    } else if (params.lvotTVI < 10) {
      errors.push({
        field: 'lvotTVI',
        message:
          `LVOT TVI ${params.lvotTVI} cm is very low (<10 cm). Suggests markedly reduced ` +
          'stroke volume or sample volume misplacement. Verify PW Doppler position.',
        severity: 'warning',
      });
    } else if (params.lvotTVI < 15) {
      errors.push({
        field: 'lvotTVI',
        message:
          `LVOT TVI ${params.lvotTVI} cm is below the typical range (15-25 cm). ` +
          'May indicate low-flow state or suboptimal Doppler alignment.',
        severity: 'warning',
      });
    } else if (params.lvotTVI > 35) {
      errors.push({
        field: 'lvotTVI',
        message:
          `LVOT TVI ${params.lvotTVI} cm exceeds the expected range. Verify PW sample volume ` +
          'is in the LVOT (not in the aortic valve) and rule out dynamic LVOT obstruction.',
        severity: 'warning',
      });
    }
  }

  // ── AoV TVI ────────────────────────────────────────────────────────────
  if (params.aovTVI !== undefined) {
    if (!Number.isFinite(params.aovTVI) || params.aovTVI <= 0) {
      errors.push({
        field: 'aovTVI',
        message: 'Aortic valve TVI must be a positive number (cm).',
        severity: 'error',
      });
    } else if (params.aovTVI > 200) {
      errors.push({
        field: 'aovTVI',
        message:
          `AoV TVI ${params.aovTVI} cm is extremely high. Verify CW Doppler envelope ` +
          'and ensure proper tracing (avoid noise/artifact inclusion).',
        severity: 'warning',
      });
    } else if (params.aovTVI < 20) {
      errors.push({
        field: 'aovTVI',
        message:
          `AoV TVI ${params.aovTVI} cm is very low. If Vmax is also low, this may be ` +
          'consistent with mild AS or very low flow. Verify CW alignment.',
        severity: 'warning',
      });
    }
  }

  // ── Mean Gradient ──────────────────────────────────────────────────────
  if (params.meanGradient !== undefined) {
    if (!Number.isFinite(params.meanGradient) || params.meanGradient < 0) {
      errors.push({
        field: 'meanGradient',
        message: 'Mean gradient must be a non-negative number (mmHg).',
        severity: 'error',
      });
    } else if (params.meanGradient > 100) {
      errors.push({
        field: 'meanGradient',
        message:
          `Mean gradient ${params.meanGradient} mmHg is extremely high (>100). Verify CW ` +
          'envelope — rule out contamination from MR jet or dynamic LVOT obstruction.',
        severity: 'warning',
      });
    }
  }

  // ── Peak Gradient ──────────────────────────────────────────────────────
  if (params.peakGradient !== undefined) {
    if (!Number.isFinite(params.peakGradient) || params.peakGradient < 0) {
      errors.push({
        field: 'peakGradient',
        message: 'Peak gradient must be a non-negative number (mmHg).',
        severity: 'error',
      });
    }
    // Peak must be >= mean
    if (
      params.meanGradient !== undefined &&
      params.peakGradient !== undefined &&
      params.peakGradient < params.meanGradient
    ) {
      errors.push({
        field: 'peakGradient',
        message:
          'Peak gradient cannot be less than mean gradient. Check entries.',
        severity: 'error',
      });
    }
  }

  // ── Vmax ───────────────────────────────────────────────────────────────
  if (params.vmax !== undefined) {
    if (!Number.isFinite(params.vmax) || params.vmax < 0) {
      errors.push({
        field: 'vmax',
        message: 'Peak aortic velocity (Vmax) must be a non-negative number (m/s).',
        severity: 'error',
      });
    } else if (params.vmax > 7.0) {
      errors.push({
        field: 'vmax',
        message:
          `Vmax ${params.vmax} m/s is extremely high. Verify CW Doppler alignment and ` +
          'rule out contamination from MR jet or LVOT obstruction signal.',
        severity: 'warning',
      });
    }

    // Vmax vs mean gradient consistency check
    if (params.meanGradient !== undefined && params.vmax !== undefined && params.vmax > 0) {
      const expectedPeakGradient = 4 * params.vmax * params.vmax;
      const expectedMeanGradient = expectedPeakGradient * 0.5; // rough approximation
      if (params.meanGradient > expectedPeakGradient) {
        errors.push({
          field: 'vmax',
          message:
            `Mean gradient (${params.meanGradient} mmHg) exceeds estimated peak gradient ` +
            `from Vmax (4V² = ${expectedPeakGradient.toFixed(0)} mmHg). Verify both values.`,
          severity: 'error',
        });
      } else if (Math.abs(params.meanGradient - expectedMeanGradient) > 25) {
        errors.push({
          field: 'vmax',
          message:
            `Vmax and mean gradient appear inconsistent. Expected MG ~${expectedMeanGradient.toFixed(0)} mmHg ` +
            `from Vmax ${params.vmax} m/s, but entered MG is ${params.meanGradient} mmHg.`,
          severity: 'warning',
        });
      }
    }
  }

  // ── Stroke Volume ──────────────────────────────────────────────────────
  if (params.strokeVolume !== undefined) {
    if (!Number.isFinite(params.strokeVolume) || params.strokeVolume <= 0) {
      errors.push({
        field: 'strokeVolume',
        message: 'Stroke volume must be a positive number (mL).',
        severity: 'error',
      });
    } else if (params.strokeVolume < 20) {
      errors.push({
        field: 'strokeVolume',
        message:
          `Stroke volume ${params.strokeVolume} mL is extremely low. Verify LVOT diameter ` +
          'and TVI measurements. Consider cardiogenic shock evaluation.',
        severity: 'warning',
      });
    } else if (params.strokeVolume > 150) {
      errors.push({
        field: 'strokeVolume',
        message:
          `Stroke volume ${params.strokeVolume} mL is very high. Verify LVOT measurements. ` +
          'Consider high-output state (anemia, AV fistula, thyrotoxicosis).',
        severity: 'warning',
      });
    }
  }

  // ── LV Ejection Time ──────────────────────────────────────────────────
  if (params.lvEjectionTime !== undefined) {
    if (!Number.isFinite(params.lvEjectionTime) || params.lvEjectionTime <= 0) {
      errors.push({
        field: 'lvEjectionTime',
        message: 'LV ejection time must be a positive number (ms).',
        severity: 'error',
      });
    } else if (params.lvEjectionTime < 150 || params.lvEjectionTime > 500) {
      errors.push({
        field: 'lvEjectionTime',
        message:
          `LV ejection time ${params.lvEjectionTime} ms is outside the expected range ` +
          '(150-500 ms). Verify measurement.',
        severity: 'warning',
      });
    }
  }

  // ── Blood Pressure ────────────────────────────────────────────────────
  if (params.systolicBP !== undefined) {
    if (!Number.isFinite(params.systolicBP) || params.systolicBP <= 0) {
      errors.push({
        field: 'systolicBP',
        message: 'Systolic BP must be a positive number (mmHg).',
        severity: 'error',
      });
    } else if (params.systolicBP > 200) {
      errors.push({
        field: 'systolicBP',
        message:
          `SBP ${params.systolicBP} mmHg is very elevated. Severe hypertension increases ` +
          'afterload and may falsely lower gradients. Consider repeating echo after BP optimisation.',
        severity: 'warning',
      });
    } else if (params.systolicBP < 80) {
      errors.push({
        field: 'systolicBP',
        message:
          `SBP ${params.systolicBP} mmHg is very low. Low output state may affect gradient ` +
          'measurements. Evaluate for cardiogenic shock or hypovolemia.',
        severity: 'warning',
      });
    }
  }

  if (params.diastolicBP !== undefined) {
    if (!Number.isFinite(params.diastolicBP) || params.diastolicBP <= 0) {
      errors.push({
        field: 'diastolicBP',
        message: 'Diastolic BP must be a positive number (mmHg).',
        severity: 'error',
      });
    }
    if (
      params.systolicBP !== undefined &&
      params.diastolicBP !== undefined &&
      params.diastolicBP >= params.systolicBP
    ) {
      errors.push({
        field: 'diastolicBP',
        message: 'Diastolic BP must be less than systolic BP. Check entries.',
        severity: 'error',
      });
    }
  }

  return errors;
}

// ─── CT Validation ───────────────────────────────────────────────────────────

/**
 * Validate CT-derived measurements.
 */
export function validateCT(params: CTParams): ValidationError[] {
  const errors: ValidationError[] = [];

  // ── Calcium Score ──────────────────────────────────────────────────────
  if (params.calciumScore !== undefined) {
    if (!Number.isFinite(params.calciumScore) || params.calciumScore < 0) {
      errors.push({
        field: 'calciumScore',
        message: 'Aortic valve calcium score must be a non-negative number (Agatston units).',
        severity: 'error',
      });
    } else if (params.calciumScore === 0) {
      errors.push({
        field: 'calciumScore',
        message:
          'Calcium score is 0 AU. Severe calcific AS is very unlikely with zero calcium. ' +
          'Consider: rheumatic disease, bicuspid valve without calcification, or measurement error.',
        severity: 'warning',
      });
    } else if (params.calciumScore > 10000) {
      errors.push({
        field: 'calciumScore',
        message:
          `Calcium score ${params.calciumScore} AU is extremely high. Verify that only aortic ` +
          'valve calcium is included (exclude mitral annular calcification, aortic wall calcium).',
        severity: 'warning',
      });
    }
  }

  // ── Annulus Diameter ───────────────────────────────────────────────────
  if (params.annulusDiameter !== undefined) {
    if (!Number.isFinite(params.annulusDiameter) || params.annulusDiameter <= 0) {
      errors.push({
        field: 'annulusDiameter',
        message: 'Annulus diameter must be a positive number (mm).',
        severity: 'error',
      });
    } else if (params.annulusDiameter < 16) {
      errors.push({
        field: 'annulusDiameter',
        message:
          `Annulus diameter ${params.annulusDiameter} mm is very small (<16 mm). ` +
          'Verify measurement plane. Very small annuli may be below THV sizing range.',
        severity: 'warning',
      });
    } else if (params.annulusDiameter > 32) {
      errors.push({
        field: 'annulusDiameter',
        message:
          `Annulus diameter ${params.annulusDiameter} mm is very large (>32 mm). ` +
          'Verify measurement. Large annuli may exceed available THV sizes. ' +
          'Consider area-derived diameter for elliptical annuli.',
        severity: 'warning',
      });
    }
  }

  // ── Annulus Area ───────────────────────────────────────────────────────
  if (params.annulusArea !== undefined) {
    if (!Number.isFinite(params.annulusArea) || params.annulusArea <= 0) {
      errors.push({
        field: 'annulusArea',
        message: 'Annulus area must be a positive number (mm²).',
        severity: 'error',
      });
    } else if (params.annulusArea < 200) {
      errors.push({
        field: 'annulusArea',
        message:
          `Annulus area ${params.annulusArea} mm² is very small (<200 mm²). ` +
          'Verify measurement. May be below minimum for available THVs.',
        severity: 'warning',
      });
    } else if (params.annulusArea > 900) {
      errors.push({
        field: 'annulusArea',
        message:
          `Annulus area ${params.annulusArea} mm² is very large (>900 mm²). ` +
          'Verify measurement — may exceed largest available THV sizes.',
        severity: 'warning',
      });
    }

    // Cross-check area vs diameter
    if (params.annulusDiameter !== undefined && params.annulusArea !== undefined) {
      const expectedArea = Math.PI * Math.pow(params.annulusDiameter / 2, 2);
      const ratio = params.annulusArea / expectedArea;
      if (ratio < 0.7 || ratio > 1.3) {
        errors.push({
          field: 'annulusArea',
          message:
            `Annulus area (${params.annulusArea} mm²) and diameter (${params.annulusDiameter} mm) ` +
            'are inconsistent. This is expected for elliptical annuli — use the area-derived ' +
            'diameter for THV sizing.',
          severity: 'warning',
        });
      }
    }
  }

  // ── Annulus Perimeter ──────────────────────────────────────────────────
  if (params.annulusPerimeter !== undefined) {
    if (!Number.isFinite(params.annulusPerimeter) || params.annulusPerimeter <= 0) {
      errors.push({
        field: 'annulusPerimeter',
        message: 'Annulus perimeter must be a positive number (mm).',
        severity: 'error',
      });
    } else if (params.annulusPerimeter < 50) {
      errors.push({
        field: 'annulusPerimeter',
        message:
          `Annulus perimeter ${params.annulusPerimeter} mm is very small (<50 mm). Verify measurement.`,
        severity: 'warning',
      });
    } else if (params.annulusPerimeter > 110) {
      errors.push({
        field: 'annulusPerimeter',
        message:
          `Annulus perimeter ${params.annulusPerimeter} mm is very large (>110 mm). Verify measurement.`,
        severity: 'warning',
      });
    }
  }

  return errors;
}

// ─── Measurement Error Detection ─────────────────────────────────────────────

/**
 * Check for common echocardiographic measurement errors that affect AS grading.
 * These flags do NOT invalidate the data but alert the clinician to re-examine
 * specific measurements.
 *
 * Based on: Baumgartner H et al. JASE 2017;30:372-392 and
 * Minners J et al. Heart 2010;96:1463-1468.
 */
export function checkMeasurementErrors(params: MeasurementErrorParams): ValidationError[] {
  const errors: ValidationError[] = [];

  // ── LVOT Diameter Outlier ──────────────────────────────────────────────
  if (params.lvotDiameter !== undefined) {
    if (params.lvotDiameter > 3.2) {
      errors.push({
        field: 'lvotDiameter',
        message:
          `LVOT diameter ${params.lvotDiameter} cm exceeds 3.2 cm. This is rarely correct ` +
          'and will cause AVA overestimation (LVOT area is a squared function of diameter). ' +
          'Re-measure in parasternal long axis with zoom, inner edge to inner edge, mid-systole.',
        severity: 'warning',
      });
    } else if (params.lvotDiameter < 1.5) {
      errors.push({
        field: 'lvotDiameter',
        message:
          `LVOT diameter ${params.lvotDiameter} cm is below 1.5 cm. This will cause AVA ` +
          'underestimation. Most common cause is undermeasurement due to calcification shadow ' +
          'or suboptimal imaging plane. Consider 3D echo or CT LVOT area.',
        severity: 'warning',
      });
    }
  }

  // ── SBP >140 at Time of Echo ───────────────────────────────────────────
  if (params.sbp !== undefined && params.sbp > 140) {
    errors.push({
      field: 'sbp',
      message:
        `SBP ${params.sbp} mmHg at time of echo. Elevated afterload reduces transvalvular ` +
        'flow and may result in falsely lower gradients. Consider repeating the echo after ' +
        'blood pressure normalisation, or interpret gradients with caution.',
      severity: 'warning',
    });
  }

  // ── BSA <1.6 and AVA Not Indexed ───────────────────────────────────────
  if (params.bsa !== undefined && params.bsa < 1.6 && params.ava !== undefined) {
    const indexedAVA = params.ava / params.bsa;
    errors.push({
      field: 'bsa',
      message:
        `BSA ${params.bsa.toFixed(2)} m² is small (<1.6). Absolute AVA may underestimate ` +
        `severity. Indexed AVA = ${indexedAVA.toFixed(2)} cm²/m² (severe if <0.6). ` +
        'Always use indexed AVA in patients with small body habitus.',
      severity: 'warning',
    });
  }

  // ── DVI Inconsistent with AVA ──────────────────────────────────────────
  if (params.dvi !== undefined && params.ava !== undefined) {
    if (params.ava < 1.0 && params.dvi >= 0.25) {
      errors.push({
        field: 'dvi',
        message:
          `DVI ${params.dvi.toFixed(2)} (>=0.25) is inconsistent with AVA ${params.ava.toFixed(2)} cm² (<1.0). ` +
          'DVI is independent of LVOT diameter measurement and may be more reliable. ' +
          'This discordance strongly suggests LVOT diameter undermeasurement. ' +
          'Re-measure LVOT diameter or use CT-derived LVOT area.',
        severity: 'warning',
      });
    } else if (params.ava >= 1.0 && params.dvi < 0.25) {
      errors.push({
        field: 'dvi',
        message:
          `DVI ${params.dvi.toFixed(2)} (<0.25) is inconsistent with AVA ${params.ava.toFixed(2)} cm² (>=1.0). ` +
          'DVI suggests severe AS but AVA does not. Re-measure LVOT diameter — possible ' +
          'overmeasurement causing AVA overestimation.',
        severity: 'warning',
      });
    }
  }

  // ── LVOT TVI <15 ───────────────────────────────────────────────────────
  if (params.lvotTVI !== undefined && params.lvotTVI < 15) {
    errors.push({
      field: 'lvotTVI',
      message:
        `LVOT TVI ${params.lvotTVI} cm is below the typical range (<15 cm). This may indicate ` +
        'a low-flow state or suboptimal PW Doppler sample volume placement. Verify that the ' +
        'sample volume is in the LVOT (just proximal to the aortic valve), aligned with flow, ' +
        'and that the spectral envelope is dense and well-defined.',
      severity: 'warning',
    });
  }

  // ── LVOT Diameter vs BSA Plausibility ──────────────────────────────────
  if (params.lvotDiameter !== undefined && params.bsa !== undefined) {
    // Expected LVOT diameter scales with BSA: roughly 1.8-2.3 cm for BSA 1.5-2.2
    const expectedMin = 1.4 + 0.25 * params.bsa;
    const expectedMax = 1.6 + 0.45 * params.bsa;
    if (params.lvotDiameter < expectedMin || params.lvotDiameter > expectedMax) {
      errors.push({
        field: 'lvotDiameter',
        message:
          `LVOT diameter ${params.lvotDiameter} cm may be inconsistent with BSA ` +
          `${params.bsa.toFixed(2)} m² (expected range ~${expectedMin.toFixed(1)}-${expectedMax.toFixed(1)} cm). ` +
          'This is a flag, not definitive — some patients have anatomy outside expected ranges.',
        severity: 'warning',
      });
    }
  }

  return errors;
}
