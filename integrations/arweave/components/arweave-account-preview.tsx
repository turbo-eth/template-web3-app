import { useEffect, useState } from 'react'

import { ArAccount } from 'arweave-account'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { truncateString } from '@/integrations/arweave/utils'

import { getUserAccount } from '../arweave-account'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const ArweaveAccountPreview = () => {
  const [account, setAccount] = useState<ArAccount | null>(null)
  const { wallet, address } = useArweaveWallet()
  useEffect(() => {
    if (wallet)
      getUserAccount(wallet)
        .then((account) => setAccount(account))
        .catch((e) => console.error(e))
  }, [wallet])
  if (!wallet || !address) return null
  const handleName = account?.profile?.handleName ?? null
  return (
    <div className="mb-5 flex items-center">
      <Avatar>
        <AvatarImage src={account?.profile?.avatarURL} />
        <AvatarFallback>{(handleName ?? address).substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-2">
        {handleName && <span>{handleName}</span>}
        <span className="font-mono text-sm">{truncateString(address, 15)}</span>
      </div>
    </div>
  )
}
