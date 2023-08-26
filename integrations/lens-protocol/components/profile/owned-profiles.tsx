import { useActiveProfile, useActiveProfileSwitch, useProfilesOwnedByMe } from '@lens-protocol/react-web'
import Image from 'next/image'

import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { LinkComponent } from '@/components/shared/link-component'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { turboIntegrations } from '@/data/turbo-integrations'

import { IsUserAuthenticated } from '../auth/is-user-authenticated'
import { LoginButton } from '../auth/login-button'
import { NotAuthenticatedYet } from '../auth/not-authenticated-yet'
import { Spinner } from '../spinner'
import { ProfileCard } from './profile-card'

export const OwnedProfiles = () => {
  const {
    data: profiles,
    loading,
    hasMore,
    next,
  } = useProfilesOwnedByMe({
    limit: 10,
  })
  const { data: activeProfile } = useActiveProfile()
  const { execute: switchActiveProfile, isPending } = useActiveProfileSwitch()
  return (
    <div className="w-full flex flex-col">
      <h2 className="my-4 text-lg font-semibold">Owned Profiles</h2>
      <IsUserAuthenticated>
        <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 md:grid-cols-2">
          {profiles?.map((profile) => {
            const isProfileSelected = profile.id === activeProfile?.id
            return (
              <div key={profile.handle}>
                <ProfileCard
                  profile={profile}
                  cta={
                    <div className="flex flex-row mt-4">
                      <button
                        className={isProfileSelected ? 'btn btn-primary text-sm' : 'btn btn-blue text-sm'}
                        disabled={isProfileSelected || isPending}
                        onClick={() => switchActiveProfile(profile.id)}>
                        {isProfileSelected ? 'Current Profile' : 'Use Profile'}
                      </button>
                      <LinkComponent className="btn ml-4 text-sm" href={`/integration/lens-protocol/profiles/${profile.handle}`}>
                        View
                      </LinkComponent>
                    </div>
                  }
                />
              </div>
            )
          })}
          <LinkComponent isExternal className="card flex flex-col items-center text-center justify-center" href="https://testnet.lenster.xyz/">
            <Avatar>
              <AvatarFallback>+</AvatarFallback>
            </Avatar>
            <span className="link mt-2">Create a new profile on testnet</span>
          </LinkComponent>
          <LinkComponent isExternal className="card flex flex-col items-center text-center justify-center" href="https://claim.lens.xyz/">
            <IsLightTheme>
              <Image alt="Lens Protocol logo" height={30} src={turboIntegrations.lensProtocol.imgDark} width={50} />
            </IsLightTheme>
            <IsDarkTheme>
              <Image alt="Lens Protocol logo" height={30} src={turboIntegrations.lensProtocol.imgLight} width={50} />
            </IsDarkTheme>
            <span className="link mt-2">Claim a new handle on Lens</span>
            <span className="text-xs mt-1">Comming soon...</span>
          </LinkComponent>
        </div>
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
      </IsUserAuthenticated>
      <NotAuthenticatedYet>
        <div className="w-auto">
          <div className="mb-2">You need to login first to be able to see your profiles.</div>
          <LoginButton />
        </div>
      </NotAuthenticatedYet>
    </div>
  )
}
