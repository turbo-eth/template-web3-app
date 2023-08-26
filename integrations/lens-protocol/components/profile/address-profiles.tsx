import { useActiveProfile, useProfilesOwnedBy } from '@lens-protocol/react-web'

import { Spinner } from '../spinner'
import { ProfileCard } from './profile-card'

export const AddressProfiles = ({ address }: { address: string }) => {
  const { data: activeProfile } = useActiveProfile()
  const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useProfilesOwnedBy({
    limit: 10,
    address,
    observerId: activeProfile?.id,
  })
  return (
    <div className="w-full flex flex-col">
      <h2 className="my-4 text-lg font-semibold">
        <span className="font-mono mr-2">{address}</span>Profiles
      </h2>
      <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 md:grid-cols-2">
        {profiles?.map((profile) => {
          return (
            <div key={profile.handle}>
              <ProfileCard profile={profile} />
            </div>
          )
        })}
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
