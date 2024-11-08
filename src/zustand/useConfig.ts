import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

interface configType {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  hover: boolean;
  setHover: (hover: boolean) => void;
  mobileExpand: boolean;
  setMobileExpand: (mobileExpand: boolean) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useConfig = create<configType>()(
  devtools(
    persist(
      (set) => ({
        expanded: true,
        setExpanded: (expanded) => set({ expanded }),
        hover: false,
        setHover: (hover) => set({ hover }),
        mobileExpand: false,
        setMobileExpand: (mobileExpand) => set({ mobileExpand }),
        isOpen: false,
        setIsOpen: (isOpen) => set({ isOpen }),
      }),
      {
        name: "config-storage",
      }
    )
  )
);
