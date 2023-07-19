'use client'

import { useEffect, useState } from 'react'

import { UserLocksQueryDocument, UserLocksQueryQuery, execute } from '@/.graphclient'

import LockPreview from './lock-preview'

export default function UserLocks() {
  const [userLocks, setUserLocks] = useState<UserLocksQueryQuery>()

  useEffect(() => {
    execute(UserLocksQueryDocument, {}).then((result) => {
      console.log(result?.data)
      setUserLocks(result?.data)
    })
  }, [UserLocks])

  return (
    <div>
      {userLocks ? (
        <div>
          <p>locks found</p>
          <LockPreview lockAddress="test" lockName="test" />
          {userLocks.locks.map((lock) => (
            <LockPreview key={lock.address} lockAddress={lock.address} lockName={lock.name} />
          ))}
        </div>
      ) : (
        <p>No Locks</p>
      )}
    </div>
  )
}
