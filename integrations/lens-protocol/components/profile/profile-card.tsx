import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Profile } from "@lens-protocol/react-web"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { getProfilePictureSrc } from "../../utils"
import { FollowUnfollowButton } from "./follow-unfollow-button"

export const ProfileCard = ({
  profile,
  onClick,
  cta,
}: {
  profile: Profile | null
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
        else if (profile)
          router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
      }}
    >
      <CardContent className="flex w-full flex-col items-center pt-8">
        {profile ? (
          <Avatar>
            <AvatarImage src={getProfilePictureSrc(profile)} />
            <AvatarFallback className="uppercase">
              {profile.handle.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="h-10 w-10 rounded-full" />
        )}
        {profile ? (
          <span className="mt-2 block w-full truncate font-semibold">
            @{profile.handle}
          </span>
        ) : (
          <Skeleton className="mt-2 h-4 w-20" />
        )}
        {profile ? (
          <span className="my-2 block w-full truncate text-center text-xs">
            {profile.name ?? profile.handle}
          </span>
        ) : (
          <Skeleton className="my-2 h-3 w-16" />
        )}
        <div className="flex flex-row justify-between space-x-4">
          {profile ? (
            <span className="flex flex-row items-center text-xs">
              <span className="mr-1">{profile.stats.totalFollowers}</span>
              <span className="text-gray-500">Followers</span>
            </span>
          ) : (
            <Skeleton className="h-3 w-20" />
          )}
          {profile ? (
            <span className="flex flex-row items-center text-xs">
              <span className="mr-1">{profile.stats.totalFollowing}</span>
              <span className="text-gray-500">Followings</span>
            </span>
          ) : (
            <Skeleton className="h-3 w-20" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        {profile ? (
          <FollowUnfollowButton profile={profile} />
        ) : (
          <Skeleton className="h-8 w-20" />
        )}
        {cta && cta}
      </CardFooter>
    </Card>
  )
}
