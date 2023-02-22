'use client'
import classNames from 'clsx'

import { NetworkStatus } from '@/components/blockchain/network-status'
import WalletConnect from '@/components/blockchain/wallet-connect'
import { Footer } from '@/components/layout/general/footer'
import { Header } from '@/components/layout/general/header'

export default function GeneralLayout({ children }: any) {
  const classes = classNames('App', 'bg-gradient-dark min-h-[100vh] flex flex-col')
  return (
    <>
      <div className={classes}>
        <Header />
        <main className="my-32 flex flex-1 flex-col md:px-10 lg:my-20 lg:py-20">{children}</main>
        <div className="fixed bottom-6 left-6">
          <NetworkStatus />
        </div>
        <div className="fixed bottom-6 right-6 flex items-center">
          <WalletConnect />
        </div>
        <Footer />
      </div>
    </>
  )
}
