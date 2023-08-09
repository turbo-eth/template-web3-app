import { useEffect, useState } from 'react'

import { ArAccount } from 'arweave-account'

import { getUserAccount } from '../arweave-account'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const useArweaveAccount = () => {
  const [account, setAccount] = useState<ArAccount | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { wallet } = useArweaveWallet()
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
