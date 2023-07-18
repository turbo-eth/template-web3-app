'use client'

import ProfileSection from '@/integrations/lens-protocol/components/ProfileSection'
import withLensProvider from '@/integrations/lens-protocol/Layout'

interface Params {
  handle: string
}

interface PublicationPageProps {
  params: Params
}

function ProfilePage({ params: { handle } }: PublicationPageProps) {
  return <ProfileSection handle={handle} />
}
export default withLensProvider(ProfilePage)
