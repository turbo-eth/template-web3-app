import type { Address } from "viem"

export interface Caveat {
  enforcer: Address
  terms: `0x${string}`
}

export interface Delegation {
  delegate: Address
  authority: `0x${string}`
  caveats: Caveat[]
}

export interface SignedDelegation {
  delegation: Delegation
  signature: `0x${string}`
}

export interface Transaction {
  to: Address
  gasLimit: bigint
  data: `0x${string}`
}

export interface Invocation {
  transaction: Transaction
  authority: SignedDelegation[]
}

export interface ReplayProtection {
  nonce: bigint
  queue: bigint
}

export interface Invocations {
  batch: Invocation[]
  replayProtection: ReplayProtection
}

export interface SignedInvocation {
  invocations: Invocations
  signature: `0x${string}`
}

export interface PermitSignature {
  v: number
  r: `0x${string}`
  s: `0x${string}`
}

export const EIP712_DELEGATABLE_TYPES = {
  Delegation: [
    { name: "delegate", type: "address" },
    { name: "authority", type: "bytes32" },
    { name: "caveats", type: "Caveat[]" },
  ],
  Caveat: [
    { name: "enforcer", type: "address" },
    { name: "terms", type: "bytes" },
  ],
  SignedDelegation: [
    { name: "delegation", type: "Delegation" },
    { name: "signature", type: "bytes" },
  ],
  Transaction: [
    { name: "to", type: "address" },
    { name: "gasLimit", type: "uint256" },
    { name: "data", type: "bytes" },
  ],
  Invocation: [
    { name: "transaction", type: "Transaction" },
    { name: "authority", type: "SignedDelegation[]" },
  ],
  ReplayProtection: [
    { name: "nonce", type: "uint256" },
    { name: "queue", type: "uint256" },
  ],
  Invocations: [
    { name: "batch", type: "Invocation[]" },
    { name: "replayProtection", type: "ReplayProtection" },
  ],
  SignedInvocation: [
    { name: "invocations", type: "Invocations" },
    { name: "signature", type: "bytes" },
  ],
} as const

export const EIP712_PERMIT_TYPES = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const
