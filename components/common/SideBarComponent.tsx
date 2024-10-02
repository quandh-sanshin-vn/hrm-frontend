import { useCommonStore } from "@/stores/commonStore";
import { SIDEBAR_ITEMS } from "@/utilities/static-value";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ToggleIcon from "../../app/assets/icons/iconToggleSideBar.png";
import SideBarLogo from "../../app/assets/logo/logoSideBar.png";
import { AlertDialogLogoutButton } from "./AlertDialogLogoutButton";
import SideBarItem, { SideBarItemProps } from "./SideBarItem";

const SideBarComponent = () => {
  const { sidebarStatus, updateSideBarStatus } = useCommonStore();
  // const [isOpen, setIsOpen] = useState(true);
  // const { sideBarState, updateSideBarState } = useCommonStore((state) => state);

  const pathname = usePathname();

  const toggleSidebar = () => {
    updateSideBarStatus(!sidebarStatus);
  };

  return (
    <div
      className={`absolute z-10 laptop:relative flex ${
        sidebarStatus
          ? "w-7/12 laptop:w-72"
          : "w-0 laptop:w-[72px] invisible laptop:visible"
      } h-screen bg-sidebar-primary text-white transition-width duration-300 justify-center items-center`}
    >
      <div className="flex flex-col py-5 justify-between h-full items-center w-full">
        <div className="flex justify-center flex-col w-full rounded-xl h-full bg-re">
          <button
            className="flex items-center justify-center border-b border-border h-10 rounded-none px-0"
            onClick={toggleSidebar}
          >
            {sidebarStatus && (
              <Image src={SideBarLogo} alt="" className="h-6 w-auto mr-3" />
            )}
            <Image src={ToggleIcon} alt="" className="h-8 w-8" />
          </button>
          <ul
            className="mt-4 flex flex-1 flex-col gap-y-1"
            style={{
              paddingLeft: sidebarStatus ? 32 : 12,
              paddingRight: sidebarStatus ? 32 : 12,
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
                  sidebarOpenStatus={sidebarStatus}
                  pathname={`/${pathname.split("/")[1]}`}
                />
              );
            })}
          </ul>
          <div className="hidden laptop:flex">
            <AlertDialogLogoutButton isOpen={sidebarStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
