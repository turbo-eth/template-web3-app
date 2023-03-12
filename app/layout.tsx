'use client'

import '@/styles/global.css'
import '@/styles/app.css'
import '@/styles/components.css'
import '@/styles/turbo.css'
import { Raleway } from '@next/font/google'
import { Inter as FontSans } from '@next/font/google'
import localFont from '@next/font/local'

import RootProvider from '@/components/providers/root-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const sfPro = localFont({
  src: '../assets/fonts/SF-Pro-Display-Medium.otf',
  variable: '--font-sf',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
})

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: any) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50', fontSans.variable)}>
          <style jsx global>
            {`
              :root {
                --sfPro-font: ${sfPro.style.fontFamily};
                --raleway-font: ${raleway.style.fontFamily};
              }
            `}
          </style>
          <RootProvider>
            {children} <Toaster />
          </RootProvider>
        </body>
      </html>
    </>
  )
}
