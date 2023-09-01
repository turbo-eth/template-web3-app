"use client"

import { StampGate } from "@/integrations/gitcoin-passport/components/stamp-gate"

export default function PageIntegration() {
  return (
    <div>
      <div className="card mb-8">
        <StampGate stampId="NFT">
          <div>
            Congrats! you have the <span className="text-green-500">NFT</span>{" "}
            stamp.
          </div>
        </StampGate>
      </div>
      <div className="card">
        <StampGate stampId="SelfStakingBronze">
          <div>
            Congrats! you have the <span className="text-green-500">NFT</span>{" "}
            stamp.
          </div>
        </StampGate>
      </div>
    </div>
  )
}
