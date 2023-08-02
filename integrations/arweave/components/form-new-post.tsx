import { ConnectArweaveWallet } from './connect-arweave-wallet'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const FormNewPost = () => {
  const { wallet } = useArweaveWallet()

  if (!wallet) return <ConnectArweaveWallet />
  return <div>FormNewPost</div>
}
