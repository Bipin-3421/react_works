import { create } from "zustand";

import { ModalDataMap } from "@/interface/modal.store";
import { ModalIds } from "@/types";

interface ModalState {
  modals: Record<ModalIds, boolean>;
  data: Partial<ModalDataMap>; // Optional to allow uninitialized data
  openModal: <K extends keyof ModalDataMap>(
    key: K,
    modalData?: ModalDataMap[K]
  ) => void;
  closeModal: (key: ModalIds) => void;
}

// Helper function to initialize the modals state
const initializeModalsState = (): Record<ModalIds, boolean> => {
  return Object.values(ModalIds).reduce((acc, modalId) => {
    acc[modalId as ModalIds] = false;
    return acc;
  }, {} as Record<ModalIds, boolean>);
};

// Initialize Zustand store with proper types
export const useModalStore = create<ModalState>((set) => ({
  modals: initializeModalsState(),
  data: {},
  openModal: (key, modalData) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true },
      data: { ...state.data, [key]: modalData },
    })),
  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false },
      data: { ...state.data, [key]: undefined }, // Reset data when modal is closed
    })),
}));
