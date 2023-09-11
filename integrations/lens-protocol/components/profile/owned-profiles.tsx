import { turboIntegrations } from "@/data/turbo-integrations"
import {
  useActiveProfile,
  useActiveProfileSwitch,
  useProfilesOwnedByMe,
} from "@lens-protocol/react-web"
import { FaExternalLinkAlt } from "react-icons/fa"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LightDarkImage } from "@/components/shared/light-dark-image"
import { LinkComponent } from "@/components/shared/link-component"

import { useCreateTestProfile } from "../../hooks/use-create-profile"
import { IsUserAuthenticated } from "../auth/is-user-authenticated"
import { LoginButton } from "../auth/login-button"
import { NotAuthenticatedYet } from "../auth/not-authenticated-yet"
import { LoadMoreButton } from "../load-more-button"
import { ProfileCard } from "./profile-card"

export const OwnedProfiles = () => {
  const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useProfilesOwnedByMe({
    limit: 10,
  })
  const {
    onSubmit,
    handle,
    error,
    setHandle,
    isPending: isCreating,
  } = useCreateTestProfile()
  const { data: activeProfile } = useActiveProfile()
  const { execute: switchActiveProfile, isPending } = useActiveProfileSwitch()
  return (
    <div className="flex w-full flex-col">
      <h2 className="my-4 text-lg font-semibold">Owned Profiles</h2>
      <IsUserAuthenticated>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {profiles
            ?.filter(
              (profile, index, arr) =>
                arr.findIndex((p) => p.handle === profile.handle) === index
            )
            .map((profile) => {
              const isProfileSelected = profile.id === activeProfile?.id
              return (
                <ProfileCard
                  key={profile.handle}
                  profile={profile}
                  cta={
                    <div className="flex flex-row items-center">
                      <Button
                        variant={isProfileSelected ? "outline" : "blue"}
                        size="sm"
                        disabled={isProfileSelected || isPending}
                        onClick={(e) => {
                          e.stopPropagation()
                          switchActiveProfile(profile.id).catch(console.error)
                        }}
                      >
                        {isProfileSelected ? "Current Profile" : "Use Profile"}
                      </Button>
                      <LinkComponent
                        className="ml-4 text-sm"
                        href={`/integration/lens-protocol/profiles/${profile.handle}`}
                      >
                        View
                      </LinkComponent>
                    </div>
                  }
                />
              )
            })}
          {loading &&
            Array(4)
              .fill(0)
              .map((_, index) => <ProfileCard key={index} profile={null} />)}
          <Card className="px-2 py-6">
            <div className="flex h-full flex-1 flex-col items-center justify-center text-center">
              <Avatar>
                <AvatarFallback>+</AvatarFallback>
              </Avatar>
              <div className="mt-2 flex flex-col items-center space-y-2">
                <h2 className="text-sm font-semibold">
                  Create a new profile on testnet
                </h2>
                <form onSubmit={onSubmit}>
                  <Input
                    className="mb-2"
                    placeholder="Handle"
                    value={handle ?? ""}
                    onChange={(e) => setHandle(e.target.value)}
                  />
                  {error && (
                    <div className="mb-2 text-xs text-red-600 dark:text-red-400">
                      {String(error)}
                    </div>
                  )}
                  <Button variant="emerald" disabled={isCreating}>
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <LinkComponent
              isExternal
              className="flex h-full flex-1 flex-col items-center justify-center text-center"
              href="https://claim.lens.xyz/"
            >
              <LightDarkImage
                alt="Lens Protocol logo"
                height={30}
                LightImage={turboIntegrations.lensProtocol.imgDark}
                DarkImage={turboIntegrations.lensProtocol.imgLight}
                width={50}
              />
              <div className="mt-2 flex items-center space-x-1">
                <span>Claim a new handle on Lens</span>
                <FaExternalLinkAlt fontSize={10} />
              </div>
              <span className="mt-1 text-xs">Join the waitlist</span>
            </LinkComponent>
          </Card>
        </div>
        <LoadMoreButton hasMore={hasMore} loading={loading} onClick={next} />
      </IsUserAuthenticated>
      <NotAuthenticatedYet>
        <div className="w-auto">
          <div className="mb-2">
            You need to login first to be able to see your profiles.
          </div>
          <LoginButton />
        </div>
      </NotAuthenticatedYet>
    </div>
  )
}
