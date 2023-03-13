import axios from 'axios'

import { discoAPI } from '@/integrations/disco/disco-api'

export async function discoGetProfileFromDID(did: string): Promise<any> {
  const { data } = await discoAPI.get(`/profile/${did}`)
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
