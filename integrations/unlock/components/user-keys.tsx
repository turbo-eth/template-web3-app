/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client"

import { useEffect, useState } from "react"
import { UserKeysQueryQuery } from "@/.graphclient"
import { useAccount, useNetwork } from "wagmi"

import useUnlockSubgraph from "../hooks/use-unlock-subgraph"
import KeyPreview from "./key-preview"

export default function UserKeys() {
  const [userKeys, setUserKeys] = useState<UserKeysQueryQuery | undefined>(
    undefined
  )
  const { getUserKeys } = useUnlockSubgraph()
  const { address } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    async function fetchUserKeys() {
      const keys = await getUserKeys()
      console.log(keys)
      setUserKeys(keys)
    }
    void fetchUserKeys()
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
