"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { ScoreGate } from "@/integrations/gitcoin-passport/components/score-gate"

export default function PageIntegration() {
  return (
    <>
      <IsWalletConnected>
        <div>
          <Card className=" mb-8">
            <CardContent className="pt-6">
              <CardTitle className="mb-6">
                This card has a score gate, which its contents will only be
                visible if you have submitted a passport with +10 score
              </CardTitle>
              <ScoreGate score={10}>
                <div>Congrats! your passport score is above 10!</div>
              </ScoreGate>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <CardTitle className="mb-6">
                This card has a score gate, which its contents will only be
                visible if you have submitted a passport with +30 score
              </CardTitle>
              <ScoreGate score={30}>
                <div>Congrats! your passport score is above 30, WOW!</div>
              </ScoreGate>
            </CardContent>
          </Card>
        </div>
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
