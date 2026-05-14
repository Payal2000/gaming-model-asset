'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import type { GPU } from '@/types/gpu'

interface Props {
  gpus: readonly GPU[]
  slugA: string
  slugB: string
}

export function ComparisonPicker({ gpus, slugA, slugB }: Props) {
  const router = useRouter()

  const update = useCallback(
    (which: 'a' | 'b', slug: string) => {
      const next = new URLSearchParams({
        a: which === 'a' ? slug : slugA,
        b: which === 'b' ? slug : slugB,
      })
      router.push(`/compare?${next.toString()}`)
    },
    [router, slugA, slugB],
  )

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Selector label="A" value={slugA} options={gpus} onChange={(v) => update('a', v)} />
      <span className="text-neutral-600">vs</span>
      <Selector label="B" value={slugB} options={gpus} onChange={(v) => update('b', v)} />
    </div>
  )
}

interface SelectorProps {
  label: string
  value: string
  options: readonly GPU[]
  onChange: (slug: string) => void
}

function Selector({ label, value, options, onChange }: SelectorProps) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-neutral-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-neutral-100"
      >
        {options.map((g) => (
          <option key={g.slug} value={g.slug}>
            {g.name}
          </option>
        ))}
      </select>
    </label>
  )
}
