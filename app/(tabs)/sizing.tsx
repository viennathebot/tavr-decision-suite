import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeSizingTable } from "../../components/sizing/NativeSizingTable";
import { AnnulusCalculator } from "../../components/sizing/AnnulusCalculator";
import { Disclaimer } from "../../components/ui/Disclaimer";
import { Colors } from "../../constants/theme";

const SAPIEN_3 = {
  manufacturer: "Edwards",
  model: "SAPIEN 3 / Ultra / Ultra Resilia",
  selfExpanding: false,
  sizes: [
    { size: 20, annulusAreaRange: [273, 346] as [number, number], annulusPerimeterRange: [59, 66] as [number, number], sheathSize: "14Fr" },
    { size: 23, annulusAreaRange: [338, 430] as [number, number], annulusPerimeterRange: [65, 74] as [number, number], sheathSize: "14Fr" },
    { size: 26, annulusAreaRange: [419, 546] as [number, number], annulusPerimeterRange: [73, 84] as [number, number], sheathSize: "14Fr" },
    { size: 29, annulusAreaRange: [536, 683] as [number, number], annulusPerimeterRange: [82, 95] as [number, number], sheathSize: "16Fr" },
  ],
  notes: "Target 5-20% oversizing by area. Source: Edwards IFU.",
};

const EVOLUT = {
  manufacturer: "Medtronic",
  model: "Evolut PRO+ / FX",
  selfExpanding: true,
  sizes: [
    { size: 23, annulusAreaRange: [254, 314] as [number, number], annulusDiameterRange: [18, 20] as [number, number] },
    { size: 26, annulusAreaRange: [314, 415] as [number, number], annulusDiameterRange: [20, 23] as [number, number] },
    { size: 29, annulusAreaRange: [415, 531] as [number, number], annulusDiameterRange: [23, 26] as [number, number] },
    { size: 34, annulusAreaRange: [531, 707] as [number, number], annulusDiameterRange: [26, 30] as [number, number] },
  ],
  notes: "Self-expanding, supra-annular design. 0-10% oversizing by diameter. Preferred by many centers for bicuspid anatomy. Source: Medtronic IFU.",
};

const NAVITOR = {
  manufacturer: "Abbott",
  model: "Navitor / Navitor+",
  selfExpanding: false,
  sizes: [
    { size: 23, annulusAreaRange: [300, 430] as [number, number] },
    { size: 25, annulusAreaRange: [400, 500] as [number, number] },
    { size: 27, annulusAreaRange: [480, 600] as [number, number] },
    { size: 29, annulusAreaRange: [560, 683] as [number, number] },
  ],
  notes: "Intra-annular design with flexible cuff. Source: Abbott IFU.",
};

const ACURATE = {
  manufacturer: "Boston Scientific",
  model: "Acurate neo2",
  selfExpanding: true,
  sizes: [
    { size: "S" as unknown as number, annulusAreaRange: [346, 415] as [number, number], annulusDiameterRange: [21, 23] as [number, number] },
    { size: "M" as unknown as number, annulusAreaRange: [415, 491] as [number, number], annulusDiameterRange: [23, 25] as [number, number] },
    { size: "L" as unknown as number, annulusAreaRange: [491, 573] as [number, number], annulusDiameterRange: [25, 27] as [number, number] },
  ],
  notes: "Self-expanding, supra-annular. Source: Boston Scientific IFU.",
};

export default function SizingScreen() {
  const [highlightArea, setHighlightArea] = useState<number | undefined>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            color: Colors.primary,
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 4,
          }}
        >
          TAVR Sizing Reference
        </Text>
        <Text style={{ color: Colors.muted, fontSize: 12, marginBottom: 16 }}>
          Enter annulus measurements to highlight matching valve sizes
        </Text>

        <AnnulusCalculator onAreaChange={setHighlightArea} />

        <View style={{ height: 16 }} />

        <NativeSizingTable {...SAPIEN_3} highlightArea={highlightArea} />
        <NativeSizingTable {...EVOLUT} highlightArea={highlightArea} />
        <NativeSizingTable {...NAVITOR} highlightArea={highlightArea} />
        <NativeSizingTable {...ACURATE} highlightArea={highlightArea} />

        <View
          style={{
            backgroundColor: Colors.warning + "10",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: Colors.warning + "30",
            marginTop: 8,
          }}
        >
          <Text style={{ color: Colors.warning, fontSize: 12, fontWeight: "600", marginBottom: 4 }}>
            Bicuspid Aortic Valve
          </Text>
          <Text style={{ color: Colors.muted, fontSize: 11, lineHeight: 16 }}>
            For bicuspid anatomy, use CT 3D planimetry for accurate sizing.
            Oversizing is typically avoided. Self-expanding valves (Evolut) are
            preferred by many centers due to better conformability. Always consult
            with institutional proctor.
          </Text>
        </View>

        <View style={{ height: 8 }} />
        <Disclaimer />

        <Text style={{ color: Colors.muted, fontSize: 9, textAlign: "center", marginTop: 8 }}>
          Sizing data based on manufacturer IFUs available at time of development.
          Always verify against current manufacturer IFU and consult the
          institutional proctor and manufacturer rep before TAVR implantation.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
