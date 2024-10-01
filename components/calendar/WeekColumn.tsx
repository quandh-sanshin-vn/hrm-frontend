import React from "react";
import Day, { DateProps } from "./Day";

export interface WeekColumnProps {
  title: string;
  date: DateProps[];
}
export default function WeekColumn(props: WeekColumnProps) {
  const { date = [] } = props;
  return (
    <div className="flex flex-1 flex-col gap-y-2 items-center justify-center">
      <p>{props.title}</p>
      {date.map((item: DateProps) => {
        return (
          <Day
            date={item.date}
            isSpecial={item.isSpecial}
            type={item.type}
            isDayOfOtherMonth={item.isDayOfOtherMonth}
          />
        );
      })}
    </div>
  );
}
