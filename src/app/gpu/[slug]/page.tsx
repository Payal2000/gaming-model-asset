import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GPUViewer } from '@/features/viewer/components/GPUViewer'
import { SpecPanel } from '@/features/specs/components/SpecPanel'
import { ComponentDetailCard } from '@/features/components-info/components/ComponentDetailCard'
import { NotesPanel } from '@/features/notes/components/NotesPanel'
import { allGpuSlugs, getGpuBySlug } from '@/data/gpus'

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
    title: `${gpu.name} — GPUForge`,
    description: `Interactive 3D viewer and specs for the ${gpu.name}`,
  }
}

export default async function GPUDetailPage({ params }: PageProps) {
  const { slug } = await params
  const gpu = getGpuBySlug(slug)
  if (!gpu) notFound()

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-block text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-200"
        >
          ← Gallery
        </Link>
        <header className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{gpu.name}</h1>
            <p className="mt-1 text-sm text-neutral-400">
              {gpu.vendor} · {gpu.series} · {gpu.specs.architecture}
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <GPUViewer gpu={gpu} />
            <ComponentDetailCard components={gpu.components} />
          </div>
          <div className="space-y-4">
            <SpecPanel specs={gpu.specs} />
            <NotesPanel key={gpu.slug} slug={gpu.slug} />
          </div>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          Drag to rotate · Scroll to zoom · Click green dots to inspect components
        </p>
      </div>
    </main>
  )
}
