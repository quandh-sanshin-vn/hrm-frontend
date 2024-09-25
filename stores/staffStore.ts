import { GetStaffListParams } from "@/apis/modules/user";
import { User } from "@/core/entities/models/user.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface StaffState {
  staffList: User[];
  totalItems: number;
  searchParams: GetStaffListParams;
  updateStaffListData: (data: User[], totalItems: number) => void;
  updateSearchParams: (params: GetStaffListParams) => void;
}
export const useStaffStore = create<StaffState>()(
  devtools(
    persist(
      (set) => ({
        staffList: [],
        totalItems: 0,
        searchParams: {},
        updateStaffListData: (data: User[], total: number) =>
          set((state) => ({ ...state, staffList: data, totalItems: total })),
        updateSearchParams: (params: GetStaffListParams) =>
          set((state) => ({ ...state, searchParams: params })),
      }),
      { name: "staffStore" }
    )
  )
);
