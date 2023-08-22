import Arweave from 'arweave'
import Transaction from 'arweave/node/lib/transaction'
import { bufferToString, stringToBuffer } from 'arweave/node/lib/utils'
import { JWKInterface } from 'arweave/node/lib/wallet'

import { ArweaveAmount, ArweaveTxId, ArweaveTxTag, SignAndSendArweaveTxResponse } from './utils/types'

const arweaveConfig = {
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
}

export const arweave = Arweave.init(arweaveConfig)
// Threshold to detect if a tx is confirmed, should be set to a higher number
// this is just for the demo purpose.
export const CONFIRMED_THRESHOLD = 0

export const arweaveGatewayUrl = `${arweaveConfig.protocol}://${arweaveConfig.host}:${arweaveConfig.port}/`

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
): Promise<SignAndSendArweaveTxResponse> => {
  tags.forEach((tag) => {
    tx.addTag(tag.name, tag.value)
  })
  const { winston: winstonBalance } = await getArweaveWalletBalance(wallet)
  if (parseInt(tx.reward) > parseInt(winstonBalance))
    return {
      txId: tx.id,
      response: null,
      insufficientBalance: true,
    }
  await arweave.transactions.sign(tx, wallet)
  // check if tx has files
  if (hasFile) {
    const uploader = await arweave.transactions.getUploader(tx)
    // run the uploader until it completes the upload.
    while (!uploader.isComplete) {
      await uploader.uploadChunk()
    }
    return {
      response: { status: uploader.lastResponseStatus, statusText: uploader.lastResponseError, data: null },
      insufficientBalance: false,
      txId: tx.id,
    }
  } else {
    const response = await arweave.transactions.post(tx)
    return { txId: tx.id, response, insufficientBalance: false }
  }
}

export const getArweaveTxStatus = async (txId: ArweaveTxId) => {
  return await arweave.transactions.getStatus(txId)
}

export const getArweaveTxData = async (txId: ArweaveTxId) => {
  return bufferToString((await arweave.transactions.getData(txId, { decode: true })) as Uint8Array)
}

export const estimateTxFee = async (data: string | ArrayBuffer) => {
  const buffer = data instanceof ArrayBuffer ? data : stringToBuffer(data)
  const length = buffer.byteLength
  const cost = await arweave.transactions.getPrice(length)
  return { ar: arweave.ar.winstonToAr(cost), winston: cost }
}
