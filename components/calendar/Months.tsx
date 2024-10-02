import React, { useEffect, useState } from "react";
import WeekColumn, { WeekColumnProps } from "./WeekColumn";
import { getMonthData } from "@/utilities/helper";
import { format, getYear } from "date-fns";
import { DATE } from "@/utilities/format";
import { DateProps } from "./Day";

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

  const formatDataForMonth = () => {
    const month = getMonthData(year, monthIndex);

    const dayOffString = dayOffs.map((item) => format(item, DATE));

    const updateDayOffData = month.columns.map((item: any) => {
      const columnDateString = item.date.map((item: DateProps) => {
        return {
          ...item,
          isSpecial: dayOffString.includes(format(item.date, DATE)),
        };
      });
      return { ...item, date: columnDateString };
    });
    setMonthData({ ...month, columns: updateDayOffData });
  };

  useEffect(() => {
    formatDataForMonth();
  }, [monthIndex, year, dayOffs]);

  return (
    <div className="flex-1 flex-col flex items-start justify-start gap-x-2 py-1 ">
      <p className="font-medium text-[16px] invisible laptop:visible h-0 laptop:h-auto">
        {monthData.title}
      </p>
      <div className={"flex flex-1 h-full gap-x-2  w-full"}>
        {monthData.columns.map((col: WeekColumnProps) => {
          return (
            <WeekColumn key={col.title} title={col.title} date={col.date} />
          );
        })}
      </div>
    </div>
  );
}
