"use client"

import { ExploreProfiles } from "@/integrations/lens-protocol/components/profile/explore-profiles"
import { ExplorePublications } from "@/integrations/lens-protocol/components/publications/explore-publications"

export default function PageIntegration() {
  return (
    <>
      <ExploreProfiles />
      <ExplorePublications />
    </>
  )
}
