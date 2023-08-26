import { useActiveProfile, useSearchProfiles } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { Spinner } from '../spinner'
import { ProfileCard } from './profile-card'

export const SearchProfiles = ({ query }: { query: string }) => {
  const profile = useActiveProfile()
  const { data: profiles, loading, hasMore, next } = useSearchProfiles({ query, limit: 10, observerId: profile?.data?.id ?? undefined })
  const router = useRouter()
  return (
    <div className="w-full flex flex-col">
      <h2 className="my-4 text-lg font-semibold">Profiles</h2>
      <div className="grid lg:grid-cols-6 gap-4 grid-cols-1 md:grid-cols-2">
        {profiles?.map((profile) => (
          <ProfileCard key={profile.handle} profile={profile} onClick={() => router.push(`/integration/lens-protocol/profiles/${profile.handle}`)} />
        ))}
      </div>
      {hasMore && (
        <button className="btn btn-primary mt-4 w-auto mb-6 m-auto" disabled={loading} onClick={() => next()}>
          Load more
        </button>
      )}
      {loading && (
        <div className="text-center w-full my-6">
          <Spinner />
        </div>
      )}
    </div>
  )
}
