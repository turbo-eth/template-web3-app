'use client'

import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import { UserKeysQueryQuery } from '@/.graphclient'
import { useState, useEffect } from 'react'

export default function UserKeys() {
  const [userKeys, setUserKeys] = useState<UserKeysQueryQuery | undefined>(undefined)
  const { getUserKeys } = useUnlockSubgraph()

  useEffect(() => {
    async function fetchUserKeys() {
      const keys = await getUserKeys()
      setUserKeys(keys)
    }
    fetchUserKeys()
  }, [UserKeys])

  return (
    <div>
      {userKeys ? (
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