export function LoadingFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-neutral-950 text-neutral-500"
      style={{ aspectRatio: '16 / 10' }}
    >
      <span className="text-sm">Loading viewer…</span>
    </div>
  )
}
