import axios from 'axios'

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
