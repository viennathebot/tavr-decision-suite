"use client";

import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  activeLevel: string;
  onLevelFilter: (level: string) => void;
  activeTags: string[];
  onTagFilter: (tag: string) => void;
  allTags: string[];
}

export function FilterBar({
  searchQuery,
  onSearch,
  activeLevel,
  onLevelFilter,
  activeTags,
  onTagFilter,
  allTags,
}: FilterBarProps) {
  const levels = ["All", "A", "B", "C"];

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by title, authors, or journal..."
          className="w-full bg-navy-700 border border-navy-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors"
        />
      </div>

      {/* Evidence level filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-medium shrink-0">
          Evidence Level:
        </span>
        <div className="flex bg-navy-700 rounded-lg p-0.5 border border-navy-500">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => onLevelFilter(level)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeLevel === level
                  ? "bg-gold text-navy-900 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5">
        {allTags.map((tag) => {
          const isActive = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagFilter(tag)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all ${
                isActive
                  ? "bg-gold/15 text-gold border-gold/30"
                  : "bg-navy-700 text-slate-500 border-navy-500 hover:text-slate-300 hover:border-navy-400"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
