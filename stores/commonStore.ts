import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PositionProps {
  value: string | number;
  name: string;
}

interface DepartmentProps {
  id: number;
  name: string;
}
interface CommonState {
  positionData: PositionProps[];
  departmentData: DepartmentProps[];
  updatePositionData: (positionData: PositionProps[]) => void;
  updateDepartmentData: (departmentData: DepartmentProps[]) => void;
}
export const useCommonStore = create<CommonState>()(
  devtools(
    persist(
      (set) => ({
        positionData: [],
        departmentData: [],
        updatePositionData: (positionData) =>
          set((state) => ({ ...state, positionData: positionData })),
        updateDepartmentData: (departmentData) =>
          set((state) => ({ ...state, departmentData: departmentData })),
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

interface FileStore {
  image: File | null;
  setImage: (file: File) => void;
  clearImage: () => void;
}

export const useFileStore = create<FileStore>((set) => ({
  image: null,
  setImage: (file: File) => set({ image: file }),
  clearImage: () => set({ image: null }),
}));
