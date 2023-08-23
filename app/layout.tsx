import '@/styles/globals.css'
import { Metadata } from 'next'

import RootProvider from '@/components/providers/root-provider'
import { siteConfig } from '@/config/site'
import { env } from '@/env.mjs'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

const url = env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: url?.toString(),
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </>
  )
}
