import { useQuery } from 'wagmi'

import { appDiscoGetProfileFromAddress } from '@/lib/actions/disco/get-profile-from-address'

export const useDiscoGetProfileFromAddress = (address?: `0x${string}`) => {
  return useQuery(['discoProfileFromAddress', address], () => appDiscoGetProfileFromAddress(address), {
    cacheTime: 0,
  })
}
