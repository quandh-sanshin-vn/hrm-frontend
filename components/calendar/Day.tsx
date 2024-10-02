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
        isToday(date) ? `bg-primary` : `bg-white`
      } hover:bg-gray-200  rounded-full items-center justify-center ${
        isDayOfOtherMonth && "opacity-50"
      }`}
    >
      <p
        className={`text-[14px] font-semibold ${
          isToday(date)
            ? `text-white`
            : type == "work"
            ? `text-black`
            : "text-red-500"
        } hover:text-primary`}
      >
        {date.getDate().toString()}
      </p>
      {isSpecial && <div className={"w-1 h-1 rounded-full bg-primary"} />}
    </div>
  );
}
