"use client"

import { AddressProfiles } from "@/integrations/lens-protocol/components/profile/address-profiles"

export default function PageIntegration({
  params,
}: {
  params: { address: string }
}) {
  return <AddressProfiles address={params.address} />
}
