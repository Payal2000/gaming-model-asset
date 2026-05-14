import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { GPU } from '@/types/gpu'
import { GPUS, getGpuBySlug } from '@/data/gpus'
import { GPUViewer } from '@/features/viewer/components/GPUViewer'
import { ComparisonPicker } from '@/features/comparison/components/ComparisonPicker'
import { SpecDiffTable } from '@/features/comparison/components/SpecDiffTable'
import { buildSpecDiff } from '@/features/comparison/utils/specDiff'
import { VendorBadge } from '@/components/ui/Badge'

interface PageProps {
  searchParams: Promise<{ a?: string; b?: string }>
}

export const metadata = {
  title: 'Compare GPUs',
}

export default async function ComparePage({ searchParams }: PageProps) {
  const { a, b } = await searchParams
  const slugA = a ?? GPUS[0]!.slug
  const slugB = b ?? GPUS[1]!.slug

  const gpuA = getGpuBySlug(slugA)
  const gpuB = getGpuBySlug(slugB)

  if (!gpuA || !gpuB) {
    redirect(`/compare?a=${GPUS[0]!.slug}&b=${GPUS[1]!.slug}`)
  }

  const diff = buildSpecDiff(gpuA.specs, gpuB.specs)
  const winsA = diff.filter((r) => r.winner === 'a').length
  const winsB = diff.filter((r) => r.winner === 'b').length

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
            compare
          </span>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
            Compare
          </h1>
          <p className="mt-2 text-sm text-fg-muted">
            Side-by-side 3D viewer with spec diff. Greener row, better number.
          </p>
        </header>

        <ComparisonPicker gpus={GPUS} slugA={gpuA.slug} slugB={gpuB.slug} />

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ViewerColumn gpu={gpuA} wins={winsA} />
          <ViewerColumn gpu={gpuB} wins={winsB} />
        </div>

        <SpecDiffTable rows={diff} nameA={gpuA.name} nameB={gpuB.name} />
      </div>
    </main>
  )
}

function ViewerColumn({ gpu, wins }: { gpu: GPU; wins: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <VendorBadge vendor={gpu.vendor} />
          <h2 className="truncate text-sm font-semibold tracking-tight text-fg">
            {gpu.name}
          </h2>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
          {wins} wins
        </span>
      </div>
      <GPUViewer gpu={gpu} showToolbar={false} />
    </div>
  )
}
