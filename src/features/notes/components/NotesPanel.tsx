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
    <div className="overflow-hidden rounded-lg border border-border bg-bg-elevated">
      <div className="flex items-center justify-between border-b border-border bg-bg-elevated-2/40 px-4 py-2.5">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
          Notes
        </h2>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
          <span
            aria-hidden
            className="size-1.5 rounded-full transition-colors"
            style={{
              background: dirty ? 'oklch(0.84 0.18 142)' : 'oklch(0.55 0.012 252)',
              boxShadow: dirty ? '0 0 8px oklch(0.84 0.18 142)' : 'none',
            }}
          />
          {dirty ? 'saving' : 'saved'}
        </span>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Your notes about this card — saved locally."
        className="min-h-[120px] w-full resize-y bg-transparent p-4 text-sm leading-relaxed text-fg placeholder:text-fg-faint focus:outline-none"
      />
    </div>
  )
}
