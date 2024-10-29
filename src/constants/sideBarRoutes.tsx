import { authRoutes } from "./route";
import { Icons } from "@/constants/icons";
import { TSidebarItem } from "@/interface/sidebar";

export const sideBarDatas: TSidebarItem[] = [
  {
    icon: Icons.users,
    text: "sidebar.users",
    value: authRoutes.USERS,
    alert: false,
    hasChild: false,
    permission: [],
  },
];
