import { create } from "zustand";

interface PlanStore {
  planId: string | null;
  setPlanId: (planId: string) => void;
}

const usePlanStore = create<PlanStore>((set) => ({
  planId: null,
  setPlanId: (planId: string) => set({ planId }),
}));

export const usePlanId = () =>
  usePlanStore((s) => {
    if (s.planId == null) {
      throw new Error("planId is not set");
    }
    return s.planId;
  });

export default usePlanStore;
