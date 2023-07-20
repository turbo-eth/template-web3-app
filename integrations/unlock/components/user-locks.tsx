'use client'

import { useEffect, useState } from 'react'

import { UserLocksQueryQuery } from '@/.graphclient'
import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import LockPreview from './lock-preview'

export default function UserLocks() {
  const [userLocks, setUserLocks] = useState<UserLocksQueryQuery>()
  const { getUserLocks } = useUnlockSubgraph()

  useEffect(() => {
    async function fetchUserLocks() {
      const locks = await getUserLocks()
      setUserLocks(locks)
    }
    fetchUserLocks()
  }, [UserLocks])

  return (
    <div>
      {userLocks ? (
        <div>
          {userLocks.locks.map((lock) => (
            <LockPreview key={lock.address} lockId={lock.id} lockName={lock.name} />
          ))}
        </div>
      ) : (
        <p>No Locks Found</p>
      )}
    </div>
  )
}
