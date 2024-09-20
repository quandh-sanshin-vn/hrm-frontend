import Image from "next/image";
import React from "react";
import GoodMorningIcon from "../../app/assets/icons/iconSunrise.png";
import GoodAfternoonIcon from "../../app/assets/icons/iconSunset.png";
import { isMorningTime } from "@/utilities/helper";

export default function StyledHeader() {
  return (
    <div className="h-[100px] w-full px-4 py-4">
      <div>
        <p className=" text-[30px] font-semibold ">Welcome Umezaki 👋 </p>
        <div className="flex items-center">
          <Image
            src={isMorningTime() ? GoodMorningIcon : GoodAfternoonIcon}
            alt=""
            className="h-4 w-4 mr-2"
          />
          <p className="text-[14px] text-secondary">
            {isMorningTime() ? "Good Morning" : "Good Afternoon"}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
