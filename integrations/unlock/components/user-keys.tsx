'use client'

import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import { UserKeysQueryQuery } from '@/.graphclient'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import KeyPreview from './key-preview'

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
          {userKeys.keys.map((key) => (
            <div key={key.id}>
              <KeyPreview lockName={key.lock.name} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Keys Found</p>
      )}
    </div>
  )
}
