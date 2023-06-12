import classNames from 'clsx'

import { NetworkStatus } from '@/components/blockchain/network-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'

export default function GeneralLayout({ children }: any) {
  const classes = classNames('GeneralLayout', 'bg-gradient-dark min-h-[100vh] flex flex-col pb-10 lg:pb-12')
  return (
    <>
      <div className={classes}>
        <Header />
        <main className="flex-center my-32 flex flex-1 flex-col md:px-10 lg:py-20">{children}</main>
        <div className="fixed bottom-6 left-6">
          <NetworkStatus />
        </div>
        <div className="fixed bottom-6 right-6 flex items-center">
          <WalletConnect />
        </div>
        <Footer />
      </div>
      {/* TODO: Add position controls */}
      <Toaster />
    </>
  )
}
