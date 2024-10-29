import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";

import { TOKENS } from "./constants/app.constants";

export interface TokenStore {
  token: string;
  setToken: (data: string) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
        clearToken: () => set(() => ({ token: "" })),
      }),
      { name: TOKENS.AUTH_TOKEN_LABEL }
    )
  )
);

export default useTokenStore;
