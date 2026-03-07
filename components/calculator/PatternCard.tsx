import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Colors } from "../../constants/theme";
import type { ClavelResult } from "../../lib/classification";

interface PatternCardProps {
  pattern: string;
  patternName: string;
  description: string;
  confidence: number;
  discordances: string[];
  clavelClassification?: ClavelResult;
}

const patternColors: Record<string, string> = {
  "high-gradient": Colors.danger,
  "classic-lflg": Colors.warning,
  "paradoxical-lflg": Colors.warning,
  "normal-flow-lg": Colors.accent,
  "moderate": Colors.warning,
  "discordant": Colors.muted,
};

const clavelSeverityColors: Record<string, string> = {
  severe: Colors.danger,
  "likely-severe": Colors.warning,
  indeterminate: Colors.accent,
  "unlikely-severe": Colors.success,
};

export function PatternCard({
  pattern,
  patternName,
  description,
  confidence,
  discordances,
  clavelClassification,
}: PatternCardProps) {
  const color = patternColors[pattern] ?? Colors.muted;
  const confidencePct = Math.round(confidence * 100);

  return (
    <Card
      style={{
        borderLeftWidth: 4,
        borderLeftColor: color,
        marginVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            color: color,
            fontSize: 16,
            fontWeight: "800",
            flex: 1,
          }}
        >
          {patternName}
        </Text>
        <Badge
          label={`${confidencePct}%`}
          color={color}
          textColor={Colors.white}
        />
      </View>

      <Text
        style={{
          color: Colors.primary,
          fontSize: 13,
          lineHeight: 20,
          marginBottom: discordances.length > 0 || clavelClassification ? 12 : 0,
        }}
      >
        {description}
      </Text>

      {/* ── Clavel 2015 Classification ──────────────────────────────── */}
      {clavelClassification && (
        <View
          style={{
            backgroundColor: Colors.accent + "10",
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.accent + "30",
            marginBottom: discordances.length > 0 ? 12 : 0,
          }}
        >
          <Text
            style={{
              color: Colors.accent,
              fontSize: 12,
              fontWeight: "700",
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Clavel Classification (2015)
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 13,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            {clavelClassification.label}
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 12,
              lineHeight: 18,
              marginBottom: clavelClassification.calciumInterpretation || clavelClassification.dseInterpretation ? 8 : 0,
            }}
          >
            {clavelClassification.nextStep}
          </Text>

          {/* DSE interpretation */}
          {clavelClassification.dseInterpretation && (
            <View
              style={{
                backgroundColor: Colors.inputBg,
                borderRadius: 6,
                padding: 8,
                marginBottom: clavelClassification.calciumInterpretation ? 6 : 0,
              }}
            >
              <Text style={{ color: Colors.muted, fontSize: 10, fontWeight: "600", marginBottom: 2 }}>
                DSE RESULT
              </Text>
              <Text style={{ color: Colors.primary, fontSize: 12, lineHeight: 17 }}>
                {clavelClassification.dseInterpretation}
              </Text>
            </View>
          )}

          {/* CT calcium interpretation */}
          {clavelClassification.calciumInterpretation && (
            <View
              style={{
                backgroundColor: Colors.inputBg,
                borderRadius: 6,
                padding: 8,
              }}
            >
              <Text style={{ color: Colors.muted, fontSize: 10, fontWeight: "600", marginBottom: 2 }}>
                CT CALCIUM ADJUDICATION
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: clavelSeverityColors[clavelClassification.calciumInterpretation.severity] ?? Colors.muted,
                  }}
                />
                <Text style={{ color: Colors.primary, fontSize: 12, lineHeight: 17, flex: 1 }}>
                  {clavelClassification.calciumInterpretation.label}
                </Text>
              </View>
              <Text style={{ color: Colors.muted, fontSize: 10, marginTop: 4 }}>
                {clavelClassification.calciumInterpretation.threshold}
              </Text>
            </View>
          )}

          <Text
            style={{
              color: Colors.muted,
              fontSize: 9,
              fontStyle: "italic",
              marginTop: 6,
            }}
          >
            Clavel MA et al. Heart 2015;101:1881-1888 (PMID: 25772832)
          </Text>
        </View>
      )}

      {discordances.length > 0 && (
        <View
          style={{
            backgroundColor: Colors.warning + "10",
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.warning + "25",
          }}
        >
          <Text
            style={{
              color: Colors.warning,
              fontSize: 12,
              fontWeight: "700",
              marginBottom: 6,
            }}
          >
            Discordances
          </Text>
          {discordances.map((d, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                marginBottom: i < discordances.length - 1 ? 4 : 0,
              }}
            >
              <Text style={{ color: Colors.warning, fontSize: 12, marginRight: 6 }}>
                {"\u2022"}
              </Text>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 12,
                  lineHeight: 18,
                  flex: 1,
                }}
              >
                {d}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
