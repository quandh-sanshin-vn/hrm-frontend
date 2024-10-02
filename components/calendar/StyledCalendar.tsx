import IconArrowLeft from "@/app/assets/icons/iconArrowLeft.svg";
import { DayOff } from "@/core/entities/models/dayoff.model";
import useWindowSize from "@/hooks/use-dimession";
import { useScheduleStore } from "@/stores/scheduleStore";
import { formatStringToDate } from "@/utilities/format";
import { getMonth, getYear } from "date-fns";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import Months from "./Months";

interface Props {
  type: "single" | "fullyear";
  year?: number;
  month?: number;
}
export default function StyledCalendar(props: Props) {
  const { type = "single" } = props;

  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));

  const { dayOffList } = useScheduleStore((state) => state);

  const dayOffListFormatted = useMemo(() => {
    const data = dayOffList.map((item: DayOff) =>
      formatStringToDate(item.day_off || "")
    );
    return data;
  }, [dayOffList]);

  const onNextYear = () => {
    if (selectedYear >= 2199) return;
    setSelectedYear((pre) => pre + 1);
  };

  const onBackYear = () => {
    if (selectedYear <= 1899) return;
    setSelectedYear((pre) => pre - 1);
  };

  const onNextMonth = () => {
    if (selectedMonth >= 11) return;
    setSelectedMonth((pre) => pre + 1);
  };
  const onBackMonth = () => {
    if (selectedMonth <= 0) return;
    setSelectedMonth((pre) => pre - 1);
  };
  // const onSelectDay = () => {};

  const onSelectToday = () => {
    setSelectedMonth(getMonth(new Date()));
    setSelectedYear(getYear(new Date()));
  };

  const windowSize = useWindowSize();

  return (
    <div
      style={{
        maxHeight: windowSize.height - 150,
        minHeight: windowSize.height - 150,
      }}
      className=" overflow-y-auto flex flex-1 flex-col"
    >
      <div className="flex items-center justify-start gap-x-4 py-3">
        <p className=" flex laptop:hidden text-[14px] font-normal text-secondary">
          Year
        </p>
        <div className="flex w-fit px-1 items-center justify-center">
          <Image
            onClick={onBackYear}
            src={IconArrowLeft}
            alt=" "
            className={`p-1 hover:cursor-pointer h-8 w-8 ${
              selectedMonth == 1 ? `opacity-50` : `opacity-100`
            }`}
          />
          <p>{selectedYear}</p>
          <Image
            onClick={onNextYear}
            src={IconArrowLeft}
            alt=" "
            className="p-1 hover:cursor-pointer rotate-180 h-8 w-8"
          />
        </div>
        <p className="flex laptop:hidden text-[14px] font-normal text-secondary ">
          Month
        </p>
        <div className="flex laptop:hidden w-fit px-1 items-center justify-center ">
          <Image
            onClick={onBackMonth}
            src={IconArrowLeft}
            alt=" "
            className={`p-1 hover:cursor-pointer h-8 w-8  ${
              selectedMonth == 0 ? `opacity-50` : `opacity-100`
            }`}
          />
          <p>{selectedMonth + 1}</p>

          <Image
            onClick={onNextMonth}
            src={IconArrowLeft}
            alt=" "
            className={`p-1 hover:cursor-pointer h-8 w-8 rotate-180 ${
              selectedMonth == 11 ? `opacity-50` : `opacity-100`
            }`}
          />
        </div>
        <Button
          variant="outline"
          onClick={onSelectToday}
          className=" h-8 border border-border hidden"
        >
          Today
        </Button>
      </div>
      {type == "fullyear" ? (
        <div className="flex flex-col w-full overflow-y-auto">
          <div className="flex items-center justify-center ">
            {[0, 1, 2, 3].map((item: number, index: number) => {
              return (
                <Months
                  key={index.toString()}
                  monthIndex={item}
                  year={selectedYear}
                  dayOffs={dayOffListFormatted}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            {[4, 5, 6, 7].map((item: number, index: number) => {
              return (
                <Months
                  key={index.toString()}
                  monthIndex={item}
                  year={selectedYear}
                  dayOffs={dayOffListFormatted}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            {[8, 9, 10, 11].map((item: number, index: number) => {
              return (
                <Months
                  key={index.toString()}
                  monthIndex={item}
                  year={selectedYear}
                  dayOffs={dayOffListFormatted}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <Months
            dayOffs={dayOffListFormatted}
            monthIndex={selectedMonth}
            year={selectedYear}
          />
        </div>
      )}
    </div>
  );
}
