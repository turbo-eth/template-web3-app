import { useQuery } from 'wagmi'

import { discoGetCredentialsFromDID } from '@/integrations/disco/routes/get-credentials-from-did'

export const useDiscoGetProfileFromDID = (did?: string, queryKey?: any) => {
  return useQuery(['discoProfileFromDID', did, queryKey], () => discoGetCredentialsFromDID(did))
}
