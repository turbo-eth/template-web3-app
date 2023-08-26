import { ReactNode } from 'react'

import { Profile } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'

import { getProfilePictureSrc } from '../../utils'
import { Spinner } from '../spinner'
import { FollowUnfollowButton } from './follow-unfollow-button'

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
  const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">{title}</h2>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-scroll">
          {profiles?.map((profile) => (
            <div key={profile.handle} className="flex flex-row justify-between items-center h-[70px]">
              <div
                className="w-auto flex flex-row cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
                }}>
                <Avatar>
                  <AvatarImage src={getProfilePictureSrc(profile)} />
                  <AvatarFallback className="uppercase">{profile.handle.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-2 w-auto">
                  <span className="mb-1 font-semibold">{profile.name ?? profile.handle}</span>
                  <span className="text-blue-600 dark:text-gray-300 text-sm">@{profile.handle}</span>
                </div>
              </div>
              <FollowUnfollowButton profile={profile} />
            </div>
          ))}
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
          {profiles.length === 0 && <span>This list is empty.</span>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
