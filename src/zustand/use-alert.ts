import { create } from "zustand";

interface AlertDialogState {
  isOpen: boolean;
  title?: string;
  desc?: string;
  btnName?: string;
  cancelName?: string;
  btnAction?: () => void;
  cancelAction?: () => void;
  isLoading?: boolean;
  img?: string;
  imgSize?: number;
  showAlertDialog: (
    payload: Omit<
      AlertDialogState,
      "isOpen" | "showAlertDialog" | "hideAlertDialog"
    >
  ) => void;
  hideAlertDialog: () => void;
}

const useAlertDialogStore = create<AlertDialogState>((set) => ({
  isOpen: false,
  showAlertDialog: (payload) => set({ ...payload, isOpen: true }),
  hideAlertDialog: () => set({ isOpen: false }),
}));

export default useAlertDialogStore;
