import { JWKInterface } from 'arweave/node/lib/wallet'
import Account, { ArAccount } from 'arweave-account'
import { ArAccountEncoded, T_profile } from 'arweave-account/lib/types'

import { arweave, createArweaveDataTx, getArweaveWalletAddress, getArweaveWalletBalance, signAndSendArweaveTx } from '.'
import { ArweaveTxId, ArweaveTxPostResponse } from './utils/types'

export const ArweaveAccount = new Account()

export const getUserAccount = async (wallet: JWKInterface): Promise<ArAccount> => {
  const acc: ArAccount = await ArweaveAccount.get(await getArweaveWalletAddress(wallet))
  return acc
}

export type UpdateArweaveAccountPayload = Partial<T_profile> & Pick<T_profile, 'handleName'>

export const updateArweaveAccount = async (
  wallet: JWKInterface,
  payload: UpdateArweaveAccountPayload
): Promise<[ArweaveTxId, ArweaveTxPostResponse]> => {
  const tx = await createArweaveDataTx(wallet, JSON.stringify(encode(payload)))
  const cost = tx.reward
  const { winston } = await getArweaveWalletBalance(wallet)
  if (cost > winston)
    return [
      tx.id,
      { status: 400, statusText: 'insufficient balance', data: { error: `Insufficient balance, tx fee: ${arweave.ar.winstonToAr(cost)} AR.` } },
    ]
  const tags = [
    { name: 'Protocol-Name', value: 'Account-0.3' },
    { name: 'handle', value: payload.handleName },
  ]
  return await signAndSendArweaveTx(wallet, tx, tags)
}

function encode(profile: UpdateArweaveAccountPayload): ArAccountEncoded | null {
  let data: ArAccountEncoded = { handle: profile.handleName }
  if (profile.avatar) data = { ...data, avatar: profile.avatar }
  if (profile.banner) data = { ...data, banner: profile.banner }
  if (profile.name) data = { ...data, name: profile.name }
  if (profile.bio) data = { ...data, bio: profile.bio }
  if (profile.email) data = { ...data, email: profile.email }
  if (profile.links) data = { ...data, links: profile.links }
  if (profile.wallets) data = { ...data, wallets: profile.wallets }
  return data
}
