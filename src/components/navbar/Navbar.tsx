import { Menu, SearchIcon } from "lucide-react";

import MobileSidebar from "../sidebar/MobileSidebar";
import { MemberDropdown } from "../sidebar/MemberDropdown";
import { Input } from "../ui/input";
import { useConfig } from "@/zustand/useConfig";

const Navbar: React.FC = () => {
  const { expanded, setExpanded } = useConfig((state) => ({
    expanded: state.expanded,
    setExpanded: state.setExpanded,
  }));

  return (
    <div className="grid grid-cols-3  border-b-[1px] p-2 items-center">
      <div className="col-span-1 md:col-span-2">
        <div className="flex md:justify-center align-center">
          <MobileSidebar />

          <div
            className={
              "hidden md:flex w-full md:self-center h-10 items-center rounded-md  border-transparent  pl-3 text-sm ring-offset-background "
            }
          >
            <Menu
              className=" h-5 w-5 mr-3 cursor-pointer"
              onClick={() => {
                setExpanded(!expanded);
              }}
            />
            <SearchIcon className="h-[20px] w-[20px]" />
            <Input
              type="search"
              placeholder="Search (Ctrl + L)"
              className="w-full p-2 placeholder:opacity-80 border-0 ring-0 focus-visible:ring-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>
      <div className="flex align-center flex-row-reverse gap-4 col-span-2 md:col-span-1 py-1 mr-4">
        <MemberDropdown />
      </div>
    </div>
  );
};

export default Navbar;
