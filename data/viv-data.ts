// ─────────────────────────────────────────────────────────────
// Valve-in-Valve (VIV) Data for TAVR Decision Suite
// Sources: Manufacturer IFU, VIVID Registry, Valve-in-Valve App data
// ─────────────────────────────────────────────────────────────

export interface SurgicalValveData {
  manufacturer: string;
  model: string;
  stented: boolean;
  supraAnnular?: boolean;
  sizes: {
    labeledSize: number;
    internalDiameter: number; // mm
    externalDiameter: number; // mm
  }[];
  notes?: string;
}

export interface TAVRValveVIVData {
  manufacturer: string;
  model: string;
  sizes: {
    size: number;
    innerDiameter: number; // mm
    outerDiameter: number; // mm
    minIDForVIV?: number; // mm — minimum inner diameter of surgical valve for VIV
  }[];
  notes?: string;
}

// ═════════════════════════════════════════════════════════════
// SURGICAL BIOPROSTHETIC VALVES
// ═════════════════════════════════════════════════════════════

// ── Edwards Perimount ────────────────────────────────────────
export const PERIMOUNT: SurgicalValveData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'Perimount (Carpentier-Edwards)',
  stented: true,
  supraAnnular: false,
  sizes: [
    { labeledSize: 19, internalDiameter: 16.8, externalDiameter: 24.0 },
    { labeledSize: 21, internalDiameter: 18.5, externalDiameter: 26.0 },
    { labeledSize: 23, internalDiameter: 20.2, externalDiameter: 28.0 },
    { labeledSize: 25, internalDiameter: 21.7, externalDiameter: 30.0 },
    { labeledSize: 27, internalDiameter: 23.3, externalDiameter: 32.0 },
    { labeledSize: 29, internalDiameter: 25.1, externalDiameter: 34.0 },
  ],
  notes:
    'Most widely implanted surgical bioprosthesis. Bovine pericardial. Intra-annular design. Stent posts may limit TAVR expansion in small sizes.',
};

// ── Edwards Perimount Magna ──────────────────────────────────
export const PERIMOUNT_MAGNA: SurgicalValveData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'Perimount Magna',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.5, externalDiameter: 24.5 },
    { labeledSize: 21, internalDiameter: 19.5, externalDiameter: 26.5 },
    { labeledSize: 23, internalDiameter: 21.0, externalDiameter: 28.5 },
    { labeledSize: 25, internalDiameter: 22.5, externalDiameter: 30.5 },
    { labeledSize: 27, internalDiameter: 24.0, externalDiameter: 32.5 },
    { labeledSize: 29, internalDiameter: 25.5, externalDiameter: 34.5 },
  ],
  notes:
    'Supra-annular design provides larger effective orifice vs standard Perimount at same labeled size. Bovine pericardial.',
};

// ── Edwards Perimount Magna Ease ─────────────────────────────
export const PERIMOUNT_MAGNA_EASE: SurgicalValveData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'Perimount Magna Ease',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.5, externalDiameter: 24.5 },
    { labeledSize: 21, internalDiameter: 19.5, externalDiameter: 26.5 },
    { labeledSize: 23, internalDiameter: 21.0, externalDiameter: 28.5 },
    { labeledSize: 25, internalDiameter: 22.5, externalDiameter: 30.5 },
    { labeledSize: 27, internalDiameter: 24.0, externalDiameter: 32.5 },
    { labeledSize: 29, internalDiameter: 25.5, externalDiameter: 34.5 },
  ],
  notes:
    'Improved version of Magna with low-profile sewing ring for easier implantation. Same internal dimensions as Magna. Supra-annular bovine pericardial.',
};

// ── St. Jude/Abbott Trifecta ─────────────────────────────────
export const TRIFECTA: SurgicalValveData = {
  manufacturer: 'Abbott (St. Jude Medical)',
  model: 'Trifecta',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.0, externalDiameter: 24.0 },
    { labeledSize: 21, internalDiameter: 19.0, externalDiameter: 26.0 },
    { labeledSize: 23, internalDiameter: 21.0, externalDiameter: 28.0 },
    { labeledSize: 25, internalDiameter: 23.0, externalDiameter: 30.0 },
    { labeledSize: 27, internalDiameter: 25.0, externalDiameter: 32.0 },
    { labeledSize: 29, internalDiameter: 27.0, externalDiameter: 34.0 },
  ],
  notes:
    'Bovine pericardial valve with tissue mounted externally on titanium stent. Supra-annular design maximizes orifice area. Higher rates of early structural valve deterioration reported in some series.',
};

// ── St. Jude/Abbott Trifecta GT ──────────────────────────────
export const TRIFECTA_GT: SurgicalValveData = {
  manufacturer: 'Abbott (St. Jude Medical)',
  model: 'Trifecta GT',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.0, externalDiameter: 24.0 },
    { labeledSize: 21, internalDiameter: 19.0, externalDiameter: 26.0 },
    { labeledSize: 23, internalDiameter: 21.0, externalDiameter: 28.0 },
    { labeledSize: 25, internalDiameter: 23.0, externalDiameter: 30.0 },
    { labeledSize: 27, internalDiameter: 25.0, externalDiameter: 32.0 },
    { labeledSize: 29, internalDiameter: 27.0, externalDiameter: 34.0 },
  ],
  notes:
    'Updated Trifecta with Glide Technology (GT) sewing ring for easier implantation. Same internal dimensions and hemodynamic profile as original Trifecta.',
};

// ── Medtronic Hancock II ─────────────────────────────────────
export const HANCOCK_II: SurgicalValveData = {
  manufacturer: 'Medtronic',
  model: 'Hancock II',
  stented: true,
  supraAnnular: false,
  sizes: [
    { labeledSize: 21, internalDiameter: 17.0, externalDiameter: 25.0 },
    { labeledSize: 23, internalDiameter: 19.0, externalDiameter: 27.0 },
    { labeledSize: 25, internalDiameter: 20.5, externalDiameter: 29.0 },
    { labeledSize: 27, internalDiameter: 22.5, externalDiameter: 31.0 },
    { labeledSize: 29, internalDiameter: 24.0, externalDiameter: 33.0 },
    { labeledSize: 31, internalDiameter: 25.5, externalDiameter: 35.0 },
  ],
  notes:
    'Porcine valve with low-pressure fixation. Intra-annular design results in smaller internal diameter relative to labeled size. Well-documented long-term durability.',
};

// ── Medtronic Mosaic ─────────────────────────────────────────
export const MOSAIC: SurgicalValveData = {
  manufacturer: 'Medtronic',
  model: 'Mosaic',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 21, internalDiameter: 18.5, externalDiameter: 25.0 },
    { labeledSize: 23, internalDiameter: 20.0, externalDiameter: 27.0 },
    { labeledSize: 25, internalDiameter: 22.0, externalDiameter: 29.0 },
    { labeledSize: 27, internalDiameter: 24.0, externalDiameter: 31.0 },
    { labeledSize: 29, internalDiameter: 25.5, externalDiameter: 33.0 },
    { labeledSize: 31, internalDiameter: 27.0, externalDiameter: 35.0 },
  ],
  notes:
    'Porcine valve with zero-pressure fixation and supra-annular design. Slightly larger internal diameter than Hancock II at same labeled size.',
};

// ── Medtronic Freestyle (Stentless) ──────────────────────────
export const FREESTYLE: SurgicalValveData = {
  manufacturer: 'Medtronic',
  model: 'Freestyle',
  stented: false,
  supraAnnular: false,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.0, externalDiameter: 22.0 },
    { labeledSize: 21, internalDiameter: 19.0, externalDiameter: 24.0 },
    { labeledSize: 23, internalDiameter: 21.0, externalDiameter: 26.0 },
    { labeledSize: 25, internalDiameter: 23.0, externalDiameter: 28.0 },
    { labeledSize: 27, internalDiameter: 25.0, externalDiameter: 30.0 },
    { labeledSize: 29, internalDiameter: 27.0, externalDiameter: 32.0 },
  ],
  notes:
    'Stentless porcine root bioprosthesis. No rigid stent frame provides larger effective orifice. VIV sizing more complex — landing zone is the tissue annulus. Coronary obstruction risk may be lower with subcoronary implant technique.',
};

// ── Carpentier-Edwards (CE) Porcine Standard ─────────────────
export const CE_PORCINE_STANDARD: SurgicalValveData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'Carpentier-Edwards Porcine Standard',
  stented: true,
  supraAnnular: false,
  sizes: [
    { labeledSize: 21, internalDiameter: 16.5, externalDiameter: 25.0 },
    { labeledSize: 23, internalDiameter: 18.5, externalDiameter: 27.0 },
    { labeledSize: 25, internalDiameter: 20.5, externalDiameter: 29.0 },
    { labeledSize: 27, internalDiameter: 22.0, externalDiameter: 31.0 },
    { labeledSize: 29, internalDiameter: 23.5, externalDiameter: 33.0 },
    { labeledSize: 31, internalDiameter: 25.0, externalDiameter: 35.0 },
  ],
  notes:
    'Early-generation porcine bioprosthesis. Intra-annular design with relatively smaller internal diameters. High PPM risk with VIV in small sizes.',
};

// ── Carpentier-Edwards (CE) Porcine Supra-Annular ────────────
export const CE_PORCINE_SUPRA: SurgicalValveData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'Carpentier-Edwards Supra-Annular Valve (SAV)',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 21, internalDiameter: 18.0, externalDiameter: 25.5 },
    { labeledSize: 23, internalDiameter: 20.0, externalDiameter: 27.5 },
    { labeledSize: 25, internalDiameter: 22.0, externalDiameter: 29.5 },
    { labeledSize: 27, internalDiameter: 23.5, externalDiameter: 31.5 },
    { labeledSize: 29, internalDiameter: 25.0, externalDiameter: 33.5 },
    { labeledSize: 31, internalDiameter: 26.5, externalDiameter: 35.5 },
  ],
  notes:
    'Porcine valve with supra-annular positioning. Provides larger internal diameter than standard CE porcine at same labeled size. Widely used historically.',
};

// ── St. Jude/Abbott Epic ─────────────────────────────────────
export const EPIC: SurgicalValveData = {
  manufacturer: 'Abbott (St. Jude Medical)',
  model: 'Epic',
  stented: true,
  supraAnnular: true,
  sizes: [
    { labeledSize: 19, internalDiameter: 16.5, externalDiameter: 23.5 },
    { labeledSize: 21, internalDiameter: 18.0, externalDiameter: 25.5 },
    { labeledSize: 23, internalDiameter: 20.0, externalDiameter: 27.5 },
    { labeledSize: 25, internalDiameter: 22.0, externalDiameter: 29.5 },
    { labeledSize: 27, internalDiameter: 23.5, externalDiameter: 31.5 },
    { labeledSize: 29, internalDiameter: 25.0, externalDiameter: 33.5 },
  ],
  notes:
    'Porcine valve with Linx anticalcification technology. Supra-annular design. Predecessor to Trifecta in the St. Jude/Abbott portfolio.',
};

// ── St. Jude/Abbott Biocor (Stentless) ───────────────────────
export const BIOCOR_STENTLESS: SurgicalValveData = {
  manufacturer: 'Abbott (St. Jude Medical)',
  model: 'Biocor Stentless',
  stented: false,
  supraAnnular: false,
  sizes: [
    { labeledSize: 19, internalDiameter: 17.5, externalDiameter: 22.0 },
    { labeledSize: 21, internalDiameter: 19.5, externalDiameter: 24.0 },
    { labeledSize: 23, internalDiameter: 21.5, externalDiameter: 26.0 },
    { labeledSize: 25, internalDiameter: 23.5, externalDiameter: 28.0 },
    { labeledSize: 27, internalDiameter: 25.5, externalDiameter: 30.0 },
    { labeledSize: 29, internalDiameter: 27.5, externalDiameter: 32.0 },
  ],
  notes:
    'Stentless porcine valve. Larger effective orifice area compared to stented valves at same labeled size. VIV sizing should target the tissue annulus diameter on CT.',
};

// ── All Surgical Valves Collection ───────────────────────────
export const ALL_SURGICAL_VALVES: SurgicalValveData[] = [
  PERIMOUNT,
  PERIMOUNT_MAGNA,
  PERIMOUNT_MAGNA_EASE,
  TRIFECTA,
  TRIFECTA_GT,
  HANCOCK_II,
  MOSAIC,
  FREESTYLE,
  CE_PORCINE_STANDARD,
  CE_PORCINE_SUPRA,
  EPIC,
  BIOCOR_STENTLESS,
];

// ═════════════════════════════════════════════════════════════
// TAVR VALVES — VIV Internal Dimension Data
// ═════════════════════════════════════════════════════════════

// ── Edwards SAPIEN 3 (VIV Dimensions) ────────────────────────
export const SAPIEN_3_VIV: TAVRValveVIVData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'SAPIEN 3',
  sizes: [
    { size: 20, innerDiameter: 17.0, outerDiameter: 24.2, minIDForVIV: 17.0 },
    { size: 23, innerDiameter: 20.0, outerDiameter: 27.0, minIDForVIV: 19.5 },
    { size: 26, innerDiameter: 22.5, outerDiameter: 30.5, minIDForVIV: 21.7 },
    { size: 29, innerDiameter: 25.0, outerDiameter: 33.5, minIDForVIV: 24.5 },
  ],
  notes:
    'Balloon-expandable. In VIV, the SAPIEN 3 will fully expand to the internal diameter of the surgical valve (if ID > minIDForVIV). Optimal for stented surgical valves with known ID. Risk of high residual gradient if surgical valve ID <20 mm.',
};

// ── Edwards SAPIEN 3 Ultra / Ultra Resilia (VIV Dimensions) ──
export const SAPIEN_3_ULTRA_VIV: TAVRValveVIVData = {
  manufacturer: 'Edwards Lifesciences',
  model: 'SAPIEN 3 Ultra / Ultra RESILIA',
  sizes: [
    { size: 20, innerDiameter: 17.0, outerDiameter: 24.5, minIDForVIV: 17.0 },
    { size: 23, innerDiameter: 20.0, outerDiameter: 27.3, minIDForVIV: 19.5 },
    { size: 26, innerDiameter: 22.5, outerDiameter: 30.8, minIDForVIV: 21.7 },
    { size: 29, innerDiameter: 25.0, outerDiameter: 33.8, minIDForVIV: 24.5 },
  ],
  notes:
    'Same frame dimensions as SAPIEN 3 with additional outer skirt. Slightly larger outer diameter due to textured PET sealing skirt. Consider that outer skirt may add ~0.3 mm to effective outer diameter in VIV scenarios.',
};

// ── Medtronic Evolut R (VIV Dimensions) ──────────────────────
export const EVOLUT_R_VIV: TAVRValveVIVData = {
  manufacturer: 'Medtronic',
  model: 'Evolut R',
  sizes: [
    { size: 23, innerDiameter: 20.0, outerDiameter: 24.0, minIDForVIV: 17.0 },
    { size: 26, innerDiameter: 22.0, outerDiameter: 27.0, minIDForVIV: 19.0 },
    { size: 29, innerDiameter: 24.5, outerDiameter: 30.0, minIDForVIV: 21.0 },
    { size: 34, innerDiameter: 28.5, outerDiameter: 35.0, minIDForVIV: 24.0 },
  ],
  notes:
    'Self-expanding supra-annular design. In VIV, the supra-annular leaflets extend above the surgical valve stent, potentially improving effective orifice area. Valve conforms to surgical valve ID. May not fully expand in small surgical valves.',
};

// ── Medtronic Evolut PRO / PRO+ (VIV Dimensions) ────────────
export const EVOLUT_PRO_VIV: TAVRValveVIVData = {
  manufacturer: 'Medtronic',
  model: 'Evolut PRO / PRO+',
  sizes: [
    { size: 23, innerDiameter: 20.0, outerDiameter: 24.5, minIDForVIV: 17.0 },
    { size: 26, innerDiameter: 22.0, outerDiameter: 27.5, minIDForVIV: 19.0 },
    { size: 29, innerDiameter: 24.5, outerDiameter: 30.5, minIDForVIV: 21.0 },
    { size: 34, innerDiameter: 28.5, outerDiameter: 35.5, minIDForVIV: 24.0 },
  ],
  notes:
    'Same frame as Evolut R with external pericardial wrap for improved sealing. Slightly larger outer diameter. Supra-annular leaflet design advantageous in VIV for improved hemodynamics in small surgical valves.',
};

// ── Medtronic Evolut FX (VIV Dimensions) ─────────────────────
export const EVOLUT_FX_VIV: TAVRValveVIVData = {
  manufacturer: 'Medtronic',
  model: 'Evolut FX',
  sizes: [
    { size: 23, innerDiameter: 20.0, outerDiameter: 24.5, minIDForVIV: 17.0 },
    { size: 26, innerDiameter: 22.0, outerDiameter: 27.5, minIDForVIV: 19.0 },
    { size: 29, innerDiameter: 24.5, outerDiameter: 30.5, minIDForVIV: 21.0 },
    { size: 34, innerDiameter: 28.5, outerDiameter: 35.5, minIDForVIV: 24.0 },
  ],
  notes:
    'Redesigned frame geometry. Same functional dimensions as Evolut PRO+ for VIV planning purposes. Enhanced radial force may provide better expansion within rigid surgical stent frames.',
};

// ── Abbott Navitor (VIV Dimensions) ──────────────────────────
export const NAVITOR_VIV: TAVRValveVIVData = {
  manufacturer: 'Abbott',
  model: 'Navitor',
  sizes: [
    { size: 23, innerDiameter: 19.5, outerDiameter: 25.0, minIDForVIV: 18.0 },
    { size: 25, innerDiameter: 21.5, outerDiameter: 27.0, minIDForVIV: 20.0 },
    { size: 27, innerDiameter: 23.5, outerDiameter: 29.0, minIDForVIV: 22.0 },
    { size: 29, innerDiameter: 25.0, outerDiameter: 31.0, minIDForVIV: 23.5 },
  ],
  notes:
    'Self-expanding supra-annular valve. NaviSeal cuff provides paravalvular sealing within the surgical valve frame. Supra-annular leaflet design may provide hemodynamic advantage in VIV applications.',
};

// ── Boston Scientific Acurate neo2 (VIV Dimensions) ──────────
export const ACURATE_NEO2_VIV: TAVRValveVIVData = {
  manufacturer: 'Boston Scientific',
  model: 'Acurate neo2',
  sizes: [
    { size: 23, innerDiameter: 20.0, outerDiameter: 25.0, minIDForVIV: 18.5 },
    { size: 25, innerDiameter: 22.0, outerDiameter: 27.0, minIDForVIV: 20.5 },
    { size: 27, innerDiameter: 24.0, outerDiameter: 29.0, minIDForVIV: 22.0 },
  ],
  notes:
    'Self-expanding supra-annular valve with top-down deployment. S/M/L labeled as 23/25/27 for VIV reference. Supra-annular leaflet design. Limited data for VIV use compared to SAPIEN and Evolut platforms.',
};

// ── All TAVR VIV Data Collection ─────────────────────────────
export const ALL_TAVR_VIV_DATA: TAVRValveVIVData[] = [
  SAPIEN_3_VIV,
  SAPIEN_3_ULTRA_VIV,
  EVOLUT_R_VIV,
  EVOLUT_PRO_VIV,
  EVOLUT_FX_VIV,
  NAVITOR_VIV,
  ACURATE_NEO2_VIV,
];

// ═════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═════════════════════════════════════════════════════════════

/**
 * Find a surgical valve by manufacturer and model name (partial match).
 */
export function findSurgicalValve(
  manufacturer: string,
  model: string,
): SurgicalValveData | undefined {
  const mfgLower = manufacturer.toLowerCase();
  const modelLower = model.toLowerCase();
  return ALL_SURGICAL_VALVES.find(
    (v) =>
      v.manufacturer.toLowerCase().includes(mfgLower) &&
      v.model.toLowerCase().includes(modelLower),
  );
}

/**
 * Get internal diameter of a surgical valve by model and labeled size.
 */
export function getSurgicalValveID(
  valve: SurgicalValveData,
  labeledSize: number,
): number | undefined {
  const sizeData = valve.sizes.find((s) => s.labeledSize === labeledSize);
  return sizeData?.internalDiameter;
}

/**
 * Find suitable TAVR valves for VIV given a surgical valve internal diameter.
 * Returns TAVR valve sizes whose minIDForVIV is <= the surgical valve ID.
 */
export function findTAVRForVIV(
  surgicalValveID: number,
): { tavrValve: TAVRValveVIVData; size: TAVRValveVIVData['sizes'][number] }[] {
  const results: { tavrValve: TAVRValveVIVData; size: TAVRValveVIVData['sizes'][number] }[] = [];

  for (const tavrValve of ALL_TAVR_VIV_DATA) {
    for (const size of tavrValve.sizes) {
      if (size.minIDForVIV !== undefined && size.minIDForVIV <= surgicalValveID) {
        // Also check that the TAVR outer diameter is not excessively larger than surgical ID
        // Generally the TAVR should fit within the surgical valve
        if (size.outerDiameter <= surgicalValveID + 4.0) {
          results.push({ tavrValve, size });
        }
      }
    }
  }

  return results;
}

/**
 * Estimate PPM risk for a VIV procedure.
 * Returns 'severe' | 'moderate' | 'low' based on the surgical valve ID and patient BSA.
 */
export function estimateVIVPPMRisk(
  surgicalValveID: number,
  patientBSA: number,
): 'severe' | 'moderate' | 'low' {
  // Approximate effective orifice area from the constrained ID
  // Using circular area formula: EOA ~ pi * (ID/2)^2 / 100 (rough estimate in cm²)
  const estimatedEOA = (Math.PI * Math.pow(surgicalValveID / 20, 2));
  const indexedEOA = estimatedEOA / patientBSA;

  if (indexedEOA < 0.65) {
    return 'severe';
  } else if (indexedEOA < 0.85) {
    return 'moderate';
  }
  return 'low';
}
