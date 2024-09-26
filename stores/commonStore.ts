import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PositionProps {
  value: string | number;
  name: string;
}
interface CommonState {
  positionData: PositionProps[];
  updatePositionData: (positionData: PositionProps[]) => void;
}
export const useCommonStore = create<CommonState>()(
  devtools(
    persist(
      (set) => ({
        positionData: [],
        updatePositionData: (positionData) =>
          set((state) => ({ ...state, positionData: positionData })),
      }),
      { name: "commonStore" }
    )
  )
);

interface EditingState {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const useEditingStore = create<EditingState>((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));