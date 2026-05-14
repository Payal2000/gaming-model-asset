import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface NotesState {
  notes: Record<string, string>
  setNote: (slug: string, body: string) => void
  getNote: (slug: string) => string
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      setNote: (slug, body) =>
        set((s) => ({ notes: { ...s.notes, [slug]: body } })),
      getNote: (slug) => get().notes[slug] ?? '',
    }),
    {
      name: 'gpuforge-notes',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
