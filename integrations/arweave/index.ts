import Arweave from 'arweave'
import Transaction from 'arweave/node/lib/transaction'
import { JWKInterface } from 'arweave/node/lib/wallet'

import { ArweaveAmount } from './utils/types'

export const arweave = Arweave.init({
  host: 'arweave.net', // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: 'https', // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
})

export const generateArweaveWallet = async () => {
  const key = await arweave.wallets.generate()
  return key
}

export const getArweaveWalletAddress = async (wallet: JWKInterface) => {
  const address = await arweave.wallets.jwkToAddress(wallet)
  return address
}

export const getArweaveWalletBalance = async (wallet: JWKInterface): Promise<ArweaveAmount> => {
  const balance = await arweave.wallets.getBalance(await getArweaveWalletAddress(wallet))
  const ar = arweave.ar.winstonToAr(balance)
  return {
    ar,
    winston: balance,
  }
}

export const createArweaveTx = async (
  wallet: JWKInterface,
  data: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }
): Promise<Transaction> => {
  return await arweave.createTransaction(
    {
      data: Buffer.from(data, 'utf8'),
    },
    wallet
  )
}

type TxTag = { name: string; value: string }

export const signAndSendArweaveTx = async (wallet: JWKInterface, tx: Transaction, tags: Array<TxTag>) => {
  tags.forEach((tag) => {
    tx.addTag(tag.name, tag.value)
  })
  console.error(tx, wallet)
  await arweave.transactions.sign(tx, wallet)
  return await arweave.transactions.post(tx)
}
