import Link from 'next/link'
import type { GPU } from '@/types/gpu'
import { VendorBadge } from '@/components/ui/Badge'

export function GalleryCard({ gpu }: { gpu: GPU }) {
  const { colors, specs } = gpu
  return (
    <Link
      href={`/gpu/${gpu.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-border bg-bg-elevated transition-[border-color,transform] duration-[var(--duration)] ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-border-strong"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '16 / 10',
          background: `radial-gradient(120% 80% at 30% 20%, ${colors.shroud} 0%, ${colors.pcb} 60%, oklch(0.12 0.012 252) 100%)`,
        }}
      >
        <div
          className="absolute inset-x-6 bottom-5 h-[3px] rounded-full opacity-90 transition-opacity duration-[var(--duration)] group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent} 50%, transparent)`,
            boxShadow: `0 0 24px ${colors.accent}`,
          }}
        />
        <div
          className="absolute right-4 top-4 h-2 w-2 rounded-full"
          style={{ background: colors.accent, boxShadow: `0 0 16px ${colors.accent}` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-tight text-fg">
            {gpu.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-fg-subtle">
            {specs.vramSizeGB} GB {specs.vramType}
            <span className="mx-1.5 text-fg-faint">·</span>
            {specs.tdpWatts} W
            <span className="mx-1.5 text-fg-faint">·</span>
            {specs.architecture}
          </p>
        </div>
        <VendorBadge vendor={gpu.vendor} />
      </div>
    </Link>
  )
}
