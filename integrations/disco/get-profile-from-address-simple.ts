import { discoAPI } from '@/integrations/disco/disco-api'

export async function discoGetProfileFromAddress(address?: string): Promise<any> {
  if (!address) {
    return null
  }
  const { data } = await discoAPI.get(`/profile/address/${address}`)
  return data
}

export async function appDiscoGetProfileFromAddress(address?: `0x${string}`): Promise<any> {
  try {
    const res = await fetch(
      `/api/disco/profile-from-address?` +
        new URLSearchParams({
          address: address as string,
        })
    )
    if (res.status !== 200) {
      throw new Error('Failed to fetch profile from address')
    }
    if (!res.ok) {
      throw new Error('Failed to fetch profile from address')
    }
    return await res.json()
  } catch (error: any) {
    throw error
  }
}
