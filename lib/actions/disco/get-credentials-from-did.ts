import axios from 'axios'

import apiDisco from '@/data/api-disco'

export async function discoGetCredentialsFromDID(did?: string): Promise<any> {
  if (!did) {
    return null
  }
  const { data } = await apiDisco.get(`/profile/${did}/credentials`)
  return data
}

export async function appDiscoGetCredentialsFromDID(did?: string): Promise<any> {
  try {
    const { data } = await axios.get(`/api/disco/profile-from-address`, {
      params: {
        did: did,
      },
    })
    return data
  } catch (error: any) {
    throw error
  }
}
