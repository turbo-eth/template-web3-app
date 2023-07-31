import { JWKInterface } from 'arweave/node/lib/wallet'
import Account, { ArAccount, ArProfile } from 'arweave-account'

import { getArweaveWalletAddress } from '.'

export const ArweaveAccount = new Account({
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 3600000, // 3600000ms => 1 hour cache duration
})

export const getUserAccount = async (wallet: JWKInterface): Promise<ArAccount> => {
  const acc: ArAccount = await ArweaveAccount.get(await getArweaveWalletAddress(wallet))
  return acc
}

export const editProfile = async (wallet: JWKInterface, payload: ArProfile) => {
  await ArweaveAccount.connect(wallet)
  await ArweaveAccount.updateProfile(payload)
}
