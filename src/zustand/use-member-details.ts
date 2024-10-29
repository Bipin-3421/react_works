import { create } from "zustand";

import { TOKENS } from "@/constants/app.constants";
import { createJSONStorage, persist } from "zustand/middleware";

interface MemberDetailsState {
  id: number | string;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  role: string;
}

interface MemberDetailsActions {
  MemberDetails: MemberDetailsState;
  SetMemberDetails: (memberDetails: MemberDetailsState) => void;
}

export const useMemberDetailsStore = create<MemberDetailsActions>()(
  persist(
    (set) => ({
      MemberDetails: {
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        designation: "",
        role: "",
      },
      SetMemberDetails: (memberDetails: MemberDetailsState) =>
        set({ MemberDetails: memberDetails }),
    }),
    {
      name: TOKENS.MEMBER_STORE_LABEL,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
