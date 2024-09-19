import { SIDEBAR_ITEMS } from "@/utilities/static-value";
import Image from "next/image";
import { useState } from "react";
import ToggleIcon from "../../app/assets/icons/iconToggleSideBar.png";
import SideBarLogo from "../../app/assets/logo/logoSideBar.png";
import { AlertDialogLogoutButton } from "./AlertDialogLogoutButton";
import SideBarItem, { SideBarItemProps } from "./SideBarItem";
import { usePathname } from "next/navigation";

const SideBarComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex ${
        isOpen ? "w-72" : "w-[72px]"
      } h-screen bg-sidebar-primary text-white transition-width duration-300 justify-center items-center`}
    >
      <div className="flex flex-col py-5 justify-between h-full items-center w-full">
        <div className="flex flex-col w-full rounded-xl h-full">
          <button
            className="focus:outline-none flex flex-row items-center justify-center"
            onClick={toggleSidebar}
          >
            {isOpen && (
              <Image src={SideBarLogo} alt="" className="h-6 w-auto mr-3" />
            )}
            <Image src={ToggleIcon} alt="" className="h-8 w-8" />
          </button>
          <ul
            className="mt-4 flex flex-1 flex-col gap-y-1"
            style={{
              paddingLeft: isOpen ? 32 : 12,
              paddingRight: isOpen ? 32 : 12,
            }}
          >
            {SIDEBAR_ITEMS.map((i: SideBarItemProps) => {
              return (
                <SideBarItem
                  key={i.title}
                  icon={i.icon}
                  iconActive={i.iconActive}
                  title={i.title}
                  route={i.route}
                  sidebarOpenStatus={isOpen}
                  pathname={pathname}
                />
              );
            })}
          </ul>
          <AlertDialogLogoutButton isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
