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
import { DATE } from "@/utilities/format";

interface Props {
  title: string;
  field: any;
  tabIndex?: number;
  disabled?: boolean;
}
export function StyledDatePicker(props: Props) {
  const { field, disabled = false } = props;
  return (
    <Popover>
      <PopoverTrigger
        asChild
        disabled={disabled}
        // className={`${disabled ? "" : "pointer-events-none"}`}
      >
        <Button
          className={cn(
            "w-full h-10 justify-end text-left px-0 bg-white font-normal border-b border-border rounded-none disabled:opacity-100",
            !field.value && "text-muted-foreground"
          )}
          tabIndex={props.tabIndex}
        >
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
          className="border-none"
        />
      </PopoverContent>
    </Popover>
  );
}
