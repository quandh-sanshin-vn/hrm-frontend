import React from "react";

export interface DateProps {
  date: Date;
  isSpecial?: boolean;
  type: "off" | "work";
  isDayOfOtherMonth?: boolean;
}

export default function Day(props: DateProps) {
  const { date, isSpecial = false, type, isDayOfOtherMonth = false } = props;
  return (
    <div
      className={`relative h-4 aspect-square bg-white hover:bg-gray-100 rounded-full border border-border items-center justify-center ${
        isDayOfOtherMonth && "opacity-50"
      }`}
    >
      <p
        className={`text-[14px] ${
          type == "work" ? `text-black` : "text-red-500"
        }`}
      >
        {date.getDate().toString()}
      </p>
      {isSpecial && <div className={"w-1 h-1 rounded-full bg-primary"} />}
    </div>
  );
}
