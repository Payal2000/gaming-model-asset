import type { GPUSpecs } from '@/types/specs'
import { formatSpecGroups } from '../utils/formatSpec'
import { SpecRow } from './SpecRow'

export function SpecPanel({ specs }: { specs: GPUSpecs }) {
  const groups = formatSpecGroups(specs)
  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-bg-elevated">
      <div className="border-b border-border bg-bg-elevated-2/40 px-4 py-2.5">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
          Specifications
        </h2>
      </div>
      <div className="divide-y divide-border">
        {groups.map((group) => (
          <section key={group.title} className="px-4 py-3">
            <h3 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
              {group.title}
            </h3>
            <div>
              {group.rows.map((row) => (
                <SpecRow key={row.label} row={row} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  )
}
