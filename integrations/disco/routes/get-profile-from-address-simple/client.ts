import type { Address } from 'wagmi'

export async function appDiscoGetProfileFromAddress(address?: Address): Promise<any> {
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
