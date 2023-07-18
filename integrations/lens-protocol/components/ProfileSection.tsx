'use client'

import { useProfile } from '@lens-protocol/react-web'
import { ProfileCard } from './ProfileCard'

export default function PageIntegration({ handle = '' }) {
  const { data: profile, loading } = useProfile({ handle })

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <div className=" text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    )
  }

  return (
    <>
      {profile && !loading ? (
        <ProfileCard profile={profile} />
      ) : (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
          <div className="text-center">
            <div className="mb-5">
              <img className="m-auto" src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>

            <h1 className="my-2 text-white font-bold text-2xl">Looks like you&apos;ve found the doorway to the great nothing</h1>
            <p className="my-7 text-white">Sorry about that! Please visit our hompage to get where you need to go.</p>
          </div>
        </div>
      )}
    </>
  )
}
