import { View, Text } from "react-native";
import { AlertTriangle } from "lucide-react-native";
import { Card } from "../ui/Card";
import { Colors } from "../../constants/theme";

interface MeasurementErrorChecklistProps {
  lvotDiameter?: number;
  systolicBP?: number;
  bsa?: number;
  ava?: number;
  dvi?: number;
  lvotTVI?: number;
  indexedAVA?: number;
}

interface Flag {
  id: string;
  message: string;
  detail: string;
}

function detectFlags(props: MeasurementErrorChecklistProps): Flag[] {
  const flags: Flag[] = [];

  if (props.lvotDiameter !== undefined && props.lvotDiameter > 3.2) {
    flags.push({
      id: "lvot-high",
      message: "LVOT Diameter >3.2 cm",
      detail:
        "Unusually large LVOT diameter. Verify measurement in parasternal long axis with zoom. Consider using CT-derived LVOT dimensions.",
    });
  }

  if (props.lvotDiameter !== undefined && props.lvotDiameter < 1.5) {
    flags.push({
      id: "lvot-low",
      message: "LVOT Diameter <1.5 cm",
      detail:
        "Unusually small LVOT diameter may underestimate AVA. Recheck measurement location and ensure inner-edge-to-inner-edge technique.",
    });
  }

  if (props.systolicBP !== undefined && props.systolicBP > 140) {
    flags.push({
      id: "sbp-high",
      message: "SBP >140 mmHg at time of echo",
      detail:
        "Elevated systemic pressure may reduce transvalvular gradient due to increased afterload. Consider repeating echo with BP controlled.",
    });
  }

  if (
    props.bsa !== undefined &&
    props.bsa < 1.6 &&
    props.ava !== undefined &&
    props.indexedAVA === undefined
  ) {
    flags.push({
      id: "bsa-small",
      message: "BSA <1.6 m\u00B2 and AVA not indexed",
      detail:
        "Small body habitus. AVA should be indexed to BSA for accurate severity grading. Indexed AVA <0.6 cm\u00B2/m\u00B2 indicates severe AS.",
    });
  }

  if (
    props.dvi !== undefined &&
    props.ava !== undefined
  ) {
    const dviSevere = props.dvi < 0.25;
    const avaSevere = props.ava < 1.0;
    if (dviSevere !== avaSevere) {
      flags.push({
        id: "dvi-ava",
        message: "DVI inconsistent with AVA",
        detail: dviSevere
          ? "DVI <0.25 suggests severe AS but AVA >=1.0 cm\u00B2. Most commonly caused by LVOT diameter measurement error."
          : "AVA <1.0 cm\u00B2 but DVI >=0.25. DVI is LVOT-diameter-independent \u2014 this discrepancy suggests LVOT diameter underestimation.",
      });
    }
  }

  if (props.lvotTVI !== undefined && props.lvotTVI < 15) {
    flags.push({
      id: "lvot-tvi-low",
      message: "LVOT TVI <15 cm",
      detail:
        "Low LVOT TVI suggests reduced flow. Confirm PW Doppler sample volume is positioned correctly in the LVOT (within 0.5-1.0 cm of the aortic annulus).",
    });
  }

  return flags;
}

export function MeasurementErrorChecklist(props: MeasurementErrorChecklistProps) {
  const flags = detectFlags(props);

  if (flags.length === 0) {
    return null;
  }

  return (
    <Card
      variant="warning"
      style={{ marginVertical: 6 }}
    >
      <Text
        style={{
          color: Colors.warning,
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Measurement Quality Flags ({flags.length})
      </Text>

      {flags.map((flag, i) => (
        <View
          key={flag.id}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: i < flags.length - 1 ? 10 : 0,
            gap: 8,
          }}
        >
          <AlertTriangle
            size={14}
            color={Colors.warning}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: Colors.warning,
                fontSize: 13,
                fontWeight: "600",
                marginBottom: 2,
              }}
            >
              {flag.message}
            </Text>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {flag.detail}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );
}
