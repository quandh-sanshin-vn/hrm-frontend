"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import Image from "next/image";
import React from "react";
import GoodMorningIcon from "../assets/icons/iconSunrise.png";
import GoodAfternoonIcon from "../assets/icons/iconSunset.png";
import ArrowDownIcon from "../assets/icons/icon-arrow-down.svg";
import AvatarDefault from "../assets/images/avatar_default.png";
import MyPageTab from "./components/MyPageTab";

export default function MyPageScreen() {
  return (
    <div className="flex">
      <SideBarComponent />
      <div className="flex flex-1 flex-col">
        <div className="h-[100px] w-full px-4 py-4">
          <div>
            <p className=" text-[30px] font-semibold ">Welcome Umezaki 👋 </p>
            <div className="flex items-center">
              <Image src={GoodMorningIcon} alt="" className="h-4 w-4 mr-2" />
              <p className="text-[14px] text-secondary">Good Morning</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex-1 p-5">
          <MyPageTab />
        </div>
      </div>
    </div>
  );
}
