import {
  Profile,
  useActiveProfile,
  useProfileFollowers,
  useProfileFollowing,
} from "@lens-protocol/react-web"

import { ProfileListModal } from "./profile-list-modal"

export const ProfileStats = ({ profile }: { profile: Profile }) => {
  const { data: activeProfile } = useActiveProfile()
  const {
    data: followers,
    loading: followersLoading,
    hasMore: followersHasMore,
    next: followersNext,
  } = useProfileFollowers({
    profileId: profile.id,
    observerId: activeProfile?.id,
    limit: 10,
  })
  const {
    data: followings,
    loading: followingsLoading,
    hasMore: followingsHasMore,
    next: followingsNext,
  } = useProfileFollowing({
    walletAddress: profile.ownedBy,
    observerId: activeProfile?.id,
    limit: 10,
  })
  return (
    <div className="my-6 flex w-full flex-row items-center justify-center space-x-4 md:justify-start">
      <ProfileListModal
        hasMore={followersHasMore}
        loading={followersLoading}
        next={followersNext}
        profiles={
          followers?.flatMap((follower) =>
            follower.wallet.defaultProfile
              ? [follower.wallet.defaultProfile]
              : []
          ) ?? []
        }
        title="Followers"
        trigger={
          <span className="text-xs">
            <span className="mr-1">{profile.stats.totalFollowers}</span>
            <span className="text-gray-600 dark:text-gray-500">Followers</span>
          </span>
        }
      />
      <ProfileListModal
        hasMore={followingsHasMore}
        loading={followingsLoading}
        next={followingsNext}
        profiles={followings?.map((following) => following.profile) ?? []}
        title="Followings"
        trigger={
          <span className="text-xs">
            <span className="mr-1">{profile.stats.totalFollowing}</span>
            <span className="text-gray-600 dark:text-gray-500">Followings</span>
          </span>
        }
      />
    </div>
  )
}
