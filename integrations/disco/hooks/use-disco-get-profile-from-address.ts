import { useQuery } from '@tanstack/react-query'

import { appDiscoGetProfileFromAddress } from '@/integrations/disco/routes/get-profile-from-address/client'

export const useDiscoGetProfileFromAddress = (address?: `0x${string}`, queryKey?: any) => {
  return useQuery(['discoProfileFromAddress', address, queryKey], async () => appDiscoGetProfileFromAddress(address))
}
