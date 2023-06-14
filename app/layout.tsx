import '@/styles/app.css'
import '@/styles/gradient.css'
import '@/styles/periphery.css'
import { ReactNode } from 'react'

import { Raleway } from 'next/font/google'
import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

import RootProvider from '@/components/providers/root-provider'
import { siteConfig } from '@/config/site'
import { env } from '@/env.mjs'
import { cn } from '@/lib/utils'

const url = env.SITE_URL || 'http://localhost:3000'

export const metadata = {
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

const sfPro = localFont({
  src: '../assets/fonts/SF-Pro-Display-Medium.otf',
  variable: '--sfPro-font',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--raleway-font',
})

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" className={`${sfPro.variable} ${raleway.variable}`} suppressHydrationWarning>
        <body className={cn('min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50', fontSans.variable)}>
          <RootProvider>{children}</RootProvider>
        </body>
      </html>
    </>
  )
}
