import type { SpecRowData } from '../utils/formatSpec'

export function SpecRow({ row }: { row: SpecRowData }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
      <span className="text-fg-subtle">{row.label}</span>
      <span className="font-mono tabular-nums text-fg">{row.value}</span>
    </div>
  )
}
