"use client"

import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ListStamps } from "@/integrations/gitcoin-passport/components/list-stamps"
import { WalletConnect } from "@/integrations/rainbow-kit/wallet-connect"

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
