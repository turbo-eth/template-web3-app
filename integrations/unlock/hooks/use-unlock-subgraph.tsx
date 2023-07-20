import { useAccount, useNetwork } from 'wagmi'
import { networks } from '@unlock-protocol/networks'
import { useEffect, useState } from 'react'

import { UserKeysQueryDocument, UserLocksQueryDocument, execute } from '@/.graphclient'

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

  async function getUserKeys() {
    console.log('getting user keys')
    console.log(endpoints[chain.id].subgraphUrl)

    const variables = { user: address }
    const result = await execute(UserKeysQueryDocument, variables, { network: endpoints[chain?.id] })
    return result?.data
  }

  async function getUserLocks() {
    console.log('getting user locks')
    console.log(endpoints[chain.id].subgraphUrl)

    const variables = { user: address }
    const result = await execute(UserLocksQueryDocument, variables, { network: endpoints[chain?.id] })
    return result?.data
  }

  return { getUserKeys, getUserLocks }
}