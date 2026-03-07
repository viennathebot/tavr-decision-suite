import { View, Text, Pressable } from "react-native";
import { useVIVStore } from "../../store/vivStore";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import { Card } from "../ui/Card";
import {
  ALL_SURGICAL_VALVES,
  ALL_TAVR_VIV_DATA,
  type SurgicalValveData,
  type TAVRValveVIVData,
} from "../../data/viv-data";

// ── Manufacturer -> Model mapping ─────────────────────────────

const SAVR_MANUFACTURERS: Record<string, string[]> = {
  Edwards: ["Perimount", "Magna", "Magna Ease"],
  "St. Jude/Abbott": ["Trifecta", "Trifecta GT", "Epic", "Biocor"],
  Medtronic: ["Hancock II", "Mosaic", "Freestyle"],
  "Carpentier-Edwards": ["Porcine Standard", "Supra-Annular SAV"],
};

const TAVR_MANUFACTURERS: Record<string, string[]> = {
  Edwards: ["SAPIEN 3", "SAPIEN 3 Ultra", "SAPIEN 3 Ultra Resilia"],
  Medtronic: ["Evolut R", "Evolut PRO", "Evolut PRO+", "Evolut FX"],
  Abbott: ["Navitor"],
  "Boston Scientific": ["Acurate neo2"],
};

// ── Sizes per model ───────────────────────────────────────────

const SAVR_SIZES: Record<string, number[]> = {
  Perimount: [19, 21, 23, 25, 27, 29],
  Magna: [19, 21, 23, 25, 27, 29],
  "Magna Ease": [19, 21, 23, 25, 27, 29],
  Trifecta: [19, 21, 23, 25, 27, 29],
  "Trifecta GT": [19, 21, 23, 25, 27, 29],
  Epic: [19, 21, 23, 25, 27, 29],
  Biocor: [19, 21, 23, 25, 27, 29],
  "Hancock II": [21, 23, 25, 27, 29, 31],
  Mosaic: [21, 23, 25, 27, 29, 31],
  Freestyle: [19, 21, 23, 25, 27, 29],
  "Porcine Standard": [21, 23, 25, 27, 29, 31],
  "Supra-Annular SAV": [21, 23, 25, 27, 29, 31],
};

const TAVR_SIZES: Record<string, number[]> = {
  "SAPIEN 3": [20, 23, 26, 29],
  "SAPIEN 3 Ultra": [20, 23, 26, 29],
  "SAPIEN 3 Ultra Resilia": [20, 23, 26, 29],
  "Evolut R": [23, 26, 29, 34],
  "Evolut PRO": [23, 26, 29, 34],
  "Evolut PRO+": [23, 26, 29, 34],
  "Evolut FX": [23, 26, 29, 34],
  Navitor: [23, 25, 27, 29],
  "Acurate neo2": [23, 25, 27],
};

// ── Pill/Chip Component ───────────────────────────────────────

function SelectionChip({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: isSelected ? Colors.accent : Colors.cardBorder,
        backgroundColor: isSelected ? Colors.accent : Colors.card,
        marginRight: Spacing.sm,
        marginBottom: Spacing.sm,
      }}
    >
      <Text
        style={{
          color: isSelected ? Colors.white : Colors.primary,
          fontSize: 13,
          fontWeight: isSelected ? "600" : "400",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

// ── Main VIV Valve Selector ───────────────────────────────────

export function VIVValveSelector() {
  const procedureType = useVIVStore((s) => s.procedureType);
  const manufacturer = useVIVStore((s) => s.manufacturer);
  const model = useVIVStore((s) => s.model);
  const labeledSize = useVIVStore((s) => s.labeledSize);
  const setManufacturer = useVIVStore((s) => s.setManufacturer);
  const setModel = useVIVStore((s) => s.setModel);
  const setLabeledSize = useVIVStore((s) => s.setLabeledSize);

  const isSAVR = procedureType === "tavr-in-savr";
  const manufacturers = isSAVR ? SAVR_MANUFACTURERS : TAVR_MANUFACTURERS;
  const sizeMap = isSAVR ? SAVR_SIZES : TAVR_SIZES;

  const models = manufacturer ? manufacturers[manufacturer] ?? [] : [];
  const sizes = model ? sizeMap[model] ?? [] : [];

  return (
    <Card>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 16,
          fontWeight: "700",
          marginBottom: Spacing.md,
        }}
      >
        {isSAVR ? "Failed Surgical Valve" : "Failed TAVR Valve"}
      </Text>

      {/* Step 1: Manufacturer */}
      <Text
        style={{
          color: Colors.muted,
          fontSize: 12,
          fontWeight: "600",
          marginBottom: Spacing.xs,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        1. Manufacturer
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: Spacing.md,
        }}
      >
        {Object.keys(manufacturers).map((mfg) => (
          <SelectionChip
            key={mfg}
            label={mfg}
            isSelected={manufacturer === mfg}
            onPress={() => setManufacturer(mfg)}
          />
        ))}
      </View>

      {/* Step 2: Model */}
      {manufacturer && (
        <>
          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: Spacing.xs,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            2. Model
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: Spacing.md,
            }}
          >
            {models.map((m) => (
              <SelectionChip
                key={m}
                label={m}
                isSelected={model === m}
                onPress={() => setModel(m)}
              />
            ))}
          </View>
        </>
      )}

      {/* Step 3: Size */}
      {model && (
        <>
          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: Spacing.xs,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            3. Labeled Size
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: Spacing.sm,
            }}
          >
            {sizes.map((s) => (
              <SelectionChip
                key={s}
                label={`${s} mm`}
                isSelected={labeledSize === s}
                onPress={() => setLabeledSize(s)}
              />
            ))}
          </View>
        </>
      )}

      {/* Selection Summary */}
      {manufacturer && model && labeledSize && (
        <View
          style={{
            backgroundColor: Colors.accent + "10",
            borderRadius: BorderRadius.sm,
            padding: Spacing.md,
            marginTop: Spacing.sm,
            borderWidth: 1,
            borderColor: Colors.accent + "30",
          }}
        >
          <Text
            style={{
              color: Colors.accent,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Selected: {manufacturer} {model} {labeledSize} mm
          </Text>
        </View>
      )}
    </Card>
  );
}
