import FormDeployLock from "@/integrations/unlock/components/form-deploy-lock"


import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'

export default function UnlockIntegration() {
  return (
    <div>
      <h1>Unlock Integration</h1>
      <IsWalletConnected>
        <FormDeployLock />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <WalletConnect />
      </IsWalletDisconnected>
    </div>
  )
}
