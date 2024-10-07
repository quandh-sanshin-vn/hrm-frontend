"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

import SortIcon from "@/app/assets/icons/sortIcon.svg";
import increaseIcon from "@/app/assets/icons/increaseIcon.svg";
import DecreaseIcon from "@/app/assets/icons/decreaseIcon.svg";

interface Props {
  currentSortedColumnId?: string;
  direction?: "ASC" | "DESC" | "";
  columnName: string;
  columnNameId: string;
  style?: string;
}
export default function StyledHeaderColumn(props: Props) {
  const { currentSortedColumnId, direction, columnName, columnNameId, style } =
    props;
  if (currentSortedColumnId === undefined) {
    return (
      <div className="flex ">
        <p
          className={cn(
            "laptop:text-size-14 text-size-12 text-start line-clamp-2 text-ellipsis w-full",
            style
          )}
        >
          {columnName}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-between hover:cursor-pointer ">
      <p
        className={cn(
          "laptop:text-size-14 text-size-12 text-start line-clamp-2 text-ellipsis w-full whitespace-pre-wrap",
          style
        )}
      >
        {columnName}
      </p>
      {currentSortedColumnId !== columnNameId ? (
        <Image height={24} width={24} src={SortIcon} alt="" />
      ) : (
        <Image
          height={22}
          width={20}
          src={DecreaseIcon}
          alt=""
          className={cn(direction === "ASC" && "rotate-180")}
        />
      )}
    </div>
  );
}
