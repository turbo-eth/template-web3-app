import Dexie, { Table } from "dexie"
import type { Address } from "viem"
import type { PermitSignature, SignedDelegation } from "./utils/types"

export interface StoredSubscription {
  id: string
  subscriber: Address
  delegate: Address
  verifyingContract: Address
  enforcer: Address
  tokenAddress: Address
  tokenName: string
  subAmount: string
  subPeriod: number
  totalSubscriptionAmount: string
  deadline: string
  signedDelegation: SignedDelegation
  permitSignature: PermitSignature
  salt: number
  chainId: number
  status: "active" | "canceled" | "executed"
  createdAt: number
  lastExecutedAt?: number
  executionCount?: number
}

/**
 * Dexie IndexedDB client-side database for storing gas-less Delegatable subscriptions.
 */
export class DelegatableSubscriptionDB extends Dexie {
  subscriptions!: Table<StoredSubscription>

  constructor() {
    super("delegatableSubscriptionDB")
    this.version(1).stores({
      subscriptions: "id, subscriber, delegate, verifyingContract, status, createdAt, chainId",
    })
  }
}

export const db = new DelegatableSubscriptionDB()
