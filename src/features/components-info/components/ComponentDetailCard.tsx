'use client'

import { useSelectionStore } from '@/stores/selectionStore'
import type { GPUComponentDescriptor } from '@/types/component'
import { Tag } from '@/components/ui/Badge'

interface Props {
  components: GPUComponentDescriptor[]
}

export function ComponentDetailCard({ components }: Props) {
  const selectedId = useSelectionStore((s) => s.selectedComponentId)
  const select = useSelectionStore((s) => s.select)
  const selected = components.find((c) => c.id === selectedId)

  if (!selected) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-bg-inset/50 p-5 text-sm text-fg-subtle">
        <p className="font-medium text-fg-muted">No component selected.</p>
        <p className="mt-1 text-xs text-fg-faint">
          Click a marker in the viewer to inspect a component.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-elevated">
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <Tag tone="accent">{selected.kind.replace('-', ' ')}</Tag>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-fg">
            {selected.label}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => select(null)}
          aria-label="Close"
          className="rounded-md p-1.5 text-fg-faint transition-colors hover:bg-bg-elevated-2 hover:text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed text-fg-muted">{selected.description}</p>
        {selected.details && (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-4 text-xs">
            {Object.entries(selected.details).map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-fg-subtle">{k}</dt>
                <dd className="text-right font-mono tabular-nums text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}
