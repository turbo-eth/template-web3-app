import { discoClient } from '@/integrations/disco/disco-client'

export async function discoGetCredentialsFromDID(did?: string): Promise<any> {
  if (!did) {
    return null
  }
  const { data } = await discoClient.get(`/profile/${did}/credentials`)
  return data
}
