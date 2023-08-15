import Arweave from 'arweave'
import Transaction from 'arweave/node/lib/transaction'
import { bufferToString, stringToBuffer } from 'arweave/node/lib/utils'
import { JWKInterface } from 'arweave/node/lib/wallet'

import { ArweaveAmount, ArweaveTxId, ArweaveTxPostResponse, ArweaveTxTag } from './utils/types'

export const arweave = Arweave.init({
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: true, // Enable network request logging
})

export const generateArweaveWallet = async () => {
  const key = await arweave.wallets.generate()
  return key
}

export const getArweaveWalletAddress = async (wallet: JWKInterface) => {
  return await arweave.wallets.jwkToAddress(wallet)
}

export const getArweaveWalletBalance = async (wallet: JWKInterface): Promise<ArweaveAmount> => {
  const balance = await arweave.wallets.getBalance(await getArweaveWalletAddress(wallet))
  const ar = arweave.ar.winstonToAr(balance)
  return {
    ar,
    winston: balance,
  }
}

export const createArweaveWalletToWalletTx = async (wallet: JWKInterface, targetAddress: string, arQuantity: string): Promise<Transaction> => {
  return await arweave.createTransaction(
    {
      target: targetAddress,
      quantity: arweave.ar.arToWinston(arQuantity),
    },
    wallet
  )
}

export const createArweaveDataTx = async (wallet: JWKInterface, data: string | ArrayBuffer | Uint8Array): Promise<Transaction> => {
  return await arweave.createTransaction(
    {
      data,
    },
    wallet
  )
}

export const signAndSendArweaveTx = async (
  wallet: JWKInterface,
  tx: Transaction,
  tags: Array<ArweaveTxTag>,
  hasFile = false
): Promise<[ArweaveTxId, ArweaveTxPostResponse]> => {
  tags.forEach((tag) => {
    tx.addTag(tag.name, tag.value)
  })
  await arweave.transactions.sign(tx, wallet)
  // check if tx has files
  if (hasFile) {
    const uploader = await arweave.transactions.getUploader(tx)
    // run the uploader until it completes the upload.
    while (!uploader.isComplete) {
      await uploader.uploadChunk()
    }
    return [tx.id, { status: uploader.lastResponseStatus, statusText: uploader.lastResponseError, data: null }]
  } else {
    const response = await arweave.transactions.post(tx)
    return [tx.id, response]
  }
}

export const getArweaveTxStatus = async (txId: ArweaveTxId) => {
  return await arweave.transactions.getStatus(txId)
}

export const getArweaveTx = async (txId: ArweaveTxId) => {
  const tx = await arweave.transactions.get(txId)
  if (!tx.data) tx.data = (await arweave.transactions.getData(txId, { decode: true })) as Uint8Array
  return { ...tx, data: bufferToString(tx.data) }
}

export const estimateTxFee = async (data: string) => {
  const buffer = stringToBuffer(data)
  const length = buffer.byteLength
  const cost = await arweave.transactions.getPrice(length)
  return { ar: arweave.ar.winstonToAr(cost), winston: cost }
}
