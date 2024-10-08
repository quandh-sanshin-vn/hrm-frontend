"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import MyPageTab from "./components/MyPageTab";
import ImageProfileForm from "@/app/my-page/components/ImageProfileForm";

export default function MyPageScreen() {
  return (
    <div className="flex flex-1 w-full h-full">
      <SideBarComponent />
      <div className="block max-h-screen w-full">
        <StyledHeader />
        <ImageProfileForm />
        <div className="flex-1 p-4">
          <MyPageTab />
        </div>
      </div>
    </div>
  );
}
