'use client'

import { useViewerActionsStore } from '@/stores/viewerActionsStore'

export function ViewerToolbar() {
  const screenshot = useViewerActionsStore((s) => s.takeScreenshot)
  const exportGLB = useViewerActionsStore((s) => s.exportGLB)

  return (
    <div className="absolute right-3 top-3 z-10 flex gap-2">
      <ToolbarButton onClick={screenshot} label="PNG" title="Download screenshot" />
      <ToolbarButton onClick={exportGLB} label="GLB" title="Export 3D model" />
    </div>
  )
}

interface BtnProps {
  onClick: (() => void) | null
  label: string
  title: string
}

function ToolbarButton({ onClick, label, title }: BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick ?? undefined}
      disabled={!onClick}
      title={title}
      className="rounded bg-neutral-900/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-200 ring-1 ring-neutral-700 backdrop-blur-sm hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  )
}
