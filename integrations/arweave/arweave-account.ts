import { JWKInterface } from 'arweave/node/lib/wallet'
import Account, { ArAccount } from 'arweave-account'
import { T_profile } from 'arweave-account/lib/types'

import { createArweaveTx, getArweaveWalletAddress, signAndSendArweaveTx } from '.'

export const ArweaveAccount = new Account()

export const getUserAccount = async (wallet: JWKInterface): Promise<ArAccount> => {
  const acc: ArAccount = await ArweaveAccount.get(await getArweaveWalletAddress(wallet))
  return acc
}

export const updateArweaveAccount = async (wallet: JWKInterface, payload: T_profile) => {
  const tx = await createArweaveTx(wallet, JSON.stringify(payload))
  const tags = [
    { name: 'Protocol-Name', value: 'Account-0.3' },
    { name: 'handle', value: payload.handleName },
  ]
  const txResult = await signAndSendArweaveTx(wallet, tx, tags)
  return txResult
}
