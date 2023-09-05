/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  execute,
  LockStatsQueryDocument,
  UserKeysQueryDocument,
  UserLocksQueryDocument,
} from "@/.graphclient"
import { networks } from "@unlock-protocol/networks"
import { useAccount, useNetwork } from "wagmi"

const getEndpoint = (id: number) => {
  switch (id) {
    case 1:
      return "mainnet-v2"
    case 5:
      return "goerli-v2"
    case 80001:
      return "goerli-v2"
    default:
      return "goerli-v2"
  }
}

export default function useUnlockSubgraph() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  // prevent hook from running if wallet is not connected
  if (!address || !chain?.id) throw new Error("Wallet not connected")

  // prevent hook from running if chain is not supported
  const networkConfig = networks[chain.id]
  if (!networkConfig) throw new Error("Unsupported Chain")

  const unlockNetworkEndpoint = getEndpoint(chain.id)

  async function getUserKeys() {
    const variables = { user: address }
    const result = await execute(UserKeysQueryDocument, variables, {
      network: unlockNetworkEndpoint,
    })
    return result?.data
  }

  async function getUserLocks() {
    const variables = { user: address }
    const result = await execute(UserLocksQueryDocument, variables, {
      network: unlockNetworkEndpoint,
    })
    return result?.data
  }

  async function getLockStats({ lockId }: { lockId: string }) {
    const variables = { lockId: lockId }
    const result = await execute(LockStatsQueryDocument, variables, {
      network: unlockNetworkEndpoint,
    })
    return result?.data
  }

  return { getUserKeys, getUserLocks, getLockStats }
}
