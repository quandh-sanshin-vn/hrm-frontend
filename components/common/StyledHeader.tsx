import { AlertDialogLogoutButton } from "@/components/common/AlertDialogLogoutButton";
import { useCommonStore } from "@/stores/commonStore";
import { isMorningTime } from "@/utilities/helper";
import Image from "next/image";
import AppsIcon from "../../app/assets/icons/iconApps.svg";
import GoodMorningIcon from "../../app/assets/icons/iconSunrise.png";
import GoodAfternoonIcon from "../../app/assets/icons/iconSunset.png";
import DefaultImage from "@/app/assets/images/avatar_default.png";
import { useUserStore } from "@/stores/userStore";

export default function StyledHeader() {
  const { sidebarStatus, updateSideBarStatus } = useCommonStore();
  const { user } = useUserStore((state) => state);
  const toggleSidebar = () => {
    updateSideBarStatus(!sidebarStatus);
  };

  return (
    <div className="h-[100px] w-full px-4 py-4 flex items-start">
      <div
        className=" visible laptop:invisible flex items-center justify-center h-10 rounded-none px-0 pt-1 hover:cursor-pointer"
        onClick={toggleSidebar}
      >
        {!sidebarStatus && <Image src={AppsIcon} alt="" className="h-6 w-6" />}
      </div>
      <div className="flex-1 flex-col px-2 justify-between">
        <p className="text-[18px] laptop:text-[30px] font-semibold">
          Welcome Umezaki 👋
        </p>
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
      <div className="laptop:hidden">
        <AlertDialogLogoutButton isOpen={sidebarStatus} />
      </div>
      {user && (
        <div className="hidden laptop:flex flex-row items-center justify-start border border-border rounded-lg w-auto h-[50px] cursor-pointer mr-1">
          <div className="flex items-center justify-center h-full aspect-square">
            <Image
              src={
                user.image
                  ? "http://192.168.1.171:8000" + user.image
                  : DefaultImage
              }
              alt=""
              className="object-cover rounded-lg w-10 h-10"
              height={40}
              width={40}
            />
          </div>
          <div className="h-full flex flex-col items-start justify-center mr-3">
            <p className="text-[#16151C] font-semibold text-[16px]">
              {user.fullname}
            </p>
            <div className="flex items-center justify-center">
              <p className="text-[#A2A1A8] font-normal text-[12px]">
                {user.position_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
