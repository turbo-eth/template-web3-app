import {
  PublicationTypes,
  useActiveProfile,
  useProfile,
} from "@lens-protocol/react-web"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkComponent } from "@/components/shared/link-component"

import { getProfilePictureSrc } from "../../utils"
import { IsUserAuthenticated } from "../auth/is-user-authenticated"
import { LoginButton } from "../auth/login-button"
import { NotAuthenticatedYet } from "../auth/not-authenticated-yet"
import { Feed } from "../feed"
import { Spinner } from "../spinner"
import { FollowUnfollowButton } from "./follow-unfollow-button"
import { ProfilePublications } from "./profile-publications"
import { ProfileRevenue } from "./profile-revenue"
import { ProfileStats } from "./profile-stats"

export const Profile = ({ handle }: { handle: string }) => {
  const activeProfile = useActiveProfile()
  const { data: profile, loading } = useProfile({
    handle,
    observerId: activeProfile?.data?.id ?? undefined,
  })

  if (loading)
    return (
      <div className="w-full">
        <Spinner />
      </div>
    )
  if (!profile)
    return <div className="w-full pt-6 text-center">Profile not found!</div>
  return (
    <div className="flex w-full flex-col pt-8 md:flex-row">
      <div className="flex w-full flex-col items-center text-center md:w-1/4 md:items-start md:text-left">
        <Avatar className="h-auto w-full max-w-[200px] rounded-xl border-4 border-gray-300">
          <AvatarImage src={getProfilePictureSrc(profile)} />
          <AvatarFallback className="aspect-square rounded-none text-3xl uppercase">
            {profile.handle.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        {profile.name && (
          <span className="mt-2 w-full text-xl font-bold">{profile.name}</span>
        )}
        <span className="mt-2 w-full font-semibold">@{profile.handle}</span>
        <ProfileStats profile={profile} />
        {!profile.ownedByMe && <FollowUnfollowButton profile={profile} />}
        {profile.bio && (
          <>
            <div className="mb-1 mt-4 text-xs font-semibold">Bio</div>
            <div className="text-gray-600 dark:text-slate-200">
              {profile.bio}
            </div>
          </>
        )}
        <div className="mt-4 w-full border-t-2 pt-4 dark:border-neutral-800">
          <div className="mb-1 text-xs font-semibold">Owned by</div>
          <span className="w-full break-words font-mono text-xs">
            {profile.ownedBy}
          </span>
          <LinkComponent
            className="link mt-1 block text-xs"
            href={`/integration/lens-protocol/profiles/address/${profile.ownedBy}`}
          >
            See all profiles
          </LinkComponent>
        </div>
        {Object.keys(profile.attributes).length > 0 && (
          <div className="mt-4 w-full border-t-2 pt-4 dark:border-neutral-800">
            {Object.entries(profile.attributes).map(([key, attribute]) => (
              <div key={key} className="mb-2 text-xs">
                <span>{key}:</span>
                <span className="ml-2 w-full break-words font-mono text-xs font-semibold">
                  {attribute.toString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <ProfileRevenue profileId={profile.id} />
      </div>
      <div className="w-full p-6 md:w-3/4">
        <Tabs defaultValue="feed">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="feed">
            <IsUserAuthenticated>
              <Feed profileId={profile.id} />
            </IsUserAuthenticated>
            <NotAuthenticatedYet>
              <div className="mb-2">
                You need to login to see the profile feed.
              </div>
              <LoginButton />
            </NotAuthenticatedYet>
          </TabsContent>
          <TabsContent value="posts">
            <ProfilePublications
              profileId={profile.id}
              publicationTypes={[
                PublicationTypes.Post,
                PublicationTypes.Mirror,
              ]}
              title="Posts"
            />
          </TabsContent>
          <TabsContent value="replies">
            <ProfilePublications
              profileId={profile.id}
              publicationTypes={[PublicationTypes.Comment]}
              title="Replies"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
