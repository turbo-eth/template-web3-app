'use client'

import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import { UserKeysQueryQuery } from '@/.graphclient'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'

export default function UserKeys() {
  const [userKeys, setUserKeys] = useState<UserKeysQueryQuery | undefined>(undefined)
  const { getUserKeys } = useUnlockSubgraph()
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    async function fetchUserKeys() {
      const keys = await getUserKeys()
      console.log(keys)
      setUserKeys(keys)
    }
    fetchUserKeys()
  }, [address, chain])

  return (
    <div>
      {userKeys && userKeys?.keys.length > 0 ? (
        <div>
          <p>Keys Found</p>
          {userKeys.keys.map((key) => (
            <p key={key.id}>{key.lock.id}</p> 
          ))}
        </div>
      ) : (
        <p>No Keys Found</p>
      )}
    </div>
  )
}