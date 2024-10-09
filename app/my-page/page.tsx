"use client";
import SideBarComponent from "@/components/common/SideBarComponent";
import StyledHeader from "@/components/common/StyledHeader";
import MyPageTab from "./components/MyPageTab";
import ImageProfileForm from "@/app/my-page/components/ImageProfileForm";
import { useDetectDevice } from "@/hooks/use-detect-device";

export default function MyPageScreen() {
  useDetectDevice();
  return (
    <div className="flex flex-1 w-full h-full max-h-screen overflow-y-none overscroll-none">
      <SideBarComponent />
      <div className="block w-full">
        <StyledHeader />
        <ImageProfileForm />
        <div className="flex-1 laptop:px-4 px-2">
          <MyPageTab />
        </div>
      </div>
    </div>
  );
}
