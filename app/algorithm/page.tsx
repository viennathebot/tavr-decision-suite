"use client";

import { useState } from "react";
import { StepByStep } from "@/components/algorithm/StepByStep";
import { AlgorithmFlowchart } from "@/components/algorithm/AlgorithmFlowchart";
import { Disclaimer } from "@/components/ui/Disclaimer";

type Tab = "step-by-step" | "flowchart";

export default function AlgorithmPage() {
  const [activeTab, setActiveTab] = useState<Tab>("step-by-step");

  return (
    <div className="px-4 py-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gold mb-2">
        Discordant AS Algorithm
      </h1>
      <p className="text-xs text-slate-400 mb-6">
        Structured 9-step evaluation of discordant aortic stenosis grading per
        ACC/AHA guidelines and Clavel 2015 framework.
      </p>

      {/* Tab toggle */}
      <div className="flex bg-navy-700 rounded-lg p-0.5 border border-navy-500 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("step-by-step")}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === "step-by-step"
              ? "bg-gold text-navy-900 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Step-by-Step
        </button>
        <button
          onClick={() => setActiveTab("flowchart")}
          className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
            activeTab === "flowchart"
              ? "bg-gold text-navy-900 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Flowchart
        </button>
      </div>

      {activeTab === "step-by-step" ? <StepByStep /> : <AlgorithmFlowchart />}

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
