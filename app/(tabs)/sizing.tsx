import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeSizingTable } from "../../components/sizing/NativeSizingTable";
import { AnnulusCalculator } from "../../components/sizing/AnnulusCalculator";
import { Disclaimer } from "../../components/ui/Disclaimer";
import { Colors } from "../../constants/theme";
import {
  SAPIEN_3,
  SAPIEN_3_ULTRA,
  EVOLUT_PRO_PLUS,
  EVOLUT_FX,
  NAVITOR,
  ACURATE_NEO2,
} from "../../data/valve-sizing";

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

        <NativeSizingTable
          manufacturer={SAPIEN_3.manufacturer}
          model={SAPIEN_3.model}
          selfExpanding={SAPIEN_3.selfExpanding}
          sizes={SAPIEN_3.sizes}
          notes={SAPIEN_3.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={SAPIEN_3.pacemakerRate}
        />
        <NativeSizingTable
          manufacturer={SAPIEN_3_ULTRA.manufacturer}
          model={SAPIEN_3_ULTRA.model}
          selfExpanding={SAPIEN_3_ULTRA.selfExpanding}
          sizes={SAPIEN_3_ULTRA.sizes}
          notes={SAPIEN_3_ULTRA.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={SAPIEN_3_ULTRA.pacemakerRate}
        />
        <NativeSizingTable
          manufacturer={EVOLUT_PRO_PLUS.manufacturer}
          model={EVOLUT_PRO_PLUS.model}
          selfExpanding={EVOLUT_PRO_PLUS.selfExpanding}
          sizes={EVOLUT_PRO_PLUS.sizes}
          notes={EVOLUT_PRO_PLUS.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={EVOLUT_PRO_PLUS.pacemakerRate}
        />
        <NativeSizingTable
          manufacturer={EVOLUT_FX.manufacturer}
          model={EVOLUT_FX.model}
          selfExpanding={EVOLUT_FX.selfExpanding}
          sizes={EVOLUT_FX.sizes}
          notes={EVOLUT_FX.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={EVOLUT_FX.pacemakerRate}
        />
        <NativeSizingTable
          manufacturer={NAVITOR.manufacturer}
          model={NAVITOR.model}
          selfExpanding={NAVITOR.selfExpanding}
          sizes={NAVITOR.sizes}
          notes={NAVITOR.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={NAVITOR.pacemakerRate}
        />
        <NativeSizingTable
          manufacturer={ACURATE_NEO2.manufacturer}
          model={ACURATE_NEO2.model}
          selfExpanding={ACURATE_NEO2.selfExpanding}
          sizes={ACURATE_NEO2.sizes}
          notes={ACURATE_NEO2.generalNotes}
          highlightArea={highlightArea}
          pacemakerRate={ACURATE_NEO2.pacemakerRate}
        />

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
