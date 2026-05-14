import Link from 'next/link'
import type { GPU } from '@/types/gpu'

const VENDOR_BADGE: Record<GPU['vendor'], string> = {
  NVIDIA: 'bg-[#76b900]/20 text-[#9bd34a] ring-[#76b900]/40',
  AMD: 'bg-[#ed1c24]/15 text-[#ff6b70] ring-[#ed1c24]/40',
  Intel: 'bg-blue-500/15 text-blue-300 ring-blue-500/40',
}

export function GalleryCard({ gpu }: { gpu: GPU }) {
  const { colors } = gpu
  return (
    <Link
      href={`/gpu/${gpu.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 transition-colors hover:border-neutral-600"
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: '16 / 10',
          background: `linear-gradient(135deg, ${colors.shroud} 0%, ${colors.pcb} 100%)`,
        }}
      >
        <div
          className="absolute inset-x-6 bottom-6 h-1 rounded-full"
          style={{ background: colors.accent, opacity: 0.85 }}
        />
        <div
          className="absolute right-4 top-4 h-3 w-3 rounded-full"
          style={{ background: colors.accent, boxShadow: `0 0 12px ${colors.accent}` }}
        />
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">{gpu.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            {gpu.specs.vramSizeGB} GB {gpu.specs.vramType} · {gpu.specs.tdpWatts} W
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${VENDOR_BADGE[gpu.vendor]}`}
        >
          {gpu.vendor}
        </span>
      </div>
    </Link>
  )
}
