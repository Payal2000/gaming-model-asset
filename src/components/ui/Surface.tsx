import type { HTMLAttributes } from 'react'

type SurfaceTone = 'default' | 'inset' | 'raised'

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SurfaceTone
  padded?: boolean
}

const TONE: Record<SurfaceTone, string> = {
  default: 'bg-bg-elevated border border-border',
  inset: 'bg-bg-inset border border-border',
  raised: 'bg-bg-elevated-2 border border-border-strong shadow-[var(--shadow)]',
}

export function Surface({
  tone = 'default',
  padded = false,
  className = '',
  ...rest
}: SurfaceProps) {
  return (
    <div
      className={`rounded-lg ${TONE[tone]} ${padded ? 'p-4' : ''} ${className}`}
      {...rest}
    />
  )
}
