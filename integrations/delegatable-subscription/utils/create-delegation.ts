import type { Address } from "viem"
import { encodeSubscriptionTerms } from "./create-terms"
import { EIP712_DELEGATABLE_TYPES, type Caveat, type Delegation } from "./types"

export interface CreateDelegationParams {
  delegate: Address
  verifyingContract: Address
  enforcer: Address
  contractName?: string
  chainId: number
  salt?: number
  authority?: `0x${string}`
}

export function createSubscriptionDelegation({
  delegate,
  verifyingContract,
  enforcer,
  contractName = "ERC20PermitSubscriptions",
  chainId,
  salt = 1,
  authority = "0x0000000000000000000000000000000000000000000000000000000000000000",
}: CreateDelegationParams) {
  const terms = encodeSubscriptionTerms(verifyingContract, salt)

  const caveats: Caveat[] = [
    {
      enforcer,
      terms,
    },
  ]

  const delegation: Delegation = {
    delegate,
    authority,
    caveats,
  }

  const domain = {
    name: contractName,
    version: "1",
    chainId: BigInt(chainId),
    verifyingContract,
  } as const

  const types = {
    Delegation: EIP712_DELEGATABLE_TYPES.Delegation,
    Caveat: EIP712_DELEGATABLE_TYPES.Caveat,
  } as const

  return {
    domain,
    types,
    primaryType: "Delegation" as const,
    message: delegation,
    delegation,
  }
}
