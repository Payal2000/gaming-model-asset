import { create } from 'zustand'

interface SelectionState {
  selectedComponentId: string | null
  select: (id: string | null) => void
  toggle: (id: string) => void
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedComponentId: null,
  select: (id) => set({ selectedComponentId: id }),
  toggle: (id) =>
    set((s) => ({
      selectedComponentId: s.selectedComponentId === id ? null : id,
    })),
}))
