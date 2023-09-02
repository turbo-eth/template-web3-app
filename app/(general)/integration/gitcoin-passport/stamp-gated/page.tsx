"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StampGate } from "@/integrations/gitcoin-passport/components/stamp-gate"

export default function PageIntegration() {
  return (
    <div>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <StampGate stampId="NFT">
            Congrats! you have the <span className="text-green-500">NFT</span>{" "}
            stamp.
          </StampGate>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <StampGate stampId="SelfStakingBronze">
            <div>
              Congrats! you have the <span className="text-green-500">NFT</span>{" "}
              stamp.
            </div>
          </StampGate>
        </CardContent>
      </Card>
    </div>
  )
}
