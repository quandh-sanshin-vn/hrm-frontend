"use client";

import { format } from "date-fns";

import IconCalendar from "@/app/assets/icons/iconCalendar.svg";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEditingStore } from "@/stores/commonStore";
import { DATE } from "@/utilities/format";
import Image from "next/image";

interface Props {
  title?: string;
  field: any;
  tabIndex?: number;
}
export function StyledDatePicker_v1(props: Props) {
  const { field, title } = props;
  const { isEditing, setIsEditing } = useEditingStore((state) => state);

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className={`${isEditing ? "" : "pointer-events-none"}`}
      >
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[40px] justify-start text-left font-normal border border-none px-0",
            !field.value &&
              `text-muted-foreground px-0 ${
                !isEditing ? "hover:cursor-not-allowed" : ""
              }`
          )}
          tabIndex={props.tabIndex}
        >
          {/* {field.value ? (
            <p
              style={{
                color: !field.value ? "var(--secondary)" : "black",
              }}
              className="w-full text-[#16151C] text-base"
            >
              {format(field.value, DATE)}
            </p>
          ) : (
            <p className="w-full text-[#16151C] text-base">
              {props?.title && format(props.title, DATE)}
            </p>
          )} */}
          {field.value ? (
            <p
              style={{
                color: !field.value ? "var(--secondary)" : "black",
              }}
              className="w-full text-secondary"
            >
              {format(field?.value, DATE)}
            </p>
          ) : (
            <p className="w-full text-secondary">{props.title}</p>
          )}
          <Image src={IconCalendar} alt="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          fromYear={1970}
          toYear={2030}
          initialFocus
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
