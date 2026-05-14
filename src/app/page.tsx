import { GalleryGrid } from '@/features/gallery/components/GalleryGrid'
import { GPUS } from '@/data/gpus'
import { LinkButton } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Badge'

export default function HomePage() {
  const totalVram = GPUS.reduce((a, g) => a + g.specs.vramSizeGB, 0)
  const compareHref = `/compare?a=${GPUS[0]!.slug}&b=${GPUS[1]!.slug}`

  return (
    <main className="flex-1">
      <section className="relative isolate border-b border-border">
        <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Tag tone="accent" className="mb-4">v1 · procedural</Tag>
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-fg sm:text-5xl">
                The interactive 3D
                <br />
                graphics card explorer.
              </h1>
              <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-fg-muted">
                Inspect components, rotate models, export screenshots and GLB
                files, and compare specs side-by-side. Built with React Three
                Fiber.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <LinkButton href={compareHref} variant="primary" size="md">
                Compare cards
              </LinkButton>
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            <Stat label="Cards" value={String(GPUS.length)} />
            <Stat label="Total VRAM" value={`${totalVram} GB`} />
            <Stat label="Vendors" value={String(new Set(GPUS.map((g) => g.vendor)).size)} />
            <Stat label="Avg TDP" value={`${Math.round(GPUS.reduce((a, g) => a + g.specs.tdpWatts, 0) / GPUS.length)} W`} />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            Library
          </h2>
          <span className="text-xs text-fg-faint">{GPUS.length} models</span>
        </div>
        <GalleryGrid gpus={GPUS} />
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-elevated px-4 py-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-lg font-semibold tracking-tight text-fg">
        {value}
      </dd>
    </div>
  )
}
