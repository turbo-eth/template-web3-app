import axios from 'axios'

import { discoClient } from '@/integrations/disco/disco-client'

export async function discoGetProfileFromDID(did: string): Promise<any> {
  const { data } = await discoClient.get(`/profile/${did}`)
  return data
}

export async function appDiscoGetProfileFromDID(address?: `0x${string}`): Promise<any> {
  try {
    const { data } = await axios.get(`/api/disco/profile-from-address`, {
      params: {
        address: address,
      },
    })
    return data
  } catch (error: any) {
    throw error
  }
}
