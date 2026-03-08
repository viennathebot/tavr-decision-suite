"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  badge,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-navy-600 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-navy-800 hover:bg-navy-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-200">{title}</span>
          {badge}
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="p-4 bg-navy-800/50">{children}</div>}
    </div>
  );
}
