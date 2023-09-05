import { GraphQLResponse } from 'graphql-request/build/esm/types'
import { useAccount, useNetwork } from 'wagmi'

import { LockStatsQueryDocument, UserKeysQueryDocument, UserLocksQueryDocument, execute } from '@/.graphclient'

const getEndpoint = (id: number | undefined) => {
  switch (id) {
    case 1:
      return 'mainnet-v2'
    case 5:
      return 'goerli-v2'
    case 80001:
      return 'mumbai-v2'
    default:
      return 'goerli-v2'
  }
}

export default function useUnlockSubgraph() {
  const { address } = useAccount()
  const { chain } = useNetwork()

  let unlockNetworkEndpoint = getEndpoint(5) // default to goerli
  if (chain) {
    unlockNetworkEndpoint = getEndpoint(chain.id)
  }

  async function getUserKeys() {
    const variables = { user: address }
    const result: GraphQLResponse = await execute(UserKeysQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result.data
  }

  async function getUserLocks() {
    const variables = { user: address }
    const result: GraphQLResponse = await execute(UserLocksQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result?.data
  }

  async function getLockStats({ lockId }: { lockId: string }) {
    const variables = { lockId: lockId }
    const result: GraphQLResponse = await execute(LockStatsQueryDocument, variables, { network: unlockNetworkEndpoint })
    return result?.data
  }

  return { getUserKeys, getUserLocks, getLockStats }
}
