import { JWKInterface } from 'arweave/node/lib/wallet'
import Account, { ArAccount } from 'arweave-account'
import { T_profile } from 'arweave-account/lib/types'

import {
  ArweaveTxId,
  ArweaveTxPostResponse,
  arweave,
  createArweaveDataTx,
  getArweaveWalletAddress,
  getArweaveWalletBalance,
  signAndSendArweaveTx,
} from '.'

export const ArweaveAccount = new Account()

export const getUserAccount = async (wallet: JWKInterface): Promise<ArAccount> => {
  const acc: ArAccount = await ArweaveAccount.get(await getArweaveWalletAddress(wallet))
  console.error(acc)
  return acc
}

export type UpdateArweaveAccountPayload = Partial<T_profile> & Pick<T_profile, 'handleName'>

export const updateArweaveAccount = async (
  wallet: JWKInterface,
  payload: UpdateArweaveAccountPayload
): Promise<[ArweaveTxId, ArweaveTxPostResponse]> => {
  const tx = await createArweaveDataTx(wallet, JSON.stringify(removeEmpty(payload)))
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

function removeEmpty(obj: { [k: string]: unknown }): { [k: string]: unknown } {
  const removedEmpty = Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => !!v)
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v as { [k: string]: unknown }) : v])
  )
  const removedEmptyNestedObjects = Object.fromEntries(
    Object.entries(removedEmpty).filter(([, v]) => (v === Object(v) ? Object.keys(v as object).length > 0 : !!v))
  )
  return removedEmptyNestedObjects
}
