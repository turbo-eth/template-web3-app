import axios from 'axios'

import apiDisco from '@/data/api-disco'

export async function discoGetProfileFromAddress(address?: string): Promise<any> {
  if (!address) {
    return null
  }
  const { data } = await apiDisco.get(`/profile/address/${address}`)
  return data
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
