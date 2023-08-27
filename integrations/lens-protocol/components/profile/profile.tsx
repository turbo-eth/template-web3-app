import { PublicationTypes, useActiveProfile, useProfile } from '@lens-protocol/react-web'

import { LinkComponent } from '@/components/shared/link-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getProfilePictureSrc } from '../../utils'
import { IsUserAuthenticated } from '../auth/is-user-authenticated'
import { LoginButton } from '../auth/login-button'
import { NotAuthenticatedYet } from '../auth/not-authenticated-yet'
import { Feed } from '../feed'
import { Spinner } from '../spinner'
import { FollowUnfollowButton } from './follow-unfollow-button'
import { ProfileRevenue } from './profile-revenue'
import { ProfileStats } from './profile-stats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfilePublications } from './profile-publications'

export const Profile = ({ handle }: { handle: string }) => {
  const activeProfile = useActiveProfile()
  const { data: profile, loading } = useProfile({ handle, observerId: activeProfile?.data?.id ?? undefined })

  if (loading)
    return (
      <div className="w-full">
        <Spinner />
      </div>
    )
  if (!profile) return <div className="w-full text-center pt-6">Profile not found!</div>
  return (
    <div className="w-full pt-8 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
        <Avatar className="border-4 w-full max-w-[200px] h-auto rounded-xl border-gray-300">
          <AvatarImage src={getProfilePictureSrc(profile)} />
          <AvatarFallback className="text-3xl aspect-square rounded-none uppercase">{profile.handle.substring(0, 1)}</AvatarFallback>
        </Avatar>
        {profile.name && <span className="w-full mt-2 text-xl font-bold">{profile.name}</span>}
        <span className="w-full mt-2 font-semibold">@{profile.handle}</span>
        <ProfileStats profile={profile} />
        {!profile.ownedByMe && <FollowUnfollowButton profile={profile} />}
        {profile.bio && (
          <>
            <div className="mt-4 font-semibold text-xs mb-1">Bio</div>
            <div className="text-gray-600 dark:text-slate-200">{profile.bio}</div>
          </>
        )}
        <div className="mt-4 pt-4 border-t-2 w-full dark:border-neutral-800">
          <div className="font-semibold text-xs mb-1">Owned by</div>
          <span className="text-xs font-mono break-words w-full">{profile.ownedBy}</span>
          <LinkComponent className="link text-xs mt-1" href={`/integration/lens-protocol/profiles/address/${profile.ownedBy}`}>
            See all profiles
          </LinkComponent>
        </div>
        {Object.keys(profile.attributes).length > 0 && (
          <div className="mt-4 pt-4 border-t-2 w-full dark:border-neutral-800">
            {Object.entries(profile.attributes).map(([key, attribute]) => (
              <div key={key} className="mb-2 text-xs">
                <span>{key}:</span>
                <span className="text-xs font-semibold font-mono break-words w-full ml-2">{attribute.toString()}</span>
              </div>
            ))}
          </div>
        )}
        <ProfileRevenue profileId={profile.id} />
      </div>
      <div className="w-full md:w-3/4 p-6">
      <Tabs defaultValue="feed">
      <div className="flex justify-center">
        <TabsList className="dark:bg-neutral-800">
          <TabsTrigger value="feed" className="dark:data-[state=active]:bg-neutral-900">Feed</TabsTrigger>
          <TabsTrigger value="posts" className="dark:data-[state=active]:bg-neutral-900">Posts</TabsTrigger>
          <TabsTrigger value="replies" className="dark:data-[state=active]:bg-neutral-900">Replies</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="feed" className="dark:border-neutral-700">
        <IsUserAuthenticated>
          <Feed profileId={profile.id} />
        </IsUserAuthenticated>
        <NotAuthenticatedYet>
          <div className="mb-2">You need to login to see the profile feed.</div>
          <LoginButton />
        </NotAuthenticatedYet>
      </TabsContent>
      <TabsContent value="posts" className="dark:border-neutral-700">
        <ProfilePublications profileId={profile.id} publicationTypes={[PublicationTypes.Post, PublicationTypes.Mirror]} title="Posts"/>
      </TabsContent>
      <TabsContent value="replies" className="dark:border-neutral-700">
        <ProfilePublications profileId={profile.id} publicationTypes={[PublicationTypes.Comment]}  title="Replies"/>
      </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
