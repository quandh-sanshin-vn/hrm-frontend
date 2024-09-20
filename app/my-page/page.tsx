"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import MyPageTab from "./components/MyPageTab";

export default function MyPageScreen() {
  return (
    <div className="flex flex-1 w-full h-full">
      <SideBarComponent />
      <div className="flex flex-1 flex-col">
        <StyledHeader />
        <div className="flex-1 p-5">
          <MyPageTab />
        </div>
      </div>
    </div>
  );
}
