import { useQuery } from 'wagmi'

import { appDiscoGetCredentialsFromDID } from '@/integrations/disco/routes/get-credentials-from-did/client'

export const useDiscoGetCredentialsFromDID = (did?: string, queryKey?: any) => {
  return useQuery(['discoCredentialsFromDID', did, queryKey], () => appDiscoGetCredentialsFromDID(did))
}
