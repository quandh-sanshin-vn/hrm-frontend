"use client";

import { format } from "date-fns";
import * as React from "react";

import IconCalendar from "@/app/assets/icons/iconCalendar.svg";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DATE_OF_BIRTH } from "@/utilities/format";

interface Props {
  title: string;
  field: any;
  tabIndex?: number;
}
export function StyledDatePicker_v1(props: Props) {
  const { field, title } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[52px] justify-end text-left font-normal border border-none",
            !field.value && "text-muted-foreground px-0"
          )}
          tabIndex={props.tabIndex}
        >
          {field.value ? (
            <p
              style={{
                color: !field.value ? "var(--secondary)" : "black",
              }}
              className="w-full text-[#16151C] text-base"
            >
              {format(field.value, DATE_OF_BIRTH)}
            </p>
          ) : (
            <p className="w-full text-[#16151C] text-base">
              {format(props.title, DATE_OF_BIRTH)}
            </p>
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
