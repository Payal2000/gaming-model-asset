import type { GPUSpecs } from '@/types/specs'
import { formatSpecGroups } from '../utils/formatSpec'
import { SpecRow } from './SpecRow'

export function SpecPanel({ specs }: { specs: GPUSpecs }) {
  const groups = formatSpecGroups(specs)
  return (
    <aside className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
        Specifications
      </h2>
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {group.title}
            </h3>
            <div>
              {group.rows.map((row) => (
                <SpecRow key={row.label} row={row} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
