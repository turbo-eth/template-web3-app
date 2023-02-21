import { useQuery } from 'wagmi'

import { discoGetCredentialsFromDID } from '@/lib/actions/disco/get-credentials-from-did'

export const useDiscoGetCredentialsFromDID = (did?: string) => {
  return useQuery(['discoCredentialsFromDID', did], () => discoGetCredentialsFromDID(did), {
    cacheTime: 0,
  })
}
