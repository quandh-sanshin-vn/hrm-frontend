import React, { useEffect, useMemo, useState } from "react";
import WeekColumn, { WeekColumnProps } from "./WeekColumn";
import { checkMonthInThePast, getMonthData } from "@/utilities/helper";
import { format, getMonth, getYear } from "date-fns";
import { DATE } from "@/utilities/format";
import { DateProps } from "./Day";
import { useScheduleStore } from "@/stores/scheduleStore";

export interface MonthProps {
  title: string;
  columns: WeekColumnProps[];
}

interface Props {
  monthIndex: number;
  year?: number;
  dayOffs?: Date[];
}

export default function Months(props: Props) {
  const { monthIndex, year = getYear(new Date()), dayOffs = [] } = props;

  const [monthData, setMonthData] = useState<MonthProps>({
    title: "",
    columns: [],
  });
  const { dayOffList } = useScheduleStore((state) => state);

  const formatDataForMonth = () => {
    const month = getMonthData(year, monthIndex);
    const dayOffString = dayOffs.map((item) => format(item, DATE));
    const updateDayOffData = month.columns.map((item: any) => {
      const columnDateString = item.date.map((item: DateProps) => {
        const tempDate = dayOffList.find(
          (day) => day.day_off == format(item.date, DATE)
        );
        const tempItem = {
          ...item,
          isSpecial: dayOffString.includes(format(item.date, DATE)),
        };
        if (dayOffString.includes(format(item.date, DATE))) {
          tempItem.type = tempDate?.status == "0" ? "off" : "work";
        }
        return tempItem;
      });
      return { ...item, date: columnDateString };
    });
    setMonthData({ ...month, columns: updateDayOffData });
  };

  useEffect(() => {
    formatDataForMonth();
  }, [dayOffs, year, monthIndex]);

  const isPastMonth = useMemo(
    () => checkMonthInThePast(year, monthIndex),
    [year, monthIndex]
  );

  return (
    <div className="flex-1 flex-col flex items-start justify-start gap-x-1 m-1   ">
      <p className="font-semibold text-[20px] invisible laptop:visible h-0 laptop:h-auto">
        {monthData.title}
      </p>
      <div
        className={`flex flex-1 h-full gap-x-2  w-full pt-2  ${
          isPastMonth ? `bg-[#D8D4D4]` : `bg-white`
        }  border border-border shadow-sm`}
      >
        {monthData.columns.map((col: WeekColumnProps, index: number) => {
          return (
            <WeekColumn
              key={index.toString()}
              title={col.title}
              date={col.date}
            />
          );
        })}
      </div>
    </div>
  );
}
