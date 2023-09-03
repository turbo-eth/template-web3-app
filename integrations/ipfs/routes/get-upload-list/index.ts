import { ipfsClient } from '../../ipfs-client'

interface UploadedItem {
  _id: string
  type: string
  name: string
  created: string
  updated: string
  cid: string
  dagSize: number
  pins: {
    status: string
    updated: string
    peerId: string
    peerName: string
    region: string | null
  }[]
  deals: {
    dealId: string | null
    storageProvider: string | null
    status: string
    pieceCid: string
    dataCid: string
    dataModelSelector: string
    activation: string | null
    expiration: string | null
    created: string | null
    updated: string | null
  }[]
}
export async function ipfsGetUploadList(): Promise<UploadedItem[]> {
  const { data } = await ipfsClient.get<UploadedItem[]>(`/user/uploads`)

  return data
}
