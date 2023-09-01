"use client"

import { ScoreGate } from "@/integrations/gitcoin-passport/components/score-gate"

export default function PageIntegration() {
  return (
    <div>
      <div className="card mb-8">
        <ScoreGate score={10}>
          <div className="">Congrats! your passport score is above 10!</div>
        </ScoreGate>
      </div>
      <div className="card">
        <ScoreGate score={20}>
          <div className="">
            Congrats! your passport score is above 20, WOW!
          </div>
        </ScoreGate>
      </div>
    </div>
  )
}
