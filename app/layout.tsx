'use client'

import '@/styles/global.css'
import '@/styles/app.css'
import '@/styles/components.css'
import '@/styles/turbo.css'
import { Raleway } from '@next/font/google'
import { Inter as FontSans } from '@next/font/google'
import localFont from '@next/font/local'
import classNames from 'clsx'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import MenuDropdown from '@/components/layout/menu-dropdown'
import RootProvider from '@/components/providers/RootProvider'
import { NetworkStatus } from '@/components/shared/NetworkStatus'
import WalletConnect from '@/components/web3/WalletConnect'
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
  const classes = classNames('App', 'bg-gradient-app min-h-[100vh] flex flex-col')
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
            <div className={classes}>
              <Header />
              <main className="my-32 flex flex-1 flex-col md:px-10 lg:my-20 lg:py-20">{children}</main>
              <div className="fixed bottom-6 left-6">
                <NetworkStatus />
              </div>
              <div className="fixed bottom-6 right-6 flex items-center">
                <MenuDropdown>
                  <span className=" btn-sm mr-2 rounded-md bg-neutral-50 p-3 font-semibold shadow-md dark:bg-neutral-900">Menu</span>
                </MenuDropdown>
                <WalletConnect />
              </div>
              <Footer />
            </div>
          </RootProvider>
        </body>
      </html>
    </>
  )
}
