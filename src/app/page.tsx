import Link from 'next/link'
import { GalleryGrid } from '@/features/gallery/components/GalleryGrid'
import { GPUS } from '@/data/gpus'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">GPUForge</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Interactive 3D graphics card explorer
            </p>
          </div>
          <Link
            href={`/compare?a=${GPUS[0]!.slug}&b=${GPUS[1]!.slug}`}
            className="rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:border-neutral-500"
          >
            Compare →
          </Link>
        </header>
        <GalleryGrid gpus={GPUS} />
      </div>
    </main>
  )
}
