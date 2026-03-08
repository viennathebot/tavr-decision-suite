"use client";

export function AlgorithmFlowchart() {
  return (
    <div className="overflow-x-auto py-4">
      <div className="min-w-[640px] flex flex-col items-center gap-0">
        {/* Start Node */}
        <FlowNode
          title="Echo Assessment"
          subtitle="AVA, MG, Vmax, LVEF, SVI, DVI"
          variant="start"
        />
        <Connector />

        {/* Decision: Concordance */}
        <DecisionNode label="AVA < 1.0 cm2 + MG >= 40 mmHg?" />
        <div className="flex items-start justify-center gap-0 w-full max-w-3xl">
          {/* Left Branch: Concordant */}
          <div className="flex flex-col items-center flex-1">
            <BranchLabel text="Yes" side="left" />
            <Connector />
            <FlowNode
              title="Concordant Severe AS"
              subtitle="High-gradient. Proceed to Heart Team."
              variant="endpoint-green"
            />
          </div>

          {/* Right Branch: Discordant / Low-gradient */}
          <div className="flex flex-col items-center flex-1">
            <BranchLabel text="No (Low-gradient)" side="right" />
            <Connector />
            <DecisionNode label="LVEF < 50%?" />
            <div className="flex items-start justify-center gap-0 w-full">
              {/* Reduced EF */}
              <div className="flex flex-col items-center flex-1">
                <BranchLabel text="Yes" side="left" />
                <Connector />
                <FlowNode
                  title="Classic LFLG AS"
                  subtitle="Reduced EF + low flow"
                  variant="decision"
                />
                <Connector />
                <FlowNode
                  title="DSE or CT Calcium"
                  subtitle="True-severe vs pseudo-severe"
                  variant="endpoint-amber"
                />
              </div>

              {/* Preserved EF */}
              <div className="flex flex-col items-center flex-1">
                <BranchLabel text="No" side="right" />
                <Connector />
                <DecisionNode label="SVI < 35 mL/m2?" />
                <div className="flex items-start justify-center gap-0 w-full">
                  {/* Low-flow preserved EF */}
                  <div className="flex flex-col items-center flex-1">
                    <BranchLabel text="Yes" side="left" />
                    <Connector />
                    <FlowNode
                      title="Paradoxical LFLG"
                      subtitle="Preserved EF + low flow"
                      variant="decision"
                    />
                    <Connector />
                    <FlowNode
                      title="CT Calcium Scoring"
                      subtitle="Primary adjudicator"
                      variant="endpoint-amber"
                    />
                  </div>

                  {/* Normal-flow low-gradient */}
                  <div className="flex flex-col items-center flex-1">
                    <BranchLabel text="No" side="right" />
                    <Connector />
                    <FlowNode
                      title="Normal-Flow LG"
                      subtitle="SVI >= 35, MG < 40"
                      variant="decision"
                    />
                    <Connector />
                    <FlowNode
                      title="Measurement Error Review"
                      subtitle="Then CT calcium if confirmed"
                      variant="endpoint-red"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  title,
  subtitle,
  variant,
}: {
  title: string;
  subtitle: string;
  variant: "start" | "decision" | "endpoint-green" | "endpoint-amber" | "endpoint-red";
}) {
  const styles: Record<string, string> = {
    start:
      "bg-gold/10 border-gold/40 text-gold",
    decision:
      "bg-navy-700 border-gold/30 text-slate-200",
    "endpoint-green":
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    "endpoint-amber":
      "bg-amber-500/10 border-amber-500/30 text-amber-400",
    "endpoint-red":
      "bg-red-500/10 border-red-500/30 text-red-400",
  };

  return (
    <div
      className={`px-4 py-3 rounded-xl border-2 text-center max-w-[200px] w-full ${styles[variant]}`}
    >
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-[10px] mt-1 opacity-80">{subtitle}</p>
    </div>
  );
}

function DecisionNode({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 bg-navy-700 border-2 border-gold/50 rounded-lg text-center max-w-[220px] w-full rotate-0">
      <p className="text-xs font-semibold text-gold">{label}</p>
    </div>
  );
}

function Connector() {
  return (
    <div className="w-px h-6 bg-navy-500" />
  );
}

function BranchLabel({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      <span
        className={`text-[10px] font-medium ${
          side === "left" ? "text-emerald-400" : "text-amber-400"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
