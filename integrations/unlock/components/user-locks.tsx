'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { UserLocksQueryDocument, UserLocksQueryQuery, execute } from '@/.graphclient'

import LockPreview from './lock-preview'

export default function UserLocks() {
  const [userLocks, setUserLocks] = useState<UserLocksQueryQuery>()
  const { address } = useAccount()

  useEffect(() => {
    const variables = { user: address }
    execute(UserLocksQueryDocument, variables).then((result) => {
      console.log(UserLocksQueryDocument)
      console.log(result?.data)
      setUserLocks(result?.data)
    })
  }, [UserLocks])

  return (
    <div>
      {userLocks ? (
        <div>
          <p>locks found</p>
          {userLocks.locks.map((lock) => (
            <LockPreview key={lock.address} lockName={lock.name} />
          ))}
        </div>
      ) : (
        <p>No Locks</p>
      )}
    </div>
  )
}
