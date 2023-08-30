import { ReactNode } from "react"

import { Toaster } from "@/components/ui/toaster"
import { NetworkStatus } from "@/components/blockchain/network-status"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex min-h-[100vh] flex-col pb-10 lg:pb-12">
        <Header />
        <main className="flex-center my-32 flex flex-1 flex-col md:px-10 lg:py-20">
          {children}
        </main>
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
