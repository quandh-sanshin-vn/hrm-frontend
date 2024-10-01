import React from "react";
import WeekColumn, { WeekColumnProps } from "./WeekColumn";

export interface MonthProps {
  title: string;
  columns: WeekColumnProps[];
}
export default function Months(props: MonthProps) {
  const { title, columns } = props;
  return (
    <div className="flex-1 flex items-start justify-start">
      <p>{title}</p>
      <div className={"flex flex-1 h-full"}>
        {columns.map((col: WeekColumnProps) => {
          return <WeekColumn title={col.title} date={col.date} />;
        })}
      </div>
    </div>
  );
}
