import DashboardIcon from "../app/assets/icons/iconDashboard.png";
import DashboardIconActive from "../app/assets/icons/iconDashboardActive.png";
import MyPageIcon from "../app/assets/icons/iconMyPage.png";
import MyPageIconActive from "../app/assets/icons/iconMyPageActive.png";
import CalendarIcon from "../app/assets/icons/iconCalendar.png";
import LeavesIcon from "../app/assets/icons/iconLeaves.png";
import StaffIcon from "../app/assets/icons/iconStaff.png";
import StaffIconActive from "../app/assets/icons/iconStaffActive.png";
import { SideBarItemProps } from "@/components/common/SideBarItem";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY";

export const STAFF_STATUS = [
  {
    value: 0,
    name: "In Active",
  },
  {
    value: 1,
    name: "Active",
  },
  {
    value: 2,
    name: "Block",
  },
];

export const STAFF_STATUS_WORKING = [
  {
    value: 1,
    name: "Intern",
  },
  {
    value: 2,
    name: "Probationary period",
  },
  {
    value: 3,
    name: "Official",
  },
  {
    value: 4,
    name: "Leave of absence",
  },
  {
    value: 5,
    name: "Temporarily off",
  },
];

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
