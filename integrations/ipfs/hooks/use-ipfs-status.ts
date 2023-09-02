import { fetchWeb3StorageKey } from '../routes/fetch-api-key'
import StorageClient from '../utils/storageClient'

export const useIpfsStatus = async () => {
  const web3StorageKey = await fetchWeb3StorageKey()

  console.log('key', web3StorageKey)

  const storageClient = new StorageClient(web3StorageKey)
  return {}
}
