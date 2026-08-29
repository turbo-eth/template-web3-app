"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { LuBan, LuCheck, LuLoader2, LuTrash2, LuXCircle } from "react-icons/lu"

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
import { useToast } from "@/components/ui/use-toast"
import { useDelegatableSubscriptions } from "../hooks/use-delegatable-subscriptions"
import { useRevokeSubscription } from "../hooks/use-revoke-subscription"
import { StoredSubscription } from "../database"

export function FormDelegatableSubscriptionRevoke() {
  const { isConnected, address } = useAccount()
  const { toast } = useToast()
  const { subscriptions, deleteSubscription } = useDelegatableSubscriptions()
  const { revokeSubscription, isLoading } = useRevokeSubscription()

  const [selectedSubId, setSelectedSubId] = useState<string | null>(null)
  const [onChainCancel, setOnChainCancel] = useState<boolean>(false)

  const userSubscriptions = (subscriptions || []).filter(
    (sub) =>
      !address || sub.subscriber.toLowerCase() === address.toLowerCase()
  )

  const handleRevoke = async (subscription: StoredSubscription) => {
    try {
      setSelectedSubId(subscription.id)
      await revokeSubscription(subscription, { onChain: onChainCancel })
      toast({
        title: "Subscription Revoked",
        description: `Successfully revoked delegation for ${subscription.tokenName || "Subscription"}.`,
      })
    } catch (err: any) {
      toast({
        title: "Revocation Failed",
        description: err?.message || "Failed to revoke subscription",
        variant: "destructive",
      })
    } finally {
      setSelectedSubId(null)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscription(id)
      toast({
        title: "Subscription Removed",
        description: "Deleted subscription entry from local database.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to delete subscription",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <LuBan className="h-5 w-5 text-rose-500" />
          Revoke / End Subscription
        </CardTitle>
        <CardDescription>
          Cancel active subscription delegations on-chain through the enforcer
          contract or manage stored delegations.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {userSubscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <LuXCircle className="mb-2 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm">No stored subscriptions found.</p>
            <p className="text-xs">
              Start a subscription to view and manage active delegations.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {userSubscriptions.map((sub) => {
              const isSelected = selectedSubId === sub.id
              const isCanceled = sub.status === "canceled"

              return (
                <div
                  key={sub.id}
                  className={`flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center ${
                    isCanceled ? "bg-muted/40 opacity-75" : "bg-card"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {sub.tokenName} Subscription
                      </span>
                      <Badge
                        variant={isCanceled ? "secondary" : "default"}
                        className={
                          !isCanceled
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : ""
                        }
                      >
                        {sub.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Salt #{sub.salt}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Rate: {sub.subAmount} {sub.tokenName} every {sub.subPeriod}
                      s (Total: {sub.totalSubscriptionAmount})
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      Contract: {sub.verifyingContract}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCanceled && (
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isLoading || !isConnected}
                        onClick={() => handleRevoke(sub)}
                      >
                        {isSelected && isLoading ? (
                          <>
                            <LuLoader2 className="mr-1 h-3 w-3 animate-spin" />
                            Revoking...
                          </>
                        ) : (
                          <>
                            <LuBan className="mr-1 h-3 w-3" />
                            Revoke Delegation
                          </>
                        )}
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(sub.id)}
                      title="Remove from DB"
                    >
                      <LuTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
        <span>
          Enforcer:{" "}
          <code className="text-[11px]">DistrictERC20PermitSubscriptionsEnforcer</code>
        </span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={onChainCancel}
            onChange={(e) => setOnChainCancel(e.target.checked)}
            className="rounded border-gray-300"
          />
          Submit on-chain cancel tx
        </label>
      </CardFooter>
    </Card>
  )
}
