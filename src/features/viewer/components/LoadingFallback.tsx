export function LoadingFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-bg-inset"
      style={{ aspectRatio: '16 / 10' }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-[oklch(0.84_0.18_142)]"
          style={{ boxShadow: '0 0 8px oklch(0.84 0.18 142)' }}
        />
        Loading viewer
      </div>
    </div>
  )
}
