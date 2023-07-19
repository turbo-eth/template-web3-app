import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import FormDeployLock from '@/integrations/unlock/components/form-deploy-lock'
import UserLocks from '@/integrations/unlock/components/user-locks'

export default function UnlockIntegration() {
  return (
    <div>
      <IsWalletConnected>
        <h1 className="text-center font-bold">Create a Lock</h1>
        <FormDeployLock />
        <h1 className="text-center font-bold">Created Locks</h1>
        <UserLocks />
      </IsWalletConnected>
      <IsWalletDisconnected>
        <WalletConnect />
      </IsWalletDisconnected>
    </div>
  )
}
