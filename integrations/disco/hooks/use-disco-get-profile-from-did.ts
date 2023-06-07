import { useQuery } from 'wagmi'

import { appDiscoGetCredentialsFromDID } from '@/integrations/disco/routes/get-credentials-from-did/client'

export const useDiscoGetProfileFromDID = (did?: string, queryKey?: any) => {
  return useQuery(['discoProfileFromDID', did, queryKey], () => appDiscoGetCredentialsFromDID(did))
}
