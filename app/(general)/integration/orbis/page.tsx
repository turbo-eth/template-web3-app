'use client'

import { Discussion } from '@orbisclub/components'

import '@orbisclub/components/dist/index.modern.css'
import { useEffect, useState } from 'react'

import { Orbis } from '@orbisclub/orbis-sdk'
import { useAccount } from 'wagmi'

import { content } from '@/tailwind.config'

/** Import Orbis SDK */

/** Initialize the Orbis class object */
let orbis = new Orbis()

const Connect = (props) => {
  /** The user object */
  const [user, setUser] = useState()

  const [credentials, setCredentials] = useState()

  /** Calls the Orbis SDK and handle the results */
  async function connect() {
    let res = await orbis.connect()

    /** Check if connection is successful or not */
    if (res.status == 200) {
      setUser(res.did)
    } else {
      console.log('Error connecting to Ceramic: ', res)
      alert('Error connecting to Ceramic.')
    }
  }

  useEffect(() => {
    if (!credentials) {
      ;(async () => {
        let { data, error } = await orbis.getCredentials(user)
        setCredentials(data)
        console.log(data, error)
      })()
    }
  }, [user])

  return (
    <div className="">
      <div>{user ? <p>Connected with: {user}</p> : <button onClick={() => connect()}>Connect</button>}</div>
      <button className="rounded-lg bg-purple-500 p-4">button</button>
      {/* <Discussion context="kjzl6cwe1jw14bisozx249bjt26nyiz1326ani4s8gnfklj0fbedyy8avb06tld:" /> */}
      {/* {credentials &&
        credentials.length > 0 &&
        credentials.map((credential) => {
          return (
            <div className="card" key={credential?.content?.credentialSubject?.id}>
              <p>Issuer: {credential?.content?.issuer.id}</p>
              <p>Issuer: {credential?.content?.credentialSubject.name}</p>
              <p>Issuer: {credential?.content?.credentialSubject.type}</p>
              <p>Issuer: {credential?.content?.credentialSubject.network}</p>
            </div>
          )
        })} */}
    </div>
  )
}

export default function PageApplication() {
  const { address } = useAccount()

  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center">
        <Connect />
      </div>
    </>
  )
}

/**
 * {
    "stream_id": "kjzl6cwe1jw147ja3vulgcitlxbm5ak8f316o5dg5u8b167yrqlsnj7kezkb5nc",
    "issuer": "did:key:z6mkfglpulq7vvxu93xrh1mlgha5fmutcgmuwkz1vuwt3qju",
    "subject_id": "did:pkh:eip155:1:0xafe82df169ee7843ee0ca4c2f6ae47fc689c718d",
    "content": {
        "issuer": {
            "id": "did:key:z6MkfGLpuLq7vVXU93xRH1mLghA5FmutCGmUWKZ1VuwT3QJu",
            "name": "Orbis Protocol"
        },
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "issuanceDate": "1677697990",
        "credentialSubject": {
            "id": "did:pkh:eip155:1:0xafe82df169ee7843ee0ca4c2f6ae47fc689c718d",
            "name": "Polygon",
            "type": "active-wallet-polygon",
            "network": "EVM",
            "protocol": "nonces",
            "description": "Has performed transactions on Polygon."
        }
    },
    "provider": null,
    "created_at": "2023-03-01T19:13:10.330759+00:00",
    "timestamp": 1677697990,
    "creator": "did:key:z6MkfGLpuLq7vVXU93xRH1mLghA5FmutCGmUWKZ1VuwT3QJu",
    "family": "orbis",
    "hash": null,
    "weight": 10,
    "identifier": "orbis-active-wallet-polygon"
}
 */
