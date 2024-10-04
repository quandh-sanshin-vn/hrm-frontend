import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScheduleStore } from "@/stores/scheduleStore";
import { formatDateToString } from "@/utilities/format";
import { useMemo, useState } from "react";
import Day, { DateProps } from "../Day";
import MobileDayInfomationPopover from "./MobileDayInfomationPopover";
import MobileEditDayForm from "./MobileEditDayForm";
import { isTargetBeforeCurrent } from "@/utilities/helper";

export default function MobilePopoverOfDay(props: DateProps) {
  const { date, isSpecial = false, type, isDayOfOtherMonth = false } = props;
  const { dayOffList } = useScheduleStore((state) => state);
  const [open, setOpen] = useState(false);

  const getDateInfo = useMemo(() => {
    return dayOffList.find(
      (item) => item.day_off === formatDateToString(props.date)
    );
  }, [dayOffList]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={isTargetBeforeCurrent(date)}>
        <Day
          key={date.toString()}
          date={date}
          isSpecial={isSpecial}
          type={type}
          isDayOfOtherMonth={isDayOfOtherMonth}
        />
      </PopoverTrigger>
      <PopoverContent className="bg-white flex flex-col flex-1 gap-y-2 p-2 w-[150px]">
        {isSpecial && (
          <MobileDayInfomationPopover
            dayType={getDateInfo?.status}
            dayDescription={getDateInfo?.description}
          />
        )}
        <MobileEditDayForm
          onClosePopover={handleClose}
          mode={isSpecial ? "edit" : "create"}
          title={getDateInfo?.title}
          dayType={
            getDateInfo?.status === undefined ? "none" : getDateInfo.status
          }
          dayDescription={getDateInfo?.description || ""}
          updatedAt={String(getDateInfo?.updated_at)}
          id={getDateInfo?.id || ""}
          date={getDateInfo?.day_off || formatDateToString(props.date) || ""}
        />
      </PopoverContent>
    </Popover>
  );
}
