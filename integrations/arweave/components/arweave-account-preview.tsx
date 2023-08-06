import { LinkComponent } from '@/components/shared/link-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { truncateString } from '@/integrations/arweave/utils'

import { useArweaveAccount } from '../hooks/use-arweave-account'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const ArweaveAccountPreview = () => {
  const { balance, address } = useArweaveWallet()
  const { account } = useArweaveAccount()
  const handleName = account?.profile?.handleName ?? null
  if (!account || !address) return null
  return (
    <LinkComponent className="mb-5 flex items-center" href="/integration/arweave/settings">
      <Avatar>
        <AvatarImage src={account?.profile?.avatarURL} />
        <AvatarFallback>{(handleName ?? address).substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-2 flex-col">
        {handleName && <div>{handleName}</div>}
        <div className="font-mono text-sm">{truncateString(address, 15)}</div>
        {balance !== null && <div className="text-xs text-slate-400">{balance?.ar} AR</div>}
      </div>
    </LinkComponent>
  )
}
