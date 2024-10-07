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
  sidebarStatus: boolean;
  positionData: PositionProps[];
  departmentData: DepartmentProps[];
  updateSideBarStatus: (positionData: boolean) => void;
  updatePositionData: (positionData: PositionProps[]) => void;
  updateDepartmentData: (departmentData: DepartmentProps[]) => void;
}
export const useCommonStore = create<CommonState>()(
  devtools(
    persist(
      (set) => ({
        sidebarStatus: false,
        positionData: [],
        sideBarState: false,
        departmentData: [],
        updateSideBarStatus: (sidebarStatus) =>
          set((state) => ({ ...state, sidebarStatus: sidebarStatus })),
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
