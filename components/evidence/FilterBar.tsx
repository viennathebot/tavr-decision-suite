import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { Search, X } from "lucide-react-native";
import { Colors } from "../../constants/theme";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedLevel: string | null;
  onLevelChange: (level: string | null) => void;
  availableTags: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  selectedLevel,
  onLevelChange,
  availableTags,
}: FilterBarProps) {
  const [showTags, setShowTags] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.inputBg,
          borderRadius: 8,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: Colors.inputBorder,
        }}
      >
        <Search size={16} color={Colors.muted} />
        <TextInput
          style={{
            flex: 1,
            color: Colors.primary,
            fontSize: 14,
            paddingVertical: 10,
            marginLeft: 8,
          }}
          placeholder="Search title, authors, journal..."
          placeholderTextColor={Colors.muted}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => onSearchChange("")}>
            <X size={16} color={Colors.muted} />
          </Pressable>
        )}
      </View>

      <View style={{ flexDirection: "row", marginTop: 8, gap: 6 }}>
        {(["A", "B", "C"] as const).map((level) => {
          const isActive = selectedLevel === level;
          return (
            <Pressable
              key={level}
              onPress={() => onLevelChange(isActive ? null : level)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
                backgroundColor: isActive ? Colors.accent : Colors.inputBg,
                borderWidth: 1,
                borderColor: isActive ? Colors.accent : Colors.inputBorder,
              }}
            >
              <Text
                style={{
                  color: isActive ? Colors.white : Colors.muted,
                  fontSize: 11,
                  fontWeight: "600",
                }}
              >
                Level {level}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => setShowTags(!showTags)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 6,
            backgroundColor: selectedTags.length > 0 ? Colors.accent + "30" : Colors.inputBg,
            borderWidth: 1,
            borderColor: selectedTags.length > 0 ? Colors.accent : Colors.inputBorder,
          }}
        >
          <Text
            style={{
              color: selectedTags.length > 0 ? Colors.accent : Colors.muted,
              fontSize: 11,
              fontWeight: "600",
            }}
          >
            Tags {selectedTags.length > 0 ? `(${selectedTags.length})` : ""}
          </Text>
        </Pressable>
      </View>

      {showTags && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8 }}
          contentContainerStyle={{ gap: 6 }}
        >
          {availableTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <Pressable
                key={tag}
                onPress={() => onTagToggle(tag)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                  backgroundColor: isActive ? Colors.accent + "30" : Colors.inputBg,
                  borderWidth: 1,
                  borderColor: isActive ? Colors.accent : Colors.inputBorder,
                }}
              >
                <Text
                  style={{
                    color: isActive ? Colors.accent : Colors.muted,
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  {tag}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
