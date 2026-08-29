import { encodeFunctionData, type Address } from "viem"
import { verifyingContractERC20PermitSubscriptionsABI } from "../abis/verifying-contract-erc20-permit-subscriptions-abi"
import {
  EIP712_DELEGATABLE_TYPES,
  type Invocations,
  type PermitSignature,
  type SignedDelegation,
} from "./types"

export interface CreateSubscriptionInvocationParams {
  verifyingContract: Address
  subscriber: Address
  totalSubscriptionAmount: bigint
  deadline: bigint
  permitSignature: PermitSignature
  signedDelegation: SignedDelegation
  chainId: number
  contractName?: string
  nonce?: bigint
  queue?: bigint
  includeApproval?: boolean
  gasLimit?: bigint
}

export function createSubscriptionInvocation({
  verifyingContract,
  subscriber,
  totalSubscriptionAmount,
  deadline,
  permitSignature,
  signedDelegation,
  chainId,
  contractName = "ERC20PermitSubscriptions",
  nonce = 1n,
  queue = 0n,
  includeApproval = true,
  gasLimit = 210000000000000000n,
}: CreateSubscriptionInvocationParams) {
  const paySubscriptionData = encodeFunctionData({
    abi: verifyingContractERC20PermitSubscriptionsABI,
    functionName: "paySubscription",
  })

  const batch: Invocations["batch"] = []

  if (includeApproval) {
    const approveSubscriptionData = encodeFunctionData({
      abi: verifyingContractERC20PermitSubscriptionsABI,
      functionName: "approveSubscription",
      args: [
        subscriber,
        totalSubscriptionAmount,
        deadline,
        permitSignature.v,
        permitSignature.r,
        permitSignature.s,
      ],
    })

    batch.push({
      authority: [],
      transaction: {
        to: verifyingContract,
        gasLimit: gasLimit.toString(),
        data: approveSubscriptionData,
      },
    })
  }

  batch.push({
    authority: [signedDelegation],
    transaction: {
      to: verifyingContract,
      gasLimit: gasLimit.toString(),
      data: paySubscriptionData,
    },
  })

  const invocations: Invocations = {
    replayProtection: {
      nonce: nonce.toString(),
      queue: queue.toString(),
    },
    batch,
  }

  const domain = {
    name: contractName,
    version: "1",
    chainId: BigInt(chainId),
    verifyingContract,
  } as const

  const types = {
    Invocations: EIP712_DELEGATABLE_TYPES.Invocations,
    Invocation: EIP712_DELEGATABLE_TYPES.Invocation,
    Transaction: EIP712_DELEGATABLE_TYPES.Transaction,
    SignedDelegation: EIP712_DELEGATABLE_TYPES.SignedDelegation,
    Delegation: EIP712_DELEGATABLE_TYPES.Delegation,
    Caveat: EIP712_DELEGATABLE_TYPES.Caveat,
    ReplayProtection: EIP712_DELEGATABLE_TYPES.ReplayProtection,
  } as const

  return {
    invocations,
    domain,
    types,
    primaryType: "Invocations" as const,
    message: invocations,
  }
}
