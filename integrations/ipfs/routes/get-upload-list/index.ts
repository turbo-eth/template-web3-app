import { ipfsClient } from '../../ipfs-client'
export async function ipfsGetUploadList() {
  const { data } = await ipfsClient.get(`/user/uploads`)

  return data
}
