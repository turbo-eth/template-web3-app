import { useEffect, useState } from 'react'

import { JWKInterface } from 'arweave/node/lib/wallet'
import { ArAccount } from 'arweave-account'

import { getUserAccount } from '../arweave-account'

export const useArweaveAccount = (wallet: JWKInterface | null) => {
  const [account, setAccount] = useState<ArAccount | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (wallet) {
      setLoading(true)
      getUserAccount(wallet)
        .then((account) => setAccount(account))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    }
  }, [wallet])

  return { account, loading, userHasAccount: !!account?.txid }
}
