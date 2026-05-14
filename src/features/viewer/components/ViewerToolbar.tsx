'use client'

import { useViewerActionsStore } from '@/stores/viewerActionsStore'

export function ViewerToolbar() {
  const screenshot = useViewerActionsStore((s) => s.takeScreenshot)
  const exportGLB = useViewerActionsStore((s) => s.exportGLB)

  return (
    <div className="absolute right-3 top-3 z-10 flex gap-1.5 rounded-lg border border-border bg-bg-elevated/80 p-1 backdrop-blur-md">
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
      className="rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:bg-bg-elevated-2 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  )
}
