import { GetLeaveListParams } from "@/apis/modules/leave";
import { Leave } from "@/core/entities/models/leave.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StaffState {
  leaveList: Leave[];
  totalItems: number;
  searchParams: GetLeaveListParams;
  selectedLeave: Leave;
  updateLeaveListData: (data: Leave[], totalItems: number) => void;
  updateSearchParams: (params: GetLeaveListParams) => void;
  updateSelectedLeave: (leave: Leave) => void;
}
export const useLeaveStore = create<StaffState>()(
  devtools(
    (set) => ({
      leaveList: [],
      totalItems: 0,
      searchParams: {},
      selectedLeave: {},
      updateLeaveListData: (data: Leave[], total: number) =>
        set((state) => ({ ...state, leaveList: data, totalItems: total })),
      updateSearchParams: (params: GetLeaveListParams) =>
        set((state) => ({ ...state, searchParams: params })),
      updateSelectedLeave: (leave: Leave) =>
        set((state) => ({ ...state, selectedLeave: leave })),
    }),
    { name: "leaveStore" }
  )
);
