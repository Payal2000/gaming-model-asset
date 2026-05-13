import { GPUViewer } from '@/features/viewer/components/GPUViewer'
import type { GPUStub } from '@/types/gpu'

const PLACEHOLDER: GPUStub = {
  slug: 'rtx-4090',
  name: 'GeForce RTX 4090',
  vendor: 'NVIDIA',
  pcbColor: '#0d2818',
  shroudColor: '#1f1f22',
  accentColor: '#76b900',
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">GPUForge</h1>
          <p className="mt-1 text-sm text-neutral-400">
            Interactive 3D graphics card explorer — phase 1a
          </p>
        </header>
        <GPUViewer gpu={PLACEHOLDER} />
        <p className="mt-4 text-xs text-neutral-500">
          Drag to rotate · Scroll to zoom · {PLACEHOLDER.name}
        </p>
      </div>
    </main>
  )
}
