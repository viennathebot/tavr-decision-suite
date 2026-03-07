import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Info, X } from "lucide-react-native";
import { Colors } from "../../constants/theme";

interface TooltipProps {
  title: string;
  content: string;
  citation?: string;
}

export function Tooltip({ title, content, citation }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} hitSlop={8}>
        <Info size={14} color={Colors.muted} />
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onPress={() => setVisible(false)}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 12,
              padding: 20,
              marginHorizontal: 32,
              maxWidth: 400,
              borderWidth: 1,
              borderColor: Colors.cardBorder,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 16,
                  fontWeight: "700",
                  flex: 1,
                }}
              >
                {title}
              </Text>
              <Pressable onPress={() => setVisible(false)}>
                <X size={18} color={Colors.muted} />
              </Pressable>
            </View>
            <Text style={{ color: Colors.primary, fontSize: 14, lineHeight: 20 }}>
              {content}
            </Text>
            {citation && (
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 11,
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                {citation}
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
