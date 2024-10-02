import { monthsArray } from "@/utilities/static-value";
import React, { useMemo, useState } from "react";
import Months from "./Months";
import { getMonth, getYear } from "date-fns";
import IconArrowLeft from "@/app/assets/icons/iconArrowLeft.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { DayOff } from "@/core/entities/models/dayoff.model";
import { useScheduleStore } from "@/stores/scheduleStore";
import { formatStringToDate } from "@/utilities/format";

interface Props {
  type: "single" | "fullyear";
  year?: number;
  month?: number;
}
export default function StyledCalendar(props: Props) {
  const { type = "single" } = props;

  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState(new Date());

  const { updateDayOffListData, dayOffList } = useScheduleStore(
    (state) => state
  );

  const dayOffListFormatted = useMemo(() => {
    const data = dayOffList.map((item: DayOff) =>
      formatStringToDate(item.day_off || "")
    );
    console.log("========dayOffList====", data);
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
    if (selectedMonth >= 12) return;
    setSelectedMonth((pre) => pre + 1);
  };
  const onBackMonth = () => {
    if (selectedMonth <= 1) return;
    setSelectedMonth((pre) => pre - 1);
  };
  const onSelectDay = () => {};

  const onSelectToday = () => {
    setSelectedMonth(getMonth(new Date()) + 1);
    setSelectedYear(getYear(new Date()));
  };

  return (
    <div>
      <div className="flex items-center justify-start gap-x-4 py-3">
        <p className="text-[14px] font-normal text-secondary">Year</p>
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
        <p className="text-[14px] font-normal text-secondary">Month</p>

        <div className="flex w-fit px-1 items-center justify-center">
          <Image
            onClick={onBackMonth}
            src={IconArrowLeft}
            alt=" "
            className={`p-1 hover:cursor-pointer h-8 w-8  ${
              selectedMonth == 1 ? `opacity-50` : `opacity-100`
            }`}
          />
          <p>{selectedMonth}</p>

          <Image
            onClick={onNextMonth}
            src={IconArrowLeft}
            alt=" "
            className={`p-1 hover:cursor-pointer h-8 w-8 rotate-180 ${
              selectedMonth == 12 ? `opacity-50` : `opacity-100`
            }`}
          />
        </div>

        <Button
          variant="outline"
          onClick={onSelectToday}
          className=" h-8 border border-border"
        >
          Today
        </Button>
      </div>
      <div className="border border-border ">
        {type == "fullyear" ? (
          monthsArray.map((item) => {
            return <Months monthIndex={item} year={selectedYear} />;
          })
        ) : (
          <Months
            dayOffs={dayOffListFormatted}
            monthIndex={selectedMonth - 1}
            year={selectedYear}
          />
        )}
      </div>
    </div>
  );
}
