import { useActiveProfile, useExploreProfiles } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { ProfileCard } from './profile-card'
import { Spinner } from '../spinner'

export const ExploreProfiles = () => {
  const profile = useActiveProfile()
  const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useExploreProfiles({
    limit: 10,
    observerId: profile?.data?.id ?? undefined,
  })
  const router = useRouter()
  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="my-4 text-lg font-semibold">Profiles</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {profiles?.map((profile) => (
            <ProfileCard
              key={profile.handle}
              profile={profile}
              onClick={() => router.push(`/integration/lens-protocol/profiles/${profile.handle}`)}
            />
          ))}
        </div>
        {hasMore && (
          <button className="btn btn-primary m-auto mt-4 mb-6 w-auto" disabled={loading} onClick={() => next()}>
            Load more
          </button>
        )}
        {loading && (
          <div className="my-6 w-full text-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  )
}
