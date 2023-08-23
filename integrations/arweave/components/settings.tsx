import { ConnectArweaveWallet } from './connect-arweave-wallet'
import { useArweaveWallet } from '../hooks/use-arweave-wallet'

export const ArweaveSettings = () => {
  const { wallet, disconnect, address, backupWallet } = useArweaveWallet()
  if (!wallet) return <ConnectArweaveWallet />
  return (
    <div className="max-w-full">
      <h4 className="mb-2 ">
        Connected to <span className="break-words font-mono">{address}</span>
      </h4>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
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
