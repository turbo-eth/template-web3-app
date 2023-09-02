// import { v4 as uuidv4 } from 'uuid'
import { Web3Storage } from 'web3.storage'

class StorageClient {
  client: Web3Storage
  constructor(web3StorageKey: string) {
    this.client = new Web3Storage({
      token: web3StorageKey,
    })

    console.log('web3StorageKey::client', web3StorageKey)
  }

  public async storeFiles(file: any) {
    const fileName = file.name

    console.log('fileName', fileName)
    const newFile = new File([file], fileName, { type: file.type })
    console.log('newFile', newFile)
    const cid = await this.client.put([newFile], { name: fileName, maxRetries: 3 })

    console.log('cid', cid)
    const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`
    return imageURI
  }
}

export default StorageClient
