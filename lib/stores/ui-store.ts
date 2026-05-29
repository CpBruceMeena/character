import { create } from "zustand";

export type ControlSection = "identity" | "body" | "face" | "hair" | "clothing" | "accessories";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export interface UIState {
  activeControlSection: ControlSection;
  isExportDialogOpen: boolean;
  isCategorySidebarOpen: boolean;
  isControlPanelOpen: boolean;
  toasts: Toast[];
}

export interface UIActions {
  setActiveControlSection: (section: ControlSection) => void;
  toggleExportDialog: () => void;
  setExportDialogOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleControlPanel: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useUIStore = create<UIState & UIActions>()((set, get) => ({
  activeControlSection: "body",
  isExportDialogOpen: false,
  isCategorySidebarOpen: true,
  isControlPanelOpen: true,
  toasts: [],

  setActiveControlSection: (section) => set({ activeControlSection: section }),
  toggleExportDialog: () => set((s) => ({ isExportDialogOpen: !s.isExportDialogOpen })),
  setExportDialogOpen: (open) => set({ isExportDialogOpen: open }),

  toggleSidebar: () =>
    set((s) => ({ isCategorySidebarOpen: !s.isCategorySidebarOpen })),

  toggleControlPanel: () =>
    set((s) => ({ isControlPanelOpen: !s.isControlPanelOpen })),

  addToast: (toast) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        { ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
      ],
    })),

  dismissToast: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));
