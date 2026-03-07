import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react-native";
import { EvidenceBadge } from "./EvidenceBadge";
import { Colors } from "../../constants/theme";

interface PaperCardProps {
  title: string;
  authors: string;
  journal: string;
  year: number;
  pmid?: string;
  keyFindings: string[];
  clinicalTakeaway: string;
  tags: string[];
  evidenceLevel: "A" | "B" | "C";
  sampleSize?: number;
}

export function PaperCard({
  title,
  authors,
  journal,
  year,
  pmid,
  keyFindings,
  clinicalTakeaway,
  tags,
  evidenceLevel,
  sampleSize,
}: PaperCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={{
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.cardBorder,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
        {expanded ? (
          <ChevronDown size={16} color={Colors.accent} style={{ marginTop: 2 }} />
        ) : (
          <ChevronRight size={16} color={Colors.muted} style={{ marginTop: 2 }} />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 13,
              fontWeight: "600",
              lineHeight: 18,
            }}
          >
            {title}
          </Text>
          <Text
            style={{ color: Colors.muted, fontSize: 11, marginTop: 3 }}
            numberOfLines={1}
          >
            {authors}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 8,
            }}
          >
            <Text style={{ color: Colors.muted, fontSize: 11, fontStyle: "italic" }}>
              {journal} {year}
            </Text>
            {sampleSize && (
              <Text style={{ color: Colors.accent, fontSize: 10, fontWeight: "600" }}>
                n={sampleSize.toLocaleString()}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            <EvidenceBadge level={evidenceLevel} />
          </View>
        </View>
      </View>

      {expanded && (
        <View style={{ marginTop: 12, paddingLeft: 24 }}>
          <Text
            style={{
              color: Colors.success,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            Clinical Takeaway
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 12,
              lineHeight: 18,
              marginBottom: 10,
            }}
          >
            {clinicalTakeaway}
          </Text>

          <Text
            style={{
              color: Colors.accent,
              fontSize: 12,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            Key Findings
          </Text>
          {keyFindings.map((f, i) => (
            <View key={i} style={{ flexDirection: "row", marginBottom: 3 }}>
              <Text style={{ color: Colors.muted, fontSize: 11, marginRight: 6 }}>
                {"\u2022"}
              </Text>
              <Text style={{ color: Colors.primary, fontSize: 11, flex: 1, lineHeight: 16 }}>
                {f}
              </Text>
            </View>
          ))}

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
            {tags.map((tag) => (
              <View
                key={tag}
                style={{
                  backgroundColor: Colors.inputBg,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text style={{ color: Colors.muted, fontSize: 9 }}>{tag}</Text>
              </View>
            ))}
          </View>

          {pmid && (
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 4 }}>
              <ExternalLink size={12} color={Colors.muted} />
              <Text style={{ color: Colors.muted, fontSize: 10 }}>
                PMID: {pmid}
              </Text>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}
