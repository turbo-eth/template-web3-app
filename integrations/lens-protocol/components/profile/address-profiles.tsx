import { useActiveProfile, useProfilesOwnedBy } from "@lens-protocol/react-web"

import { LoadMoreButton } from "../load-more-button"
import { Spinner } from "../spinner"
import { ProfileCard } from "./profile-card"

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
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-lg font-semibold">
        <span className="mr-2 font-mono">{address}</span>Profiles
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {profiles?.map((profile) => {
          return (
            <div key={profile.handle}>
              <ProfileCard profile={profile} />
            </div>
          )
        })}
      </div>
      <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      {loading && (
        <div className="my-6 w-full text-center">
          <Spinner />
        </div>
      )}
    </div>
  )
}
