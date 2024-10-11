import { GetLeaveListParams } from "@/apis/modules/leave";
import { GetStaffListParams } from "@/apis/modules/user";
import { Leave } from "@/core/entities/models/leave.model";
import { User } from "@/core/entities/models/user.model";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StaffState {
  leaveList: Leave[];
  totalItems: number;
  searchParams: GetLeaveListParams;
  updateLeaveListData: (data: Leave[], totalItems: number) => void;
  updateSearchParams: (params: GetLeaveListParams) => void;
}
export const useLeaveStore = create<StaffState>()(
  devtools(
    (set) => ({
      leaveList: [],
      totalItems: 0,
      searchParams: {},
      updateLeaveListData: (data: Leave[], total: number) =>
        set((state) => ({ ...state, leaveList: data, totalItems: total })),
      updateSearchParams: (params: GetLeaveListParams) =>
        set((state) => ({ ...state, searchParams: params })),
    }),
    { name: "leaveStore" }
  )
);
