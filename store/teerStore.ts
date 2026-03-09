import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MREtiology } from "@/lib/mr-classification";

export interface MRParams {
  eroa?: number;
  rVol?: number;
  vcWidth?: number;
  rf?: number;
  vcArea3D?: number;
  etiology?: MREtiology;
}

export interface AnatomyParams {
  mvArea?: number;
  flailGap?: number;
  flailWidth?: number;
  coaptationDepth?: number;
  coaptationLength?: number;
  graspZoneCalcification?: boolean;
}

export interface ClinicalParams {
  lvef?: number;
  lvesd?: number;
  lvedv?: number;
  symptomaticOnGDMT?: boolean;
  prohibitiveSurgicalRisk?: boolean;
}

export interface ExclusionParams {
  activeEndocarditis?: boolean;
  rheumaticDisease?: boolean;
  significantMS?: boolean;
  intracardiacThrombus?: boolean;
}

interface TEERState {
  mr: MRParams;
  anatomy: AnatomyParams;
  clinical: ClinicalParams;
  exclusions: ExclusionParams;

  setMR: <K extends keyof MRParams>(key: K, value: MRParams[K]) => void;
  setAnatomy: <K extends keyof AnatomyParams>(key: K, value: AnatomyParams[K]) => void;
  setClinical: <K extends keyof ClinicalParams>(key: K, value: ClinicalParams[K]) => void;
  setExclusion: <K extends keyof ExclusionParams>(key: K, value: ExclusionParams[K]) => void;
  clearAll: () => void;
}

const emptyMR: MRParams = {};
const emptyAnatomy: AnatomyParams = {};
const emptyClinical: ClinicalParams = {};
const emptyExclusions: ExclusionParams = {};

export const useTEERStore = create<TEERState>()(
  persist(
    (set) => ({
      mr: emptyMR,
      anatomy: emptyAnatomy,
      clinical: emptyClinical,
      exclusions: emptyExclusions,

      setMR: (key, value) =>
        set((s) => ({ mr: { ...s.mr, [key]: value } })),

      setAnatomy: (key, value) =>
        set((s) => ({ anatomy: { ...s.anatomy, [key]: value } })),

      setClinical: (key, value) =>
        set((s) => ({ clinical: { ...s.clinical, [key]: value } })),

      setExclusion: (key, value) =>
        set((s) => ({ exclusions: { ...s.exclusions, [key]: value } })),

      clearAll: () =>
        set({
          mr: emptyMR,
          anatomy: emptyAnatomy,
          clinical: emptyClinical,
          exclusions: emptyExclusions,
        }),
    }),
    {
      name: "teer-store",
      storage: createJSONStorage(() => localStorage),
      partialize: () => ({}), // Don't persist inputs across sessions
    }
  )
);
