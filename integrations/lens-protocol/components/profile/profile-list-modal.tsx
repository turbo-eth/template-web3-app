import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Profile } from "@lens-protocol/react-web"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

import { getProfilePictureSrc } from "../../utils"
import { LoadMoreButton } from "../load-more-button"
import { FollowUnfollowButton } from "./follow-unfollow-button"

const ProfileRow = ({ profile }: { profile: Profile | null }) => {
  const router = useRouter()

  return (
    <div className="flex h-[70px] flex-row items-center justify-between">
      <div
        className="flex w-auto cursor-pointer flex-row"
        onClick={(e) => {
          e.stopPropagation()
          if (profile)
            router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
        }}
      >
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
        <div className="ml-2 flex w-auto flex-col">
          {profile ? (
            <span className="mb-1 font-semibold">
              {profile.name ?? profile.handle}
            </span>
          ) : (
            <Skeleton className="mb-1 h-4 w-20" />
          )}
          {profile ? (
            <span className="text-sm text-blue-600 dark:text-gray-300">
              @{profile.handle}
            </span>
          ) : (
            <Skeleton className="h-3 w-16" />
          )}
        </div>
      </div>
      {profile ? (
        <FollowUnfollowButton profile={profile} />
      ) : (
        <Skeleton className="h-8 w-24" />
      )}
    </div>
  )
}

export const ProfileListModal = ({
  profiles,
  trigger,
  hasMore,
  loading,
  title,
  next,
}: {
  profiles: Profile[]
  trigger: ReactNode
  hasMore: boolean
  loading: boolean
  title: string
  next: () => void
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-left">{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">{title}</h2>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-scroll">
          {profiles?.map((profile) => (
            <ProfileRow key={profile.handle} profile={profile} />
          ))}
          {loading &&
            Array(4)
              .fill(0)
              .map((_, index) => <ProfileRow key={index} profile={null} />)}
          <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
          {!loading && profiles?.length === 0 && (
            <span>This list is empty.</span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
