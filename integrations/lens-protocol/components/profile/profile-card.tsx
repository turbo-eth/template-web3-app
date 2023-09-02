import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Profile } from "@lens-protocol/react-web"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { getProfilePictureSrc } from "../../utils"
import { FollowUnfollowButton } from "./follow-unfollow-button"

export const ProfileCard = ({
  profile,
  onClick,
  cta,
}: {
  profile: Profile
  onClick?: () => void
  cta?: ReactNode
}) => {
  const router = useRouter()
  return (
    <Card
      className="flex cursor-pointer flex-col items-center justify-center text-center hover:bg-gray-100 hover:dark:bg-neutral-900"
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick()
        else
          router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
      }}
    >
      <CardContent className="flex flex-col items-center pt-8">
        <Avatar>
          <AvatarImage src={getProfilePictureSrc(profile)} />
          <AvatarFallback className="uppercase">
            {profile.handle.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        <span className="link mt-2 w-full truncate font-semibold">
          @{profile.handle}
        </span>
        <span className="my-2 w-full truncate text-xs">
          {profile.name ?? profile.handle}
        </span>
        <div className="mb-2 flex flex-row justify-between space-x-4">
          <span className="text-xs">
            <span className="mr-1">{profile.stats.totalFollowers}</span>
            <span className="text-gray-500">Followers</span>
          </span>
          <span className="text-xs">
            <span className="mr-1">{profile.stats.totalFollowing}</span>
            <span className="text-gray-500">Followings</span>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <FollowUnfollowButton profile={profile} />
        {cta && cta}
      </CardFooter>
    </Card>
  )
}
