import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CustomSVG from "../reusable/custom-svg";
import dotDown from "/icons/dotDown.svg";
import dotUp from "/icons/dotUp.svg";
import expandedLogo from "/icons/expanded-logo.svg";
import logo from "/icons/logo.svg";
import { sideBarDatas } from "@/constants/sideBarRoutes";
import { TSidebarItem } from "@/interface/sidebar";
import { useTheme } from "@/provider/theme-provider";
import { useConfig } from "@/zustand/useConfig";

export const NavLinkItem = ({
  sideBarData,
  handleCloseSheet,
  child,
  expanded,
  isHover,
  index,
  baseClass,
}: {
  sideBarData: TSidebarItem;
  handleCloseSheet: () => void;
  child: TSidebarItem;
  expanded: boolean;
  isHover: boolean;
  index: number;
  baseClass: string;
}): React.JSX.Element | null => {
  const { t } = useTranslation();

  return (
    <NavLink
      to={`${sideBarData?.value}${child?.value}`}
      onClick={handleCloseSheet}
      className={({ isActive }) => {
        return cn(
          baseClass,
          isActive && `bg-muted text-muted-foreground`,
          "flex items-center justify-center p-0"
        );
      }}
    >
      <div
        className={cn(
          expanded || isHover ? "w-52 ml-3" : "hidden",
          sideBarData?.hasChild
            ? "flex w-full justify-between items-center"
            : "overflow-hidden"
        )}
      >
        <div className="flex items-center gap-x-2">
          {sideBarData.children?.length === index + 1 ? (
            <img src={dotUp} alt="icon" width={20} height={43} />
          ) : (
            <img src={dotDown} alt="icon" width={20} height={43} />
          )}
          <p
            className={cn(
              "font-normal text-sm whitespace-nowrap",
              !(expanded || isHover) && "hidden"
            )}
          >
            {t(child?.text)}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export const SidebarItem = ({
  sideBarData,
}: {
  sideBarData: TSidebarItem;
}): React.JSX.Element | null => {
  const {
    expanded,
    mobileExpand,
    hover: isHover,
    setExpanded,
  } = useConfig((state) => ({
    expanded: state.expanded,
    mobileExpand: state.mobileExpand,
    hover: state.hover,
    setExpanded: state.setExpanded,
  }));

  const { t } = useTranslation();

  const location = useLocation();
  const isActive = location?.pathname?.includes(sideBarData?.value as string);
  const baseClass =
    "relative flex hover:ml-2 transition-all duration-200 items-center p-2 select-none font-medium rounded-md cursor-pointer ease-in-out text-gray-600  hover:bg-secondary";
  const handleCloseSheet = (): void => {
    if (mobileExpand) {
      setExpanded(false);
    }
  };

  if (!sideBarData?.hasChild || (!expanded && !isHover)) {
    return (
      <NavLink
        to={sideBarData?.value as string}
        className={({ isActive }) => {
          return cn(
            baseClass,
            isActive && "bg-primary hover:bg-primary text-white ",
            "flex items-center lg:justify-center  "
          );
        }}
      >
        <CustomSVG
          src={sideBarData?.icon as string}
          className={cn(
            "w-8 h-8 text-black",
            isActive && "text-white",
            !(expanded || isHover) && "h-5 w-5"
          )}
        />
        <div
          className={cn(
            "overflow-hidden",
            sideBarData?.hasChild && "flex w-full justify-between items-center",
            expanded || isHover ? "w-52 ml-3" : "hidden"
          )}
        >
          <span
            className={cn(
              "font-normal text-base whitespace-nowrap",
              !(expanded || isHover) && "hidden"
            )}
          >
            {t(sideBarData?.text)}
          </span>
        </div>
      </NavLink>
    );
  }

  return (
    <>
      <AccordionItem
        value={sideBarData?.value as string}
        className="border-b-0"
      >
        <AccordionTrigger
          className={cn(
            baseClass,
            `hover:no-underline  mb-0 hover:bg-secondary`,
            isActive && "bg-primary text-white hover:bg-primary"
          )}
        >
          <div className="flex items-center gap-x-4">
            <CustomSVG
              src={sideBarData?.icon as string}
              className={cn("w-5 h-5 text-black", isActive && "text-white")}
            />

            <span
              className={cn(
                "font-normal text-sm whitespace-nowrap",
                !(expanded || isHover) && "hidden"
              )}
            >
              {t(sideBarData?.text)}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-0 mt-2">
          {sideBarData?.children?.map((child, index) => {
            return (
              <NavLinkItem
                baseClass={baseClass}
                sideBarData={sideBarData}
                handleCloseSheet={handleCloseSheet}
                child={child}
                expanded={expanded}
                isHover={isHover}
                index={index}
                key={index}
              />
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

const Sidebar = (): React.JSX.Element => {
  const {
    expanded,
    hover: isHover,
    setHover,
  } = useConfig((state) => ({
    expanded: state.expanded,
    hover: state.hover,
    setHover: state.setHover,
  }));

  const skin = useTheme();

  const toggleHover = (config: boolean): void => {
    setHover(config);
  };

  return (
    <aside
      className={cn(
        `h-screen hidden lg:fixed lg:block ${
          skin?.theme === "dark" ? "bg-[#020817]" : "bg-white"
        } z-50 max-w-[245px] top-0 left-0 duration-300 ease-in-out ${
          expanded || isHover ? "w-[245px]" : "w-20"
        }`
      )}
    >
      <nav
        className="h-full flex flex-col border-r shadow-sm"
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
      >
        <div className="p-5 pb-0 flex justify-between items-center">
          {expanded || isHover ? (
            <div className="rounded-md flex w-full align-center gap-4">
              <div className="flex justify-center items-center gap-3 overflow-hidden">
                <img
                  src={expandedLogo}
                  className="h-12 rounded-md object-contain select-none drag-none"
                  alt="logo"
                />
              </div>
            </div>
          ) : (
            <img src={logo} className="size-10 rounded-md" alt="logo" />
          )}
        </div>

        <div className="flex-1 overflow-y-scroll scrollbar-none sidebar_scrollbar pb-4">
          <ul className="px-4">
            <Accordion type="single" collapsible className="space-y-2 mt-4">
              {sideBarDatas?.map((item, index: number) => (
                <SidebarItem key={index} sideBarData={item} />
              ))}
            </Accordion>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
