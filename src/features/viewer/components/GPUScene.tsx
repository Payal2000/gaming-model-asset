'use client'

import { Environment, ContactShadows } from '@react-three/drei'
import type { GPUStub } from '@/types/gpu'
import { ProceduralGPU } from './ProceduralGPU'

interface Props {
  gpu: GPUStub
}

export function GPUScene({ gpu }: Props) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-5, 4, -3]} intensity={0.3} color="#88aaff" />
      <Environment preset="city" />
      <ProceduralGPU gpu={gpu} />
      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={10} blur={2.5} far={2} />
    </>
  )
}
