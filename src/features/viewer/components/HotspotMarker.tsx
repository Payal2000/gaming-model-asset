'use client'

import { Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import type { GPUComponentDescriptor } from '@/types/component'
import { useSelectionStore } from '@/stores/selectionStore'

interface Props {
  descriptor: GPUComponentDescriptor
  accent: string
}

export function HotspotMarker({ descriptor, accent }: Props) {
  const selectedId = useSelectionStore((s) => s.selectedComponentId)
  const toggle = useSelectionStore((s) => s.toggle)
  const isActive = selectedId === descriptor.id

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    toggle(descriptor.id)
  }

  const color = isActive ? '#ffffff' : accent

  return (
    <group position={descriptor.hotspotPosition}>
      <mesh
        onClick={handleClick}
        onPointerOver={(e) => (
          e.stopPropagation(), (document.body.style.cursor = 'pointer')
        )}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isActive ? 1 : 0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      {isActive && (
        <Html distanceFactor={8} position={[0, 0.32, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-md border border-[oklch(1_0_0/.14)] bg-[oklch(0.185_0.014_252/.96)] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg backdrop-blur-md">
            {descriptor.label}
          </div>
        </Html>
      )}
    </group>
  )
}
