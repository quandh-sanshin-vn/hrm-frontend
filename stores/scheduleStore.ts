import { DayOff } from "@/core/entities/models/dayoff.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ScheduleState {
  dayOffList: DayOff[];
  updateDayOffListData: (data: DayOff[]) => void;
}
export const useScheduleStore = create<ScheduleState>()(
  devtools(
    persist(
      (set) => ({
        dayOffList: [],
        updateDayOffListData: (data) =>
          set((state) => ({ ...state, dayOffList: data })),
      }),

      { name: "scheduleStore" }
    )
  )
);
