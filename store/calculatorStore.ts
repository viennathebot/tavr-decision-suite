import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Demographics {
  age?: number;
  sex?: "male" | "female";
  heightCm?: number;
  weightKg?: number;
  symptomatic?: boolean;
  nyhaClass?: "I" | "II" | "III" | "IV";
}

export interface EchoParams {
  lvef?: number;
  lvotDiameter?: number;
  lvotTVI?: number;
  aovTVI?: number;
  meanGradient?: number;
  peakGradient?: number;
  vmax?: number;
  strokeVolume?: number;
  lvEjectionTime?: number;
  systolicBP?: number;
  diastolicBP?: number;
}

export interface CTParams {
  calciumScore?: number;
  annulusDiameter?: number;
  annulusArea?: number;
  annulusPerimeter?: number;
  lvotDiameterCT?: number;
  bicuspidType?: "none" | "type0" | "type1" | "type2";
  leafletCalcification?: "none" | "mild" | "moderate" | "severe";
  lvotCalcification?: "none" | "mild" | "moderate" | "severe";
}

export interface DobutamineParams {
  stressLVEF?: number;
  stressMeanGradient?: number;
  stressAVA?: number;
  stressStrokeVolume?: number;
}

export interface STSParams {
  creatinine?: number;
  diabetes?: "none" | "diet" | "oral" | "insulin";
  priorCardiacSurgery?: boolean;
  urgency?: "elective" | "urgent" | "emergent";
  endocarditis?: boolean;
  chronicLungDisease?: "none" | "mild" | "moderate" | "severe";
  peripheralVascularDisease?: boolean;
  cerebrovascularDisease?: boolean;
  preoperativeDialysis?: boolean;
}

export interface SavedCase {
  id: string;
  name: string;
  date: string;
  demographics: Demographics;
  echo: EchoParams;
  ct: CTParams;
  dobutamine: DobutamineParams;
  sts: STSParams;
}

interface CalculatorState {
  demographics: Demographics;
  echo: EchoParams;
  ct: CTParams;
  dobutamine: DobutamineParams;
  sts: STSParams;
  savedCases: SavedCase[];

  setDemographic: <K extends keyof Demographics>(key: K, value: Demographics[K]) => void;
  setEcho: <K extends keyof EchoParams>(key: K, value: EchoParams[K]) => void;
  setCT: <K extends keyof CTParams>(key: K, value: CTParams[K]) => void;
  setDobutamine: <K extends keyof DobutamineParams>(key: K, value: DobutamineParams[K]) => void;
  setSTS: <K extends keyof STSParams>(key: K, value: STSParams[K]) => void;
  clearDemographics: () => void;
  clearEcho: () => void;
  clearCT: () => void;
  clearDobutamine: () => void;
  clearSTS: () => void;
  clearAll: () => void;
  saveCase: (name: string) => void;
  loadCase: (id: string) => void;
  deleteCase: (id: string) => void;
}

const emptyDemographics: Demographics = {};
const emptyEcho: EchoParams = {};
const emptyCT: CTParams = {};
const emptyDobutamine: DobutamineParams = {};
const emptySTS: STSParams = {};

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      demographics: emptyDemographics,
      echo: emptyEcho,
      ct: emptyCT,
      dobutamine: emptyDobutamine,
      sts: emptySTS,
      savedCases: [],

      setDemographic: (key, value) =>
        set((s) => ({ demographics: { ...s.demographics, [key]: value } })),

      setEcho: (key, value) =>
        set((s) => ({ echo: { ...s.echo, [key]: value } })),

      setCT: (key, value) =>
        set((s) => ({ ct: { ...s.ct, [key]: value } })),

      setDobutamine: (key, value) =>
        set((s) => ({ dobutamine: { ...s.dobutamine, [key]: value } })),

      setSTS: (key, value) =>
        set((s) => ({ sts: { ...s.sts, [key]: value } })),

      clearDemographics: () => set({ demographics: emptyDemographics }),
      clearEcho: () => set({ echo: emptyEcho }),
      clearCT: () => set({ ct: emptyCT }),
      clearDobutamine: () => set({ dobutamine: emptyDobutamine }),
      clearSTS: () => set({ sts: emptySTS }),
      clearAll: () =>
        set({
          demographics: emptyDemographics,
          echo: emptyEcho,
          ct: emptyCT,
          dobutamine: emptyDobutamine,
          sts: emptySTS,
        }),

      saveCase: (name) => {
        const state = get();
        const newCase: SavedCase = {
          id: Date.now().toString(),
          name,
          date: new Date().toISOString(),
          demographics: state.demographics,
          echo: state.echo,
          ct: state.ct,
          dobutamine: state.dobutamine,
          sts: state.sts,
        };
        set((s) => ({ savedCases: [newCase, ...s.savedCases] }));
      },

      loadCase: (id) => {
        const c = get().savedCases.find((sc) => sc.id === id);
        if (c) {
          set({
            demographics: c.demographics,
            echo: c.echo,
            ct: c.ct,
            dobutamine: c.dobutamine,
            sts: c.sts ?? emptySTS,
          });
        }
      },

      deleteCase: (id) =>
        set((s) => ({
          savedCases: s.savedCases.filter((sc) => sc.id !== id),
        })),
    }),
    {
      name: "tavr-calculator-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ savedCases: state.savedCases }),
    }
  )
);
