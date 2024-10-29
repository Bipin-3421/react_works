import { LucideMenu } from "lucide-react";

import { Accordion } from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { SidebarItem } from "./Sidebar";
import expandedLogo from "/icons/expanded-logo.svg";
import { sideBarDatas } from "@/constants/sideBarRoutes";
import { useConfig } from "@/zustand/useConfig";

const MobileSidebar = (): React.JSX.Element => {
  const { mobileExpand, setMobileExpand } = useConfig((state) => ({
    mobileExpand: state.mobileExpand,
    setMobileExpand: state.setMobileExpand,
  }));

  return (
    <>
      <div className="lg:hidden mr-2">
        <Sheet
          open={mobileExpand}
          onOpenChange={() => setMobileExpand(!mobileExpand)}
        >
          <SheetTrigger className="w-full h-full  place-content-center">
            <LucideMenu size={25} />
          </SheetTrigger>
          <SheetContent
            className="lg:hidden pt-6 min-h-screen overflow-y-auto scrollbar-none w-full"
            side={"left"}
            btnOutside={false}
          >
            <SheetHeader>
              <div className="rounded-md p-2 flex w-full">
                <img
                  src={expandedLogo}
                  className="h-12 rounded-md object-contain select-none drag-none m-auto"
                  alt="logo"
                />
              </div>
            </SheetHeader>
            <ul>
              <ScrollArea className="flex-1 mt-4 min-h-screen">
                <Accordion type="single" collapsible className="space-y-2">
                  {sideBarDatas.map((item, index: number) => (
                    <SidebarItem key={index} sideBarData={item} />
                  ))}
                </Accordion>
              </ScrollArea>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileSidebar;
