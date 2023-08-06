import Arweave from 'arweave'
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
