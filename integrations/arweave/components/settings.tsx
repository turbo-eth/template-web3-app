import { useArweaveWallet } from '../hooks/use-arweave-wallet'
import { ConnectArweaveWallet } from './connect-arweave-wallet'

export const ArweaveSettings = () => {
  const { wallet, disconnect, address, backupWallet } = useArweaveWallet()
  if (!wallet) return <ConnectArweaveWallet />
  return (
    <div className="max-w-full">
      <h4 className="mb-2 ">
        Connected to <span className="font-mono break-words">{address}</span>
      </h4>
      <div className="flex mt-2 justify-center items-center flex-wrap gap-2">
        <button className="btn btn-primary text-sm" onClick={() => backupWallet()}>
          backup keyfile
        </button>
        <button className="btn btn-primary text-sm" onClick={() => disconnect()}>
          disconnect
        </button>
      </div>
    </div>
  )
}
