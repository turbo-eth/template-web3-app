import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import FormDeployLock from '@/integrations/unlock/components/form-deploy-lock'

export default function UnlockIntegration() {
  return (
    <div>
      <IsWalletConnected>
        <h1 className="text-center font-bold">Create a Lock</h1>
        <FormDeployLock />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <WalletConnect />
      </IsWalletDisconnected>
    </div>
  )
}
