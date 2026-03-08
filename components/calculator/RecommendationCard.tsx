import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Colors } from "../../constants/theme";

interface RecommendationCardProps {
  title: string;
  description: string;
  urgency: string;
  actions: string[];
  guideline: string;
  guidelineClass: string;
  citation: string;
}

const urgencyColors: Record<string, string> = {
  high: Colors.danger,
  moderate: Colors.warning,
  watch: Colors.accent,
};

const urgencyLabels: Record<string, string> = {
  high: "HIGH PRIORITY",
  moderate: "MODERATE",
  watch: "SURVEILLANCE",
};

const urgencyVariant: Record<string, "danger" | "warning" | "outlined" | "default"> = {
  high: "danger",
  moderate: "warning",
  watch: "outlined",
};

export function RecommendationCard({
  title,
  description,
  urgency,
  actions,
  guideline,
  guidelineClass,
  citation,
}: RecommendationCardProps) {
  const color = urgencyColors[urgency] ?? Colors.muted;
  const variant = urgencyVariant[urgency] ?? "default";

  return (
    <Card variant={variant} style={{ marginVertical: 6 }}>
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
            fontSize: 15,
            fontWeight: "700",
            flex: 1,
            marginRight: 8,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Text
            style={{
              color: color,
              fontSize: 9,
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            {urgencyLabels[urgency] ?? urgency.toUpperCase()}
          </Text>
          <Badge
            label={`Class ${guidelineClass}`}
            color={color}
            textColor={Colors.white}
          />
        </View>
      </View>

      <Text
        style={{
          color: Colors.primary,
          fontSize: 13,
          lineHeight: 20,
          marginBottom: 10,
        }}
      >
        {description}
      </Text>

      {actions.length > 0 && (
        <View style={{ marginBottom: 10 }}>
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
            Action Steps
          </Text>
          {actions.map((action, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 4,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: color + "20",
                  borderWidth: 1,
                  borderColor: color + "40",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 8,
                  marginTop: 1,
                }}
              >
                <Text
                  style={{
                    color: color,
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 12,
                  lineHeight: 18,
                  flex: 1,
                }}
              >
                {action}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: Colors.cardBorder,
          paddingTop: 8,
        }}
      >
        <Text
          style={{
            color: Colors.muted,
            fontSize: 11,
            fontWeight: "600",
          }}
        >
          {guideline}
        </Text>
        <Text
          style={{
            color: Colors.muted,
            fontSize: 10,
            fontStyle: "italic",
            marginTop: 2,
          }}
        >
          {citation}
        </Text>
      </View>
    </Card>
  );
}
