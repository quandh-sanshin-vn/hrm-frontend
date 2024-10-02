import { isToday } from "date-fns";

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
      className={`relative flex flex-col h-8 w-8 hover:cursor-pointer ${
        isToday(date) ? `bg-primary` : `bg-transparent`
      } hover:bg-gray-200  rounded-full items-center justify-center ${
        isDayOfOtherMonth && "opacity-50 bg-transparent "
      }`}
    >
      <p
        className={`text-[14px] font-semibold ${
          isToday(date)
            ? isDayOfOtherMonth
              ? `text-black`
              : `text-white`
            : type == "work"
            ? `text-black`
            : "text-red-500"
        } hover:text-primary ${isDayOfOtherMonth && `text-black`}`}
      >
        {date.getDate().toString()}
      </p>
      {isSpecial && <div className={"w-1 h-1 rounded-full bg-primary"} />}
    </div>
  );
}
