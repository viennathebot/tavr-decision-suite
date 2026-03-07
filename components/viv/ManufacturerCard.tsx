import { View, Text } from "react-native";
import { Info } from "lucide-react-native";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

// ── Valve characteristics database ────────────────────────────

interface ValveCharacteristics {
  stented: boolean;
  supraAnnular: boolean;
  leafletMaterial: string;
  notes: string;
}

const VALVE_INFO: Record<string, Record<string, ValveCharacteristics>> = {
  // SAVR manufacturers
  Edwards: {
    Perimount: {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Most widely implanted surgical bioprosthesis worldwide. Intra-annular design. Well-characterized VIV behavior with extensive registry data.",
    },
    Magna: {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Supra-annular design provides larger effective orifice area vs standard Perimount at the same labeled size. Favorable VIV hemodynamics.",
    },
    "Magna Ease": {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Improved Magna with low-profile sewing ring. Same internal dimensions as Magna. Supra-annular placement benefits VIV sizing.",
    },
    "SAPIEN 3": {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Balloon-expandable cobalt-chromium frame. Intra-annular leaflet position. Most common TAVR platform for VIV procedures.",
    },
    "SAPIEN 3 Ultra": {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Enhanced SAPIEN 3 with textured PET outer skirt for improved paravalvular sealing. Same frame dimensions as SAPIEN 3.",
    },
    "SAPIEN 3 Ultra Resilia": {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Bovine pericardial (RESILIA tissue)",
      notes:
        "Features INTEGRITY preservation technology for improved tissue durability. Same frame as SAPIEN 3 Ultra. Enhanced anti-calcification properties.",
    },
  },
  "St. Jude/Abbott": {
    Trifecta: {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Bovine pericardial (externally mounted)",
      notes:
        "Titanium stent with externally mounted leaflets for supra-annular hemodynamics. Caution: externally mounted leaflets may increase coronary obstruction risk during VIV.",
    },
    "Trifecta GT": {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Bovine pericardial (externally mounted)",
      notes:
        "Glide Technology sewing ring for easier implantation. Same internal dimensions as original Trifecta. Same VIV considerations apply.",
    },
    Epic: {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Porcine",
      notes:
        "Porcine valve with LinxAC anti-calcification treatment. Intra-annular design. Predecessor to Trifecta in the Abbott portfolio.",
    },
    Biocor: {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Porcine",
      notes:
        "Stented porcine valve. Intra-annular design with standard hemodynamic profile.",
    },
  },
  Medtronic: {
    "Hancock II": {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Porcine",
      notes:
        "Low-pressure fixation porcine valve. Intra-annular design results in smaller internal diameter relative to labeled size. T6 anti-calcification treatment. Well-documented long-term durability.",
    },
    Mosaic: {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Porcine",
      notes:
        "Zero-pressure fixation with supra-annular design. AOA anti-calcification treatment. Slightly larger internal diameter than Hancock II at same labeled size.",
    },
    Freestyle: {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine (full root)",
      notes:
        "Stentless porcine root. No rigid frame -- VIV sizing more complex and should rely on CT measurements of the true tissue annulus rather than the labeled size alone. Coronary obstruction risk assessment is critical.",
    },
    "Evolut R": {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine pericardial",
      notes:
        "Self-expanding nitinol frame. Supra-annular leaflet position provides hemodynamic advantage. Recapturable and repositionable delivery system.",
    },
    "Evolut PRO": {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine pericardial",
      notes:
        "Same frame as Evolut R with outer pericardial wrap for improved paravalvular sealing. Supra-annular design advantageous for VIV in small valves.",
    },
    "Evolut PRO+": {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine pericardial",
      notes:
        "Enhanced delivery system. Same frame and leaflet design as Evolut PRO. 14F InLine sheath across all sizes.",
    },
    "Evolut FX": {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine pericardial",
      notes:
        "Redesigned frame geometry for improved radial force and precision deployment. Same sizing parameters as Evolut PRO+. Enhanced stability during deployment.",
    },
  },
  "Carpentier-Edwards": {
    "Porcine Standard": {
      stented: true,
      supraAnnular: false,
      leafletMaterial: "Porcine",
      notes:
        "Early-generation porcine bioprosthesis. Intra-annular design with relatively smaller internal diameters. High PPM risk with VIV in small sizes.",
    },
    "Supra-Annular SAV": {
      stented: true,
      supraAnnular: true,
      leafletMaterial: "Porcine",
      notes:
        "Supra-annular positioning provides larger effective orifice. Improved hemodynamics vs standard CE porcine. Widely used historically.",
    },
  },
  Abbott: {
    Navitor: {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Bovine pericardial",
      notes:
        "Self-expanding nitinol with NaviSeal cuff for enhanced paravalvular sealing. Anti-calcification treated leaflets. FlexNav delivery system allows full recapture and repositioning. Supra-annular leaflet position.",
    },
  },
  "Boston Scientific": {
    "Acurate neo2": {
      stented: false,
      supraAnnular: true,
      leafletMaterial: "Porcine pericardial",
      notes:
        "Self-expanding supra-annular valve with unique top-down deployment. Inner and outer pericardial sealing skirts. Lower pacemaker rates reported. Limited VIV-specific data compared to SAPIEN and Evolut platforms.",
    },
  },
};

// ── Props ─────────────────────────────────────────────────────

interface ManufacturerCardProps {
  manufacturer: string;
  model: string;
}

// ── Component ─────────────────────────────────────────────────

export function ManufacturerCard({ manufacturer, model }: ManufacturerCardProps) {
  const info = VALVE_INFO[manufacturer]?.[model];

  if (!info) {
    return (
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
          <Info size={16} color={Colors.muted} />
          <Text style={{ color: Colors.muted, fontSize: 13 }}>
            No reference information available for {manufacturer} {model}.
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.sm,
          marginBottom: Spacing.md,
        }}
      >
        <Info size={16} color={Colors.accent} />
        <Text
          style={{
            color: Colors.primary,
            fontSize: 15,
            fontWeight: "700",
            flex: 1,
          }}
        >
          {manufacturer}
        </Text>
      </View>

      <Text
        style={{
          color: Colors.accent,
          fontSize: 13,
          fontWeight: "600",
          marginBottom: Spacing.sm,
        }}
      >
        {model}
      </Text>

      {/* Characteristic Badges */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: Spacing.sm,
          marginBottom: Spacing.md,
        }}
      >
        <Badge
          label={info.stented ? "Stented" : "Stentless"}
          color={info.stented ? Colors.accent : Colors.warning}
        />
        <Badge
          label={info.supraAnnular ? "Supra-annular" : "Intra-annular"}
          color={info.supraAnnular ? Colors.success : Colors.muted}
        />
        <Badge
          label={info.leafletMaterial}
          color={Colors.muted}
          textColor={Colors.primary}
        />
      </View>

      {/* Notes */}
      <Text
        style={{
          color: Colors.primary,
          fontSize: 12,
          lineHeight: 18,
        }}
      >
        {info.notes}
      </Text>

      {/* VIV-specific warnings for stentless valves */}
      {!info.stented && (
        <View
          style={{
            marginTop: Spacing.md,
            backgroundColor: Colors.warning + "10",
            borderRadius: BorderRadius.sm,
            padding: Spacing.md,
            borderWidth: 1,
            borderColor: Colors.warning + "30",
          }}
        >
          <Text
            style={{
              color: Colors.warning,
              fontSize: 11,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Stentless Valve Note
          </Text>
          <Text style={{ color: Colors.muted, fontSize: 11, lineHeight: 16 }}>
            Stentless valves lack a rigid frame. VIV sizing should rely on CT
            measurements of the true tissue annulus rather than the labeled size
            alone. Coronary obstruction risk assessment is critical.
          </Text>
        </View>
      )}

      {/* Coronary obstruction warning for Trifecta */}
      {(model === "Trifecta" || model === "Trifecta GT") && (
        <View
          style={{
            marginTop: Spacing.md,
            backgroundColor: Colors.danger + "10",
            borderRadius: BorderRadius.sm,
            padding: Spacing.md,
            borderWidth: 1,
            borderColor: Colors.danger + "30",
          }}
        >
          <Text
            style={{
              color: Colors.danger,
              fontSize: 11,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Coronary Obstruction Warning
          </Text>
          <Text style={{ color: Colors.muted, fontSize: 11, lineHeight: 16 }}>
            Externally mounted leaflets on the Trifecta may increase risk of
            coronary obstruction during VIV. Careful CT assessment of coronary
            heights and sinus dimensions is essential. Consider BASILICA if
            coronary height &lt;10 mm.
          </Text>
        </View>
      )}
    </Card>
  );
}
