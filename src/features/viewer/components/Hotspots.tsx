'use client'

import type { GPUComponentDescriptor } from '@/types/component'
import { HotspotMarker } from './HotspotMarker'

interface Props {
  components: GPUComponentDescriptor[]
  accent: string
}

export function Hotspots({ components, accent }: Props) {
  return (
    <group>
      {components.map((c) => (
        <HotspotMarker key={c.id} descriptor={c} accent={accent} />
      ))}
    </group>
  )
}
