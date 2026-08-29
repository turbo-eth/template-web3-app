import { useState } from "react"
import { encodeAbiParameters, keccak256, toHex, type Address } from "viem"
import { useAccount, useWriteContract } from "wagmi"

import { districtERC20PermitSubscriptionsEnforcerABI } from "../abis/district-erc20-permit-subscriptions-enforcer-abi"
import { StoredSubscription } from "../database"
import { DELEGATABLE_SUBSCRIPTION_DEFAULTS } from "../utils/constants"
import { useDelegatableSubscriptions } from "./use-delegatable-subscriptions"

export function useRevokeSubscription() {
  const { chain } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { updateSubscription } = useDelegatableSubscriptions()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const revokeSubscription = async (
    subscription: StoredSubscription,
    options?: { onChain?: boolean }
  ) => {
    try {
      setIsLoading(true)
      setError(null)

      if (options?.onChain) {
        const chainId = subscription.chainId || chain?.id || 1

        // EIP712 Domain Hash calculation for Delegatable verifying contract
        const domainTypeHash = keccak256(
          toHex(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
          )
        )
        const nameHash = keccak256(
          toHex(DELEGATABLE_SUBSCRIPTION_DEFAULTS.CONTRACT_NAME)
        )
        const versionHash = keccak256(
          toHex(DELEGATABLE_SUBSCRIPTION_DEFAULTS.CONTRACT_VERSION)
        )

        const domainHash = keccak256(
          encodeAbiParameters(
            [
              { type: "bytes32" },
              { type: "bytes32" },
              { type: "bytes32" },
              { type: "uint256" },
              { type: "address" },
            ],
            [
              domainTypeHash,
              nameHash,
              versionHash,
              BigInt(chainId),
              subscription.verifyingContract,
            ]
          )
        )

        const hash = await writeContractAsync({
          address: subscription.enforcer,
          abi: districtERC20PermitSubscriptionsEnforcerABI,
          functionName: "cancelSubscription",
          args: [
            {
              delegation: {
                delegate: subscription.signedDelegation.delegation.delegate,
                authority: subscription.signedDelegation.delegation.authority,
                caveats: subscription.signedDelegation.delegation.caveats.map(
                  (c) => ({
                    enforcer: c.enforcer,
                    terms: c.terms,
                  })
                ),
              },
              signature: subscription.signedDelegation.signature,
            },
            domainHash,
          ],
        })

        await updateSubscription(subscription.id, {
          status: "canceled",
        })

        return hash
      } else {
        await updateSubscription(subscription.id, {
          status: "canceled",
        })
      }
    } catch (err: any) {
      const message = err?.message || "Failed to revoke subscription"
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    revokeSubscription,
    isLoading,
    error,
  }
}
