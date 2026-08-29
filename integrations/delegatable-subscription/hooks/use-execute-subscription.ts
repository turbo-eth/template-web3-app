import { useState } from "react"
import { useAccount, useSignTypedData, useWriteContract } from "wagmi"

import { delegatableABI } from "../abis/delegatable-abi"
import { StoredSubscription } from "../database"
import { createSubscriptionInvocation } from "../utils/create-invocation"
import { useDelegatableSubscriptions } from "./use-delegatable-subscriptions"

export function useExecuteSubscription() {
  const { address: userAddress, chain } = useAccount()
  const { signTypedDataAsync } = useSignTypedData()
  const { writeContractAsync } = useWriteContract()
  const { updateSubscription } = useDelegatableSubscriptions()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeSubscription = async (subscription: StoredSubscription) => {
    if (!userAddress) {
      throw new Error("Wallet not connected")
    }

    try {
      setIsLoading(true)
      setError(null)

      const chainId = subscription.chainId || chain?.id || 1
      const isFirstExecution = !subscription.lastExecutedAt

      const invocationData = createSubscriptionInvocation({
        verifyingContract: subscription.verifyingContract,
        subscriber: subscription.subscriber,
        totalSubscriptionAmount: BigInt(subscription.totalSubscriptionAmount),
        deadline: BigInt(subscription.deadline),
        permitSignature: subscription.permitSignature,
        signedDelegation: subscription.signedDelegation,
        chainId,
        includeApproval: isFirstExecution,
      })

      // Sign the invocation with delegate / relayer key
      const invocationSig = await signTypedDataAsync({
        domain: invocationData.domain,
        types: invocationData.types,
        primaryType: invocationData.primaryType,
        message: invocationData.message,
      })

      const signedInvocations = [
        {
          invocations: {
            batch: invocationData.invocations.batch.map((b) => ({
              transaction: {
                to: b.transaction.to,
                gasLimit: BigInt(b.transaction.gasLimit),
                data: b.transaction.data,
              },
              authority: b.authority.map((a) => ({
                delegation: {
                  delegate: a.delegation.delegate,
                  authority: a.delegation.authority,
                  caveats: a.delegation.caveats.map((c) => ({
                    enforcer: c.enforcer,
                    terms: c.terms,
                  })),
                },
                signature: a.signature,
              })),
            })),
            replayProtection: {
              nonce: BigInt(invocationData.invocations.replayProtection.nonce),
              queue: BigInt(invocationData.invocations.replayProtection.queue),
            },
          },
          signature: invocationSig,
        },
      ]

      const txHash = await writeContractAsync({
        address: subscription.verifyingContract,
        abi: delegatableABI,
        functionName: "invoke",
        args: [signedInvocations as any],
      })

      await updateSubscription(subscription.id, {
        lastExecutedAt: Date.now(),
        executionCount: (subscription.executionCount || 0) + 1,
      })

      return txHash
    } catch (err: any) {
      const message = err?.message || "Failed to execute subscription"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    executeSubscription,
    isLoading,
    error,
  }
}
