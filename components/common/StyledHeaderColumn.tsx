"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

import DecreaseIcon from "@/app/assets/icons/decreaseIcon.svg";
import SortIcon from "@/app/assets/icons/sortIcon.svg";

interface Props {
  currentSortedColumnId?: string;
  direction?: "asc" | "desc" | "";
  columnName: string;
  columnNameId: string;
  style?: string;
}
export default function StyledHeaderColumn(props: Props) {
  const { currentSortedColumnId, direction, columnName, columnNameId, style } =
    props;
  if (currentSortedColumnId === undefined) {
    return (
      <div className="flex  ">
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
    <div className="flex items-start justify-start hover:cursor-pointer ">
      {currentSortedColumnId !== columnNameId ? (
        <Image height={24} width={24} src={SortIcon} alt="" />
      ) : (
        <Image
          height={22}
          width={20}
          src={DecreaseIcon}
          alt=""
          className={cn(direction === "asc" && "rotate-180")}
        />
      )}
      <p
        className={cn(
          "laptop:text-size-14 text-size-12 text-start line-clamp-2 text-ellipsis whitespace-pre-wrap",
          style
        )}
      >
        {columnName}
      </p>
    </div>
  );
}
