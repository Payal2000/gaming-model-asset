'use client'

import type { GPUComponentDescriptor } from '@/types/component'
import { HotspotMarker } from './HotspotMarker'

export function Hotspots({ components }: { components: GPUComponentDescriptor[] }) {
  return (
    <group>
      {components.map((c) => (
        <HotspotMarker key={c.id} descriptor={c} />
      ))}
    </group>
  )
}
