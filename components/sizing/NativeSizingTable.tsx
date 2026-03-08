import { View, Text, ScrollView } from "react-native";
import { Colors } from "../../constants/theme";

interface SizingRow {
  size: number | string;
  annulusAreaRange: [number, number];
  annulusPerimeterRange?: [number, number];
  annulusDiameterRange?: [number, number];
  sheathSize?: string;
  minVesselDiameter?: number;
}

interface NativeSizingTableProps {
  manufacturer: string;
  model: string;
  selfExpanding: boolean;
  sizes: SizingRow[];
  notes?: string;
  highlightArea?: number;
  pacemakerRate?: string;
}

export function NativeSizingTable({
  manufacturer,
  model,
  selfExpanding,
  sizes,
  notes,
  highlightArea,
  pacemakerRate,
}: NativeSizingTableProps) {
  const getHighlightForRow = (row: SizingRow): boolean => {
    if (highlightArea === undefined) return false;
    return highlightArea >= row.annulusAreaRange[0] && highlightArea <= row.annulusAreaRange[1];
  };

  return (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 8 }}>
        <Text style={{ color: Colors.primary, fontSize: 15, fontWeight: "700", flex: 1 }}>
          {manufacturer} {model}
        </Text>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          {pacemakerRate && (
            <View
              style={{
                backgroundColor: Colors.danger + "15",
                borderRadius: 4,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: Colors.danger, fontSize: 9, fontWeight: "600" }}>
                PPM {pacemakerRate}
              </Text>
            </View>
          )}
          <View
            style={{
              backgroundColor: selfExpanding ? Colors.warning + "20" : Colors.accent + "20",
              borderRadius: 4,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                color: selfExpanding ? Colors.warning : Colors.accent,
                fontSize: 9,
                fontWeight: "600",
              }}
            >
              {selfExpanding ? "Self-Expanding" : "Balloon-Expandable"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: Colors.cardBorder,
              paddingBottom: 6,
              marginBottom: 4,
            }}
          >
            <Text style={[headerCell, { width: 60 }]}>Size</Text>
            <Text style={[headerCell, { width: 120 }]}>Area (mm{"\u00B2"})</Text>
            {sizes[0]?.annulusPerimeterRange && (
              <Text style={[headerCell, { width: 110 }]}>Perimeter (mm)</Text>
            )}
            {sizes[0]?.annulusDiameterRange && (
              <Text style={[headerCell, { width: 110 }]}>Diameter (mm)</Text>
            )}
            {sizes[0]?.sheathSize && (
              <Text style={[headerCell, { width: 80 }]}>Sheath</Text>
            )}
            {sizes[0]?.minVesselDiameter && (
              <Text style={[headerCell, { width: 70 }]}>Min Vessel</Text>
            )}
          </View>

          {/* Rows */}
          {sizes.map((row, i) => {
            const isHighlighted = getHighlightForRow(row);
            return (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  paddingVertical: 6,
                  backgroundColor: isHighlighted
                    ? Colors.accent + "15"
                    : i % 2 === 0
                    ? "transparent"
                    : Colors.inputBg + "40",
                  borderRadius: isHighlighted ? 4 : 0,
                }}
              >
                <Text
                  style={[
                    dataCell,
                    {
                      width: 60,
                      fontWeight: "600",
                      color: isHighlighted ? Colors.accent : Colors.primary,
                    },
                  ]}
                >
                  {row.size}mm
                </Text>
                <Text style={[dataCell, { width: 120 }]}>
                  {row.annulusAreaRange[0]}-{row.annulusAreaRange[1]}
                </Text>
                {row.annulusPerimeterRange && (
                  <Text style={[dataCell, { width: 110 }]}>
                    {row.annulusPerimeterRange[0]}-{row.annulusPerimeterRange[1]}
                  </Text>
                )}
                {row.annulusDiameterRange && (
                  <Text style={[dataCell, { width: 110 }]}>
                    {row.annulusDiameterRange[0]}-{row.annulusDiameterRange[1]}
                  </Text>
                )}
                {row.sheathSize && (
                  <Text style={[dataCell, { width: 80 }]}>{row.sheathSize}</Text>
                )}
                {row.minVesselDiameter && (
                  <Text style={[dataCell, { width: 70 }]}>
                    {row.minVesselDiameter.toFixed(1)}mm
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {notes && (
        <Text style={{ color: Colors.muted, fontSize: 10, marginTop: 8, lineHeight: 14 }}>
          {notes}
        </Text>
      )}
    </View>
  );
}

const headerCell = {
  color: Colors.muted,
  fontSize: 11,
  fontWeight: "600" as const,
  paddingHorizontal: 4,
};

const dataCell = {
  color: Colors.primary,
  fontSize: 12,
  fontFamily: "DMMono_400Regular",
  paddingHorizontal: 4,
};
