import { discoClient } from '@/integrations/disco/disco-client'

export async function discoGetProfileFromAddress(address?: string): Promise<any> {
  try {
    if (!address) {
      return null
    }
    const { data } = await discoClient.get(`/profile/address/${address}`)
    return data
  } catch (error) {
    throw error
  }
}
