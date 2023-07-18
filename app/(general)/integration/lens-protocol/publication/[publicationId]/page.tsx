'use client'

import PublicationSection from '@/integrations/lens-protocol/components/PublicationSection'
import withLensProvider from '@/integrations/lens-protocol/Layout'
import { PublicationId } from '@lens-protocol/react-web'

interface Params {
  publicationId: PublicationId
}

interface PublicationPageProps {
  params: Params
}

function PublicationPage({ params: { publicationId } }: PublicationPageProps) {
  return <PublicationSection publicationId={publicationId} />
}
export default withLensProvider(PublicationPage)
