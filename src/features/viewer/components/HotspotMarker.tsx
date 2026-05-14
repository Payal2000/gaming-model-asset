'use client'

import { Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'
import type { GPUComponentDescriptor } from '@/types/component'
import { useSelectionStore } from '@/stores/selectionStore'

interface Props {
  descriptor: GPUComponentDescriptor
}

export function HotspotMarker({ descriptor }: Props) {
  const selectedId = useSelectionStore((s) => s.selectedComponentId)
  const toggle = useSelectionStore((s) => s.toggle)
  const isActive = selectedId === descriptor.id

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    toggle(descriptor.id)
  }

  return (
    <group position={descriptor.hotspotPosition}>
      <mesh onClick={handleClick} onPointerOver={(e) => (e.stopPropagation(), (document.body.style.cursor = 'pointer'))} onPointerOut={() => (document.body.style.cursor = 'default')}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? '#ffffff' : '#76b900'}
          transparent
          opacity={isActive ? 1 : 0.85}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color={isActive ? '#ffffff' : '#76b900'} transparent opacity={0.15} />
      </mesh>
      {isActive && (
        <Html distanceFactor={8} position={[0, 0.3, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-md bg-neutral-900/95 px-2 py-1 text-xs font-medium text-neutral-100 ring-1 ring-neutral-700">
            {descriptor.label}
          </div>
        </Html>
      )}
    </group>
  )
}
