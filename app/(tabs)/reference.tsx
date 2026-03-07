import { useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Zap,
  Pill,
  Ruler,
} from "lucide-react-native";
import { Card } from "../../components/ui/Card";
import { Disclaimer } from "../../components/ui/Disclaimer";
import { Colors, Spacing, BorderRadius } from "../../constants/theme";
import {
  VASCULAR_ACCESS,
  PACEMAKER_RISK,
  ANTIPLATELET_PROTOCOLS,
  CLINICAL_THRESHOLDS,
} from "../../data/quick-reference";

// ── Collapsible Section ──────────────────────────────────────

function Section({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.sm,
        }}
      >
        {icon}
        <Text
          style={{
            flex: 1,
            color: Colors.primary,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        {open ? (
          <ChevronDown size={18} color={Colors.muted} />
        ) : (
          <ChevronRight size={18} color={Colors.muted} />
        )}
      </Pressable>
      {open && <View style={{ marginTop: Spacing.md }}>{children}</View>}
    </Card>
  );
}

// ── Vascular Access Table ────────────────────────────────────

function VascularAccessSection() {
  return (
    <Section
      title="Vascular Access Thresholds"
      icon={<Ruler size={18} color={Colors.accent} />}
      defaultOpen
    >
      <Text style={{ color: Colors.muted, fontSize: 11, marginBottom: Spacing.sm }}>
        Minimum iliofemoral vessel diameter by device and size
      </Text>
      {VASCULAR_ACCESS.map((v, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            borderBottomWidth: i < VASCULAR_ACCESS.length - 1 ? 0.5 : 0,
            borderBottomColor: Colors.cardBorder,
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "600" }}>
              {v.device}
            </Text>
            <Text style={{ color: Colors.muted, fontSize: 11 }}>{v.sheathOD}</Text>
            {v.notes && (
              <Text style={{ color: Colors.muted, fontSize: 10, fontStyle: "italic", marginTop: 2 }}>
                {v.notes}
              </Text>
            )}
          </View>
          <Text
            style={{
              color: Colors.accent,
              fontSize: 14,
              fontWeight: "700",
              fontFamily: "DMMono_400Regular",
              minWidth: 60,
              textAlign: "right",
            }}
          >
            {v.minVesselDiameter}
          </Text>
        </View>
      ))}
    </Section>
  );
}

// ── Pacemaker Risk Section ───────────────────────────────────

function PacemakerSection() {
  return (
    <Section
      title="Post-TAVR Pacemaker Risk"
      icon={<Zap size={18} color={Colors.warning} />}
    >
      {PACEMAKER_RISK.map((p, i) => (
        <View
          key={i}
          style={{
            marginBottom: i < PACEMAKER_RISK.length - 1 ? Spacing.lg : 0,
            paddingBottom: i < PACEMAKER_RISK.length - 1 ? Spacing.lg : 0,
            borderBottomWidth: i < PACEMAKER_RISK.length - 1 ? 0.5 : 0,
            borderBottomColor: Colors.cardBorder,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Text style={{ color: Colors.primary, fontSize: 14, fontWeight: "700", flex: 1 }}>
              {p.device}
            </Text>
            <View
              style={{
                backgroundColor: rateColor(p.ppmRate) + "20",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: BorderRadius.sm,
                borderWidth: 1,
                borderColor: rateColor(p.ppmRate) + "40",
              }}
            >
              <Text
                style={{
                  color: rateColor(p.ppmRate),
                  fontSize: 14,
                  fontWeight: "700",
                  fontFamily: "DMMono_400Regular",
                }}
              >
                {p.ppmRate}
              </Text>
            </View>
          </View>
          <Text style={{ color: Colors.muted, fontSize: 11, marginBottom: 6 }}>
            {p.manufacturer} | {p.source}
          </Text>
          {p.riskFactors.map((rf, j) => (
            <View key={j} style={{ flexDirection: "row", paddingLeft: 8, marginBottom: 3 }}>
              <Text style={{ color: Colors.muted, fontSize: 11 }}>{"\u2022 "}</Text>
              <Text style={{ color: Colors.primary, fontSize: 11, flex: 1 }}>{rf}</Text>
            </View>
          ))}
        </View>
      ))}
    </Section>
  );
}

function rateColor(rate: string): string {
  const match = rate.match(/(\d+)/);
  if (!match) return Colors.muted;
  const upper = parseInt(rate.split("-")[1] || match[1], 10);
  if (upper <= 12) return Colors.success;
  if (upper <= 18) return Colors.warning;
  return Colors.danger;
}

// ── Antiplatelet Section ─────────────────────────────────────

function AntiplateletSection() {
  return (
    <Section
      title="Antiplatelet / Anticoagulation"
      icon={<Pill size={18} color={Colors.success} />}
    >
      {ANTIPLATELET_PROTOCOLS.map((ap, i) => (
        <View
          key={i}
          style={{
            marginBottom: i < ANTIPLATELET_PROTOCOLS.length - 1 ? Spacing.lg : 0,
            paddingBottom: i < ANTIPLATELET_PROTOCOLS.length - 1 ? Spacing.lg : 0,
            borderBottomWidth: i < ANTIPLATELET_PROTOCOLS.length - 1 ? 0.5 : 0,
            borderBottomColor: Colors.cardBorder,
          }}
        >
          <Text style={{ color: Colors.accent, fontSize: 13, fontWeight: "700", marginBottom: 4 }}>
            {ap.scenario}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "600", flex: 1 }}>
              {ap.regimen}
            </Text>
            <View
              style={{
                backgroundColor: Colors.accent + "20",
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: BorderRadius.sm,
              }}
            >
              <Text style={{ color: Colors.accent, fontSize: 10, fontWeight: "700" }}>
                Class {ap.guidelineClass}
              </Text>
            </View>
          </View>
          <Text style={{ color: Colors.warning, fontSize: 12, fontWeight: "600", marginBottom: 4 }}>
            {ap.duration}
          </Text>
          <Text style={{ color: Colors.primary, fontSize: 11, lineHeight: 16 }}>
            {ap.details}
          </Text>
          <Text style={{ color: Colors.muted, fontSize: 10, marginTop: 4, fontStyle: "italic" }}>
            {ap.source}
          </Text>
        </View>
      ))}
    </Section>
  );
}

// ── Clinical Thresholds Section ──────────────────────────────

function ThresholdsSection() {
  return (
    <Section
      title="Clinical Thresholds"
      icon={<Stethoscope size={18} color={Colors.danger} />}
    >
      {CLINICAL_THRESHOLDS.map((cat, i) => (
        <View
          key={i}
          style={{
            marginBottom: i < CLINICAL_THRESHOLDS.length - 1 ? Spacing.lg : 0,
          }}
        >
          <Text
            style={{
              color: Colors.accent,
              fontSize: 13,
              fontWeight: "700",
              marginBottom: 6,
            }}
          >
            {cat.category}
          </Text>
          {cat.items.map((item, j) => (
            <View
              key={j}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 4,
                borderBottomWidth: j < cat.items.length - 1 ? 0.5 : 0,
                borderBottomColor: Colors.cardBorder,
                alignItems: "flex-start",
              }}
            >
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={{ color: Colors.primary, fontSize: 12 }}>{item.label}</Text>
                {item.note && (
                  <Text style={{ color: Colors.muted, fontSize: 10, fontStyle: "italic" }}>
                    {item.note}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  color: Colors.accent,
                  fontSize: 13,
                  fontWeight: "600",
                  fontFamily: "DMMono_400Regular",
                }}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </Section>
  );
}

// ── Main Screen ──────────────────────────────────────────────

export default function ReferenceScreen() {
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
          Quick Reference
        </Text>
        <Text style={{ color: Colors.muted, fontSize: 12, marginBottom: 16 }}>
          Key thresholds, protocols, and device-specific data for rapid cath lab lookup
        </Text>

        <VascularAccessSection />
        <PacemakerSection />
        <AntiplateletSection />
        <ThresholdsSection />

        <View style={{ height: 8 }} />
        <Disclaimer />
      </ScrollView>
    </SafeAreaView>
  );
}
