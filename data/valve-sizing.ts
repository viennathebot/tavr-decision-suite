// ─────────────────────────────────────────────────────────────
// TAVR Valve Sizing Data
// Sources: Manufacturer IFU documents, MDCT sizing recommendations
// Pacemaker rates: PARTNER 3, Evolut Low Risk (Popma JJ et al. NEJM 2019;380:1695-1705)
// ─────────────────────────────────────────────────────────────

export interface TAVRValveSize {
  size: number | string;
  annulusAreaRange: [number, number]; // mm²
  annulusPerimeterRange?: [number, number]; // mm
  annulusDiameterRange?: [number, number]; // mm (mean CT diameter)
  sheathSize?: string;
  minVesselDiameter?: number; // mm — minimum iliofemoral vessel diameter for TF access
  notes?: string;
}

export interface TAVRValveModel {
  manufacturer: string;
  model: string;
  selfExpanding: boolean;
  sizes: TAVRValveSize[];
  pacemakerRate?: string;
  pacemakerRateCitation?: string;
  generalNotes?: string;
}

// ── Edwards SAPIEN 3 ────────────────────────────────────────
export const SAPIEN_3: TAVRValveModel = {
  manufacturer: 'Edwards Lifesciences',
  model: 'SAPIEN 3',
  selfExpanding: false,
  pacemakerRate: '6-8%',
  pacemakerRateCitation: 'PARTNER 3 Trial (Mack MJ et al. NEJM 2019;380:1695-1705)',
  sizes: [
    {
      size: 20,
      annulusAreaRange: [273, 345],
      annulusPerimeterRange: [58.5, 65.9],
      annulusDiameterRange: [18.0, 21.0],
      sheathSize: '14F eSheath',
      minVesselDiameter: 5.0,
      notes: 'Smallest size; perimeter <66 mm. eSheath OD 14F (4.7mm) expands to 16F',
    },
    {
      size: 23,
      annulusAreaRange: [338, 430],
      annulusPerimeterRange: [65.2, 73.6],
      annulusDiameterRange: [19.5, 23.0],
      sheathSize: '14F eSheath',
      minVesselDiameter: 5.5,
      notes: 'Most common size for smaller annuli',
    },
    {
      size: 26,
      annulusAreaRange: [430, 546],
      annulusPerimeterRange: [73.6, 82.8],
      annulusDiameterRange: [23.0, 26.0],
      sheathSize: '16F eSheath',
      minVesselDiameter: 5.5,
      notes: 'Intermediate size; requires 16F expandable sheath',
    },
    {
      size: 29,
      annulusAreaRange: [546, 683],
      annulusPerimeterRange: [82.8, 92.7],
      annulusDiameterRange: [26.0, 29.0],
      sheathSize: '16F eSheath',
      minVesselDiameter: 6.0,
      notes: 'Largest SAPIEN 3; for perimeter >82.8 mm',
    },
  ],
  generalNotes:
    'Balloon-expandable valve. Sizing based on CT annulus area and perimeter. ' +
    'eSheath expandable delivery system (Commander). Min vessel: 5.0mm (20mm), 5.5mm (23/26mm), 6.0mm (29mm). ' +
    'Pacemaker rate 6-8% (PARTNER 3). Overlap zones between sizes require clinical judgment.',
};

// ── Edwards SAPIEN 3 Ultra / Ultra RESILIA ──────────────────
export const SAPIEN_3_ULTRA: TAVRValveModel = {
  manufacturer: 'Edwards Lifesciences',
  model: 'SAPIEN 3 Ultra / Ultra RESILIA',
  selfExpanding: false,
  pacemakerRate: '6-8%',
  pacemakerRateCitation: 'PARTNER 3 Trial (Mack MJ et al. NEJM 2019;380:1695-1705)',
  sizes: [
    {
      size: 20,
      annulusAreaRange: [273, 345],
      annulusPerimeterRange: [58.5, 65.9],
      annulusDiameterRange: [18.0, 21.0],
      sheathSize: '14F eSheath',
      minVesselDiameter: 5.0,
      notes: 'Ultra/RESILIA: textured PET outer skirt for reduced PVL',
    },
    {
      size: 23,
      annulusAreaRange: [338, 430],
      annulusPerimeterRange: [65.2, 73.6],
      annulusDiameterRange: [19.5, 23.0],
      sheathSize: '14F eSheath',
      minVesselDiameter: 5.5,
    },
    {
      size: 26,
      annulusAreaRange: [430, 546],
      annulusPerimeterRange: [73.6, 82.8],
      annulusDiameterRange: [23.0, 26.0],
      sheathSize: '16F eSheath',
      minVesselDiameter: 5.5,
    },
    {
      size: 29,
      annulusAreaRange: [546, 683],
      annulusPerimeterRange: [82.8, 92.7],
      annulusDiameterRange: [26.0, 29.0],
      sheathSize: '16F eSheath',
      minVesselDiameter: 6.0,
    },
  ],
  generalNotes:
    'Balloon-expandable valve with textured outer skirt for enhanced paravalvular sealing. ' +
    'RESILIA tissue treated with INTEGRITY preservation for improved durability. ' +
    'Same sizing and delivery as SAPIEN 3. Min vessel: 5.0mm (20mm), 5.5mm (23/26mm), 6.0mm (29mm). ' +
    'Pacemaker rate ~6-8% (PARTNER 3).',
};

// ── Medtronic Evolut PRO+ ───────────────────────────────────
export const EVOLUT_PRO_PLUS: TAVRValveModel = {
  manufacturer: 'Medtronic',
  model: 'Evolut PRO+',
  selfExpanding: true,
  pacemakerRate: '17-20%',
  pacemakerRateCitation: 'Evolut Low Risk Trial (Popma JJ et al. NEJM 2019;380:1695-1705)',
  sizes: [
    {
      size: 23,
      annulusAreaRange: [254, 346],
      annulusDiameterRange: [18.0, 20.0],
      annulusPerimeterRange: [56.5, 66.0],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
      notes: 'Smallest self-expanding; supra-annular leaflet design with pericardial wrap',
    },
    {
      size: 26,
      annulusAreaRange: [314, 415],
      annulusDiameterRange: [20.0, 23.0],
      annulusPerimeterRange: [62.8, 72.3],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
    },
    {
      size: 29,
      annulusAreaRange: [415, 531],
      annulusDiameterRange: [23.0, 26.0],
      annulusPerimeterRange: [72.3, 81.7],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
    },
    {
      size: 34,
      annulusAreaRange: [531, 683],
      annulusDiameterRange: [26.0, 30.0],
      annulusPerimeterRange: [81.7, 92.7],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
      notes: 'Largest available TAVR valve; unique to Evolut platform',
    },
  ],
  generalNotes:
    'Self-expanding supra-annular valve with outer pericardial wrap for reduced PVL. ' +
    'Recapturable/repositionable delivery system. 14F InLine sheath (5.0mm min vessel) across all sizes. ' +
    'Pacemaker rate 17-20% (Evolut Low Risk). Higher PPM rate than balloon-expandable valves.',
};

// ── Medtronic Evolut FX ─────────────────────────────────────
export const EVOLUT_FX: TAVRValveModel = {
  manufacturer: 'Medtronic',
  model: 'Evolut FX',
  selfExpanding: true,
  pacemakerRate: '17-20%',
  pacemakerRateCitation: 'Evolut Low Risk Trial (Popma JJ et al. NEJM 2019;380:1695-1705)',
  sizes: [
    {
      size: 23,
      annulusAreaRange: [254, 346],
      annulusDiameterRange: [18.0, 20.0],
      annulusPerimeterRange: [56.5, 66.0],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
      notes: 'Redesigned frame for improved hemodynamics and deliverability',
    },
    {
      size: 26,
      annulusAreaRange: [314, 415],
      annulusDiameterRange: [20.0, 23.0],
      annulusPerimeterRange: [62.8, 72.3],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
    },
    {
      size: 29,
      annulusAreaRange: [415, 531],
      annulusDiameterRange: [23.0, 26.0],
      annulusPerimeterRange: [72.3, 81.7],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
    },
    {
      size: 34,
      annulusAreaRange: [531, 683],
      annulusDiameterRange: [26.0, 30.0],
      annulusPerimeterRange: [81.7, 92.7],
      sheathSize: '14F InLine',
      minVesselDiameter: 5.0,
    },
  ],
  generalNotes:
    'Next-generation self-expanding valve with redesigned frame geometry for improved ' +
    'radial force distribution and sealing. Enhanced delivery system with improved stability ' +
    'and precision. Same sizing as Evolut PRO+. Pacemaker rate ~17-20% (Evolut Low Risk).',
};

// ── Abbott Navitor ──────────────────────────────────────────
export const NAVITOR: TAVRValveModel = {
  manufacturer: 'Abbott',
  model: 'Navitor',
  selfExpanding: true,
  pacemakerRate: '10-15%',
  pacemakerRateCitation: 'Navitor CE Mark study data',
  sizes: [
    {
      size: 23,
      annulusAreaRange: [254, 346],
      annulusDiameterRange: [19.0, 21.0],
      sheathSize: '14F FlexNav',
      minVesselDiameter: 5.0,
      notes: 'NaviSeal cuff for paravalvular sealing',
    },
    {
      size: 25,
      annulusAreaRange: [338, 415],
      annulusDiameterRange: [21.0, 23.0],
      sheathSize: '14F FlexNav',
      minVesselDiameter: 5.0,
    },
    {
      size: 27,
      annulusAreaRange: [415, 500],
      annulusDiameterRange: [23.0, 25.0],
      sheathSize: '14F FlexNav',
      minVesselDiameter: 5.0,
    },
    {
      size: 29,
      annulusAreaRange: [500, 594],
      annulusDiameterRange: [25.0, 27.5],
      sheathSize: '14F FlexNav',
      minVesselDiameter: 5.0,
      notes: 'Largest Navitor; covers up to 27.5 mm annulus diameter',
    },
  ],
  generalNotes:
    'Self-expanding supra-annular valve with NaviSeal cuff for enhanced PV sealing. ' +
    'Anti-calcification treated leaflets. FlexNav delivery system (14F, 5.0mm min vessel) ' +
    'allows full recapture and repositioning. Pacemaker rate ~10-15%.',
};

// ── Boston Scientific Acurate neo2 ──────────────────────────
export const ACURATE_NEO2: TAVRValveModel = {
  manufacturer: 'Boston Scientific',
  model: 'Acurate neo2',
  selfExpanding: true,
  pacemakerRate: '8-12%',
  pacemakerRateCitation: 'SCOPE II (Lanz J et al. Lancet 2022)',
  sizes: [
    {
      size: 'S',
      annulusAreaRange: [254, 346],
      annulusDiameterRange: [21.0, 23.0],
      sheathSize: '14F',
      minVesselDiameter: 5.5,
      notes: 'Small; top-down deployment mechanism',
    },
    {
      size: 'M',
      annulusAreaRange: [346, 452],
      annulusDiameterRange: [23.0, 25.0],
      sheathSize: '14F',
      minVesselDiameter: 5.5,
    },
    {
      size: 'L',
      annulusAreaRange: [452, 573],
      annulusDiameterRange: [25.0, 27.0],
      sheathSize: '14F',
      minVesselDiameter: 5.5,
      notes: 'Large; suitable for annuli up to 27 mm',
    },
  ],
  generalNotes:
    'Self-expanding supra-annular valve with unique top-down deployment. ' +
    'Inner and outer pericardial sealing skirts. Lower pacemaker rates (8-12%, SCOPE II) ' +
    'compared to other self-expanding platforms. 14F delivery (5.5mm min vessel).',
};

// ── All TAVR Models Collection ──────────────────────────────
export const ALL_TAVR_VALVES: TAVRValveModel[] = [
  SAPIEN_3,
  SAPIEN_3_ULTRA,
  EVOLUT_PRO_PLUS,
  EVOLUT_FX,
  NAVITOR,
  ACURATE_NEO2,
];

// ── Helper: find suitable valve sizes for a given annulus ────
export function findSuitableValves(
  annulusAreaMm2: number,
  annulusPerimeterMm?: number,
  annulusDiameterMm?: number,
): { model: TAVRValveModel; size: TAVRValveSize }[] {
  const results: { model: TAVRValveModel; size: TAVRValveSize }[] = [];

  for (const model of ALL_TAVR_VALVES) {
    for (const size of model.sizes) {
      if (annulusAreaMm2 >= size.annulusAreaRange[0] && annulusAreaMm2 <= size.annulusAreaRange[1]) {
        if (annulusPerimeterMm && size.annulusPerimeterRange) {
          if (
            annulusPerimeterMm < size.annulusPerimeterRange[0] ||
            annulusPerimeterMm > size.annulusPerimeterRange[1]
          ) {
            continue;
          }
        }
        if (annulusDiameterMm && size.annulusDiameterRange) {
          if (
            annulusDiameterMm < size.annulusDiameterRange[0] ||
            annulusDiameterMm > size.annulusDiameterRange[1]
          ) {
            continue;
          }
        }
        results.push({ model, size });
      }
    }
  }

  return results;
}
