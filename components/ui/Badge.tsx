interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "success" | "warning" | "danger" | "muted";
  className?: string;
}

const variantClasses: Record<string, string> = {
  gold: "bg-gold/15 text-gold border-gold/30",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/15 text-red-400 border-red-500/30",
  muted: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export function Badge({ children, variant = "gold", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
