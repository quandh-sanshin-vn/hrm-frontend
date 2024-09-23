import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CommonState {
  bears: number;
  updateCommonData: (by: number) => void;
}
export const useCommonStore = create<CommonState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        updateCommonData: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      { name: "commonStore" }
    )
  )
);
