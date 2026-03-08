"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Publication } from "@/data/publications";

interface PaperCardProps {
  publication: Publication;
}

const levelVariant: Record<string, "success" | "warning" | "muted"> = {
  A: "success",
  B: "warning",
  C: "muted",
};

const levelLabel: Record<string, string> = {
  A: "Level A",
  B: "Level B",
  C: "Level C",
};

export function PaperCard({ publication }: PaperCardProps) {
  const [expanded, setExpanded] = useState(false);
  const p = publication;

  const truncatedAuthors =
    p.authors.length > 80 ? p.authors.slice(0, 80) + "..." : p.authors;

  return (
    <div className="border border-navy-600 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 px-4 py-3 bg-navy-800 hover:bg-navy-700 transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="text-sm font-semibold text-slate-200 leading-snug flex-1">
              {p.title}
            </h3>
            <Badge variant={levelVariant[p.evidenceLevel] ?? "muted"}>
              {levelLabel[p.evidenceLevel]}
            </Badge>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">{truncatedAuthors}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            {p.journal} ({p.year})
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform mt-1 shrink-0 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="px-4 py-4 bg-navy-800/50 border-t border-navy-600 space-y-3">
          {/* Key Findings */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-1.5">
              Key Findings
            </h4>
            <ul className="space-y-1">
              {p.keyFindings.map((finding, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-400"
                >
                  <span className="text-gold mt-0.5 shrink-0">-</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Takeaway */}
          <div className="px-3 py-2 bg-gold/5 border border-gold/20 rounded-lg">
            <h4 className="text-[10px] font-semibold text-gold mb-0.5">
              Clinical Takeaway
            </h4>
            <p className="text-xs text-slate-300">{p.clinicalTakeaway}</p>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
            {p.sampleSize && (
              <span>
                <span className="text-slate-400 font-medium">N = </span>
                {p.sampleSize.toLocaleString()}
              </span>
            )}
            {p.pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-gold hover:text-gold-dark transition-colors"
              >
                PMID: {p.pmid}
                <ExternalLink size={10} />
              </a>
            )}
            {p.primaryOutcome && (
              <span>
                <span className="text-slate-400 font-medium">Outcome: </span>
                {p.primaryOutcome}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-navy-700 text-slate-500 border border-navy-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
