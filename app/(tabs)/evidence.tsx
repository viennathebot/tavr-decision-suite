import { useState, useMemo, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { PaperCard } from "../../components/evidence/PaperCard";
import { FilterBar } from "../../components/evidence/FilterBar";
import { PUBLICATIONS as publications, type Publication } from "../../data/publications";
import { Colors } from "../../constants/theme";

export default function EvidenceScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    publications.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filtered = useMemo(() => {
    let results = publications;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q) ||
          p.clinicalTakeaway.toLowerCase().includes(q) ||
          p.keyFindings.some((f) => f.toLowerCase().includes(q))
      );
    }

    if (selectedLevel) {
      results = results.filter((p) => p.evidenceLevel === selectedLevel);
    }

    if (selectedTags.length > 0) {
      results = results.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      );
    }

    return results;
  }, [searchQuery, selectedLevel, selectedTags]);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text
          style={{
            color: Colors.primary,
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Evidence Library
        </Text>
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          availableTags={allTags}
        />
        <Text style={{ color: Colors.muted, fontSize: 11, marginBottom: 4 }}>
          {filtered.length} of {publications.length} publications
        </Text>
      </View>

      <FlashList<Publication>
        data={filtered}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <PaperCard
            title={item.title}
            authors={item.authors}
            journal={item.journal}
            year={item.year}
            pmid={item.pmid}
            keyFindings={item.keyFindings}
            clinicalTakeaway={item.clinicalTakeaway}
            tags={item.tags}
            evidenceLevel={item.evidenceLevel}
            sampleSize={item.sampleSize}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
