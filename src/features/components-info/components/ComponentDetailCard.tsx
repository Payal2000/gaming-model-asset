'use client'

import { useSelectionStore } from '@/stores/selectionStore'
import type { GPUComponentDescriptor } from '@/types/component'

interface Props {
  components: GPUComponentDescriptor[]
}

export function ComponentDetailCard({ components }: Props) {
  const selectedId = useSelectionStore((s) => s.selectedComponentId)
  const select = useSelectionStore((s) => s.select)
  const selected = components.find((c) => c.id === selectedId)

  if (!selected) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-800 bg-neutral-950/30 p-4 text-sm text-neutral-500">
        Click a hotspot in the viewer to inspect a component.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            {selected.kind.replace('-', ' ')}
          </p>
          <h3 className="mt-0.5 text-base font-semibold text-neutral-100">{selected.label}</h3>
        </div>
        <button
          type="button"
          onClick={() => select(null)}
          className="rounded p-1 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <p className="text-sm leading-relaxed text-neutral-300">{selected.description}</p>
      {selected.details && (
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
          {Object.entries(selected.details).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-neutral-500">{k}</dt>
              <dd className="text-right font-medium text-neutral-100">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
