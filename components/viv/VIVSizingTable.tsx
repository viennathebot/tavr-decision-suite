import { View, Text } from "react-native";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { Card } from "../ui/Card";
import {
  ALL_SURGICAL_VALVES,
  ALL_TAVR_VIV_DATA,
  type SurgicalValveData,
  type TAVRValveVIVData,
} from "../../data/viv-data";

// ── Manufacturer name matching ────────────────────────────────
// The VIV store uses simplified names; the data file uses full names.
// This helper does a fuzzy match.

function matchesManufacturer(dataName: string, storeName: string): boolean {
  const d = dataName.toLowerCase();
  const s = storeName.toLowerCase();
  if (d.includes(s)) return true;
  if (s === "edwards" && d.includes("edwards")) return true;
  if (s === "st. jude/abbott" && (d.includes("abbott") || d.includes("st. jude"))) return true;
  if (s === "carpentier-edwards" && (d.includes("carpentier") || d.includes("edwards"))) return true;
  if (s === "medtronic" && d.includes("medtronic")) return true;
  if (s === "boston scientific" && d.includes("boston")) return true;
  if (s === "abbott" && d.includes("abbott")) return true;
  return false;
}

function matchesModel(dataModel: string, storeModel: string): boolean {
  const d = dataModel.toLowerCase();
  const s = storeModel.toLowerCase();
  if (d.includes(s)) return true;
  if (s.includes(d)) return true;
  // Handle specific mappings
  if (s === "perimount" && d.includes("perimount") && !d.includes("magna")) return true;
  if (s === "magna" && d.includes("magna") && !d.includes("ease")) return true;
  if (s === "magna ease" && d.includes("magna ease")) return true;
  if (s === "porcine standard" && d.includes("porcine standard")) return true;
  if (s === "supra-annular sav" && (d.includes("supra-annular") || d.includes("sav"))) return true;
  if (s === "biocor" && d.includes("biocor")) return true;
  if (s === "sapien 3 ultra resilia" && d.includes("resilia")) return true;
  if (s === "sapien 3 ultra" && d.includes("ultra") && !d.includes("resilia")) return true;
  if (s === "sapien 3" && d.includes("sapien 3") && !d.includes("ultra")) return true;
  if (s === "evolut pro+" && (d.includes("pro+") || d.includes("pro +"))) return true;
  if (s === "evolut pro" && d.includes("pro") && !d.includes("pro+") && !d.includes("pro /")) return true;
  return false;
}

// ── Props ─────────────────────────────────────────────────────

interface VIVSizingTableProps {
  manufacturer: string;
  model: string;
  procedureType: "tavr-in-savr" | "tavr-in-tavr";
}

// ── Component ─────────────────────────────────────────────────

export function VIVSizingTable({
  manufacturer,
  model,
  procedureType,
}: VIVSizingTableProps) {
  // Find the matching valve data
  let valveData: { labeledSize: number; internalDiameter: number; externalDiameter: number }[] | null = null;

  if (procedureType === "tavr-in-savr") {
    const found = ALL_SURGICAL_VALVES.find(
      (v) => matchesManufacturer(v.manufacturer, manufacturer) && matchesModel(v.model, model)
    );
    if (found) {
      valveData = found.sizes;
    }
  } else {
    const found = ALL_TAVR_VIV_DATA.find(
      (v) => matchesManufacturer(v.manufacturer, manufacturer) && matchesModel(v.model, model)
    );
    if (found) {
      valveData = found.sizes.map((s) => ({
        labeledSize: s.size,
        internalDiameter: s.innerDiameter,
        externalDiameter: s.outerDiameter,
      }));
    }
  }

  if (!valveData || valveData.length === 0) {
    return (
      <Card>
        <Text
          style={{
            color: Colors.muted,
            fontSize: 13,
            textAlign: "center",
            paddingVertical: Spacing.lg,
          }}
        >
          Sizing data not available for {manufacturer} {model}.
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 15,
          fontWeight: "700",
          marginBottom: Spacing.md,
        }}
      >
        Reference Sizing Table
      </Text>
      <Text
        style={{
          color: Colors.muted,
          fontSize: 11,
          marginBottom: Spacing.md,
        }}
      >
        {manufacturer} {model} -- All available sizes
      </Text>

      {/* Table Header */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: Spacing.sm,
          backgroundColor: Colors.accent + "15",
          borderRadius: BorderRadius.sm,
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            flex: 1,
            color: Colors.accent,
            fontSize: 11,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Labeled Size
        </Text>
        <Text
          style={{
            flex: 1,
            color: Colors.accent,
            fontSize: 11,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Internal ID (mm)
        </Text>
        <Text
          style={{
            flex: 1,
            color: Colors.accent,
            fontSize: 11,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          External OD (mm)
        </Text>
      </View>

      {/* Table Rows */}
      {valveData.map((row, idx) => (
        <View
          key={row.labeledSize}
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: Spacing.sm,
            backgroundColor:
              idx % 2 === 0 ? "transparent" : Colors.inputBg + "60",
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              flex: 1,
              color: Colors.primary,
              fontSize: 14,
              fontFamily: "DMMono_400Regular",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {row.labeledSize}
          </Text>
          <Text
            style={{
              flex: 1,
              color: Colors.primary,
              fontSize: 14,
              fontFamily: "DMMono_400Regular",
              textAlign: "center",
            }}
          >
            {row.internalDiameter.toFixed(1)}
          </Text>
          <Text
            style={{
              flex: 1,
              color: Colors.primary,
              fontSize: 14,
              fontFamily: "DMMono_400Regular",
              textAlign: "center",
            }}
          >
            {row.externalDiameter.toFixed(1)}
          </Text>
        </View>
      ))}

      <Text
        style={{
          color: Colors.muted,
          fontSize: 10,
          marginTop: Spacing.sm,
          fontStyle: "italic",
        }}
      >
        Dimensions from manufacturer IFU and Valve-in-Valve App database. Verify
        against current documentation.
      </Text>
    </Card>
  );
}
