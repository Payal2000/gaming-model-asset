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
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-bg-elevated p-3">
      <Selector label="A" value={slugA} options={gpus} onChange={(v) => update('a', v)} />
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-fg-faint">vs</span>
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
    <label className="group flex items-center gap-2 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="cursor-pointer appearance-none rounded-md border border-border bg-bg-inset py-1.5 pl-3 pr-8 text-sm text-fg outline-none transition-colors hover:border-border-strong focus:border-border-strong"
        >
          {options.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-faint"
        >
          ▾
        </span>
      </div>
    </label>
  )
}
