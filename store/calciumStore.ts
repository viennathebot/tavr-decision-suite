import { create } from "zustand";

export interface CalciumState {
  sex?: "male" | "female";
  calciumScore?: number;
  /** CT annulus area in mm² */
  annulusAreaMm2?: number;
  /** Optional echo context for discordant adjudication */
  ava?: number;
  meanGradient?: number;
  lvef?: number;
  svi?: number;

  setSex: (s: "male" | "female") => void;
  setField: (key: string, value: number | undefined) => void;
  clearAll: () => void;
}

export const useCalciumStore = create<CalciumState>()((set) => ({
  setSex: (s) => set({ sex: s }),
  setField: (key, value) => set({ [key]: value }),
  clearAll: () =>
    set({
      sex: undefined,
      calciumScore: undefined,
      annulusAreaMm2: undefined,
      ava: undefined,
      meanGradient: undefined,
      lvef: undefined,
      svi: undefined,
    }),
}));
