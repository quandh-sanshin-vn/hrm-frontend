import DashboardIcon from "../app/assets/icons/iconDashboard.png";
import DashboardIconActive from "../app/assets/icons/iconDashboardActive.png";
import MyPageIcon from "../app/assets/icons/iconMyPage.png";
import MyPageIconActive from "../app/assets/icons/iconMyPageActive.png";
import CalendarIcon from "../app/assets/icons/iconCalendar.png";
import LeavesIcon from "../app/assets/icons/iconLeaves.png";
import StaffIcon from "../app/assets/icons/iconStaff.png";
import StaffIconActive from "../app/assets/icons/iconStaffActive.png";
import { SideBarItemProps } from "@/components/common/SideBarItem";

export const SIDEBAR_ITEMS: SideBarItemProps[] = [
  {
    icon: DashboardIcon,
    iconActive: DashboardIconActive,
    title: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: MyPageIcon,
    iconActive: MyPageIconActive,
    title: "My Page",
    route: "/my-page",
  },
  {
    icon: CalendarIcon,
    iconActive: MyPageIconActive,
    title: "Schedule",
    route: "/schedule",
  },
  {
    icon: LeavesIcon,
    iconActive: MyPageIconActive,
    title: "Leaves",
    route: "/leaves",
  },
  {
    icon: StaffIcon,
    iconActive: StaffIconActive,
    title: "Staffs",
    route: "/staffs",
  },
];
