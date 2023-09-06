"use client"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ListStamps } from "@/integrations/gitcoin-passport/components/list-stamps"

export default function PageIntegration() {
  return (
    <>
      <IsWalletConnected>
        <ListStamps />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <div>You must connect your wallet to be able to see this page</div>
          <WalletConnect className="mx-auto inline-block" />
        </div>
      </IsWalletDisconnected>
    </>
  )
}
