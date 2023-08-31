import { useQuery } from "@tanstack/react-query"
import type { Address } from "wagmi"

import { appDiscoGetProfileFromAddress } from "@/integrations/disco/routes/get-profile-from-address/client"

export const useDiscoGetProfileFromAddress = (
  address?: Address,
  queryKey?: any
) => {
  return useQuery(["discoProfileFromAddress", address, queryKey], async () =>
    appDiscoGetProfileFromAddress(address)
  )
}
