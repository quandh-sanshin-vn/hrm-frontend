import React from "react";
import Day, { DateProps } from "./Day";

export interface WeekColumnProps {
  title: string;
  date: DateProps[];
}
export default function WeekColumn(props: WeekColumnProps) {
  const { date = [] } = props;
  return (
    <div className="flex flex-1 flex-col gap-y-2 justify-start items-center">
      <p className=" font-semibold text-[12px] text-gray-500">{props.title}</p>
      <div className={"flex flex-col gap-x-2 gap-y-1"}>
        {date.map((item: DateProps, index: number) => {
          return (
            <Day
              key={index.toString()}
              date={item.date}
              isSpecial={item.isSpecial}
              type={item.type}
              isDayOfOtherMonth={item.isDayOfOtherMonth}
            />
          );
        })}
      </div>
    </div>
  );
}
