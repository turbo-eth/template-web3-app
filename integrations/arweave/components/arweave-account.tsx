import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ConnectArweaveWallet } from './connect-arweave-wallet'
import { Spinner } from './spinner'
import { useArweaveAccount } from '../hooks/use-arweave-account'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const ArweaveAccount = () => {
  const { wallet, address } = useArweaveWallet()
  const { account, loading } = useArweaveAccount()

  if (!wallet || !address) return <ConnectArweaveWallet />
  if (loading) return <Spinner />
  const handleName = account?.profile?.handleName ?? null
  return (
    <div>
      <Avatar>
        <AvatarImage src={account?.profile?.avatarURL} />
        <AvatarFallback>{(handleName ?? address).substring(0, 2)}</AvatarFallback>
      </Avatar>
    </div>
  )
}
