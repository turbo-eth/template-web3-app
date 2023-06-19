import { discoClient } from '@/integrations/disco/disco-client'

import { Credential } from '../../utils/types'

export async function discoGetCredentialsFromDID(did?: string) {
  if (!did) {
    return null
  }
  const { data }: { data: Credential[] } = await discoClient.get(`/profile/${did}/credentials`)
  return data
}
