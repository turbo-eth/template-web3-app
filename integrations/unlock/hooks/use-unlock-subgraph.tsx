import { useAccount, useNetwork } from 'wagmi'
import { networks } from '@unlock-protocol/networks'
import { useEffect, useState } from 'react'

import { UserKeysQueryDocument, UserLocksQueryDocument, LockStatsQueryDocument, execute } from '@/.graphclient'

const endpoints = {
  1: 'mainnet-v2',
  5: 'goerli-v2',
  80001: 'mumbai-v2',
}

export default function useUnlockSubgraph() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  // prevent hook from running if wallet is not connected
  if (!address || !chain?.id) throw new Error('Wallet not connected')

  // prevent hook from running if chain is not supported
  const networkConfig = networks[chain.id]
  if (!networkConfig) throw new Error('Unsupported Chain')

  const unlockNetworkEndpoint = endpoints[chain?.id]

  async function getUserKeys() {
    const variables = { user: address }
    const result = await execute(UserKeysQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result?.data
  }

  async function getUserLocks() {
    const variables = { user: address }
    const result = await execute(UserLocksQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result?.data
  }

  async function getLockStats({ lockId }: { lockId: string }) {
    const variables = { lockId: lockId }
    const result = await execute(LockStatsQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result?.data
  }

  return { getUserKeys, getUserLocks, getLockStats }
}