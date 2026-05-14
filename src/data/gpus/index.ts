import type { GPU } from '@/types/gpu'
import { rtx4090 } from './rtx-4090'
import { rtx4080 } from './rtx-4080'
import { rx7900xtx } from './rx-7900-xtx'
import { rtx3090 } from './rtx-3090'

export const GPUS: readonly GPU[] = [rtx4090, rtx4080, rx7900xtx, rtx3090]

export const GPU_BY_SLUG: Readonly<Record<string, GPU>> = Object.fromEntries(
  GPUS.map((g) => [g.slug, g]),
)

export function getGpuBySlug(slug: string): GPU | undefined {
  return GPU_BY_SLUG[slug]
}

export function allGpuSlugs(): string[] {
  return GPUS.map((g) => g.slug)
}
