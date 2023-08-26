import { ReactNode } from 'react'

import { Profile } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getProfilePictureSrc } from '../../utils'
import { FollowUnfollowButton } from './follow-unfollow-button'

export const ProfileCard = ({ profile, onClick, cta }: { profile: Profile; onClick?: () => void; cta?: ReactNode }) => {
  const router = useRouter()
  return (
    <div
      className="card cursor-pointer flex flex-col items-center text-center justify-center dark:bg-neutral-800 hover:bg-gray-100 hover:dark:bg-neutral-900"
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick()
        else router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
      }}>
      <Avatar>
        <AvatarImage src={getProfilePictureSrc(profile)} />
        <AvatarFallback className="uppercase">{profile.handle.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <span className="link w-full mt-2 font-semibold truncate">@{profile.handle}</span>
      <span className="w-full my-2 text-xs truncate">{profile.name ?? profile.handle}</span>
      <div className="flex-row flex justify-between space-x-4 mb-2">
        <span className="text-xs">
          <span className="mr-1">{profile.stats.totalFollowers}</span>
          <span className="text-gray-500">Followers</span>
        </span>
        <span className="text-xs">
          <span className="mr-1">{profile.stats.totalFollowing}</span>
          <span className="text-gray-500">Followings</span>
        </span>
      </div>
      <FollowUnfollowButton profile={profile} />
      {cta && cta}
    </div>
  )
}
