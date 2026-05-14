'use client'

import { useEffect, useRef, useState } from 'react'
import { useNotesStore } from '@/stores/notesStore'

const DEBOUNCE_MS = 400

/**
 * Caller must pass `key={slug}` so React remounts this when the GPU changes
 * (avoids syncing `stored` -> `draft` via an effect).
 */
export function NotesPanel({ slug }: { slug: string }) {
  const stored = useNotesStore((s) => s.notes[slug] ?? '')
  const setNote = useNotesStore((s) => s.setNote)
  const [draft, setDraft] = useState(stored)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dirty = draft !== stored

  useEffect(() => {
    if (!dirty) return
    timerRef.current = setTimeout(() => setNote(slug, draft), DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [draft, dirty, slug, setNote])

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Notes
        </h2>
        <span className="text-[10px] uppercase tracking-wider text-neutral-600">
          {dirty ? 'saving…' : 'saved'}
        </span>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Your notes about this card (saved locally)…"
        className="min-h-[120px] w-full resize-y rounded border border-neutral-800 bg-neutral-900 p-2 text-sm text-neutral-100 outline-none focus:border-neutral-600"
      />
    </div>
  )
}
