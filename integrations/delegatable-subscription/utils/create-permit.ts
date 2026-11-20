import type { Address } from "viem"

import { EIP712_PERMIT_TYPES } from "./types"

export interface CreatePermitParams {
  tokenAddress: Address
  tokenName: string
  tokenVersion?: string
  chainId: number
  owner: Address
  spender: Address
  value: bigint
  nonce: bigint
  deadline: bigint
}

export function createPermitTypedData({
  tokenAddress,
  tokenName,
  tokenVersion = "1",
  chainId,
  owner,
  spender,
  value,
  nonce,
  deadline,
}: CreatePermitParams) {
  const domain = {
    name: tokenName,
    version: tokenVersion,
    chainId,
    verifyingContract: tokenAddress,
  } as const

  const types = {
    Permit: EIP712_PERMIT_TYPES.Permit,
  } as const

  const message = {
    owner,
    spender,
    value,
    nonce,
    deadline,
  } as const

  return {
    domain,
    types,
    primaryType: "Permit" as const,
    message,
  }
}
