import type { SpecRowData } from '../utils/formatSpec'

export function SpecRow({ row }: { row: SpecRowData }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-neutral-800 py-2 text-sm last:border-b-0">
      <span className="text-neutral-400">{row.label}</span>
      <span className="font-medium text-neutral-100">{row.value}</span>
    </div>
  )
}
