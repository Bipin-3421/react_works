import { To } from "react-router-dom";

export interface TSidebarItem {
  icon?: string;
  text: string;
  value?: To;
  alert?: boolean;
  hasChild?: boolean;
  action?: () => void;
  children?: TSidebarItem[];
  active?: boolean;
  permission: Permissions[];
}
