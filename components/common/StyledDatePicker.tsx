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

interface Props {
  title: string;
  field: any;
}
export function StyledDatePicker(props: Props) {
  const { field, title } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[52px] justify-end text-left font-normal border border-border",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "DATE_OF_BIRTH")
          ) : (
            <p className="w-full text-secondary">{props.title}</p>
          )}
          <Image src={IconCalendar} alt="" />
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
