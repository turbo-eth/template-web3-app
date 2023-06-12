import axios from 'axios'

export async function appDiscoGetCredentialsFromDID(did?: string): Promise<any> {
  try {
    const { data } = await axios.get(`/api/disco/profile-from-address`, {
      params: {
        did: did,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
