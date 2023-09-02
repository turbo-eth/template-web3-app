import axios from 'axios'

export async function appIpfsGetUploadedList() {
  try {
    const { data } = await axios.get(`/api/ipfs/list`, {
      params: {
        page: 1,
        size: 10,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
