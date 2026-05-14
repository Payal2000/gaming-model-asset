import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { GPU } from '@/types/gpu'
import { GPUS, getGpuBySlug } from '@/data/gpus'
import { GPUViewer } from '@/features/viewer/components/GPUViewer'
import { ComparisonPicker } from '@/features/comparison/components/ComparisonPicker'
import { SpecDiffTable } from '@/features/comparison/components/SpecDiffTable'
import { buildSpecDiff } from '@/features/comparison/utils/specDiff'

interface PageProps {
  searchParams: Promise<{ a?: string; b?: string }>
}

export const metadata = {
  title: 'Compare GPUs — GPUForge',
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

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-block text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-200"
        >
          ← Gallery
        </Link>
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Compare</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Side-by-side 3D viewer and spec diff
          </p>
        </header>
        <ComparisonPicker gpus={GPUS} slugA={gpuA.slug} slugB={gpuB.slug} />
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ViewerColumn label={gpuA.name} gpu={gpuA} />
          <ViewerColumn label={gpuB.name} gpu={gpuB} />
        </div>
        <SpecDiffTable rows={diff} nameA={gpuA.name} nameB={gpuB.name} />
      </div>
    </main>
  )
}

function ViewerColumn({ label, gpu }: { label: string; gpu: GPU }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-neutral-300">{label}</h2>
      <GPUViewer gpu={gpu} showToolbar={false} />
    </div>
  )
}
