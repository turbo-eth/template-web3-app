"use client"

import { PublicationId } from "@lens-protocol/react-web"

import { Publication } from "@/integrations/lens-protocol/components/publications/publication"

export default function PageIntegration({
  params,
}: {
  params: { id: string }
}) {
  return <Publication publicationId={params.id as PublicationId} />
}
