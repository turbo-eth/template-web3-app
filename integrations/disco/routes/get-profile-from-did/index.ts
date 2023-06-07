import { discoClient } from '@/integrations/disco/disco-client'

export async function discoGetProfileFromDID(did: string): Promise<any> {
  const { data } = await discoClient.get(`/profile/${did}`)
  return data
}
