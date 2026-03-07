import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Colors } from "../../constants/theme";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type GuidelineClass = "I" | "IIa" | "IIb" | "III";

interface DecisionNodeProps {
  stepNumber: number;
  title: string;
  description: string;
  details: string;
  evidence?: string;
  guidelineClass?: GuidelineClass;
  isActive?: boolean;
  onPress?: () => void;
}

function getGuidelineBadgeColor(cls: GuidelineClass): string {
  switch (cls) {
    case "I":
      return Colors.success;
    case "IIa":
      return Colors.accent;
    case "IIb":
      return Colors.warning;
    case "III":
      return Colors.danger;
    default:
      return Colors.muted;
  }
}

function getGuidelineBadgeLabel(cls: GuidelineClass): string {
  switch (cls) {
    case "I":
      return "Class I";
    case "IIa":
      return "Class IIa";
    case "IIb":
      return "Class IIb";
    case "III":
      return "Class III";
    default:
      return cls;
  }
}

export function DecisionNode({
  stepNumber,
  title,
  description,
  details,
  evidence,
  guidelineClass,
  isActive = false,
  onPress,
}: DecisionNodeProps) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card
        style={[
          styles.card,
          isActive && styles.activeCard,
          expanded && styles.expandedCard,
        ]}
      >
        {/* Header Row */}
        <View style={styles.header}>
          <View
            style={[
              styles.stepCircle,
              isActive && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                isActive && styles.stepNumberActive,
              ]}
            >
              {stepNumber}
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {guidelineClass && !expanded && (
              <Badge
                label={getGuidelineBadgeLabel(guidelineClass)}
                color={getGuidelineBadgeColor(guidelineClass)}
              />
            )}
          </View>

          <Text style={styles.expandIcon}>{expanded ? "\u25B2" : "\u25BC"}</Text>
        </View>

        {/* Expanded Content */}
        {expanded && (
          <View style={styles.expandedContent}>
            {/* Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.details}>{details}</Text>
            </View>

            {/* Evidence Citation */}
            {evidence && (
              <View style={styles.evidenceContainer}>
                <Text style={styles.evidenceLabel}>Evidence</Text>
                <Text style={styles.evidenceText}>{evidence}</Text>
              </View>
            )}

            {/* Guideline Class Badge */}
            {guidelineClass && (
              <View style={styles.guidelineBadgeRow}>
                <Text style={styles.guidelineLabel}>Guideline Recommendation:</Text>
                <Badge
                  label={getGuidelineBadgeLabel(guidelineClass)}
                  color={getGuidelineBadgeColor(guidelineClass)}
                />
              </View>
            )}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  activeCard: {
    borderColor: Colors.accent,
    borderWidth: 1.5,
  },
  expandedCard: {
    borderColor: Colors.accent,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: Colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepCircleActive: {
    backgroundColor: Colors.accent + "20",
    borderColor: Colors.accent,
  },
  stepNumber: {
    color: Colors.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  stepNumberActive: {
    color: Colors.accent,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
  },
  expandIcon: {
    color: Colors.muted,
    fontSize: 10,
    marginLeft: 8,
  },
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  description: {
    color: Colors.primary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: Colors.inputBg,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  details: {
    color: Colors.primary,
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.9,
  },
  evidenceContainer: {
    backgroundColor: Colors.accent + "10",
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  evidenceLabel: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  evidenceText: {
    color: Colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: "italic",
  },
  guidelineBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  guidelineLabel: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DecisionNode;
