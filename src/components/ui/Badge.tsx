import type { HTMLAttributes } from 'react'
import type { GPUVendor } from '@/types/gpu'

interface VendorBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  vendor: GPUVendor
  size?: 'sm' | 'md'
}

const VENDOR_STYLE: Record<GPUVendor, { bg: string; fg: string; ring: string }> = {
  NVIDIA: { bg: 'bg-[oklch(0.78_0.2_135/.14)]', fg: 'text-[oklch(0.88_0.2_135)]', ring: 'ring-[oklch(0.78_0.2_135/.32)]' },
  AMD: { bg: 'bg-[oklch(0.65_0.22_25/.14)]', fg: 'text-[oklch(0.8_0.18_25)]', ring: 'ring-[oklch(0.65_0.22_25/.34)]' },
  Intel: { bg: 'bg-[oklch(0.7_0.18_245/.14)]', fg: 'text-[oklch(0.82_0.16_245)]', ring: 'ring-[oklch(0.7_0.18_245/.34)]' },
}

export function VendorBadge({ vendor, size = 'sm', className = '', ...rest }: VendorBadgeProps) {
  const v = VENDOR_STYLE[vendor]
  const sizing = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
  return (
    <span
      className={`inline-flex items-center rounded-full ${sizing} font-semibold uppercase tracking-[0.08em] ring-1 ${v.bg} ${v.fg} ${v.ring} ${className}`}
      {...rest}
    >
      {vendor}
    </span>
  )
}

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'success' | 'danger'
}

const TAG_TONE = {
  neutral: 'bg-bg-elevated-2 text-fg-muted ring-border-strong',
  accent: 'bg-[oklch(0.84_0.18_142/.14)] text-[oklch(0.92_0.18_142)] ring-[oklch(0.84_0.18_142/.34)]',
  success: 'bg-[oklch(0.78_0.16_152/.14)] text-[oklch(0.88_0.16_152)] ring-[oklch(0.78_0.16_152/.32)]',
  danger: 'bg-[oklch(0.7_0.2_25/.14)] text-[oklch(0.82_0.18_25)] ring-[oklch(0.7_0.2_25/.32)]',
}

export function Tag({ tone = 'neutral', className = '', ...rest }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ring-1 ring-inset ${TAG_TONE[tone]} ${className}`}
      {...rest}
    />
  )
}
