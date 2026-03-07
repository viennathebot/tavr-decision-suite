import { View, Text, Pressable } from "react-native";
import { Colors } from "../../constants/theme";

interface SegmentedControlProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  selected: T | undefined;
  onSelect: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: SegmentedControlProps<T>) {
  return (
    <View style={{ marginVertical: 6 }}>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 13,
          fontWeight: "600",
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.inputBg,
          borderRadius: 8,
          padding: 2,
        }}
      >
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onSelect(opt.value)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 6,
                backgroundColor: isActive ? Colors.accent : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: isActive ? Colors.white : Colors.muted,
                  fontSize: 13,
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
