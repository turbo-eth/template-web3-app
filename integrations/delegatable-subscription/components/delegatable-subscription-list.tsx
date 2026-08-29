"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import {
  LuClock,
  LuHistory,
  LuLoader2,
  LuPlay,
  LuRefreshCw,
  LuShieldCheck,
} from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useDelegatableSubscriptions } from "../hooks/use-delegatable-subscriptions"
import { useExecuteSubscription } from "../hooks/use-execute-subscription"
import { StoredSubscription } from "../database"

export function DelegatableSubscriptionList() {
  const { isConnected } = useAccount()
  const { toast } = useToast()
  const { subscriptions, activeSubscriptions } =
    useDelegatableSubscriptions()
  const { executeSubscription, isLoading } = useExecuteSubscription()

  const [executingId, setExecutingId] = useState<string | null>(null)

  const handleExecute = async (sub: StoredSubscription) => {
    try {
      setExecutingId(sub.id)
      const tx = await executeSubscription(sub)
      toast({
        title: "Subscription Payment Executed!",
        description: `Triggered payment via Delegatable invoke. Tx: ${tx ? String(tx).substring(0, 10) + "..." : "Success"}`,
      })
    } catch (err: any) {
      toast({
        title: "Execution Error",
        description: err?.message || "Failed to execute subscription payment",
        variant: "destructive",
      })
    } finally {
      setExecutingId(null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <LuHistory className="h-5 w-5 text-blue-500" />
          Subscription Execution Queue
        </CardTitle>
        <CardDescription>
          Active gas-less subscriptions ready for execution via Delegatable
          meta-transactions.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {(!subscriptions || subscriptions.length === 0) ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No subscriptions stored yet. Start a new subscription above to begin.
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map((sub) => {
              const isExecuting = executingId === sub.id
              const isDue =
                sub.status === "active" &&
                (!sub.lastExecutedAt ||
                  Date.now() - sub.lastExecutedAt >= sub.subPeriod * 1000)

              return (
                <div
                  key={sub.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {sub.tokenName}
                      </span>
                      <Badge
                        variant={sub.status === "active" ? "default" : "secondary"}
                        className={
                          sub.status === "active"
                            ? isDue
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-blue-600 hover:bg-blue-700"
                            : ""
                        }
                      >
                        {sub.status === "active"
                          ? isDue
                            ? "PAYMENT DUE"
                            : "ACTIVE"
                          : sub.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Executed: {sub.executionCount || 0} times
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <LuClock className="h-3 w-3" /> Interval: {sub.subPeriod}s
                      </span>
                      <span>Amount: {sub.subAmount} {sub.tokenName}</span>
                      <span>
                        Subscriber:{" "}
                        <code className="text-[11px]">
                          {sub.subscriber.substring(0, 6)}...
                          {sub.subscriber.substring(sub.subscriber.length - 4)}
                        </code>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {sub.status === "active" && (
                      <Button
                        size="sm"
                        variant={isDue ? "default" : "outline"}
                        disabled={isLoading || !isConnected}
                        onClick={() => handleExecute(sub)}
                      >
                        {isExecuting && isLoading ? (
                          <>
                            <LuLoader2 className="mr-1 h-3 w-3 animate-spin" />
                            Executing...
                          </>
                        ) : (
                          <>
                            <LuPlay className="mr-1 h-3 w-3" />
                            Execute Payment
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
