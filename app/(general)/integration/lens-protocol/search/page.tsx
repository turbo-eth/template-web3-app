"use client"

import { useSearchParams } from "next/navigation"

import { SearchProfiles } from "@/integrations/lens-protocol/components/profile/search-profiles"
import { SearchPublications } from "@/integrations/lens-protocol/components/publications/search-publications"

export default function PageIntegration() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""
  return (
    <>
      <SearchProfiles query={query} />
      <SearchPublications query={query} />
    </>
  )
}
