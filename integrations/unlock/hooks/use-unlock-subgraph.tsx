import { useAccount, useNetwork } from 'wagmi'
import { networks } from '@unlock-protocol/networks'
import { useEffect, useState } from 'react'

import { UserKeysQueryDocument, UserLocksQueryDocument, execute } from '@/.graphclient'

const endpoints = {
  80001: {
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/unlock-protocol/mumbai-v2',
  },
}

export default function useUnlockSubgraph() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  // prevent hook from running if wallet is not connected
  if (!address || !chain?.id) throw new Error('Wallet not connected')

  // prevent hook from running if chain is not supported
  const networkConfig = networks[chain.id]
  if (!networkConfig) throw new Error('Unsupported Chain')

  async function getUserKeys() {
    const variables = { user: address }
    const result = await execute(UserKeysQueryDocument, variables, {
      config: {
        endpoint: endpoints[chain.id].subgraphUrl,
      },
    })
    return result?.data
  }

  async function getUserLocks() {
    const variables = { user: address }
    const result = await execute(UserLocksQueryDocument, variables, {
      config: {
        endpoint: endpoints[chain.id].subgraphUrl,
      },
    })
    return result?.data
  }

  return { getUserKeys, getUserLocks }
}