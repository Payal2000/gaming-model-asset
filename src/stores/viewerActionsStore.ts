import { create } from 'zustand'

type SyncFn = () => void

interface ViewerActionsState {
  takeScreenshot: SyncFn | null
  exportGLB: SyncFn | null
  setActions: (a: { takeScreenshot: SyncFn; exportGLB: SyncFn }) => void
  clearActions: () => void
}

export const useViewerActionsStore = create<ViewerActionsState>((set) => ({
  takeScreenshot: null,
  exportGLB: null,
  setActions: ({ takeScreenshot, exportGLB }) => set({ takeScreenshot, exportGLB }),
  clearActions: () => set({ takeScreenshot: null, exportGLB: null }),
}))
