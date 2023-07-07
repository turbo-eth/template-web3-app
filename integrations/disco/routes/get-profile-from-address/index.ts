import { discoClient } from '@/integrations/disco/disco-client'

import { Profile } from '../../utils/types'

export async function discoGetProfileFromAddress(address?: string) {
  try {
    if (!address) {
      return null
    }
    const { data }: { data: Profile } = await discoClient.get(`/profile/address/${address}`)
    console.log('data:::::::', data)

    return data
  } catch (error) {
    throw error
  }
}
