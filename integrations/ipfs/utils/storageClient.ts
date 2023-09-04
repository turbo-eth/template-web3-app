import { Web3Storage } from 'web3.storage'

class StorageClient {
  client: Web3Storage
  constructor(web3StorageKey: string) {
    this.client = new Web3Storage({
      token: web3StorageKey,
    })
  }

  public async storeFiles(file: File) {
    const fileName = file.name

    const newFile = new File([file], fileName, { type: file.type })
    const cid = await this.client.put([newFile], { name: fileName, maxRetries: 3 })

    const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`
    return { imageURI, cid }
  }

  public async statusSearch(cid: string) {
    const data = await this.client.status(cid)
    return data
  }

  
}

export default StorageClient
