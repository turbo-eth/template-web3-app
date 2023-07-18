import { Profile } from '@lens-protocol/react-web'
import Publications from './Publications'
import { ProfileCard } from './ProfileCard'
import { ProfilePublicationRevenue } from './ProfilePublicationRevenue'
import SearchProfile from './SearchProfile'
import SearchPublication from './SearchPublication'
import Explore from './ExploreProfiles'
import ProfileSwitcher from './ProfileSwitcher'

type LensSectionProps = {
  profile: Profile
}

export function LensSection({ profile }: LensSectionProps) {
  return (
    <>
      <ProfileCard profile={profile} />
      <ProfileSwitcher />
      <Publications profile={profile} />
      <ProfilePublicationRevenue profileId={profile?.id} />
      <Explore />
      <SearchProfile />
      <SearchPublication />
    </>
  )
}
