import { useQuery } from 'wagmi'

import { discoGetCredentialsFromDID } from '@/lib/actions/disco/get-credentials-from-did'

export const useDiscoGetProfileFromDID = (did?: string, queryKey?: any) => {
  return useQuery(['discoProfileFromDID', did, queryKey], () => discoGetCredentialsFromDID(did))
}
