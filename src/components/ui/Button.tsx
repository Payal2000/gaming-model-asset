import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface SharedProps {
  variant?: Variant
  size?: Size
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg ring-1 ring-inset ring-[oklch(1_0_0/.16)] hover:brightness-110 shadow-[0_0_0_1px_oklch(0_0_0/.2),0_8px_24px_-8px_oklch(0.84_0.18_142/.4)]',
  secondary:
    'bg-bg-elevated text-fg border border-border hover:bg-bg-elevated-2 hover:border-border-strong',
  ghost: 'text-fg-muted hover:bg-bg-elevated hover:text-fg',
}

const SIZE: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
}

const BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-md font-medium tracking-tight transition-[background-color,border-color,color,filter] duration-[var(--duration-fast)] ease-[var(--ease-out-quint)] disabled:pointer-events-none disabled:opacity-50'

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & SharedProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    />
  )
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  SharedProps & { href: string }

export function LinkButton({
  variant = 'secondary',
  size = 'md',
  className = '',
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    />
  )
}
