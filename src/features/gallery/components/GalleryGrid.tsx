import type { GPU } from '@/types/gpu'
import { GalleryCard } from './GalleryCard'

export function GalleryGrid({ gpus }: { gpus: readonly GPU[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gpus.map((gpu) => (
        <GalleryCard key={gpu.slug} gpu={gpu} />
      ))}
    </div>
  )
}
