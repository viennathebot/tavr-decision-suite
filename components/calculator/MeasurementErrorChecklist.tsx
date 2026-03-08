import { AlertTriangle } from "lucide-react";

interface MeasurementError {
  field: string;
  message: string;
  severity: "warning" | "error";
}

interface MeasurementErrorChecklistProps {
  errors: MeasurementError[];
}

export function MeasurementErrorChecklist({
  errors,
}: MeasurementErrorChecklistProps) {
  if (errors.length === 0) return null;

  return (
    <div className="rounded-xl border border-navy-600 bg-navy-800 p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Measurement Quality Flags
      </h3>
      <div className="space-y-2">
        {errors.map((error, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 rounded-lg px-3 py-2 border ${
              error.severity === "error"
                ? "bg-red-500/10 border-red-500/20"
                : "bg-amber-500/10 border-amber-500/20"
            }`}
          >
            <AlertTriangle
              size={14}
              className={`mt-0.5 flex-shrink-0 ${
                error.severity === "error"
                  ? "text-red-400"
                  : "text-amber-400"
              }`}
            />
            <div className="flex-1 min-w-0">
              <span
                className={`text-xs font-medium ${
                  error.severity === "error"
                    ? "text-red-400"
                    : "text-amber-400"
                }`}
              >
                {error.field}
              </span>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {error.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
