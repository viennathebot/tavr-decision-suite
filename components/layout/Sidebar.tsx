"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  GitBranch,
  Repeat,
  BookOpen,
  Ruler,
  ClipboardList,
  HeartPulse,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/algorithm", label: "Algorithm", icon: GitBranch },
  { href: "/teer", label: "TEER", icon: HeartPulse },
  { href: "/valve-in-valve", label: "Valve-in-Valve", icon: Repeat },
  { href: "/evidence", label: "Evidence", icon: BookOpen },
  { href: "/sizing", label: "Sizing", icon: Ruler },
  { href: "/reference", label: "Reference", icon: ClipboardList },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-navy-800 border-r border-navy-600 fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-navy-600">
          <h1 className="text-xl font-bold text-gold">TAVR Decision Suite</h1>
          <p className="text-xs text-slate-400 mt-1">Clinical Decision Support</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-navy-700"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-navy-600">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            For educational and clinical decision support only. Not a substitute for clinical judgment.
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy-800 border-t border-navy-600 z-50 flex">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center py-2 text-[10px] ${
                isActive ? "text-gold" : "text-slate-500"
              }`}
            >
              <item.icon size={18} />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
