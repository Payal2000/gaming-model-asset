import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GPUViewer } from '@/features/viewer/components/GPUViewer'
import { SpecPanel } from '@/features/specs/components/SpecPanel'
import { ComponentDetailCard } from '@/features/components-info/components/ComponentDetailCard'
import { NotesPanel } from '@/features/notes/components/NotesPanel'
import { allGpuSlugs, getGpuBySlug } from '@/data/gpus'
import { VendorBadge, Tag } from '@/components/ui/Badge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allGpuSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const gpu = getGpuBySlug(slug)
  if (!gpu) return {}
  return {
    title: gpu.name,
    description: `Interactive 3D viewer and specs for the ${gpu.name}.`,
  }
}

export default async function GPUDetailPage({ params }: PageProps) {
  const { slug } = await params
  const gpu = getGpuBySlug(slug)
  if (!gpu) notFound()

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <nav className="mb-5 flex items-center gap-2 text-xs text-fg-faint">
          <Link
            href="/"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-fg"
          >
            ← Gallery
          </Link>
          <span className="text-fg-faint">/</span>
          <span className="font-mono uppercase tracking-[0.12em] text-fg-subtle">
            {gpu.slug}
          </span>
        </nav>

        <header
          className="relative mb-6 overflow-hidden rounded-xl border border-border bg-bg-elevated p-6"
          style={{
            backgroundImage: `linear-gradient(135deg, ${gpu.colors.shroud}33, transparent 50%), linear-gradient(to right, ${gpu.colors.accent}10, transparent 60%)`,
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <VendorBadge vendor={gpu.vendor} />
                <Tag>{gpu.series}</Tag>
                <Tag>{gpu.specs.architecture}</Tag>
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
                {gpu.name}
              </h1>
              <p className="mt-2 font-mono text-xs text-fg-subtle">
                {gpu.specs.vramSizeGB} GB {gpu.specs.vramType}
                <span className="mx-2 text-fg-faint">·</span>
                {gpu.specs.tdpWatts} W TDP
                <span className="mx-2 text-fg-faint">·</span>
                ${gpu.specs.msrpUSD.toLocaleString()} MSRP
              </p>
            </div>
            <div
              className="h-3 w-24 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${gpu.colors.accent}, transparent)`,
                boxShadow: `0 0 24px ${gpu.colors.accent}`,
              }}
              aria-hidden
            />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <GPUViewer gpu={gpu} />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
              Drag to rotate
              <span className="mx-2">·</span>
              Scroll to zoom
              <span className="mx-2">·</span>
              Click <span className="inline-block size-1.5 rounded-full align-middle" style={{ background: gpu.colors.accent, boxShadow: `0 0 8px ${gpu.colors.accent}` }} /> markers to inspect
            </p>
            <ComponentDetailCard components={gpu.components} />
          </div>
          <div className="space-y-4">
            <SpecPanel specs={gpu.specs} />
            <NotesPanel key={gpu.slug} slug={gpu.slug} />
          </div>
        </div>
      </div>
    </main>
  )
}
