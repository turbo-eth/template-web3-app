'use client'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { Button } from '@/components/ui/button'
import FormDeployLock from '@/integrations/unlock/components/form-deploy-lock'
import UserKeys from '@/integrations/unlock/components/user-keys'
import UserLocks from '@/integrations/unlock/components/user-locks'
import useUnlockSuppertedNetworks from '@/integrations/unlock/hooks/use-unlock-supported-networks'

export default function UnlockIntegration() {
  const { isSupported } = useUnlockSuppertedNetworks()

  return (
    <div>
      <div className="flex items-center justify-center">
        <a href="/integration/unlock/paywall">
          <Button>Paywall Example</Button>
        </a>
      </div>
      <IsWalletConnected>
        {isSupported ? (
          <>
            <h1 className="p-4 text-center text-4xl font-bold">Create a Lock</h1>
            <FormDeployLock />
            <h1 className="p-4 text-center text-4xl font-bold">Created Locks</h1>
            <UserLocks />
            <h1 className="p-4 text-center text-4xl font-bold">Owned Keys</h1>
            <UserKeys />
          </>
        ) : (
          <h1>Unsupported Network</h1>
        )}
      </IsWalletConnected>

      <IsWalletDisconnected>
        <WalletConnect />
      </IsWalletDisconnected>
    </div>
  )
}
