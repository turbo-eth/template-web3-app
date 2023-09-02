"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScoreGate } from "@/integrations/gitcoin-passport/components/score-gate"

export default function PageIntegration() {
  return (
    <div>
      <Card className=" mb-8">
        <CardContent className="pt-6">
          <ScoreGate score={10}>
            <div>Congrats! your passport score is above 10!</div>
          </ScoreGate>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <ScoreGate score={20}>
            <div>Congrats! your passport score is above 20, WOW!</div>
          </ScoreGate>
        </CardContent>
      </Card>
    </div>
  )
}
