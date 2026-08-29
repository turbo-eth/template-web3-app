"use client"

import { useState } from "react"
import type { Address } from "viem"
import { useAccount } from "wagmi"
import { LuCheckCircle2, LuCoins, LuLoader2, LuShieldCheck } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  DELEGATABLE_SUBSCRIPTION_DEFAULTS,
  PERIOD_PRESETS,
} from "../utils/constants"
import { useStartSubscription } from "../hooks/use-start-subscription"

export function FormDelegatableSubscriptionStart() {
  const { isConnected, address } = useAccount()
  const { toast } = useToast()
  const { startSubscription, isLoading, step, error, reset } =
    useStartSubscription()

  const [tokenAddress, setTokenAddress] = useState<string>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_TOKEN_ADDRESS
  )
  const [tokenName, setTokenName] = useState<string>("MockToken")
  const [verifyingContract, setVerifyingContract] = useState<string>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_VERIFYING_CONTRACT
  )
  const [enforcerAddress, setEnforcerAddress] = useState<string>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_ENFORCER_ADDRESS
  )
  const [delegateAddress, setDelegateAddress] = useState<string>(
    address || DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_VERIFYING_CONTRACT
  )
  const [subAmount, setSubAmount] = useState<string>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_SUB_AMOUNT
  )
  const [subPeriod, setSubPeriod] = useState<number>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_SUB_PERIOD
  )
  const [totalAmount, setTotalAmount] = useState<string>(
    DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_TOTAL_AMOUNT
  )
  const [salt, setSalt] = useState<number>(1)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Web3 wallet to start a subscription.",
        variant: "destructive",
      })
      return
    }

    try {
      const sub = await startSubscription({
        tokenAddress: tokenAddress as Address,
        tokenName,
        verifyingContract: verifyingContract as Address,
        enforcer: enforcerAddress as Address,
        delegate: (delegateAddress || address) as Address,
        subAmount,
        subPeriod,
        totalSubscriptionAmount: totalAmount,
        salt,
      })

      setIsCompleted(true)
      toast({
        title: "Subscription Activated!",
        description: `Successfully signed permit & delegation. Subscription ID: ${sub.id.substring(0, 12)}...`,
      })
    } catch (err: any) {
      toast({
        title: "Subscription Failed",
        description: err?.message || "Failed to start delegatable subscription",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setIsCompleted(false)
    reset()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <LuShieldCheck className="h-5 w-5 text-emerald-500" />
          Start Gas-less Subscription
        </CardTitle>
        <CardDescription>
          Delegate recurring ERC20 payments using EIP-712 typed signatures and
          the DistrictERC20PermitSubscriptionsEnforcer.
        </CardDescription>
      </CardHeader>

      {isCompleted ? (
        <CardContent className="space-y-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <LuCheckCircle2 className="h-12 w-12 text-emerald-500" />
            <h3 className="text-lg font-semibold">Subscription Active!</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Your gas-less subscription delegation and ERC-2612 permit have
              been signed and saved in the database. Transactions will be
              automatically executed by relayers/crons according to your terms.
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 text-xs space-y-1">
            <p>
              <strong>Verifying Contract:</strong> {verifyingContract}
            </p>
            <p>
              <strong>Token:</strong> {tokenName} ({tokenAddress})
            </p>
            <p>
              <strong>Rate:</strong> {subAmount} tokens every {subPeriod}s
            </p>
            <p>
              <strong>Max Allowance:</strong> {totalAmount} tokens
            </p>
          </div>
          <div className="flex justify-center pt-2">
            <Button onClick={handleReset} variant="outline">
              Create Another Subscription
            </Button>
          </div>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tokenAddress">Token Contract Address</Label>
                <Input
                  id="tokenAddress"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tokenName">Token Name / Symbol</Label>
                <Input
                  id="tokenName"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g. DAI / USDC"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="verifyingContract">Verifying Contract Address</Label>
                <Input
                  id="verifyingContract"
                  value={verifyingContract}
                  onChange={(e) => setVerifyingContract(e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enforcerAddress">Enforcer Address</Label>
                <Input
                  id="enforcerAddress"
                  value={enforcerAddress}
                  onChange={(e) => setEnforcerAddress(e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delegateAddress">
                Delegate Address (Executor / Payee)
              </Label>
              <Input
                id="delegateAddress"
                value={delegateAddress}
                onChange={(e) => setDelegateAddress(e.target.value)}
                placeholder="0x..."
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="subAmount">Amount per Period</Label>
                <Input
                  id="subAmount"
                  value={subAmount}
                  onChange={(e) => setSubAmount(e.target.value)}
                  placeholder="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subPeriod">Interval Period</Label>
                <Select
                  value={subPeriod.toString()}
                  onValueChange={(val) => setSubPeriod(Number(val))}
                >
                  <SelectTrigger id="subPeriod">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERIOD_PRESETS.map((preset) => (
                      <SelectItem
                        key={preset.value}
                        value={preset.value.toString()}
                      >
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Maximum Amount</Label>
                <Input
                  id="totalAmount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salt">Salt Identifier (uint8)</Label>
              <Input
                id="salt"
                type="number"
                min="1"
                max="255"
                value={salt}
                onChange={(e) => setSalt(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-xs text-destructive">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="text-xs text-muted-foreground">
              {step === "signing_permit" && (
                <span className="flex items-center gap-1 text-blue-500">
                  <LuLoader2 className="h-3 w-3 animate-spin" /> Step 1/2:
                  Signing ERC20 Permit...
                </span>
              )}
              {step === "signing_delegation" && (
                <span className="flex items-center gap-1 text-amber-500">
                  <LuLoader2 className="h-3 w-3 animate-spin" /> Step 2/2:
                  Signing Delegatable Delegation...
                </span>
              )}
              {step === "saving" && (
                <span className="flex items-center gap-1 text-emerald-500">
                  <LuLoader2 className="h-3 w-3 animate-spin" /> Storing
                  subscription...
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isConnected}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <LuCoins className="mr-2 h-4 w-4" />
                  Sign & Start Subscription
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
