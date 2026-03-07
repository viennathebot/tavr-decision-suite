import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { Colors } from "../../constants/theme";

interface CalciumInterpretationProps {
  calciumScore: number | undefined;
  sex: "male" | "female" | undefined;
}

type SeverityLevel = "non-severe" | "indeterminate" | "severe";

interface Thresholds {
  nonSevereMax: number;
  indeterminateMax: number;
  severeMin: number;
}

const maleThresholds: Thresholds = {
  nonSevereMax: 1599,
  indeterminateMax: 1999,
  severeMin: 2000,
};

const femaleThresholds: Thresholds = {
  nonSevereMax: 799,
  indeterminateMax: 1199,
  severeMin: 1200,
};

const severityColors: Record<SeverityLevel, string> = {
  "non-severe": Colors.success,
  indeterminate: Colors.warning,
  severe: Colors.danger,
};

const severityLabels: Record<SeverityLevel, string> = {
  "non-severe": "Non-Severe (Unlikely Severe AS)",
  indeterminate: "Indeterminate",
  severe: "Severe (Likely Severe AS)",
};

function classifyCalcium(
  score: number,
  thresholds: Thresholds
): SeverityLevel {
  if (score < thresholds.severeMin && score > thresholds.nonSevereMax) {
    return "indeterminate";
  }
  if (score >= thresholds.severeMin) {
    return "severe";
  }
  return "non-severe";
}

export function CalciumInterpretation({
  calciumScore,
  sex,
}: CalciumInterpretationProps) {
  if (calciumScore === undefined || sex === undefined) {
    return (
      <Card style={{ marginVertical: 6 }}>
        <Text
          style={{
            color: Colors.muted,
            fontSize: 13,
            fontStyle: "italic",
          }}
        >
          Enter calcium score and sex to see calcium-based severity
          interpretation.
        </Text>
      </Card>
    );
  }

  const thresholds = sex === "male" ? maleThresholds : femaleThresholds;
  const severity = classifyCalcium(calciumScore, thresholds);
  const color = severityColors[severity];
  const label = severityLabels[severity];

  return (
    <Card
      style={{
        marginVertical: 6,
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <Text
        style={{
          color: Colors.primary,
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        CT Calcium Score Interpretation
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          gap: 8,
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: color,
          }}
        />
        <Text style={{ color: color, fontSize: 15, fontWeight: "700" }}>
          {label}
        </Text>
      </View>

      <Text
        style={{
          color: Colors.primary,
          fontSize: 13,
          fontFamily: "DMMono_400Regular",
          marginBottom: 8,
        }}
      >
        Score: {calciumScore} AU ({sex === "male" ? "Male" : "Female"})
      </Text>

      {/* Threshold table */}
      <View
        style={{
          backgroundColor: Colors.inputBg,
          borderRadius: 8,
          padding: 10,
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: Colors.muted,
            fontSize: 11,
            fontWeight: "600",
            marginBottom: 6,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {sex === "male" ? "Male" : "Female"} Thresholds
        </Text>

        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View
            style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.success, marginRight: 8, marginTop: 2 }}
          />
          <Text style={{ color: Colors.primary, fontSize: 12 }}>
            Non-severe: {"<"}{sex === "male" ? "1600" : "800"} AU
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View
            style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.warning, marginRight: 8, marginTop: 2 }}
          />
          <Text style={{ color: Colors.primary, fontSize: 12 }}>
            Indeterminate: {sex === "male" ? "1600-1999" : "800-1199"} AU
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.danger, marginRight: 8, marginTop: 2 }}
          />
          <Text style={{ color: Colors.primary, fontSize: 12 }}>
            Severe: {">="}{sex === "male" ? "2000" : "1200"} AU
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: Colors.muted,
          fontSize: 10,
          fontStyle: "italic",
        }}
      >
        Clavel MA et al. Circulation 2014;129:2516-2525.
      </Text>
    </Card>
  );
}
