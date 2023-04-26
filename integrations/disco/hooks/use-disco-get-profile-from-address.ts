import { useQuery } from '@tanstack/react-query'
import error from 'next/error'

import { appDiscoGetProfileFromAddress } from '@/integrations/disco/routes/get-profile-from-address'

export const useDiscoGetProfileFromAddress = (address?: `0x${string}`, queryKey?: any) => {
  return useQuery(['discoProfileFromAddress', address, queryKey], async () => appDiscoGetProfileFromAddress(address))
}
