"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { StampGate } from "@/integrations/gitcoin-passport/components/stamp-gate"

export default function PageIntegration() {
  return (
    <>
      <IsWalletConnected>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <CardTitle className="mb-6">
              This card has a stamp gate, which its contents will only be
              visible if you have submitted a passport with the{" "}
              <span className="px-2 py-1 font-mono font-semibold text-green-500">
                NFT
              </span>{" "}
              stamp.
            </CardTitle>
            <StampGate stampId="NFT">
              Congrats! you have the{" "}
              <span className="px-2 py-1 font-mono font-semibold text-green-500">
                NFT
              </span>{" "}
              stamp.
            </StampGate>
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardContent className="pt-6">
            <CardTitle className="mb-6">
              This card has a stamp gate, which its contents will only be
              visible if you have submitted a passport with the Gitcoin&apos;s
              <span className="px-2 py-1 font-mono font-semibold text-green-500">
                SelfStakingBronze
              </span>{" "}
              stamp.
            </CardTitle>
            <StampGate stampId="SelfStakingBronze">
              <div>
                Congrats! you have the{" "}
                <span className="text-green-500">NFT</span> stamp.
              </div>
            </StampGate>
          </CardContent>
        </Card>
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
