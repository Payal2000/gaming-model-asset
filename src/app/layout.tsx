import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GPUForge — Interactive 3D Graphics Card Explorer',
    template: '%s — GPUForge',
  },
  description:
    'Explore graphics cards in 3D. Inspect components, compare specs side-by-side, and export models.',
}

export const viewport: Viewport = {
  themeColor: '#0a0d14',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-bg text-fg">
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  )
}
