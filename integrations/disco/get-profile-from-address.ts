import axios from 'axios'

import { discoAPI } from '@/integrations/disco/disco-api'

export async function discoGetProfileFromAddress(address?: string): Promise<any> {
  try {
    if (!address) {
      return null
    }
    const { data } = await discoAPI.get(`/profile/address/${address}`)
    return data
  } catch (error: any) {
    throw error
  }
}

export async function appDiscoGetProfileFromAddress(address?: `0x${string}`): Promise<any> {
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
