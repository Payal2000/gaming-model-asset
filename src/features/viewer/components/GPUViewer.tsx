'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { GPU } from '@/types/gpu'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { GPUScene } from './GPUScene'
import { LoadingFallback } from './LoadingFallback'
import { ViewerCaptureBridge } from './ViewerCaptureBridge'
import { ViewerToolbar } from './ViewerToolbar'

interface Props {
  gpu: GPU
  showToolbar?: boolean
}

export function GPUViewer({ gpu, showToolbar = true }: Props) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-border bg-bg-inset"
      style={{ aspectRatio: '16 / 10' }}
    >
      {showToolbar && <ViewerToolbar />}
      <ErrorBoundary fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows
            camera={{ position: [6, 4, 6], fov: 40 }}
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
          >
            <GPUScene gpu={gpu} />
            {showToolbar && <ViewerCaptureBridge slug={gpu.slug} />}
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[oklch(1_0_0/.04)]"
      />
    </div>
  )
}
