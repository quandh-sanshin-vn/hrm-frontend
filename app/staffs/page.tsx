"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import React, { useState } from "react";
import MyPageTab from "../my-page/components/MyPageTab";
import SearchArea from "./components/SearchArea";
import StyledOverlay from "@/components/common/StyledOverlay";

export default function StaffScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-1 w-full h-full">
      <SideBarComponent />
      <div className="flex flex-1 flex-col">
        <StyledOverlay isVisible={loading} />
        <StyledHeader />
        <div className="flex-1 py-5 px-10 w-full h-full ">
          <div className="border  bg-white w-full h-full">
            <SearchArea setLoading={setLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
