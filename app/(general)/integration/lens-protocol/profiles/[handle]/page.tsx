"use client"

import { Profile } from "@/integrations/lens-protocol/components/profile/profile"

export default function PageIntegration({
  params,
}: {
  params: { handle: string }
}) {
  return <Profile handle={params.handle} />
}
