'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { UserKeysQueryDocument, UserKeysQueryQuery, execute } from '@/.graphclient'

import LockPreview from './lock-preview'

export default function UserLocks() {
  const [userKeys, setUserKeys] = useState<UserKeysQueryQuery>()
  const { address } = useAccount()

  useEffect(() => {
    const variables = { user: address }
    execute(UserKeysQueryDocument, variables).then((result) => {
      console.log(result?.data)
      setUserKeys(result?.data)
    })
  }, [UserLocks])

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