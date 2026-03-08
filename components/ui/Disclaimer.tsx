import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
      <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
      <p className="text-[10px] text-amber-200/70 leading-relaxed">
        For educational and clinical decision support only. All calculations and
        recommendations must be validated by qualified clinicians. Not a substitute
        for professional clinical judgment or institutional protocols.
      </p>
    </div>
  );
}
