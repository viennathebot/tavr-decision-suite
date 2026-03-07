import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import { Colors } from "../../constants/theme";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  badge,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View style={{ marginVertical: 6 }}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 4,
        }}
      >
        {open ? (
          <ChevronDown size={18} color={Colors.accent} />
        ) : (
          <ChevronRight size={18} color={Colors.muted} />
        )}
        <Text
          style={{
            color: Colors.primary,
            fontSize: 15,
            fontWeight: "700",
            marginLeft: 8,
            flex: 1,
          }}
        >
          {title}
        </Text>
        {badge && (
          <View
            style={{
              backgroundColor: Colors.accent + "20",
              borderRadius: 4,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: Colors.accent, fontSize: 10, fontWeight: "600" }}>
              {badge}
            </Text>
          </View>
        )}
      </Pressable>
      {open && <View style={{ paddingLeft: 4 }}>{children}</View>}
    </View>
  );
}
