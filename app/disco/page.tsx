'use client'

import { useAccount } from 'wagmi'

import DiscoProfileBasic from '@/components/disco/disco-profile-basic'
import DiscoProfileCredentials from '@/components/disco/disco-profile-credentials'

export default function PageApplication() {
  const { address } = useAccount()
  return (
    <>
      <section className="flex flex-col gap-y-10">
        <div className="card container max-w-screen-xl">
          <h3 className="text-4xl font-bold">Disco Profile</h3>
          <hr className="my-4" />
          <DiscoProfileBasic address={address} />
        </div>
        <div className="card container max-w-screen-xl">
          <h3 className="text-4xl font-bold">Disco Verifiable Credentials</h3>
          <hr className="my-4" />
          <DiscoProfileCredentials address={address} />
        </div>
      </section>
    </>
  )
}
