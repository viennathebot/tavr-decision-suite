"use client";

import { useState, useMemo } from "react";
import { FilterBar } from "@/components/evidence/FilterBar";
import { PaperCard } from "@/components/evidence/PaperCard";
import { PUBLICATIONS } from "@/data/publications";

export default function EvidencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    PUBLICATIONS.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  // Filter publications
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter((p) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Evidence level filter
      if (activeLevel !== "All" && p.evidenceLevel !== activeLevel) {
        return false;
      }

      // Tag filter (AND logic: must include all selected tags)
      if (activeTags.length > 0) {
        const hasAllTags = activeTags.every((tag) => p.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [searchQuery, activeLevel, activeTags]);

  const handleTagFilter = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">Evidence Library</h1>
      <p className="text-xs text-slate-400 mb-6">
        Curated evidence base for aortic stenosis, TAVR decision-making,
        and TEER/MitraClip trials.
      </p>

      <FilterBar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        activeLevel={activeLevel}
        onLevelFilter={setActiveLevel}
        activeTags={activeTags}
        onTagFilter={handleTagFilter}
        allTags={allTags}
      />

      <div className="mt-4 mb-3">
        <p className="text-xs text-slate-500">
          Showing {filteredPublications.length} of {PUBLICATIONS.length}{" "}
          publications
        </p>
      </div>

      <div className="space-y-3">
        {filteredPublications.map((pub) => (
          <PaperCard key={pub.id} publication={pub} />
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-slate-500">
            No publications match the current filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveLevel("All");
              setActiveTags([]);
            }}
            className="mt-2 text-xs text-gold hover:text-gold-dark transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
