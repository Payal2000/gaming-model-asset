import type { SpecDiffRow } from '../utils/specDiff'

interface Props {
  rows: SpecDiffRow[]
  nameA: string
  nameB: string
}

const WIN_STYLE = 'bg-emerald-500/10 text-emerald-300 font-semibold'
const NEUTRAL_STYLE = 'text-neutral-300'

export function SpecDiffTable({ rows, nameA, nameB }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800">
      <table className="w-full text-sm">
        <thead className="bg-neutral-900 text-xs uppercase tracking-wider text-neutral-500">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Spec</th>
            <th className="px-3 py-2 text-right font-medium">{nameA}</th>
            <th className="px-3 py-2 text-right font-medium">{nameB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 bg-neutral-950/40">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-3 py-2 text-neutral-400">{row.label}</td>
              <td
                className={`px-3 py-2 text-right ${row.winner === 'a' ? WIN_STYLE : NEUTRAL_STYLE}`}
              >
                {row.a}
              </td>
              <td
                className={`px-3 py-2 text-right ${row.winner === 'b' ? WIN_STYLE : NEUTRAL_STYLE}`}
              >
                {row.b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
