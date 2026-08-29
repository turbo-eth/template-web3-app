"use client"

import { useState } from "react"
import { LuCheckCircle2, LuClock, LuLoader2, LuPlayCircle, LuServer } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DelegatableSubscriptionCronStatus() {
  const [isRunning, setIsRunning] = useState(false)
  const [cronResult, setCronResult] = useState<any>(null)

  const handleTriggerCron = async () => {
    try {
      setIsRunning(true)
      const res = await fetch("/api/delegatable/cron", {
        method: "POST",
      })
      const data = await res.json()
      setCronResult(data)
    } catch (err: any) {
      setCronResult({ error: err?.message || "Failed to trigger cron" })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <LuServer className="h-5 w-5 text-indigo-500" />
          Vercel 30-Minute Cron Job Relayer
        </CardTitle>
        <CardDescription>
          Automated serverless background execution for valid Delegatable
          subscription batches.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Schedule
            </span>
            <div className="flex items-center gap-2 font-mono text-sm">
              <LuClock className="h-4 w-4 text-emerald-500" />
              <span>*/30 * * * * (Every 30 mins)</span>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase">
              Route Target
            </span>
            <div className="font-mono text-sm truncate">
              <code>/api/delegatable/cron</code>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Relayer Status:</span>
            <Badge variant="outline" className="border-emerald-500 text-emerald-500">
              STANDBY / READY
            </Badge>
          </div>
          <p className="text-muted-foreground">
            The cron job scans pending subscriptions, checks interval constraints
            with <code>DistrictERC20PermitSubscriptionsEnforcer.lastTimestamp</code>,
            and broadcasts invocation transactions on behalf of delegates.
          </p>
        </div>

        {cronResult && (
          <div className="rounded-lg border bg-card p-3 space-y-1">
            <span className="text-xs font-semibold">Execution Output:</span>
            <pre className="overflow-x-auto text-[11px] font-mono text-muted-foreground">
              {JSON.stringify(cronResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end border-t pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={isRunning}
          onClick={handleTriggerCron}
        >
          {isRunning ? (
            <>
              <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Cron...
            </>
          ) : (
            <>
              <LuPlayCircle className="mr-2 h-4 w-4" />
              Test Trigger Cron
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
