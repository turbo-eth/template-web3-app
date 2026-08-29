import { useState } from "react"
import { parseSignature, type Address } from "viem"
import { useAccount, useSignTypedData } from "wagmi"
import { StoredSubscription } from "../database"
import { useDelegatableSubscriptions } from "./use-delegatable-subscriptions"
import { DELEGATABLE_SUBSCRIPTION_DEFAULTS } from "../utils/constants"
import { createSubscriptionDelegation } from "../utils/create-delegation"
import { createPermitTypedData } from "../utils/create-permit"

export interface StartSubscriptionArgs {
  tokenAddress: Address
  tokenName: string
  verifyingContract: Address
  enforcer?: Address
  delegate: Address
  subAmount: string
  subPeriod: number
  totalSubscriptionAmount: string
  deadlineDays?: number
  salt?: number
}

export function useStartSubscription() {
  const { address: userAddress, chain } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()
  const { addSubscription } = useDelegatableSubscriptions()

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<
    "idle" | "signing_permit" | "signing_delegation" | "saving" | "success"
  >("idle")
  const [error, setError] = useState<string | null>(null)

  const startSubscription = async (
    args: StartSubscriptionArgs
  ): Promise<StoredSubscription> => {
    if (!userAddress) {
      throw new Error("Wallet not connected")
    }

    const chainId = chain?.id || 1
    const enforcer =
      args.enforcer || DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_ENFORCER_ADDRESS
    const salt = args.salt ?? 1
    const deadlineDays =
      args.deadlineDays || DELEGATABLE_SUBSCRIPTION_DEFAULTS.DEFAULT_DEADLINE_DAYS
    const deadlineTimestamp = BigInt(
      Math.floor(Date.now() / 1000) + deadlineDays * 86400
    )

    try {
      setIsLoading(true)
      setError(null)

      // Step 1: Sign Permit (EIP-2612)
      setStep("signing_permit")
      const totalAmountBigInt = BigInt(args.totalSubscriptionAmount)

      const permitData = createPermitTypedData({
        tokenAddress: args.tokenAddress,
        tokenName: args.tokenName,
        chainId,
        owner: userAddress,
        spender: args.verifyingContract,
        value: totalAmountBigInt,
        nonce: 0n,
        deadline: deadlineTimestamp,
      })

      const permitSigRaw = await signTypedDataAsync({
        domain: permitData.domain,
        types: permitData.types,
        primaryType: permitData.primaryType,
        message: permitData.message,
      })

      const parsedPermitSig = parseSignature(permitSigRaw)
      const permitSignature = {
        v: Number(parsedPermitSig.v ?? 27n),
        r: parsedPermitSig.r,
        s: parsedPermitSig.s,
      }

      // Step 2: Sign Delegatable Delegation
      setStep("signing_delegation")
      const delegationData = createSubscriptionDelegation({
        delegate: args.delegate,
        verifyingContract: args.verifyingContract,
        enforcer,
        contractName: DELEGATABLE_SUBSCRIPTION_DEFAULTS.CONTRACT_NAME,
        chainId,
        salt,
      })

      const delegationSigRaw = await signTypedDataAsync({
        domain: delegationData.domain,
        types: delegationData.types,
        primaryType: delegationData.primaryType,
        message: delegationData.message,
      })

      // Step 3: Save to Database
      setStep("saving")
      const subscriptionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

      const storedSubscription: StoredSubscription = {
        id: subscriptionId,
        subscriber: userAddress,
        delegate: args.delegate,
        verifyingContract: args.verifyingContract,
        enforcer,
        tokenAddress: args.tokenAddress,
        tokenName: args.tokenName,
        subAmount: args.subAmount,
        subPeriod: args.subPeriod,
        totalSubscriptionAmount: args.totalSubscriptionAmount,
        deadline: deadlineTimestamp.toString(),
        signedDelegation: {
          delegation: delegationData.delegation,
          signature: delegationSigRaw,
        },
        permitSignature,
        salt,
        chainId,
        status: "active",
        createdAt: Date.now(),
        executionCount: 0,
      }

      await addSubscription(storedSubscription)
      setStep("success")
      return storedSubscription
    } catch (err: any) {
      const message = err?.message || "Failed to start subscription"
      setError(message)
      setStep("idle")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    startSubscription,
    isLoading,
    step,
    error,
    reset: () => {
      setStep("idle")
      setError(null)
      setIsLoading(false)
    },
  }
}
