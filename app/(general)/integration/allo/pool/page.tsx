'use client'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { AlloAllocate, AlloCreatePool, AlloDistribute, AlloFundPool, AlloRegisterRecipient } from '@/integrations/allo/components/pool'

export default function PageAllo() {
  return (
    <section className="w-full lg:mt-10">
      <div className="container mx-auto mt-10 max-w-screen-lg gap-6">
        <IsWalletConnected>
          <div className="flex w-full flex-col gap-y-10">
            <AlloCreatePool />
            <AlloAllocate />
            <AlloDistribute />
            <AlloFundPool />
            <AlloRegisterRecipient />
          </div>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="inline-block" />
        </IsWalletDisconnected>
      </div>
    </section>
  )
}
