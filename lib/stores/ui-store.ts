import { create } from "zustand";

export type ControlSection = "identity" | "body" | "face" | "hair" | "clothing" | "accessories" | "background";

export interface UIState {
  activeControlSection: ControlSection;
  isExportDialogOpen: boolean;
  isCategorySidebarOpen: boolean;
  isControlPanelOpen: boolean;
  // Canvas viewport
  canvasZoom: number;
  canvasPanX: number;
  canvasPanY: number;
}

export interface UIActions {
  setActiveControlSection: (section: ControlSection) => void;
  toggleExportDialog: () => void;
  setExportDialogOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleControlPanel: () => void;
  setCanvasZoom: (zoom: number) => void;
  setCanvasPan: (x: number, y: number) => void;
  resetCanvasView: () => void;
}

export const useUIStore = create<UIState & UIActions>()(
  (set) => ({
  activeControlSection: "body",
  isExportDialogOpen: false,
  isCategorySidebarOpen: true,
  isControlPanelOpen: true,
  canvasZoom: 100,
  canvasPanX: 0,
  canvasPanY: 0,

  setActiveControlSection: (section) => set({ activeControlSection: section }),
  toggleExportDialog: () => set((s) => ({ isExportDialogOpen: !s.isExportDialogOpen })),
  setExportDialogOpen: (open) => set({ isExportDialogOpen: open }),

  toggleSidebar: () =>
    set((s) => ({ isCategorySidebarOpen: !s.isCategorySidebarOpen })),

  toggleControlPanel: () =>
    set((s) => ({ isControlPanelOpen: !s.isControlPanelOpen })),

  setCanvasZoom: (canvasZoom) => set({ canvasZoom }),
  setCanvasPan: (canvasPanX, canvasPanY) => set({ canvasPanX, canvasPanY }),
  resetCanvasView: () => set({ canvasZoom: 100, canvasPanX: 0, canvasPanY: 0 }),
}));
