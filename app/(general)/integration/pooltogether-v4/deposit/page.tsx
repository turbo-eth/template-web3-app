"use client"

import { PoolTogetherFormDeposit } from "@/actions/pooltogether-v4/components/form-yield-source-prize-pool-deposit"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"

export default function PoolTogetherDeposit() {
  return (
    <div className="w-full max-w-screen-lg px-4 lg:mt-10">
      <IsWalletConnected>
        <PoolTogetherFormDeposit />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center">
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </div>
  )
}
