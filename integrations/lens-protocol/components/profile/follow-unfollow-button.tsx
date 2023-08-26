import { useEffect } from 'react'

import { FollowPolicyType, Profile, ProfileOwnedByMe, useActiveProfile, useFollow, useUnfollow } from '@lens-protocol/react-web'

import { useToast } from '@/lib/hooks/use-toast'

const UnauthorizedFollowButton = () => {
  const { toast, dismiss } = useToast()
  const showErrorToast = () => {
    toast({
      title: 'You need to login first.',
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }
  return (
    <button
      className="btn btn-emerald text-sm"
      onClick={(e) => {
        e.stopPropagation()
        showErrorToast()
      }}>
      Follow
    </button>
  )
}

const AuthorizedFollowUnfollowButton = ({ profile, activeProfile }: { profile: Profile; activeProfile: ProfileOwnedByMe }) => {
  const { execute: follow, error, isPending: followLoading } = useFollow({ follower: activeProfile, followee: profile })
  const { execute: unfollow, isPending: unfollowLoading } = useUnfollow({ follower: activeProfile, followee: profile })
  const { toast, dismiss } = useToast()

  useEffect(() => {
    if (error) showErrorToast(String(error))
  }, [error])

  const showErrorToast = (error: string) => {
    toast({
      title: 'Operation failed',
      description: error,
    })

    setTimeout(() => {
      dismiss()
    }, 10000)
  }
  if (profile.isFollowedByMe)
    return (
      <button
        className="btn btn-primary text-sm"
        disabled={unfollowLoading}
        onClick={(e) => {
          e.stopPropagation()
          unfollow().catch(console.error)
        }}>
        Unfollow
      </button>
    )
  return (
    <button
      className="btn btn-emerald text-sm"
      disabled={followLoading || !profile.followStatus?.canFollow}
      onClick={(e) => {
        e.stopPropagation()
        if (profile.followPolicy.type === FollowPolicyType.ANYONE) follow().catch(console.error)
      }}>
      Follow
    </button>
  )
}

export const FollowUnfollowButton = ({ profile }: { profile: Profile }) => {
  const { data: activeProfile } = useActiveProfile()
  if (!activeProfile) return <UnauthorizedFollowButton />
  if (profile.ownedByMe) return null
  return <AuthorizedFollowUnfollowButton activeProfile={activeProfile} profile={profile} />
}
