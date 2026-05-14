import type { SpecDiffRow } from '../utils/specDiff'

interface Props {
  rows: SpecDiffRow[]
  nameA: string
  nameB: string
}

const WIN_CELL =
  'bg-[oklch(0.84_0.18_142/.08)] text-[oklch(0.92_0.18_142)] font-semibold'
const NEUTRAL_CELL = 'text-fg'

export function SpecDiffTable({ rows, nameA, nameB }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-elevated">
      <table className="w-full text-sm">
        <thead className="bg-bg-elevated-2">
          <tr className="text-[10px] uppercase tracking-[0.12em] text-fg-faint">
            <th className="px-4 py-3 text-left font-semibold">Spec</th>
            <th className="px-4 py-3 text-right font-semibold">{nameA}</th>
            <th className="px-4 py-3 text-right font-semibold">{nameB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label} className="transition-colors hover:bg-bg-elevated-2/40">
              <td className="px-4 py-2.5 text-fg-subtle">{row.label}</td>
              <td
                className={`px-4 py-2.5 text-right font-mono tabular-nums ${
                  row.winner === 'a' ? WIN_CELL : NEUTRAL_CELL
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {row.winner === 'a' && (
                    <span aria-hidden className="size-1.5 rounded-full bg-[oklch(0.84_0.18_142)]" />
                  )}
                  {row.a}
                </span>
              </td>
              <td
                className={`px-4 py-2.5 text-right font-mono tabular-nums ${
                  row.winner === 'b' ? WIN_CELL : NEUTRAL_CELL
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {row.winner === 'b' && (
                    <span aria-hidden className="size-1.5 rounded-full bg-[oklch(0.84_0.18_142)]" />
                  )}
                  {row.b}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
