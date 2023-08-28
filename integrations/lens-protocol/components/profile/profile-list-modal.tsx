import { ReactNode } from 'react'

import { Profile } from '@lens-protocol/react-web'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'

import { FollowUnfollowButton } from './follow-unfollow-button'
import { getProfilePictureSrc } from '../../utils'
import { Spinner } from '../spinner'

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
            <div key={profile.handle} className="flex h-[70px] flex-row items-center justify-between">
              <div
                className="flex w-auto cursor-pointer flex-row"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/integration/lens-protocol/profiles/${profile.handle}`)
                }}>
                <Avatar>
                  <AvatarImage src={getProfilePictureSrc(profile)} />
                  <AvatarFallback className="uppercase">{profile.handle.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 flex w-auto flex-col">
                  <span className="mb-1 font-semibold">{profile.name ?? profile.handle}</span>
                  <span className="text-sm text-blue-600 dark:text-gray-300">@{profile.handle}</span>
                </div>
              </div>
              <FollowUnfollowButton profile={profile} />
            </div>
          ))}
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
          {!loading && profiles?.length === 0 && <span>This list is empty.</span>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
