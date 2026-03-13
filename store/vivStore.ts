import { create } from "zustand";

export interface VIVState {
  procedureType?: "tavr-in-savr" | "tavr-in-tavr";
  manufacturer?: string;
  model?: string;
  labeledSize?: number;
  failureMode?: "stenosis" | "regurgitation" | "combined";
  ctAnnulusArea?: number;
  ctAnnulusPerimeter?: number;
  ctAnnulusDiameter?: number;
  coronaryHeightLCA?: number;
  coronaryHeightRCA?: number;
  sinusWidthLCA?: number;
  sinusWidthRCA?: number;
  ctInnerDiameter?: number;
  patientBSA?: number;
  accessRoutes: string[];

  setProcedureType: (t: "tavr-in-savr" | "tavr-in-tavr") => void;
  setManufacturer: (m: string) => void;
  setModel: (m: string) => void;
  setLabeledSize: (s: number) => void;
  setFailureMode: (m: "stenosis" | "regurgitation" | "combined") => void;
  setField: (key: string, value: number | undefined) => void;
  toggleAccessRoute: (route: string) => void;
  clearAll: () => void;
}

export const useVIVStore = create<VIVState>()((set) => ({
  accessRoutes: [],

  setProcedureType: (t) =>
    set({ procedureType: t, manufacturer: undefined, model: undefined, labeledSize: undefined }),
  setManufacturer: (m) => set({ manufacturer: m, model: undefined, labeledSize: undefined }),
  setModel: (m) => set({ model: m, labeledSize: undefined }),
  setLabeledSize: (s) => set({ labeledSize: s }),
  setFailureMode: (m) => set({ failureMode: m }),
  setField: (key, value) => set({ [key]: value }),
  toggleAccessRoute: (route) =>
    set((s) => ({
      accessRoutes: s.accessRoutes.includes(route)
        ? s.accessRoutes.filter((r) => r !== route)
        : [...s.accessRoutes, route],
    })),
  clearAll: () =>
    set({
      procedureType: undefined,
      manufacturer: undefined,
      model: undefined,
      labeledSize: undefined,
      failureMode: undefined,
      ctAnnulusArea: undefined,
      ctAnnulusPerimeter: undefined,
      ctAnnulusDiameter: undefined,
      coronaryHeightLCA: undefined,
      coronaryHeightRCA: undefined,
      sinusWidthLCA: undefined,
      sinusWidthRCA: undefined,
      ctInnerDiameter: undefined,
      patientBSA: undefined,
      accessRoutes: [],
    }),
}));
