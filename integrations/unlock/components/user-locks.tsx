'use client'

import { useEffect, useState } from 'react'

import { UserLocksQueryQuery } from '@/.graphclient'
import useUnlockSubgraph from '../hooks/use-unlock-subgraph'
import LockPreview from './lock-preview'
import { useAccount, useNetwork } from 'wagmi'

export default function UserLocks() {
  const [userLocks, setUserLocks] = useState<UserLocksQueryQuery>()
  const { getUserLocks } = useUnlockSubgraph()
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    async function fetchUserLocks() {
      const locks = await getUserLocks()
      setUserLocks(locks)
    }
    fetchUserLocks()
  }, [address, chain])

  return (
    <div>
      {userLocks && userLocks?.locks.length > 0 ? (
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
