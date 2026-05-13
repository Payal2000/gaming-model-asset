'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { GPUStub } from '@/types/gpu'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { GPUScene } from './GPUScene'
import { LoadingFallback } from './LoadingFallback'

interface Props {
  gpu: GPUStub
}

export function GPUViewer({ gpu }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-neutral-950"
      style={{ aspectRatio: '16 / 10' }}
    >
      <ErrorBoundary fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows
            camera={{ position: [6, 4, 6], fov: 40 }}
            dpr={[1, 2]}
          >
            <GPUScene gpu={gpu} />
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={15}
              maxPolarAngle={Math.PI / 2 - 0.05}
              enableDamping
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
